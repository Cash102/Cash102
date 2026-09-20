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

// Not worth retrying: the CLI can also take a driver adapter here, which would
// let `migrate deploy` run on a network that blocks 5432. PrismaNeon 6.16
// implements connect() but not connectToShadowDb(), so it is not the
// migration-aware factory this expects and defineConfig drops it silently —
// the CLI then dials 5432 anyway and fails with P1001. `npm run db:migrate:https`
// applies migrations over Neon's SQL-over-HTTP endpoint instead.
