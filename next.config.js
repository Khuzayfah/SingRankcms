/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year for better caching
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
    'react-icons': {
      transform: 'react-icons/{{member}}',
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
    // Code splitting optimizations
    optimizePackageImports: ['react-icons', 'framer-motion', 'react-dom'],
    // Improve middleware performance
    instrumentationHook: true,
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
      // Enable tree shaking
      config.optimization.usedExports = true;
      
      // Minimize bundle size
      config.optimization.minimize = true;
      
      // Improve chunk splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
      };
    }
    
    return config;
  },
}

module.exports = nextConfig; 