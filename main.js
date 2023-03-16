const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { PythonShell } = require('python-shell')

function startPython(event, data) {
    let pyshell = new PythonShell('install.py', {mode: 'text'});
    
    pyshell.send(data);

    pyshell.on('message', function (message, event) {
        console.log(message);
        event.sender.send('startInstallation', message)
    });

    pyshell.end(function (err, code, signal) {
        if (err) throw err;
        console.log('The exit code was: ' + code);
        console.log('The exit signal was: ' + signal);
        console.log('finished');
    });
}

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

var credentials, config, modules;

app.whenReady().then(() => {

  ipcMain.handle('openConnection', async (event, args) => {
    await sleep(1000);
    // add call to test_server_connection.py here.
    data = JSON.parse(args);
    console.log(data);
    credentials = data
    return true
  })

  ipcMain.handle('saveConfig', async (event, args) => {
    await sleep(1000);
    data = JSON.parse(args);
    console.log(data);
    config = data
    return true
  })

  ipcMain.handle('saveModuleSelection', async (event, args) => {
    await sleep(1000);
    data = JSON.parse(args);
    console.log(data);
    modules = data;
    return true
  })

  ipcMain.handle('startInstallation', async (event) => {
    console.log('Starting installation');
    const data = {
      'credentials': credentials,
      'config': config,
      'modules': modules
    }
    startPython(event, data);
    // event.sender.send('startInstallation', 1)
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