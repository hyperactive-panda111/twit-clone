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
    allowedDevOrigins: ['3001-idx-twit-clone-1744579984383.cluster-4ezwrnmkojawstf2k7vqy36oe6.cloudworkstations.dev',
      '3000-idx-twit-clone-1744579984383.cluster-4ezwrnmkojawstf2k7vqy36oe6.cloudworkstations.dev.'
    ],
  }
};

export default nextConfig;