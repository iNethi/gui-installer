const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { PythonShell } = require('python-shell')
const fs = require('fs');

function testConnection(event, data) {
  let pyshell = new PythonShell('./backend/playbooks/test_server_connection.py', {mode: 'text'});
  
  pyshell.send(JSON.stringify(data));

  pyshell.on('message', function(message) {
      win.send('startInstallation', message);
  });

  pyshell.end(function(err, code, signal) {
    var res = {
      'error': []
    };
    if (err) {
      res.error.push(err);
      throw err;
    }
    res.code = code;
    res.signal = signal;

    console.log('The exit code was: ' + code);
    console.log('The exit signal was: ' + signal);
    console.log('finished');

    win.send('startInstallation', JSON.stringify(res));
  });
}

function runInstallation(event, data, filename) {
    let pyshell = new PythonShell(`./backend/playbooks/${filename}.py`, {mode: 'text'});
    
    pyshell.send(JSON.stringify(data));

    pyshell.on('message', function(message) {
        win.send('startInstallation', message);
    });

    pyshell.end(function(err, code, signal) {
      var res = {
        'error': []
      };
      if (err) {
        res.error.push(err);
        throw err;
      }
      res.code = code;
      res.signal = signal;

      console.log('The exit code was: ' + code);
      console.log('The exit signal was: ' + signal);
      console.log('finished');

      win.send('startInstallation', JSON.stringify(res));
    });
}

function write_env_vars(filename, string) {
  try {
    fs.writeFileSync(`./backend/${filename}.env`, string, 'utf-8');
    return true
  } catch(e) {
    console.log(e);
    return false
  }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const createWindow = () => {
  win = new BrowserWindow({
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
    await sleep(200);
    // add call to test_server_connection.py here.
    credentials = JSON.parse(args);
    console.log(credentials);
    var res = write_env_vars('credentials', `CRED_IP_ADDRESS=${credentials.ip}\nCRED_USERNAME=${credentials.username}\nCRED_PASSWORD=${credentials.password}`);
    win.send('openConnection', res);
  })

  ipcMain.handle('saveConfig', async (event, args) => {
    await sleep(200);
    config = JSON.parse(args);
    console.log(config);
    var res = write_env_vars('config', `CONF_STORAGE_PATH=${config.storagepath}\nCONF_DOMAIN_NAME=${config.domainname}\nCONF_HTTPS=${config.https}\nCONF_MASTER_PASSWORD=${config.master}\n`);
    win.send('saveConfig', res);
  })

  ipcMain.handle('saveModuleSelection', async (event, args) => {
    await sleep(200);
    modules = JSON.parse(args);
    console.log(modules);
    var res = write_env_vars('modules', `MODS_DOCKER=${modules.docker}\nMODS_TRAEFIK=${modules.traefik}\nMODS_NGINX=${modules.nginx}\nMODS_KEYCLOAK=${modules.keycloak}\nMODS_NEXTCLOUD=${modules.nextcloud}\nMODS_JELLYFIN=${modules.jellyfin}\nMODS_WORDPRESS=${modules.wordpress}\nMODS_PEERTUBE=${modules.peertube}\nMODS_PAUM=${modules.paum}\nMODS_RADIUSDESK=${modules.radiusdesk}\n`);
    win.send('saveModuleSelection', res);
  })

  ipcMain.handle('startInstallation', async (event, args) => {
    console.log('Starting installation');
    const data = {
      'credentials': credentials,
      'config': config,
      'modules': modules
    }
    testConnection(event, data);
  })

  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})