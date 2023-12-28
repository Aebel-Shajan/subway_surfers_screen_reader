const path = require('path');

module.exports = {
  entry: './src/serviceWorker.js', // Update this to the path to your serviceWorker.js
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'serviceWorker.bundle.js',
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
