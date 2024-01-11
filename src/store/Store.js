const path = require('path')
const {app} = require('electron')

export class Store {
    static #path = {
        CreateDatabaseScript: path.resolve(__dirname, 'src/createDatabase.sql'),
        /*TODO
            Нужно чтобы путь выгрузки базы данных был в папке AppData/lineup/
            Также нужно продумать, что таблица Incoming каждый год должна обновляться
        */
        // uploadDatabase: path.resolve(app.getPath('userData'), 'dataYear.db'),
        TestDatabaseFile: path.resolve(app.getPath('userData'), 'test.db'),
        BackupDatabaseFile: path.resolve(app.getPath('userData'), 'test_backup.db')
    }

    static getCreateDatabaseScript() {
        return this.#path.CreateDatabaseScript
    }

    static getTestDatabaseFile() {
        return this.#path.TestDatabaseFile
    }

    static getBackupDatabaseFile() {
        return this.#path.BackupDatabaseFile
    }
}
