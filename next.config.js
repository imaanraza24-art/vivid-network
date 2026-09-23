/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Add remote domains here once real article/episode images are hosted,
    // e.g. an S3 bucket, Cloudinary, or a headless CMS's media domain.
    remotePatterns: []
  }
};

module.exports = nextConfig;
