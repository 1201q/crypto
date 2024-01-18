/** @type {import('next').NextConfig} */

module.exports = {
  compiler: {
    styledComponents: true,
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
