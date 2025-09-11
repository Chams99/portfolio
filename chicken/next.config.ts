import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/chicken',
  assetPrefix: '/chicken',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
