import TerserPlugin from 'terser-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add empty turbopack config to silence the warning
  // The webpack config will be used when running with --webpack flag
  turbopack: {},
  // Fix for Clerk Server Actions error in Next.js 16
  // Exclude Clerk server files from being treated as Server Actions
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['localhost', '*.vercel.app'],
      // Exclude Clerk from Server Action detection to prevent build errors
      externalPackages: ['@clerk/nextjs'],
    },
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
      'mingtiandi.com',
      'kwsingapore.s3.ap-southeast-1.amazonaws.com',
      'img.singmap.com',
      'example.com'
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
      },
      {
        protocol: 'https',
        hostname: 'kwsingapore.s3.ap-southeast-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.singmap.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  webpack: (config, { dev, isServer, webpack }) => {
    // Fix for tslib module not found error
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }
    
    // Fix for Edge runtime "module is not defined" error
    // This happens when code tries to use CommonJS module.exports in Edge runtime
    // Check if this is an Edge runtime build by checking the config name or target
    const isEdgeRuntime = config.name === 'edge-server' || 
                          (typeof config.target === 'string' && config.target.includes('edge'))
    
    if (isEdgeRuntime) {
      // For Edge runtime, define module as an empty object to prevent "module is not defined" errors
      config.plugins = config.plugins || []
      
      // Find existing DefinePlugin if any
      const existingDefinePluginIndex = config.plugins.findIndex(
        plugin => plugin.constructor.name === 'DefinePlugin'
      )
      
      if (existingDefinePluginIndex >= 0) {
        // Merge with existing DefinePlugin
        const existingPlugin = config.plugins[existingDefinePluginIndex]
        config.plugins[existingDefinePluginIndex] = new webpack.DefinePlugin({
          ...existingPlugin.definitions,
          'module': JSON.stringify({ exports: {} }),
        })
      } else {
        // Add new DefinePlugin
        config.plugins.push(
          new webpack.DefinePlugin({
            'module': JSON.stringify({ exports: {} }),
          })
        )
      }
    }
    
    // Fix for Clerk Headers API issue
    // Configure webpack to use Node.js built-in globals (Node 18+)
    // Only set node18 target for Node.js runtime, not Edge runtime
    if (isServer && !isEdgeRuntime) {
      config.target = 'node18'
      
      // Ensure webpack knows about Node.js globals
      config.node = {
        ...config.node,
        __dirname: false,
        __filename: false,
      }
    }
    
    // Note: Server Actions detection happens at SWC level, not webpack
    // The experimental.serverActions configuration above should handle this
    
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
