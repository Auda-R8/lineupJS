const fs = require('fs')
const path = require('path')
const sqlite3 = require('sqlite3')

import {Store} from './store/Store.js'

const CREATE_SCRIPT = Store.getCreateDatabaseScript()
const DATABASE_PATH = Store.getCreateDatabaseScript()

function isExistDatabase() {
    return fs.existsSync(DATABASE_PATH)
}

function createDatabase() {
    if (isExistDatabase()) return

    const database = new sqlite3.Database(Store.getTestDatabaseFile(), async err => {
        if (err) {
            console.log(err)
            return err
        }
    })

    const sqlScript = fs.readFileSync(Store.getCreateDatabaseScript())

}