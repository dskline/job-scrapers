/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"]
  },
  eslint: {
    dirs: ["features", "pages"],
  },
  experimental: {
    appDir: true,

  }
};
