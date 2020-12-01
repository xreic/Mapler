/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process.
 * You can start electron renderer process from here and
 *  communicate with the other processes through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */

// Core
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { app, BrowserWindow } from 'electron';
// import { autoUpdater } from 'electron-updater';
import Store from 'electron-store';
import log from 'electron-log';
import path from 'path';
import { readdir } from 'fs';

// Helpers
import { getTemplate, updateAllChars } from './utils/getCharCode';
import {
  hasReset,
  nextResetDate,
  splitTime,
  triggerReset,
} from './utils/resetHelpers';
import { CHARACTERS, POSITION, TIMER } from './constants/variables';

// TODO: Figure out why Electron-store is saving config.js to "Electron" folder instead of "Mapler"
// Electron store
const store = new Store();

// export default class AppUpdater {
//   constructor() {
//     log.transports.file.level = 'info';
//     autoUpdater.logger = log;
//     autoUpdater.checkForUpdatesAndNotify();
//   }
// }

// Create default preferences on "first time start" (when config.json doesn't exist)
readdir(app.getPath('userData'), (err, files) => {
  if (files.indexOf('config.json') === -1) {
    store.set({
      // region: 0, // Default the region to GMS
      position: null,
      active: 0,
      characters: [getTemplate('DEFAULT CHARACTER', null)],
      deleting: [0],
    });
  }
});

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'resources')
    : path.join(__dirname, '../resources');

  const getAssetPath = (...paths) => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  /**
   * Start-up checks
   *  1. Check for updates for each character's image code
   *  2. Reset bosses and quests when reset has passed
   */
  await updateAllChars();
  if (hasReset()) {
    const chars = store.get(CHARACTERS);
    store.set(CHARACTERS, triggerReset(chars));
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: process.env.NODE_ENV === 'production' ? 350 : 1337,
    height: process.env.NODE_ENV === 'production' ? 367 : 1337,
    resizable: process.env.NODE_ENV !== 'production',
    icon: getAssetPath('icon.png'),
    webPreferences:
      (process.env.NODE_ENV === 'development' ||
        process.env.E2E_BUILD === 'true') &&
      process.env.ERB_SECURE !== 'true'
        ? {
            nodeIntegration: true,
          }
        : {
            preload: path.join(__dirname, 'dist/renderer.prod.js'),
          },
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  /**
   * Hide, show, set, etc
   *  1. Menu bar
   *  2. Dev Tools
   *  3. Move the window to the last closed position
   */
  process.env.NODE_ENV === 'production'
    ? mainWindow.setMenu(null)
    : mainWindow.webContents.openDevTools();

  const winPosition = store.get(POSITION);
  if (winPosition) mainWindow.setPosition(winPosition[0], winPosition[1]);

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('close', () => {
    store.set(TIMER, nextResetDate());
    store.set(POSITION, mainWindow.getPosition());
    mainWindow = null;
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

if (process.env.E2E_BUILD === 'true') {
  // eslint-disable-next-line promise/catch-or-return
  app.whenReady().then(createWindow);
} else {
  app.on('ready', createWindow);
}

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
