import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
      }
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    }
  }
};

export default nextConfig;