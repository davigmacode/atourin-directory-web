/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/Explore Hub',
        destination: '/explore-hub',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
