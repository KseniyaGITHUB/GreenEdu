import { spawn } from "node:child_process";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const isWin = process.platform === "win32";
const siteUrl = "http://localhost:3000";

function openBrowser() {
  try {
    if (isWin) {
      execSync(`start "" "${siteUrl}"`, { stdio: "ignore", shell: true });
    } else if (process.platform === "darwin") {
      execSync(`open "${siteUrl}"`);
    } else {
      execSync(`xdg-open "${siteUrl}"`);
    }
  } catch {
    console.log(`Откройте в браузере: ${siteUrl}`);
  }
}

async function waitForSite(maxSeconds = 120) {
  for (let i = 0; i < maxSeconds; i++) {
    try {
      const res = await fetch(siteUrl, { method: "GET" });
      if (res.ok) return true;
    } catch {
      // server still starting
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

console.log("Запускаем сайт на http://localhost:3000 ...\n");

const dev = spawn("npm run dev", {
  cwd: root,
  stdio: "inherit",
  shell: true
});

waitForSite().then((ok) => {
  if (ok) {
    console.log("\nСайт готов. Открываем браузер...\n");
    openBrowser();
  } else {
    console.log(
      `\nСервер долго стартует. Откройте вручную: ${siteUrl}\n`
    );
  }
});

dev.on("exit", (code) => process.exit(code ?? 0));

process.on("SIGINT", () => {
  dev.kill("SIGINT");
});
