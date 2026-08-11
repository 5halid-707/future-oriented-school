import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles build output natively, so we don't need standalone
  // output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // for document uploads
    },
  },
};

export default nextConfig;
