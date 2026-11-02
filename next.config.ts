import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Hide the Next.js N / bundler indicator in the corner
  devIndicators: false,
  // Keep Turbopack root pinned if Turbopack is ever used; webpack is the default via npm run dev
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
