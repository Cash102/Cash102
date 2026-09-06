/**
 * Prisma CLI configuration.
 *
 * The `prisma` key in package.json is deprecated in Prisma 6 and gone in 7, so
 * the seed command lives here. One consequence: a config file turns OFF the
 * CLI's automatic .env loading, hence the explicit dotenv import. Next.js loads
 * .env on its own, so this only affects CLI commands.
 */
import "dotenv/config";
import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
