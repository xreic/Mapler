const path = require('path');
const rules = require('./webpack.rules');

const sourcePaths = (src) => {
  return path.join(__dirname, src);
};

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main/main.js',
  // Put your normal webpack config below here
  mode: 'development',
  devtool: 'source-map',
  target: 'electron-main',
  module: {
    rules,
  },
  resolve: {
    alias: {
      '@main': sourcePaths('src/main'),
      '@renderer': sourcePaths('src/renderer'),
    },
    extensions: ['.js', '.jsx', '.json'],
  },
};
