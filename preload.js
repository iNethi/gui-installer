// const { contextBridge, ipcRenderer, BrowserWindow } = require('electron')

// contextBridge.exposeInMainWorld('mainAPI', {

//   openConnection: (data) => ipcRenderer.invoke('openConnection', data).then((result) => {
//     window.postMessage(result)
//   }),

//   saveConfig: (data) => ipcRenderer.invoke('saveConfig', data).then((result) => {
//     window.postMessage(result)
//   }),

//   saveModuleSelection: (data) => ipcRenderer.invoke('saveModuleSelection', data).then((result) => {
//     window.postMessage(result)
//   }),

//   startInstallation: (data) => ipcRenderer.invoke('startInstallation', data).then((result) => {
//     window.postMessage(result)
//   })

// });

// ipcRenderer.on('installationMessages', (event, message => {
//   console.log(message)
//   BrowserWindow.postMessage(message)
// }))

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    send: (channel, data) => ipcRenderer.invoke(channel, data),
    handle: (channel, callable, event, data) => ipcRenderer.on(channel, callable(event, data))
})