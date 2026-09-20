/**
 * Opt-in: reach Postgres over Neon's serverless WebSocket driver instead of a
 * plain connection on 5432.
 *
 * Two situations want it. A network that allows HTTPS and blocks 5432 — the
 * Claude Code web container is one, where Prisma otherwise fails with P1001
 * however correct the connection string is. And a serverless deploy, where a
 * WebSocket to Neon's pooler beats holding a TCP connection open per
 * invocation.
 *
 * Nothing here runs unless DB_OVER_HTTPS=1. The ordinary path is an ordinary
 * Postgres connection, and that is what a laptop and a long-lived Node server
 * should keep using.
 */
import { neonConfig } from "@neondatabase/serverless";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { HttpsProxyAgent } from "https-proxy-agent";
import WebSocket from "ws";

/** True when this process is set to reach Postgres over the WebSocket driver. */
export const usingRemoteDriver = (): boolean => process.env.DB_OVER_HTTPS === "1";

/** The one place a client is built, so the app, the seed and the scripts agree. */
export function createPrismaClient(): PrismaClient {
  const adapter = neonAdapter();
  return adapter === undefined ? new PrismaClient() : new PrismaClient({ adapter });
}

/** Exported for prisma.config.ts, which needs the adapter itself rather than a client. */
export function neonAdapter(): PrismaNeon | undefined {
  if (process.env.DB_OVER_HTTPS !== "1") return undefined;

  const connectionString = process.env.DATABASE_URL;
  if (connectionString === undefined || connectionString === "") {
    throw new Error("DB_OVER_HTTPS=1 but DATABASE_URL is not set");
  }

  const proxy = process.env.HTTPS_PROXY ?? process.env.https_proxy;
  if (proxy === undefined || proxy === "") {
    neonConfig.webSocketConstructor = WebSocket;
  } else {
    // ws accepts an agent, but the driver constructs the socket itself, so the
    // agent has to be injected by subclassing rather than passed as an option.
    // Built once here rather than per socket, and so the narrowing of `proxy`
    // to a string does not have to survive into the constructor body.
    const agent = new HttpsProxyAgent(proxy);
    class ProxiedWebSocket extends WebSocket {
      constructor(address: string | URL, protocols?: string | string[], options?: Record<string, unknown>) {
        super(address, protocols, { ...options, agent });
      }
    }
    neonConfig.webSocketConstructor = ProxiedWebSocket as unknown as typeof WebSocket;
  }

  return new PrismaNeon({ connectionString });
}
