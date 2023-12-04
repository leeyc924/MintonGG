const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
};

module.exports = withPWA(nextConfig);
