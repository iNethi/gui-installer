const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('mainAPI', {

  openConnection: (data) => ipcRenderer.invoke('openConnection', data).then((result) => {
    window.postMessage(result)
  }),

  saveConfig: (data) => ipcRenderer.invoke('saveConfig', data).then((result) => {
    window.postMessage(result)
  }),

  saveModuleSelection: (data) => ipcRenderer.invoke('saveModuleSelection', data).then((result) => {
    window.postMessage(result)
  }),

  startInstallation: () => ipcRenderer.invoke('startInstallation', data).then((result) => {
    window.postMessage(result)
  })

});