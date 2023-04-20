const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { PythonShell } = require('python-shell')
const fs = require('fs');
var lock = false;
var abort = false;
var num_installed;
var num_modules_selected = 100;

async function installModule(channel, filename, progress_bar) {
  while (lock) {
    await sleep(1000);
  }
  if (abort) {
    win.send(channel, `Installation of ${filename} aborted`);
    return;
  }
  win.send(channel, `Starting installation of ${filename}`);
  lock = true;
  let pyshell = new PythonShell(`./backend/playbooks/start_playbook.py`, { mode: 'text' });

  pyshell.send(filename);

  pyshell.on('message', function (message) {
    win.send(channel, message);
  });

  pyshell.end(function (err, code, signal) {
    var res = { 'code': code };
    if (err) { res.error = err.message; }
    win.send(channel, JSON.stringify(res));
    if (res.code != 0) {

      // UNCOMMENT THIS FOR NORMAL OPERATION

      // console.log('Installation failed');
      // abort = true;
      // win.send('installAbort', abort)

      // REMOVE LINES BELOW FOR NORMAL OPERATION

      num_installed += 1;
      win.send('progressUpdate', progress_bar)

    } else {
      num_installed += 1;
      win.send('progressUpdate', progress_bar)
    }
    if (num_installed == num_modules_selected) {
      console.log('Installation successful');
      win.send('installComplete', (num_installed == num_modules_selected));
    }
    lock = false;
    return;
  });
}

function runInstallation(data) {
  num_installed = 0;
  var progress_bar = 0;
  // if (data.modules.paum_args) {
  //   // delete 
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
    fs.writeFileSync(`./backend/${filename}.env`, string, 'utf-8');
    return true
  } catch (e) {
    console.log(e);
    return false
  }
}

function writeYamlVars(filename, string) {
  try {
    fs.writeFileSync(`./backend/${filename}.yml`, string, 'utf-8');
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
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'inethi/front/assets/images/icon/icon.icns')
  })
  win.loadFile('inethi/front/index.html')
}

var credentials, config, modules;

app.whenReady().then(() => {

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
    win.send('saveConfig', res);
  })

  ipcMain.handle('saveModuleSelection', async (event, args) => {
    await sleep(1000);
    modules = JSON.parse(args);
    console.log(modules);
    var res = writeEnvVars('modules', `MODS_DOCKER=${modules.docker}\nMODS_TRAEFIK=${modules.traefik}\nMODS_NGINX=${modules.nginx}\nMODS_KEYCLOAK=${modules.keycloak}\nMODS_NEXTCLOUD=${modules.nextcloud}\nMODS_JELLYFIN=${modules.jellyfin}\nMODS_WORDPRESS=${modules.wordpress}\nMODS_PEERTUBE=${modules.peertube}\nMODS_PAUM=${modules.paum}\nMODS_RADIUSDESK=${modules.radiusdesk}\n`);
    if (modules.paum && res) {
      res = writeEnvVars('paum', `PAUM_LIMIT_RESET=${modules.paum_args.limit_reset}\nPAUM_USAGE_LIMIT=${modules.paum_args.usage_limit}\nPAUM_COST_30=${modules.paum_args.cost_30}\nPAUM_COST_60=${modules.paum_args.cost_60}\nPAUM_COST_24=${modules.paum_args.cost_24}\nPAUM_COST_1GB=${modules.paum_args.cost_1gb}\n`);
    }
    win.send('saveModuleSelection', res);
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

  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})