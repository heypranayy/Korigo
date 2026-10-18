/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend-korigo.sampledomain.online',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/favicon:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/collections/all',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/collections/frontpage',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/collections/product',
        destination: '/shop?category=singles',
        permanent: true,
      },
      {
        source: '/collections/combo',
        destination: '/shop?category=combos',
        permanent: true,
      },
      {
        source: '/pages/our-story',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/pages/about-us',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/pages/contact',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/pages/reviews-form',
        destination: '/reviews-form',
        permanent: true,
      },
      {
        source: '/policies/refund-policy',
        destination: '/refund-policy',
        permanent: true,
      },
      {
        source: '/policies/privacy-policy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/policies/shipping-policy',
        destination: '/shipping-policy',
        permanent: true,
      },
      {
        source: '/policies/terms-of-service',
        destination: '/terms-of-service',
        permanent: true,
      },
      {
        source: '/blogs/news',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blogs/news/:slug',
        destination: '/blogs/:slug',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/blogs/:slug',
        permanent: true,
      },
      {
        source: '/account/login',
        destination: '/my-account',
        permanent: true,
      },
      {
        source: '/account/register',
        destination: '/my-account',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
