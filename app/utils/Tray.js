import { app, Tray, Menu, shell, nativeImage } from 'electron';
import path from 'path';
import { readdir } from 'fs';

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
  createContextMenu();
};

export const createContextMenu = () => {
  const contextMenu = Menu.buildFromTemplate([
    {
      // In development mode, this retrieves Electron's current version
      // In production mode, this will retrieve the app's current version
      label: `Version ${app.getVersion()}`,
      click: () => {
        shell.openExternal('https://github.com/xreic/Mapler/releases');
      },
    },
    // {
    //   label: 'Open data folder',
    //   click: async () => {
    //     const list = await readdir(app.getAppPath());
    //     console.log('Open data folder');
    //     console.log(list);

    //     await shell.showItemInFolder(path.join(app.getAppPath(), 'Mapler.exe'));
    //   },
    // },
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
