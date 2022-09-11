const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');

// // next.js configuration
// const nextConfig = {
//   // Reference a variable that was defined in the .env file and make it available at Build Time
// };

const nextConfig = {
  reactStrictMode: false,
};

// // module.exports = nextConfig
module.exports = withPlugins([withOptimizedImages], nextConfig);
