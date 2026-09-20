import type { PrismaClient } from "@prisma/client";

import { createPrismaClient } from "./db-driver";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/** One client per process; Next's dev server would otherwise open a pool per reload. */
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
