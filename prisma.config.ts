// Prisma 7 no longer loads .env automatically, so the CLI needs it loaded here.
// (Next.js loads .env itself for the application runtime.)
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Only used by the Prisma CLI (migrate / db / studio). At runtime the
    // application supplies the connection through the driver adapter in lib/prisma.ts.
    url: env("DATABASE_URL"),
  },
});
