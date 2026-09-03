import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `var` declarations
  var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (connectionString == null) {
  throw new Error("DATABASE_URL is not set");
}

const createPrismaClient = () =>
  new PrismaClient({
    // Prisma 7 connects through a driver adapter instead of a schema-level url.
    adapter: new PrismaPg({ connectionString }),
    log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  });

export const prisma = global.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
