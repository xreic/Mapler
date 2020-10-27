// Dependencies
import { app, BrowserWindow, nativeTheme } from 'electron';
import Store from 'electron-store';
import path from 'path';
import fs from 'fs';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

// Create default preferences on "first time start" (when config.json doesn't exist)
fs.readdir(app.getPath('userData'), (err, files) => {
  const store = new Store();
  if (files.indexOf('config.json') === -1) {
    store.set({
      active: '',
      characters: [],
      deleting: [],
    });
  }
});

const createWindow = () => {
  const width = 325;
  const height = 367;

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width,
    height,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
    },
    show: false,
  });

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
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
