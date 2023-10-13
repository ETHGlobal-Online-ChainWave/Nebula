const withTwin = require("./withTwin");
/** @type {import('next').NextConfig} */
const nextConfig = withTwin({
  output: "standalone",
  experimental: {
    esmExternals: "loose",
  },
});

module.exports = nextConfig;
