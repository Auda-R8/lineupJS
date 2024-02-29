// import {Manager} from "./Manager.js"
// import {Handler} from "./Handler.js";
// import {Stage} from "./Stage.js";
// import {Sort} from "./Sort.js";
// import {Database} from "./Database.js";

import {ClickHandler} from './controller/ClickHandler.js'
import {Connection} from './database/Connection.js';
import {Loader} from './interface/Loader.js'
import {Store} from '../store/Store.js'
//
// const filesystem = require('fs')
// const handlebars = require('handlebars')
// const {ipcRenderer} = require('electron')

// const {}

document.addEventListener('DOMContentLoaded', async () => {
    Store.setThisPage('incoming')
    
    await Loader.loadData()

    ClickHandler.clickNavLink()

    ClickHandler.clickButtonAdd()
    ClickHandler.clickButtonEdit()

    ClickHandler.confirmAdd()
    ClickHandler.clickCancelRow()

    ClickHandler.clickEditRow()
    ClickHandler.clickEditCancelRow()


    ClickHandler.listenThead();
})