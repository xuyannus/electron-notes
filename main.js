const electron = require('electron')
const { app, BrowserWindow, ipcMain, dialog, Menu } = electron;
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
  console.log(text)

  fs.writeFile(tempPath, text, (err) => {
    if (err) console.console.log(("there is error:", err))
    window.webContents.send('saved', 'succeed')
  })
}

const menuItems = [
  // { role: 'appMenu' }
  ...(process.platform === 'darwin' ? [{
    label: app.getName(),
    submenu: [
      { role: 'about' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      {
        label: "Save",
        accelerator: "CmdOrCtrl+S",
        click() { window.webContents.send('save-clicked') }
      }
    ]
  },
  { role: 'editMenu' },
  { role: 'viewMenu' }
]

const noteMenu = Menu.buildFromTemplate(menuItems)
Menu.setApplicationMenu(noteMenu)
