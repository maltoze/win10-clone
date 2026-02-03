/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bing.biturl.top',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
