/** @type {import('next').NextConfig} */

module.exports = {
  swcMinify: true,
  compiler: {
    styledComponents: true,
    removeConsole: {
      exclude: ["log"],
    },
  },
  images: {
    domains: ["static.upbit.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
