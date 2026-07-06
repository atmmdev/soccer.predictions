import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const monorepoRoot = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

const apiInternalOrigin =
  process.env.API_INTERNAL_URL ?? "http://127.0.0.1:3001";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: monorepoRoot,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiInternalOrigin}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
