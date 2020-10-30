const fsPromises = require('fs').promises;
const path = require('path');
const moveFile = require('move-file');

module.exports = {
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'mapler',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  hooks: {
    packageAfterExtract: async () => {
      const srcPath = path.resolve(__dirname, '.webpack/renderer/');
      const destPath = path.resolve(__dirname, '.webpack/renderer/main_window');

      const files = await fsPromises.readdir(srcPath);
      const images = files.filter((file) => file.slice(-4) === 'webp');

      images.forEach((image) =>
        (async () => {
          await moveFile(
            path.resolve(__dirname, srcPath, image),
            path.resolve(__dirname, destPath, image),
          );
        })(),
      );
    },
  },
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './static/index.html',
              js: './src/renderer/renderer',
              name: 'main_window',
            },
          ],
        },
      },
    ],
  ],
};
