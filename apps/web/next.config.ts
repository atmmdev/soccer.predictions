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
  async headers() {
    return [
      {
        // HTML and app routes: never cache at CDN/browser (avoids stale chunk refs after deploy).
        source:
          "/((?!_next/static|_next/image|favicon.ico|sw.js|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff2?)$).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
      {
        // Hashed build assets are safe to cache long-term.
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
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
