import { PrismaClient } from "@/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

function createPrismaClient() {
  const client = new PrismaClient();
  const url = process.env.DATABASE_URL ?? "";

  if (url.startsWith("prisma://") || url.startsWith("prisma+postgres://")) {
    return client.$extends(withAccelerate());
  }

  return client;
}

const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
