// Core
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

// Helpers
import { setContextMenu } from './Tray';

export const releaseInfo = {
  updateAvailable: false,
  status: 'Checking for update...',
};

autoUpdater.on('checking-for-update', () => {
  releaseInfo.status = 'Checking for update...';
  setContextMenu();
});

autoUpdater.on('update-available', () => {
  releaseInfo.updateAvailable = true;
  releaseInfo.status = 'Update available';
  setContextMenu();
});

autoUpdater.on('update-not-available', () => {
  releaseInfo.status = 'Mapler is up-to-date';
  setContextMenu();
});

autoUpdater.on('error', (e) => {
  releaseInfo.status = e;
  setContextMenu();
});

export const checkForUpdates = async () => {
  releaseInfo.updateAvailable = false;
  releaseInfo.status = 'Checking for update...';
  setContextMenu();

  try {
    await autoUpdater.checkForUpdates();
  } catch {
    // handled by event
  }
};
