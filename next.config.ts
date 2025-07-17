import type { NextConfig } from "next";
import { join } from "path";

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    dynamicIO: true,
    // cacheHandlers: {
    //   remote: join(__dirname, `memory-cache-handler.mjs`),
    //   default: join(__dirname, `memory-cache-handler.mjs`),
    //   static: join(__dirname, `memory-cache-handler.mjs`),
    // },
  },
  expireTime: 3600,
  // cacheHandler: join(__dirname, `file-cache-handler.mjs`),
  cacheHandler: join(__dirname, `memory-cache-handler.mjs`),
};

export default nextConfig;
