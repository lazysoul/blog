const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Your ESLint options here
    ignoreDuringBuilds: false,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  
  // 웹팩 설정
  webpack: (config) => {
    // 캐시 완전히 비활성화
    config.cache = false;
    
    return config;
  },
  
  // 이미지 최적화 설정 (필요한 경우)
  images: {
    domains: [],
  },
  
  // 개발 서버 설정
  devIndicators: {
    buildActivity: true,
  },
};

module.exports = nextConfig;
