/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

module.exports = withBundleAnalyzer({
  swcMinify: true,
  compiler: {
    styledComponents: true,
    removeConsole: {
      exclude: ["log"],
    },
  },
  images: {
    minimumCacheTTL: 31536000,
    formats: ["image/webp"],
    domains: ["static.upbit.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
});
