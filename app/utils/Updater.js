// Core
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

// Helpers
import { setContextMenu } from './Tray';

export const releaseInfo = {
  updateAvailable: false,
  hasErrored: false,
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
  log.warn(e);
  releaseInfo.hasErrored = true;
  releaseInfo.status = 'Click for error logs';
  setContextMenu();
});

export const checkForUpdates = async () => {
  // Reset
  releaseInfo.updateAvailable = false;
  releaseInfo.hasErrored = false;
  releaseInfo.status = 'Checking for update...';
  setContextMenu();

  try {
    await autoUpdater.checkForUpdates();
  } catch {
    // handled by event
  }
};
