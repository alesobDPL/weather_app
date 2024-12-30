/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },

  env: {
    OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
  },
};

module.exports = nextConfig;
