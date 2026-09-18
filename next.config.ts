import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [process.env.NGROK_FORWARDING_URL!],
};

export default nextConfig;
