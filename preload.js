const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('mainAPI', {
  openConnection: (data) => ipcRenderer.invoke('openConnection', data).then((result) => {
    window.postMessage(result)
  })
});