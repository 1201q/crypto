/** @type {import('next').NextConfig} */

let runtimeCaching = require("next-pwa/cache");

runtimeCaching.unshift({
  // MUST be the same as "start_url" in manifest.json
  urlPattern: "/",
  // use NetworkFirst or NetworkOnly if you redirect un-authenticated user to login page
  // use StaleWhileRevalidate if you want to prompt user to reload when new version available
  handler: "NetworkOnly",
  options: {
    // don't change cache name
    cacheName: "start-url",
    expiration: {
      maxEntries: 1,
      maxAgeSeconds: 24 * 60 * 60, // 24 hours
    },
  },
});

const othersDataIndex = runtimeCaching.findIndex(
  (entry) => entry.options.cacheName === "others"
);
const nextDataIndex = runtimeCaching.findIndex(
  (entry) => entry.options.cacheName === "next-data"
);

if (othersDataIndex !== -1) {
  runtimeCaching[othersDataIndex] = {
    urlPattern: ({ url }) => {
      const isSameOrigin = self.origin === url.origin;
      if (!isSameOrigin) return false;
      const pathname = url.pathname;
      if (pathname.startsWith("/api/")) return false;
      return true;
    },
    handler: "NetworkOnly",
    options: {
      cacheName: "others",
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
    },
  };
} else {
  throw new Error("Failed to find others object in runtime caching");
}

if (nextDataIndex !== -1) {
  runtimeCaching[nextDataIndex].handler = "NetworkOnly";
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
  experimental: {
    scrollRestoration: true,
  },
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
