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
import Store from 'electron-store';
import path from 'path';

// Helpers
import { createTray } from './utils/Tray.js';
import { checkForUpdates } from './utils/Updater.js';
import { updateAllChars } from './utils/getCharCode.js';
import { hasReset, nextResetDate, triggerReset } from './utils/Reset.js';

// Constants
import { defaultStore, validateConfig } from './utils/LocalStore.js';
import { POSITION, TIMER, ACTIVE } from './constants/variables.js';

// Electron store
const store = new Store();

// Create default preferences on "first time start" (when config.json doesn't exist)
if (store.get(ACTIVE) === null || store.get(ACTIVE) === undefined) {
  store.set(defaultStore);
} else {
  validateConfig();
}

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
} else if (
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
            enableRemoteModule: true,
            nodeIntegration: true,
          }
        : {
            enableRemoteModule: true,
            preload: path.join(__dirname, 'dist/renderer.prod.js'),
          },
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  /**
   * Window setting
   *  1. Menu bar
   *  2. Dev Tools
   *  3. Move the window to the last closed position
   */
  process.env.NODE_ENV === 'production'
    ? mainWindow.removeMenu()
    : mainWindow.webContents.openDevTools();

  const winPosition = store.get(POSITION);
  if (winPosition) mainWindow.setPosition(winPosition[0], winPosition[1]);

  /**
   * Character and task checks
   *  1. Reset bosses and quests when reset has passed
   *  2. Check if user's current config.json is up-to-date
   *  3. Check for updates for each character's image code
   */
  if (hasReset()) triggerReset();
  await updateAllChars();

  // Event handlers for program window
  mainWindow.webContents.on('did-finish-load', async () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }

    createTray();
    await checkForUpdates();
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('close', async () => {
    await mainWindow.webContents.session.clearCache();
    mainWindow = null;
  });

  mainWindow.on('moved', () => {
    store.set(POSITION, mainWindow.getPosition());
  });
};

app.on('window-all-closed', () => {
  store.set(TIMER, nextResetDate());

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
