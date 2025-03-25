import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['builder-calc.com'], // Указываем домен
    loader: 'custom',
    path: '', // Оставляем пустым, чтобы не добавлять /_next/image?
  },
};

export default nextConfig;
