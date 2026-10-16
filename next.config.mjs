/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend-korigo.sampledomain.online',
        pathname: '/**',
      },
    ],
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
