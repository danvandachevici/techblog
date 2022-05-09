module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
      child_process: false
    };

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.unitapi.cloud/api/:path*',
      },
    ]
  },
};