/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    WEB_SOCKET_BACKEND_URL: process.env.WEB_SOCKET_BACKEND_URL,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.apple.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "thumbs.dreamstime.com" },
    ],
  },
};

module.exports = nextConfig;
