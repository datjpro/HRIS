import { PrismaClient } from "@prisma/client";

declare global {
  var __hrisPrismaClient: PrismaClient | undefined;
}

export const prisma = globalThis.__hrisPrismaClient ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__hrisPrismaClient = prisma;
}
