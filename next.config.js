/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'singrank.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year for better caching
    unoptimized: process.env.NODE_ENV === 'production' && process.env.NETLIFY === 'true'
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    // Add styledComponents support for better hydration
    styledComponents: true,
  },
  poweredByHeader: false,
  // Optimize output for Vercel deployment
  output: 'standalone',
  // Enable modular import for increased performance
  modularizeImports: {
    '@/components': {
      transform: '@/components/{{member}}',
    },
    'react-icons/fa': {
      transform: 'react-icons/fa/{{member}}',
    },
    'react-icons/bs': {
      transform: 'react-icons/bs/{{member}}',
    },
    'react-icons/md': {
      transform: 'react-icons/md/{{member}}',
    },
    'react-icons/io': {
      transform: 'react-icons/io/{{member}}',
    },
    'react-icons/ri': {
      transform: 'react-icons/ri/{{member}}',
    },
    'react-icons/si': {
      transform: 'react-icons/si/{{member}}',
    },
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
    'framer-motion': {
      transform: 'framer-motion/{{member}}',
      skipDefaultConversion: true,
    },
  },
  // Enable gzip compression for better performance
  compress: true,
  // Fixes hydration issues by skipping trailing slash redirect
  skipTrailingSlashRedirect: true,
  // Configure experimental features for better performance and hydration
  experimental: {
    // Enable React Server Components optimizations
    serverComponentsExternalPackages: [],
    // Optimize CSS
    optimizeCss: true,  // Enabled now that 'critters' package is installed
    // Enable scroll restoration
    scrollRestoration: true,
    // Enhanced code splitting optimizations
    optimizePackageImports: [
      'react-icons', 
      'framer-motion', 
      'react-dom', 
      'recharts',
      'tsparticles',
      'react-tsparticles'
    ],
    // Improve middleware performance
    instrumentationHook: true,
    // Improved chunking strategy
    // Enable automatic page bundling and smarter code splitting
    largePageDataBytes: 128 * 1000, // 128kb
    // Reduce CSS render blocking with nextScriptWorkers
    nextScriptWorkers: true,
  },
  
  // Improved configuration for admin routes
  async rewrites() {
    return {
      beforeFiles: [
        // Ensure static files in /admin directory are properly served
        {
          source: '/admin/:path*',
          destination: '/admin/:path*',
          has: [
            {
              type: 'header',
              key: 'accept',
              value: '(.*text/html.*)',
            },
          ],
        },
      ],
      afterFiles: [
        // Fallback for /admin to go to the static admin page
        {
          source: '/admin',
          destination: '/admin/index.html',
        },
      ],
    };
  },
  
  // Configure headers for better security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Use more specific Cache-Control for HTML pages
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400', // 1 hour browser, 1 day CDN
          },
        ],
      },
      {
        source: '/(.*).(jpg|jpeg|png|webp|avif|ico|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Improve webpack configuration for faster builds and better performance
  webpack: (config, { dev, isServer }) => {
    // Fix for "Cannot read properties of undefined (reading 'call')" error
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // Optimize production builds
    if (!dev && !isServer) {
      // Enable advanced tree shaking
      config.optimization.usedExports = true;
      
      // Minimize bundle size
      config.optimization.minimize = true;
      
      // Improved chunk splitting strategies
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 30,
        maxAsyncRequests: 30,
        minSize: 20000, // 20kb min chunk size
        minChunks: 1,
        enforceSizeThreshold: 50000, // 50kb threshold for enforcing splitting
        cacheGroups: {
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|next|framer-motion)[\\/]/,
            priority: 40,
            chunks: 'all',
            enforce: true,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            minChunks: 2,
            chunks: 'async',
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `lib.${packageName.replace('@', '')}`;
            },
          },
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true,
          },
          // Dedicated chunk for charts & data visualization
          charts: {
            test: /[\\/]node_modules[\\/](recharts|d3|victory)[\\/]/,
            name: 'charts',
            priority: 30,
            chunks: 'async',
          },
          // Dedicated chunk for UI components
          ui: {
            test: /[\\/]components[\\/]ui[\\/]/,
            name: 'ui-components',
            priority: 15,
            chunks: 'async',
          },
        }
      };
      
      // Add TerserPlugin configuration for better minification
      config.optimization.minimizer = config.optimization.minimizer.map(minimizer => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          return Object.assign(minimizer, {
            options: {
              ...minimizer.options,
              terserOptions: {
                ...minimizer.options.terserOptions,
                compress: {
                  ...minimizer.options.terserOptions.compress,
                  drop_console: true,
                  drop_debugger: true,
                  pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
                },
                mangle: true,
                keep_classnames: false,
                keep_fnames: false,
              },
            },
          });
        }
        return minimizer;
      });
      
      // Add bundle analyzer when ANALYZE is true
      if (process.env.ANALYZE === 'true') {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 8888,
            openAnalyzer: true,
          })
        );
      }
    }

    return config;
  },
}

module.exports = nextConfig; 