const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('dotenv').config();

function createWindow() {
  const win = new BrowserWindow({
    width: 1080,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    },
    icon: path.join(__dirname, 'lumen-logo.ico')
  });
  win.loadFile('lumen.html');
}

const { getAIResponse } = require('./api.js');

ipcMain.handle('ask-ai', async (event, prompt) => {
  const response = await getAIResponse(prompt);
  return response;
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});