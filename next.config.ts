import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // ngrok
  allowedDevOrigins: [process.env.NGROK_FORWARDING_URL!],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },

      {
        protocol: 'https',
        hostname: 'petharbor.com',
      }
    ]
  },

};

export default nextConfig;
