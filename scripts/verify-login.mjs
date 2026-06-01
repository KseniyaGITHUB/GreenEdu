import { PrismaClient } from "../src/generated/prisma/index.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const email = "demo@demo.ru";
const password = "demo1234";

const user = await prisma.user.findUnique({ where: { email } });
if (!user) {
  console.error("FAIL: demo user not found");
  process.exit(1);
}

const ok = await bcrypt.compare(password, user.password);
console.log(ok ? "OK: demo login credentials valid" : "FAIL: password mismatch");
await prisma.$disconnect();
process.exit(ok ? 0 : 1);
