
const {ipcRenderer} = require('electron')

import {FetchData} from '../database/FetchData.js'
import {PageRenderer} from '../content/PageRenderer.js'
import {HandlerDataRows} from '../handler/HandlerDataRows.js'

export class Preloader {
    static async init() {
        await PageRenderer.registerPartials()
        await FetchData.fetchIncoming().then(async rows => {
            await HandlerDataRows.handlerIncoming(rows)
            await PageRenderer.renderPageByName('incoming')
        })
        // console.log(await ipcRenderer.invoke('getMetaData'))
    }
}