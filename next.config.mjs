/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compressão gzip/brotli das respostas
  compress: true,

  // Otimiza tree-shaking de pacotes pesados automaticamente
  experimental: {
    optimizePackageImports: ['date-fns', 'cheerio'],
  },

  images: {
    // Formatos modernos em ordem de preferência
    formats: ['image/avif', 'image/webp'],

    // Cache de imagens otimizadas por 7 dias
    minimumCacheTTL: 604800,

    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'live.staticflickr.com' },
      { protocol: 'https', hostname: 'pantheonsite.io' },
      { protocol: 'https', hostname: '**.wordpress.com' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'secure.gravatar.com' },
      { protocol: 'https', hostname: 'cdn.brasil247.com' },
    ],
  },

  // Cabeçalhos de segurança e cache
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        // Cache longo para assets estáticos
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
