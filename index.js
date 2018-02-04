'use strict';
const pkg = require('./package.json');
const electron = require('electron');
// import url  from 'url';
// import path from 'path';
const url  = require('url');
const path  = require('path');
const {app, BrowserWindow, Menu, ipcMain, ipcRenderer} = electron;


let isDevelopment = true;

if (isDevelopment) {
    require('electron-reload')(__dirname, {
        ignored: /node_modules|[\/\\]\./
    });
}


var mainWnd = null;

function createMainWnd() {
    mainWnd = new BrowserWindow({
        width: 1400,
        height: 800,
        frame:true,
        icon:path.join(__dirname,'./build/favicon.ico'),
        movable:true,
        resizable:false,
        hasShadow :true,
    });

    if (isDevelopment) {
        mainWnd.webContents.openDevTools();
    }
if(pkg.DEV){
    mainWnd.loadURL("http://localhost:3000/");
}else{
    // mainWnd.loadURL(`file://${__dirname}/index.html `);
    mainWnd.loadURL(url.format({
        pathname:path.join(__dirname,'/react-player/index.html'),
        protocol:'file:',
        slashes:true
    }))
}

    mainWnd.on('closed', () => {
       mainWnd = null;
    });
}


app.on('ready', createMainWnd);

app.on('window-all-closed', () => {
    app.quit();
});