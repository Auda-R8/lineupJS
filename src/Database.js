const fs = require('fs')
const path = require('path')
const sqlite3 = require('sqlite3')

const {app} = require('electron')

/*
TODO
    Нужно чтобы путь выгрузки базы данных был в папке AppData/lineup/
    Также нужно продумать, что таблица Incoming каждый год должна обновляться
*/

async function database() {
    if (fs.existsSync(path.resolve(app.getPath('userData'), 'test.db'))) {
        await backup()
        return console.log("Database is already exist!")
    }

    const database = new sqlite3.Database(path.resolve(app.getPath('userData'), 'test.db'), async err => {
        if (err) {
            console.log(err)
            return err
        }
    })
    console.log('Creating database...')
    let sqlScript = null
    if (!fs.existsSync(path.resolve(app.getAppPath(), 'src', 'createDatabase.sql'))) {
        console.log(`File path script is not found! Current Path: ${app.getPath('userData')}`)
        sqlScript = `CREATE TABLE test(id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT); INSERT INTO test (text) VALUES ('Это Тестовая запись!');`.split(';')
    } else {
        sqlScript = fs.readFileSync(path.resolve(app.getAppPath(), 'src', 'createDatabase.sql'), 'utf-8').split(';')
    }
    await database.serialize(() => {
        sqlScript.forEach(async command => {
            await database.run(command, err => err ? console.error(err) : console.log(`Command: ${command} is successful`))
        })
    })
    console.log('Database create is Successful')
    await database.close()
}

function getCurrentTimestamp() {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds())

    return `${year}${month}${day}`
}

async function backup() {
    try {
        const backupFileName = `backup_${getCurrentTimestamp()}.db`
        const backupPath = path.resolve(app.getPath('userData'), backupFileName)

        fs.copyFileSync(path.resolve(app.getPath('userData'), 'test.db'), backupPath)
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    createDatabase: database
}