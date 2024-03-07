/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");

const nextDataIndex = runtimeCaching.findIndex(
  (entry) => entry.options.cacheName === "next-data"
);
const startDataIndex = runtimeCaching.findIndex(
  (entry) => entry.options.cacheName === "start-url"
);

if (nextDataIndex !== -1) {
  runtimeCaching[nextDataIndex].handler = "NetworkOnly";
  runtimeCaching[startDataIndex].handler = "NetworkOnly";
} else {
  throw new Error("Failed to find next-data object in runtime caching");
}

const withPWA = require("next-pwa")({
  dest: "public",
  runtimeCaching,
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest.json$/],
  disable: false,
  cacheStartUrl: false,
  dynamicStartUrl: false,
});

const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const nextconfig = withPWA({
  reactStrictMode: false,
  transpilePackages: ["jotai-devtools"],
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

module.exports = withPlugins([[nextconfig], [withBundleAnalyzer]]);
