/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      // The 2020 maker posts moved from Writing to the Portfolio; keep the
      // original permalinks working.
      {
        source: '/blog/amaryllis',
        destination: '/portfolio/amaryllis',
        permanent: true,
      },
      {
        source: '/blog/skytimelapse',
        destination: '/portfolio/skytimelapse',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
