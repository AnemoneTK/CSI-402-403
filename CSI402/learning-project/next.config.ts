import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: "http://localhost:10500/:path*",
      },
    ];
  },
};

export default nextConfig;
