const {ipcRenderer} = require('electron')

export class Connection {
    async static getPath() {
         console.log( ipcRenderer.invoke('getDatabasePath'))
    }
}