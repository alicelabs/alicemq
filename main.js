'use strict';
const { app, BrowserWindow } = require('electron');
const path = require('path');
let win;

////////////////////////////////////////

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      devTools: process.env.NODE_ENV === 'development',
      sandbox: true,
    },
  });
  win.maximize();
  win.loadFile('index.html');

  // Only open dev tools in development mode
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null;
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (win === null) createWindow();
});

// Wait for app to be ready before creating window
app.whenReady().then(() => {
  createWindow();
});

////////////////////////////////////////
