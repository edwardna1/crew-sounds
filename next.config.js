/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["prisma", "@prisma/client"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'links.papareact.com',
        // pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com/**',
        // pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co/**',
        // pathname: '/**'
      },
    ],
  }
};

module.exports = nextConfig;
