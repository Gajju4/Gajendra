/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    minimumCacheTTL: 0,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Gajendra' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Gajendra' : '',
  generateEtags: false,
}

module.exports = nextConfig 