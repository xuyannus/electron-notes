const { ipcRenderer } = require('electron')

const textWin = document.getElementById("text-area-window")
let fontSize = 20

document.getElementById("button-plus").onclick = function (button) {
  textWin.style.fontSize = `${++fontSize}px`
  console.log({ "fontSize": fontSize })
}

document.getElementById("button-minus").onclick = function (button) {
  textWin.style.fontSize = `${--fontSize}px`
  console.log({ "fontSize": fontSize })
}

document.getElementById("button-save").onclick = function (button) {
  console.log(textWin.value)
  ipcRenderer.send('save', textWin.value)
}

ipcRenderer.on('saved', (event, status) => {
  if (status.toLowerCase() === "succeed") {
    textWin.style.backgroundColor = "#b2ff99"
  }

  setTimeout(function () {
    textWin.style.backgroundColor = ""
  }, 500)
})