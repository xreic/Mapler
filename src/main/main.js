// Dependencies
import { app, BrowserWindow, nativeTheme } from 'electron';
import Store from 'electron-store';
import { readdir } from 'fs';
import path from 'path';

// Helpers
import {
  getTemplate,
  updateAllChars,
} from '../renderer/components/utils/getCharCode';
import { splitTime } from '../renderer/components/utils/resetHelpers';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// Electron store
const store = new Store();

// Create default preferences on "first time start" (when config.json doesn't exist)
readdir(app.getPath('userData'), (err, files) => {
  if (files.indexOf('config.json') === -1) {
    store.set({
      position: null,
      active: 0,
      characters: [getTemplate('DEFAULT CHARACTER', null)],
      deleting: [0],
    });
  }
});

const createWindow = async () => {
  /**
   * Start-up checks
   *  1. Check for updates for each character's image code
   *  2. Reset bosses and quests when reset has passed
   */
  await updateAllChars();
  if (hasReset()) triggerReset();

  // Create the browser window
  let hideMenu = true;
  if (!!process.argv[2]) hideMenu = process.argv[2] === 'prod';

  const mainWindow = new BrowserWindow({
    width: hideMenu ? 350 : 1337,
    height: hideMenu ? 367 : 1337,
    resizable: !hideMenu,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
    },
    show: false,
  });

  // Configurations
  nativeTheme.themeSource = 'dark';
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  /**
   * Hide, show, set, etc
   *  1. Menu bar
   *  2. Dev Tools
   *  3. Move the window to the last closed position
   */
  hideMenu ? mainWindow.setMenu(null) : mainWindow.webContents.openDevTools();

  const winPosition = store.get('position');
  winPosition.length && mainWindow.setPosition(winPosition[0], winPosition[1]);

  /**
   * Event Listeners
   *  1. did-finish-load
   *      Shows the window when the DOM has been painted
   *  2. close
   *      Stores the position right before the program has been closed
   *      Sets the next reset date
   */
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
  });

  mainWindow.on('close', () => {
    store.set('timer', nextResetDate());
    store.set('position', mainWindow.getPosition());
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
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
const triggerReset = () => {
  const preResetChars = store.get('characters');
  const resetChars = [];

  const dayOfWeek = new Date().getUTCDay();

  for (let char of preResetChars) {
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

    resetChars.push(char);
  }

  store.set('characters', resetChars);
};

const hasReset = () => {
  const lastCheckedDate = store.get('timer');

  const now = new Date();
  const { year, month, date, hours, minutes } = splitTime(now);

  if (!lastCheckedDate) {
    store.set('timer', nextResetDate());
  } else {
    const nowUTC = new Date(Date.UTC(year, month, date, hours, minutes));
    if (nowUTC >= new Date(lastCheckedDate)) {
      store.set('timer', nextResetDate());
      return true;
    }
  }

  return false;
};

const nextResetDate = () => {
  const now = new Date();
  const { year, month, date } = splitTime(now);

  return new Date(Date.UTC(year, month, date + 1, 0));
};
