import type { NextConfig } from "next";

const apiInternalOrigin =
  process.env.API_INTERNAL_URL ?? "http://127.0.0.1:3001";

const nextConfig: NextConfig = {
  reactCompiler: true,
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
