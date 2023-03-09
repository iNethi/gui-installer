const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openConnection: () => ipcRenderer.invoke('openConnection').then((result) => {
    window.postMessage(result)
  })
});