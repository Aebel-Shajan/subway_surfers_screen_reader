const path = require('path');

module.exports = {
  entry:"./node_modules/@mozilla/readability/Readability.js", // Update this to the path to your serviceWorker.js
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
		library: 'Readability',
	  libraryTarget: 'var'
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
