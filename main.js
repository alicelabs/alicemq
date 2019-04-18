'use strict'
const { app, BrowserWindow } = require('electron');
const path = require('path');
let win;

////////////////////////////////////////

function createWindow (){
  win = new BrowserWindow({
    width: 800, 
    height: 600,
    webPreferences: {
      devTools: false,
    },
  })
  win.maximize();
  win.loadFile('index.html');
  win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  })
}

app.on('window-all-close', () => {
  if (process.platform !== 'darwin') app.quit();
})

app.on('activate', () => {
  if (win === null) createWindow();
})

app.on('ready', createWindow)


////////////////////////////////////////

function getData (uri){
  
}