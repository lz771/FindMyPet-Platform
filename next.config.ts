import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // ngrok
  allowedDevOrigins: [process.env.NGROK_FORWARDING_URL!],

  // Cloudinary
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ]
  },

};

export default nextConfig;
