/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  env: {
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
    NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
    QUICKNODE_HTTP_URL: process.env.QUICKNODE_HTTP_URL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    SECRET_KEY: process.env.SECRET_KEY,
    BASE_API_URL: process.env.BASE_API_URL,
    MORALIS_API_KEY: process.env.MORALIS_API_KEY,
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
