const {ipcRenderer} = require('electron')
const sqlite3 = require('sqlite3').verbose()

export class Connection {

    static async connect() {
        return new sqlite3.Database(await ipcRenderer.invoke('getDatabasePath'), err => {
            if (err) console.error(err)
            else console.log("Connected")
        })
    }

    static async disconnect() {
        (await Connection.connect()).close()
        console.log("Disconnected")
    }
}