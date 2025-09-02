import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  eslint: {
    // Vercel の本番ビルドを lint エラーで止めない
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
