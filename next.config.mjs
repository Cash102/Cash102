/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Load the database driver from node_modules at runtime instead of bundling
  // it. Bundling gives the adapter a different copy of @neondatabase/serverless
  // than the one lib/db-driver.ts configures, so the WebSocket settings set
  // there are silently ignored and every query dies with "Connection terminated
  // unexpectedly". Externalising keeps it one module.
  experimental: {
    serverComponentsExternalPackages: [
      "@prisma/adapter-neon",
      "@neondatabase/serverless",
      "https-proxy-agent",
      "ws",
    ],
  },
};

export default nextConfig;
