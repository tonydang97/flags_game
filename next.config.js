module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["countryflagsapi.com", "flagcdn.com", "upload.wikimedia.org"],
    formats: ["image/avif", "image/webp"],
  },
};

const withImages = require('next-images')
module.exports = withImages()