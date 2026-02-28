import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io', // ✅ microCMSの画像を許可
      },
    ],
  },
};

export default nextConfig;