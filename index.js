const { app, BrowserWindow, ipcMain, desktopCapturer } = require('electron');
const path = require('path');


function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'assets/iconsidian'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Handle screen source request from the renderer process
ipcMain.handle('get-sources', async () => {
    const sources = await desktopCapturer.getSources({ types: ['screen'] });
    return sources;
});