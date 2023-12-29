const path = require('path');

module.exports = {
  entry:"./src/content-script.js", // Update this to the path to your serviceWorker.js
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '../../content-script.bundle.js'
  },
	
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  mode: 'production',
};
