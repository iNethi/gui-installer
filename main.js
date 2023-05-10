const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { PythonShell } = require('python-shell')
const fs = require('fs');
var sudo = require('sudo-prompt');
var lock = false;
var abort = false;
var num_installed;
var num_modules_selected = 100;

function runCommand(command) {
  var options = {
    name: 'iNethi',
    icns: path.join(__dirname, 'inethi/front/assets/images/icon/icon.icns')
  };
  sudo.exec(command, options,
    function(error, stdout, stderr) {
      if (error) {
        var res = { 'code': 1, 'error': error };
        console.log(error);
        throw error;
      } else {
        var res = { 'code': 0 };
        console.log(stdout);
      }
      win.webContents.send('checkRequirements', JSON.stringify(res));
    }
  );
}

function runMacCommand(command) {
  require('child_process').execSync(command, {stdio: 'inherit'}, (error, stdout, stderr) => {
    if (error) {
      console.error(`${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`${stderr}`);
      return;
    }
    console.log(`${stdout}`);
  });
}

async function installModule(channel, filename, progress_bar) {
  while (lock) {
    await sleep(1000);
  }
  if (abort) {
    win.webContents.send(channel, `Installation of ${filename} aborted`);
    return;
  }
  win.webContents.send(channel, `Starting installation of ${filename}`);
  lock = true;
  let pyshell = new PythonShell(path.join(__dirname, 'backend/playbooks/start_playbook.py'), { mode: 'text' });

  pyshell.send(`${app.getPath("userData")}===${filename}`);

  pyshell.on('message', function (message) {
    win.webContents.send(channel, message);
  });

  pyshell.end(function (err, code, signal) {
    var res = { 'code': code };
    if (err) { res.error = err.message; }
    win.webContents.send(channel, JSON.stringify(res));
    if (res.code != 0) {

      // UNCOMMENT THIS FOR NORMAL OPERATION

      console.log('Installation failed');
      abort = true;
      win.webContents.send('installAbort', abort)

      // REMOVE LINES BELOW FOR NORMAL OPERATION

      // num_installed += 1;
      // win.webContents.send('progressUpdate', progress_bar)

    } else {
      num_installed += 1;
      win.webContents.send('progressUpdate', progress_bar)
    }
    if (num_installed == num_modules_selected) {
      console.log('Installation successful');
      win.webContents.send('installComplete', (num_installed == num_modules_selected));
    }
    lock = false;
    return;
  });
}

function runInstallation(data) {
  num_installed = 0;
  var progress_bar = 0;
  // if (data.modules.paum_args) {
  //    delete data.modules.paum_args
  // }

  // PAUM_ARGS VERWIJDEREN UIT MODULES VOOR PERCENTAGE

  num_modules_selected = Object.entries(data['modules']).reduce((acc, [key, value]) => {
    return acc + (value ? 1 : 0);
  }, 0);
  var increment = Math.round((100 / num_modules_selected) * 10) / 10;

  progress_bar += increment;
  installModule('startInstallation', 'system_requirements', progress_bar);

  progress_bar += increment;
  installModule('startInstallation', 'traefik_ssl', progress_bar);

  Object.entries(data['modules']).forEach(async ([module, selected]) => {
    if (selected && module != "docker" && module != "traefik") {
      try {
        progress_bar += increment;
        installModule('startInstallation', module, progress_bar)
      } catch (error) {
        console.log(`There is no installation script for ${module} yet.`)
      }
    }
  })
};

function writeEnvVars(filename, string) {
  try {
    fs.writeFileSync(`${app.getPath("userData")}/${filename}.env`, string, 'utf-8');
    return true
  } catch (e) {
    console.log(e);
    return false
  }
}

function writeYamlVars(filename, string) {
  try {
    fs.writeFileSync(`${app.getPath("userData")}/${filename}.yml`, string, 'utf-8');
    return true
  } catch (e) {
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
      nodeIntegration: true
    },
    icon: path.join(__dirname, 'inethi/front/assets/images/icon/icon.icns')
  })
  win.loadFile('inethi/front/index.html')
  // win.webContents.on('did-finish-load', () => {
  //   win.webContents.openDevTools()
  //   win.webContents.send('testMessages', 'I am alive!');
  // });
}

var credentials, config, modules;

app.whenReady().then(() => {

  createWindow()

  ipcMain.handle('checkRequirements', async (event, args) => {
    console.log('Checking requirements...');
    if (process.platform === 'darwin') {
      console.log("I'm a stupid MAC");
      await sleep(5000);
      var res = { 'code': 0 };
      win.webContents.send('checkRequirements', JSON.stringify(res));
      // runMacCommand(`osascript -e 'do shell script "${path.join(__dirname, './preinstallation.sh')}" with administrator privileges'`);
    } else if (process.platform === 'win32') {
      console.log('Windows is not yet supported for automated requirements installation. Please install python3, pip3, ansible, ansible-runner (python library) and sshpass manually.')
    } else {
      runCommand(`${path.join(__dirname, './preinstallation.sh')}`)
    }
  });

  ipcMain.handle('openConnection', async (event, args) => {
    abort = false;
    credentials = JSON.parse(args);
    console.log(credentials);
    var res = writeEnvVars('credentials', `[LOCAL_SERVER]\nCRED_IP_ADDRESS=${credentials.ip}\nCRED_USERNAME=${credentials.username}\nCRED_PASSWORD=${credentials.password}`);
    if (res) {
      console.log('Trying to connect to remote host...');
      installModule('openConnection', 'test_server_connection');
    }
  })

  ipcMain.handle('saveConfig', async (event, args) => {
    await sleep(1000);
    config = JSON.parse(args);
    console.log(config);
    var res = writeYamlVars('config', `CONF_STORAGE_PATH: ${config.storagepath}\nCONF_DOMAIN_NAME: ${config.domainname}\nCONF_HTTPS: ${config.https}\nCONF_MASTER_PASSWORD: ${config.master}\n`);
    win.webContents.send('saveConfig', res);
  })

  ipcMain.handle('saveModuleSelection', async (event, args) => {
    await sleep(1000);
    modules = JSON.parse(args);
    console.log(modules);
    var res = writeEnvVars('modules', `MODS_DOCKER=${modules.docker}\nMODS_TRAEFIK=${modules.traefik}\nMODS_NGINX=${modules.nginx}\nMODS_KEYCLOAK=${modules.keycloak}\nMODS_NEXTCLOUD=${modules.nextcloud}\nMODS_JELLYFIN=${modules.jellyfin}\nMODS_WORDPRESS=${modules.wordpress}\nMODS_PEERTUBE=${modules.peertube}\nMODS_PAUM=${modules.paum}\nMODS_RADIUSDESK=${modules.radiusdesk}\nMODS_AZURACAST=${modules.azuracast}\n`);
    if (modules.paum && res) {
      res = writeEnvVars('paum', `PAUM_LIMIT_RESET=${modules.paum_args.limit_reset}\nPAUM_USAGE_LIMIT=${modules.paum_args.usage_limit}\nPAUM_COST_30=${modules.paum_args.cost_30}\nPAUM_COST_60=${modules.paum_args.cost_60}\nPAUM_COST_24=${modules.paum_args.cost_24}\nPAUM_COST_1GB=${modules.paum_args.cost_1gb}\n`);
    }
    win.webContents.send('saveModuleSelection', res);
  })

  ipcMain.handle('startInstallation', async (event, args) => {
    console.log('Starting installation');
    var data = {
      'credentials': credentials,
      'config': config,
      'modules': modules
    }
    abort = false;
    runInstallation(data);
  })

  ipcMain.handle('restartApp', async (event, args) => {
    console.log('Restarting installer');
    app.relaunch();
    app.exit();
  })

  ipcMain.handle('quitApp', async (event, args) => {
    console.log('Closing installer, see ya!');
    app.quit();
  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})