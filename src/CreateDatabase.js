const fs = require('fs')
const path = require('path')
const sqlite3 = require('sqlite3')

const {app} = require('electron')

/*
TODO
    Нужно чтобы путь выгрузки базы данных был в папке AppData/lineup/
    Также нужно продумать, что таблица Incoming каждый год должна обновляться
*/

async function createDatabase() {
    if (fs.existsSync(path.resolve(app.getPath('userData'), 'test.db'))) return console.log("Database is already exist!")

    const database = new sqlite3.Database(path.resolve(app.getPath('userData'), 'test.db'), async err => {
        if (err) {
            console.log(err)
            return err
        }
    })

    let sqlScript = null
    if (!fs.existsSync(path.resolve(app.getAppPath(), 'src', 'createDatabase.sql'))) {
        console.log(`File path script is not found! Current Path: ${Store.getCreateDatabaseScript()}`)
        sqlScript = `CREATE TABLE test(id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT); INSERT INTO test (text) VALUES ('Это Тестовая запись!');`.split(';')
    } else {
        sqlScript = fs.readFileSync(path.resolve(app.getAppPath(), 'src', 'createDatabase.sql'), 'utf-8').split(';')
    }
    await database.serialize(() => {
        sqlScript.forEach(async command => {
            await database.run(command, err => err ? console.error(err) : console.log(`Command: ${command} is successful`))
        })
    })
    await database.close()
}

module.exports = {
    createDatabase: createDatabase
}