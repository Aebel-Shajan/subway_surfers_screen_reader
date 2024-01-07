const path = require('path');

module.exports = {
  entry:"./src/parseWebsite.js", // Update this to the path to your serviceWorker.js
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '../../parseWebsite.bundle.js'
  },
  mode: 'production',
};
