const path = require('path');
const rules = require('./webpack.rules');

rules.push({
  loader: 'babel-loader',
  test: /\.js[x]?/,
  exclude: /node_modules/,
  options: {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      {
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-transform-async-to-generator',
          '@babel/plugin-transform-runtime',
        ],
      },
    ],
  },
});

const sourcePaths = (src) => {
  return path.join(__dirname, src);
};

module.exports = {
  mode: 'development',
  target: 'electron-renderer',
  devtool: 'source-map',
  module: {
    rules,
  },
  resolve: {
    alias: {
      '@main': sourcePaths('src/main'),
      '@renderer': sourcePaths('src/renderer'),
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.js', '.jsx', '.json'],
  },
};
