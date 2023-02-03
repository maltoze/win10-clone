/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bing.biturl.top',
        pathname: '/',
      },
    ],
  },
};

module.exports = nextConfig;
