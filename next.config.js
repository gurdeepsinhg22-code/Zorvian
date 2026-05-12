/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '3001', pathname: '/uploads/**' },
      { protocol: 'http', hostname: '127.0.0.1', port: '3001', pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'api.medhostech.com', pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'medhostech.com', pathname: '/uploads/**' },
      { protocol: 'http', hostname: 'api.medhostech.com', pathname: '/uploads/**' },
    ],
  },
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
    return [
      { source: '/api/:path*', destination: `${backendUrl}/api/:path*` },
    ];
  },
  // Workaround for "WebpackError is not a constructor" in Next.js 15.5 minify-webpack-plugin
  experimental: {
    serverMinification: false,
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      config.optimization = { ...config.optimization, minimize: false };
    }
    return config;
  },
};

module.exports = nextConfig;
