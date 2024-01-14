const fs = require('fs')
const path = require('path')
const {app} = require('electron')

class Router {
    /*TODO
        Нужно чтобы путь выгрузки базы данных был в папке AppData/lineup/
        Также нужно продумать, что таблица Incoming каждый год должна обновляться
    */
    static getCreateDatabaseScript() {
        return path.resolve(app.getAppPath(), 'src', 'createDatabase.sql')
    }

    static getDatabasePath() {
        return path.resolve(app.getPath('userData'), 'test.db')
    }

    static getBackupDatabasePath() {
        return path.resolve(app.getPath('userData'), 'test_backup.db')
    }

}

module.exports = {
    Router: Router
}