import { app, shell, BrowserWindow, ipcMain, screen, session } from 'electron'
import { join, resolve } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import builderConfig from '../../electron-builder.yml'
import { registerWindowHandlers } from './handlers/window'

import { store } from './store'
import { fork } from 'child_process'

import { registerSearchHistoryHandlers } from './handlers/seach-history'
import { registerExtensionHandlers } from './handlers/extension'

function createWindow() {
  const savedState = store.get('windowState')

  const primaryDisplay = screen.getPrimaryDisplay()
  const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize

  if (savedState.x !== undefined && savedState.y !== undefined) {
    if (
      savedState.x >= screenWidth - 100 ||
      savedState.y >= screenHeight - 100 ||
      savedState.x + savedState.width < 0 ||
      savedState.y + savedState.height < 0
    ) {
      savedState.x = undefined
      savedState.y = undefined
    }
  }

  const apiPort = Number(process.env.VITE_API_PORT)

  const mainWindow = new BrowserWindow({
    ...savedState,
    show: false,
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true
    },
    titleBarStyle: 'hidden'
  })

  // Set Content Security Policy
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const csp = [
      "default-src 'self'",
      `connect-src 'self' http://localhost:${apiPort} ws://localhost:${apiPort}`,
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'"
    ].join('; ')

    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [csp]
      }
    })
  })

  if (savedState.isMaximized) {
    mainWindow.maximize()
  }
  const saveWindowState = () => {
    const bounds = mainWindow.getBounds()
    store.set('windowState', {
      ...bounds,
      isMaximized: mainWindow.isMaximized()
    })
  }

  let saveStateTimeout: NodeJS.Timeout
  const saveState = () => {
    if (saveStateTimeout) clearTimeout(saveStateTimeout)
    saveStateTimeout = setTimeout(saveWindowState, 500)
  }

  mainWindow.on('resize', saveState)
  mainWindow.on('move', saveState)
  mainWindow.on('close', saveWindowState)
  mainWindow.on('maximize', saveWindowState)
  mainWindow.on('unmaximize', saveWindowState)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

fork(resolve(__dirname, './web-api.js'))

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId(builderConfig.appId)

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  registerWindowHandlers()
  registerSearchHistoryHandlers()
  registerExtensionHandlers()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
