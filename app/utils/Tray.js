// Core
import { app, Tray, Menu, shell, nativeImage } from 'electron';
import log from 'electron-log';
import path from 'path';

// Helpers
import { releaseInfo, checkForUpdates } from './Updater.js';
import { triggerReset } from '../utils/Reset.js';
import { updateConfig } from '../utils/LocalStore.js';

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
  let devCM = [];
  if (process.env.NODE_ENV !== 'production')
    devCM = [{ label: 'Reset', click: triggerReset }, { type: 'separator' }];

  const contextMenu = Menu.buildFromTemplate([
    ...verSection,
    ...dirSection,
    ...devCM,
    {
      label: 'Quit',
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
};

// Version section of the tray's context menu
const verSection = [
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
  { label: 'Update Config', click: updateConfig },
  { type: 'separator' },
];

// Directories section of the tray's context menu
const dirSection = [
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
];

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
