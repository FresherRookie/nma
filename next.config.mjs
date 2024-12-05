/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // This disables ESLint during the build process
  },
  webpack: (config, { dev }) => {
    return config;
  },
};

export default nextConfig;
