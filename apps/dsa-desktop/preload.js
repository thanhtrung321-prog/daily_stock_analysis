const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('dsaDesktop', {
  version: '0.1.0',
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
});
