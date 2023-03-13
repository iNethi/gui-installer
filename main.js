const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.loadFile('inethi/front/index.html')
}

app.whenReady().then(() => {

  ipcMain.handle('openConnection', async (event, args) => {
    await sleep(1000);
    data = JSON.parse(args);
    console.log(data);
    return true
  })

  ipcMain.handle('saveConfig', async (event, args) => {
    await sleep(1000);
    data = JSON.parse(args);
    console.log(data);
    return true
  })

  ipcMain.handle('saveModuleSelection', async (event, args) => {
    await sleep(1000);
    data = JSON.parse(args);
    console.log(data);
    return true
  })

  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})