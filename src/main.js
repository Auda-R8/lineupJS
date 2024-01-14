const path = require('path')
const {Router} = require('./router/Router.js')
const {createDatabase} = require('./CreateDatabase.js')
const { app, BrowserWindow, ipcMain } = require('electron')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create database file.
  createDatabase().then(r => r)

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 1100,
    icon: 'assets/images/logo/logo.svg',
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.resolve(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // On release version
  // mainWindow.setMenu(null)
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow()

  ipcMain.handle('getDatabasePath', () => Router.getDatabasePath())
});

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
