import TerserPlugin from 'terser-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'images.unsplash.com', 
      'source.unsplash.com',
      'techcoffeehouse.com',
      'img.tepcdn.com',
      'edgeprop.sg',
      'itbrief.asia',
      'sg.news.yahoo.com',
      'www.mingtiandi.com',
      'mingtiandi.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'techcoffeehouse.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.tepcdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'edgeprop.sg',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'itbrief.asia',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sg.news.yahoo.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.mingtiandi.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mingtiandi.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        minimizer: [
          ...config.optimization.minimizer,
          // Add terser options for better minification
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true, // Remove console.logs in production
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.debug'],
              },
              mangle: true,
              format: {
                comments: false,
              },
            },
          }),
        ],
      }
    }
    return config
  },
}

export default nextConfig
