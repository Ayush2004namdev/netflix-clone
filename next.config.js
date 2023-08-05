/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/photo-**',
        pathname: '/vi/**',
      },
    ],
  },
  reactStrictMode: false,
}

module.exports = nextConfig
