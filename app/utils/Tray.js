// Core
import { app, Tray, Menu, shell, nativeImage } from 'electron';
import path from 'path';

// Helpers
import { releaseInfo, checkForUpdates } from './Updater';

let tray;

export const createTray = () => {
  const baseDir =
    process.env.NODE_ENV === 'production' ? `./images/` : `../images/`;

  tray = new Tray(
    nativeImage.createFromPath(
      path.join(
        __dirname,
        baseDir,
        `icon.${process.platform === 'win32' ? 'ico' : 'png'}`
      )
    )
  );

  tray.setToolTip('Mapler');
  setContextMenu();
};

export const setContextMenu = () => {
  const contextMenu = Menu.buildFromTemplate([
    {
      // In development mode, this retrieves Electron's current version
      // In production mode, this will retrieve the app's current version
      // Version ${app.getVersion()}
      label: `Version ${app.getVersion()}`,
      enabled: false,
    },
    {
      label: `${releaseInfo.status}`,
      click: releaseInfo.updateAvailable
        ? () => {
            shell.openExternal('https://github.com/xreic/Mapler/releases');
          }
        : checkForUpdates,
    },
    { type: 'separator' },
    {
      label: 'Open Directories',
      submenu: [
        {
          label: 'Installation',
          click: async () => {
            const dir = path.join(
              app.getAppPath(),
              process.env.NODE_ENV === 'production' && '../..'
            );

            try {
              await shell.openPath(dir);
            } catch (err) {
              // console.error('Open Directories - Installation');
              // console.error(err);
            }
          },
        },
        {
          label: 'App Data',
          click: async () => {
            const dir = app.getPath('userData');
            try {
              await shell.openPath(dir);
            } catch (err) {
              // console.error('Open Directories - App Data');
              // console.error(err);
            }
          },
        },
      ],
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
};
