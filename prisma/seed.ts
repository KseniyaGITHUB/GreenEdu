import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const demoEmail = "demo@demo.ru";
  const demoPassword = "demo1234";
  const hash = await bcrypt.hash(demoPassword, 10);

  await prisma.user.upsert({
    where: { email: demoEmail },
    update: { password: hash },
    create: {
      email: demoEmail,
      password: hash
    }
  });

  console.log("");
  console.log("  Демо-аккаунт для входа:");
  console.log("  Email:   demo@demo.ru");
  console.log("  Пароль:  demo1234");
  console.log("");
}

main()
  .catch((error) => {
    console.error("Ошибка seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
