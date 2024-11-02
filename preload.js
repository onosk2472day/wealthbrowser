const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('androidAPI', {
  // File system operations
  downloadFile: (url, filename) => ipcRenderer.invoke('download-file', url, filename),
  saveToDownloads: (data, filename) => ipcRenderer.invoke('save-to-downloads', data, filename),
  
  // Android specific features
  share: (data) => ipcRenderer.invoke('share', data),
  vibrate: (pattern) => ipcRenderer.invoke('vibrate', pattern),
  showToast: (message) => ipcRenderer.invoke('show-toast', message),
  
  // Platform detection
  isAndroid: () => ipcRenderer.invoke('is-android'),
  
  // Storage
  getData: (key) => ipcRenderer.invoke('get-data', key),
  setData: (key, value) => ipcRenderer.invoke('set-data', key, value)
})// JavaScript Document