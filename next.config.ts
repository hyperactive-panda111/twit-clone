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
    },
    allowedDevOrigins: [
      '3000-firebase-twit-clonegit-1756382247555.cluster-fbfjltn375c6wqxlhoehbz44sk.cloudworkstations.dev',
      'firebase-twit-clonegit-1756382247555.cluster-fbfjltn375c6wqxlhoehbz44sk.cloudworkstations.dev'
    ],  
  }
};

export default nextConfig;