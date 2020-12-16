// Core
import { app, Tray, Menu, shell, nativeImage } from 'electron';
import log from 'electron-log';
import path from 'path';

// Helpers
import { triggerReset } from '../utils/Reset.js';
import { releaseInfo, checkForUpdates } from './Updater.js';

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
      label: `Version ${app.getVersion()}`,
      enabled: false,
    },
    {
      label:
        process.env.NODE_ENV === 'production' ? releaseInfo.status : 'Dev Mode',
      click: releasesClick,
      enabled: process.env.NODE_ENV === 'production',
    },
    { type: 'separator' },
    { label: 'Reset', click: triggerReset },
    { type: 'separator' },
    {
      label: 'Open Directories',
      submenu: [
        {
          label: 'Installation',
          click: async () => {
            try {
              await shell.openPath(
                path.join(
                  app.getAppPath(),
                  process.env.NODE_ENV === 'production' && '../..'
                )
              );
            } catch (err) {
              log.warn(err);
            }
          },
        },
        {
          label: 'App Data',
          click: async () => {
            try {
              await shell.openPath(app.getPath('userData'));
            } catch (err) {
              log.warn(err);
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

const releasesClick = async () => {
  try {
    if (releaseInfo.updateAvailable)
      await shell.openExternal('https://github.com/xreic/Mapler/releases');
    else if (releaseInfo.hasErrored)
      await shell.openPath(path.join(app.getPath('userData'), 'logs'));
    else checkForUpdates();
  } catch (err) {
    log.warn(err);
  }
};
