const { app, BrowserWindow, nativeTheme } = require('electron')
const url = require('url')
const path = require('path')
const { ipcMain } = require('electron')
const fs = require('fs');
nativeTheme.themeSource = 'dark';
let win
function createWindow() {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true,
            webSecurity: false,
            pageVisibility: true,
            backgroundThrottling: false
        },
        frame: false,
        fullscreen: true,
        webSecurity: false,
        backgroundColor: "black"
    })
    win.removeMenu()
    win.openDevTools()
    win.webContents.session.webRequest.onHeadersReceived({ urls: ["*://*/*"] },
        (d, c) => {
            if (d.responseHeaders['X-Frame-Options']) { delete d.responseHeaders['X-Frame-Options']; } else if (d.responseHeaders['x-frame-options']) { delete d.responseHeaders['x-frame-options']; }
            c({ cancel: false, responseHeaders: d.responseHeaders });
        }
    );
    win.loadURL(path.resolve("index.html"))
    win.setBackgroundColor('black')
}
app.on('ready', createWindow)
const testFolder = 'apps';
ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.reply('asynchronous-reply', 'pong')
})
ipcMain.on('synchronous-message', (event, arg) => {
    var answer
    var command = arg[0]
    if (command = "GetMousePos") { answer = robot.getMousePos() }
    event.returnValue = answer
})