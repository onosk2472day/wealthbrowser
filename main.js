const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const Store = require('electron-store')
const { appConfig } = require('./config')
const store = new Store()

class BrowserApp {
  constructor() {
    this.mainWindow = null
    this.store = store
    this.init()
  }

  init() {
    app.whenReady().then(() => {
      this.createWindow()
      this.setupIPC()
      
      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          this.createWindow()
        }
      })
    })

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
  }

  createWindow() {
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
        webviewTag: true
      }
    })

    this.mainWindow.loadFile('index.html')
    
    // Set user agent for mobile view
    this.mainWindow.webContents.setUserAgent(appConfig.userAgent)
  }

  setupIPC() {
    // File downloads
    ipcMain.handle('download-file', async (event, url, filename) => {
      // Implement Android-specific download logic
    })

    // Android sharing
    ipcMain.handle('share', async (event, data) => {
      // Implement Android share intent
    })

    // Storage
    ipcMain.handle('get-data', async (event, key) => {
      return this.store.get(key)
    })

    ipcMain.handle('set-data', async (event, key, value) => {
      this.store.set(key, value)
    })

    // Platform detection
    ipcMain.handle('is-android', () => {
      return process.platform === 'android'
    })
  }
}

new BrowserApp()// JavaScript Document