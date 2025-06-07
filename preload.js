const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('lumenAI', {
  ask: (prompt) => ipcRenderer.invoke('ask-ai', prompt)
});