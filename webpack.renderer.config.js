const path = require('path');
const rules = require('./webpack.rules');

const sourcePaths = (src) => path.join(__dirname, src);

module.exports = {
  mode: 'development',
  target: 'electron-renderer',
  devtool: 'source-map',
  module: {
    rules: [
      ...rules,
      {
        loader: 'babel-loader',
        test: /\.js[x]?/,
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-react',
            {
              plugins: ['@babel/plugin-transform-runtime'],
            },
          ],
        },
      },
    ],
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
