import bcryptjs from "bcryptjs";
import prisma from "./prisma";

export const DEMO_EMAIL = "demo@demo.ru";
export const DEMO_PASSWORD = "demo1234";
export const DEMO_OFFLINE_USER_ID = "demo-local-offline";

export function isDemoCredentials(email: string, password: string) {
  return email === DEMO_EMAIL && password === DEMO_PASSWORD;
}

export async function isDatabaseReachable() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

export async function ensureDemoUserInDb() {
  const hash = await bcryptjs.hash(DEMO_PASSWORD, 10);

  return prisma.user.upsert({
    where: { email: DEMO_EMAIL },
    update: { password: hash },
    create: {
      email: DEMO_EMAIL,
      password: hash
    }
  });
}
