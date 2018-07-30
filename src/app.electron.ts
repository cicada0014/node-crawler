import { app as electronApp, App as ElectronApp, BrowserWindow } from 'electron';


export class AppElectron {

    private mainWindow: BrowserWindow;
    private app: ElectronApp
    constructor() {
        this.app = electronApp
        this.init();;
    }

    init() {

        this.app.on('ready', event => {
            console.log('ready')
            this.mainWindow = new BrowserWindow({
                width: 600,
                height: 800
            });
            this.mainWindow.loadURL('https://www.instagram.com/');

        })
        this.app.on('before-quit', event => {

        })
        this.app.on('window-all-closed', event => {
            console.log("electron quit.")
            this.app.quit();
        })
        this.app.on('activate', (event, hasVisibleWindows) => {
            // Mac OS에서만 발생되는 이벤트임.
        })
    }

}