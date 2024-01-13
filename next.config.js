/** @type {import('next').NextConfig} */

module.exports = {
  // build: {
  //   transpile: ["axios"],
  // },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
