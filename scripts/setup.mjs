import { spawnSync, execSync } from "node:child_process";
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const isWin = process.platform === "win32";

function log(step, message) {
  console.log(`\n[${step}] ${message}`);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: isWin,
    ...options
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function tryRun(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "pipe",
    shell: isWin,
    encoding: "utf8"
  });
  return result.status === 0;
}

function copyEnvFiles() {
  const template = join(root, "config", "environment.env");
  const envPath = join(root, ".env");
  const envLocalPath = join(root, ".env.local");

  copyFileSync(template, envPath);

  const content = readFileSync(template, "utf8");
  const authLine =
    content
      .split("\n")
      .find((line) => line.startsWith("AUTH_SECRET=")) ??
    'AUTH_SECRET=green-edu-local-dev-secret-change-in-production-only';

  copyFileSync(template, envLocalPath);

  writeFileSync(envLocalPath, `${authLine}\n`, "utf8");
}

function waitForPostgres(seconds = 60) {
  log("4/6", "Ждём готовности PostgreSQL...");

  for (let i = 0; i < seconds; i++) {
    const ready = tryRun("docker", [
      "exec",
      "green-edu-postgres",
      "pg_isready",
      "-U",
      "postgres",
      "-d",
      "tatrian_kitchen"
    ]);

    if (ready) {
      console.log("  База данных готова.");
      return;
    }

    if (i % 5 === 0) {
      process.stdout.write(".");
    }
    execSync(isWin ? "timeout /t 1 /nobreak >nul" : "sleep 1", {
      stdio: "ignore",
      shell: true
    });
  }

  console.error(
    "\nPostgreSQL не ответил вовремя. Убедитесь, что Docker Desktop запущен."
  );
  process.exit(1);
}

console.log("========================================");
console.log("  Зеленое образование — настройка");
console.log("========================================");

log("1/6", "Проверка Node.js...");
if (!tryRun("node", ["-v"])) {
  console.error("Установите Node.js LTS: https://nodejs.org/");
  process.exit(1);
}

log("2/6", "Копируем готовые настройки (.env)...");
copyEnvFiles();

log("3/6", "Запуск PostgreSQL в Docker...");
if (!tryRun("docker", ["--version"])) {
  console.error(
    "Docker не найден. Установите Docker Desktop и запустите его:\nhttps://www.docker.com/products/docker-desktop/"
  );
  process.exit(1);
}

run("docker", ["compose", "up", "-d"]);
waitForPostgres();

if (!existsSync(join(root, "node_modules"))) {
  log("5/6", "Установка зависимостей (npm install), подождите...");
  run("npm", ["install"]);
} else {
  log("5/6", "Зависимости уже установлены, пропускаем npm install");
  run("npx", ["prisma", "generate"]);
}

log("6/6", "Создание таблиц и демо-пользователя...");
run("npx", ["prisma", "db", "push"]);
run("npx", ["tsx", "prisma/seed.ts"]);

console.log("\n========================================");
console.log("  Настройка завершена!");
console.log("  Запуск сайта: npm run dev");
console.log("  или дважды щёлкните ЗАПУСК.bat");
console.log("========================================\n");
