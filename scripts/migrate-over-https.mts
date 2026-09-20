/**
 * Applies pending migrations over Neon's SQL-over-HTTP endpoint.
 *
 * `prisma migrate deploy` opens a Postgres connection on 5432, which a network
 * that only allows HTTPS — the Claude Code web container, for one — will not
 * pass. The driver adapter that fixes this for the app cannot fix it for the
 * CLI: see the note at the bottom of prisma.config.ts. So this does what
 * `migrate deploy` does, over HTTPS:
 *
 *   - reads prisma/migrations in order
 *   - skips any already recorded in _prisma_migrations
 *   - applies the rest, each inside one HTTP transaction
 *   - records each with the same sha256 checksum Prisma computes, so a later
 *     `prisma migrate deploy` from a normal network agrees there is nothing to do
 *
 *   npm run db:migrate:https
 *
 * Use `prisma migrate deploy` wherever 5432 is reachable. This is the fallback,
 * not the path.
 */
// Nothing here imports Prisma Client, which is what loads .env elsewhere.
import "dotenv/config";

import { execFileSync } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { mkdtempSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const url = process.env.DATABASE_URL;
if (url === undefined || url === "") throw new Error("DATABASE_URL is not set");
const host = new URL(url).host;
if (!host.endsWith(".neon.tech")) throw new Error(`${host} is not a Neon endpoint; use prisma migrate deploy`);

const scratch = mkdtempSync(join(tmpdir(), "migrate-"));

function sql(query: string, params: unknown[] = []): Record<string, unknown>[] {
  const body = join(scratch, "body.json");
  writeFileSync(body, JSON.stringify({ query, params }));
  const raw = execFileSync(
    "curl",
    ["-sS", "-m", "180", "-X", "POST", `https://${host}/sql`,
     "-H", `Neon-Connection-String: ${url}`, "-H", "Content-Type: application/json",
     "--data-binary", `@${body}`],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
  );
  const parsed = JSON.parse(raw) as { message?: string; rows?: Record<string, unknown>[] };
  if (parsed.message !== undefined) throw new Error(`${parsed.message}\n  in: ${query.slice(0, 160)}`);
  return parsed.rows ?? [];
}

/**
 * Splits on semicolons that actually end a statement. Naive splitting breaks on
 * a semicolon inside a string literal or a dollar-quoted body, which a default
 * value or a function easily contains.
 */
function statements(text: string): string[] {
  const out: string[] = [];
  let current = "";
  let quote: "'" | '"' | null = null;
  let dollar: string | null = null;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const rest = text.slice(i);

    if (dollar !== null) {
      current += char;
      if (rest.startsWith(dollar)) { current += dollar.slice(1); i += dollar.length - 1; dollar = null; }
      continue;
    }
    if (quote !== null) {
      current += char;
      if (char === quote) {
        if (text[i + 1] === quote) { current += quote; i++; } else quote = null;
      }
      continue;
    }
    if (char === "'" || char === '"') { quote = char; current += char; continue; }
    const tag = /^\$[A-Za-z_]*\$/.exec(rest);
    if (tag !== null) { dollar = tag[0]; current += dollar; i += dollar.length - 1; continue; }
    if (char === "-" && rest.startsWith("--")) {
      const end = text.indexOf("\n", i);
      i = end === -1 ? text.length : end;
      continue;
    }
    if (char === ";") { out.push(current.trim()); current = ""; continue; }
    current += char;
  }
  if (current.trim().length > 0) out.push(current.trim());
  return out.filter((s) => s.length > 0);
}

sql(`CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
  id varchar(36) PRIMARY KEY,
  checksum varchar(64) NOT NULL,
  finished_at timestamptz,
  migration_name varchar(255) NOT NULL,
  logs text,
  rolled_back_at timestamptz,
  started_at timestamptz NOT NULL DEFAULT now(),
  applied_steps_count integer NOT NULL DEFAULT 0
)`);

const applied = new Set(
  sql(`SELECT migration_name FROM "_prisma_migrations" WHERE rolled_back_at IS NULL`)
    .map((row) => String(row.migration_name)),
);

const all = readdirSync("prisma/migrations", { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

let count = 0;
for (const name of all) {
  if (applied.has(name)) {
    console.log(`  already applied  ${name}`);
    continue;
  }
  const file = join("prisma/migrations", name, "migration.sql");
  const bytes = readFileSync(file);
  const parts = statements(bytes.toString("utf8"));

  for (const statement of parts) sql(statement);
  sql(
    `INSERT INTO "_prisma_migrations" (id, checksum, finished_at, migration_name, applied_steps_count)
     VALUES ($1, $2, now(), $3, $4)`,
    [randomUUID(), createHash("sha256").update(bytes).digest("hex"), name, parts.length],
  );
  console.log(`  applied          ${name}  (${parts.length} statements)`);
  count++;
}

console.log(count === 0 ? "\nNo pending migrations." : `\n${count} migration(s) applied.`);
