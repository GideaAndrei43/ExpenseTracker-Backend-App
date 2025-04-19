const { default: autoprefixer } = require("autoprefixer");

module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),  // Use the Tailwind CSS package directly
    require('autoprefixer')  // Automatically adds vendor prefixes for better browser support
  ],
};
