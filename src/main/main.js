// Dependencies
import { app, BrowserWindow, nativeTheme } from 'electron';
import Store from 'electron-store';
import fs from 'fs';
import path from 'path';

// Helpers
import {
  getCharCode,
  getTemplate,
} from '../renderer/components/utils/getCharCode';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

// Electron store
const store = new Store();

// Create default preferences on "first time start" (when config.json doesn't exist)
fs.readdir(app.getPath('userData'), (err, files) => {
  if (files.indexOf('config.json') === -1) {
    store.set({
      active: 0,
      characters: [getTemplate('DEFAULT CHARACTER', null)],
      deleting: [0],
      timer: new Date(),
    });
  }
});

const createWindow = () => {
  /**
   * Start-up checks
   *  1. Check for updates for each character's image code
   *  2. Reset bosses and quests when reset has passed
   */
  updateAllChars();
  if (hasReset()) triggerReset();

  const hideMenu = false;

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 350,
    height: hideMenu ? 377 : 397,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
    },
    show: false,
  });

  hideMenu && mainWindow.setMenu(null);

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Configurations
  nativeTheme.themeSource = 'light';

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
  store.set('timer', new Date());
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
const updateAllChars = async () => {
  const error = 'Invalid Character Name';
  const updateRequests = [];

  let chars = store.get('characters');
  for (let char of chars) updateRequests.push(await getCharCode(char.name));

  const newCodes = await Promise.all(updateRequests);

  chars = chars.map((char, index) => {
    if (newCodes[index] && newCodes[index] !== error)
      char.code = newCodes[index];

    return char;
  });

  store.set('characters', chars);
};

const triggerReset = () => {
  const characters = store.get('characters');
  const tempCharStore = [];

  const dayOfWeek = new Date().getUTCDay();

  for (let char of characters) {
    // Reset daily bosses
    char.bosses.daily = char.bosses.daily.map((value) =>
      value === 1 ? 0 : value,
    );

    // Reset arcane river dailies
    char.quests.arcane = char.quests.arcane.map((value) =>
      value === 1 ? 0 : value,
    );

    // Reset ALL maple world quests
    if (dayOfWeek === 1) {
      char.quests.maple = char.quests.maple.map((value) =>
        value === 1 ? 0 : value,
      );
    } else {
      // Reset daily maple world quests
      char.quests.maple = char.quests.maple.map((value, index) =>
        value === 1 && index < 9 ? 0 : value,
      );
    }

    // Reset weekly bosses
    if (dayOfWeek === 4) {
      char.bosses.weekly = char.bosses.weekly.map((value) =>
        value === 1 ? 0 : value,
      );
    }

    tempCharStore.push(char);
  }

  store.set('characters', tempCharStore);
};

const hasReset = () => {
  const lastCheckedDate = new Date(store.get('timer'));

  const year = lastCheckedDate.getUTCFullYear();
  const month = lastCheckedDate.getUTCMonth();
  const date = lastCheckedDate.getUTCDate();

  const launchResetTime = new Date(Date.UTC(year, month, date, 0));

  return new Date() > launchResetTime;
};
