import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['builder-calc.com'],
    loader: 'custom',
    path: '', // Leave it empty so as not to add /_next/image?
  },
}

export default nextConfig
