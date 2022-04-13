/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "fakestoreapi.com"],
  },
}

module.exports = nextConfig
