const electron = require('electron')
const { app, BrowserWindow, ipcMain, dialog } = electron;
const fs = require('fs');

let filePath = undefined
let window = undefined

app.on('ready', () => {
  window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  })
  window.loadFile('index.html')
})

ipcMain.on('save', (event, arg) => {
  if (filePath === undefined) {
    dialog.showSaveDialog(window, { defaultPath: 'filename.txt' }, (fullPath) => {
      if (fullPath) {
        filePath = fullPath
        saveTextToFile(arg, filePath)
      }
    })
  } else {
    saveTextToFile(arg, filePath)
  }
})

function saveTextToFile(text, tempPath) {
  fs.writeFile(tempPath, text, (err) => {
    if (err) console.console.log(("there is error:", err))
    window.webContents.send('saved', 'succeed')
  })
}