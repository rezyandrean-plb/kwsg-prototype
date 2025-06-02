/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'wpmedia.roomsketcher.com',
      'images.unsplash.com', // allow Unsplash images
      'maps.googleapis.com', // allow Google Maps static images
      // add other domains as needed
    ],
  },
  // Enable source maps in production
  productionBrowserSourceMaps: true,
  // Optimize production builds
  swcMinify: true,
  // Configure webpack for better source map generation
  webpack: (config, { dev, isServer }) => {
    // Enable source maps in production
    if (!dev) {
      config.devtool = 'source-map'
    }
    return config
  },
}

module.exports = nextConfig 