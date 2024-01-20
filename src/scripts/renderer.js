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



    // await Manager.preloader()

    // Manager.init()

    // await Manager.getTable('journal-link')

    // document.querySelector('#table').addEventListener('click', event => {
    //     console.log(event.target)
    //     if (event.target.classList.contains('edit-rowCancel')) {
    //         event.preventDefault()
    //         console.log(event.target)
    //     }
    // })


    /* --- User events handlers methods --- */

    // Change page


    // document.querySelectorAll('.notification-item').forEach(elem => {
    //     elem.addEventListener('click', event => Handler.notifyClick(event))
    // })

    // --- Add

    // Activate add row
    // document.querySelector('#addRow-btn').addEventListener('click', () => Handler.activateAddRow())

    // Cancel add row
    // document.querySelector('#cancelAdd-btn').addEventListener('click', () => Handler.cancelAddRow())

    // Add incoming
    // document.querySelector('#confirmAdd-btn').addEventListener('click', () => Handler.addData())

    // --- Edit

    // Activate Edit Row
    // document.querySelector('#table-container').addEventListener('click', event => {
    //     if (event.target.closest('.editBtn')) {
    //         Handler.activateEditRow(event.target.closest('tr'))
    //     }
    // })
    // document.querySelectorAll('.editBtn').forEach(elem => {
    //     console.log(elem)
    // elem.addEventListener('click', event => {
    //     event.preventDefault()
    //     Handler.activateEditRow(elem)
    // })
    // })

    // Save editing row
    // document.querySelector('#saveAll-btn').addEventListener('click', () => Handler.saveEditRow())

    // Cancel editing row
    // document.querySelector('#cancelAll-btn').addEventListener('click', () => Handler.disableEditRow())


    /* --- Local methods --- */


    // Change color theme
    // document.querySelector('.theme-toggle').addEventListener('click', () => {
    //     document.body.classList.toggle('dark-theme')
    //
    //     document.querySelector('.theme-toggle').querySelector('span:nth-child(1)').classList.toggle('active');
    //     document.querySelector('.theme-toggle').querySelector('span:nth-child(2)').classList.toggle('active');
    // })

    // Select All Checkbox
    // document.querySelector('#table-container').addEventListener('click', event => {
    //     if (event.target.id.includes('checkbox-thead')) {
    //         document.querySelectorAll('.form-checkbox').forEach(checkbox => {
    //             checkbox.checked = document.querySelector('#checkbox-thead').checked
    //         })
    //     }
    // })

    //Clear all Header popups

    // let clearPopups = () => {
    //     document.querySelectorAll('.notification').forEach(elem => {
    //         elem.classList.remove('active')
    //     })
    // }

    // Notify
    // document.querySelector('#notify-btn').addEventListener('click', event => {
    //     clearPopups()
    //     document.querySelector('#notify').classList.toggle('active')
    //     event.stopPropagation()
    // })

    // document.addEventListener('click', event => {
    //     if (!document.querySelector('#notify').contains(event.target))
    //         document.querySelector('#notify').classList.remove('active')
    // })

    // Хз для чего это
    // document.addEventListener('keydown', event => {
    //     if (event.ctrlKey && event.key === 't') {
    //         console.log(document.querySelectorAll('td').length)
    //     }
    // })

    // Database Switcher

    // document.querySelector('#select-database-btn').addEventListener('click', event => {
    //     clearPopups()
    //     document.querySelector('#changeDatabase').classList.toggle('active')
    //     event.stopPropagation()
    // })
    // document.addEventListener('click', event => {
    //     if (!document.querySelector('#changeDatabase').contains(event.target))
    //         document.querySelector('#changeDatabase').classList.remove('active')
    // })

    // Table Settings

    // document.querySelector('#table-settings').addEventListener('click', event => {
    //     clearPopups()
    //     document.querySelector('#tableSettings').classList.toggle('active')
    //     event.stopPropagation()
    // })
    // document.addEventListener('click', event => {
    //     if (!document.querySelector('#tableSettings').contains(event.target))
    //         document.querySelector('#tableSettings').classList.remove('active')
    // })

    // Hover Td Handler
    // Handler.hoverHandler()

    // Close Aside

    // document.querySelector('#closeBtn').addEventListener('click', event => {
    //     event.preventDefault()
    //
    //     if (Stage.data.settings.aside === 'default') {
    //         document.querySelector('aside').classList.toggle('close')
    //         document.querySelector('#closeBtn').classList.toggle('closeBtn-animate')
    //     } else if (Stage.data.settings.aside === 'compact') {
    //         document.querySelector('aside').classList.toggle('compact')
    //         document.querySelector('#closeBtn').classList.toggle('closeBtn-animate')
    //     }
    // })

    // document.querySelector('#search-form').addEventListener('input', event => {
    //     console.log(document.querySelector('#search-form').value)
    //     console.log(Manager.getThisTable())
    // })

    // Table filter
    // document.addEventListener('click', event => {
    //     document.querySelectorAll('th').forEach(elem => {
    //         if (elem.querySelector('.table-filter') !== null)
    //             elem.querySelector('.table-filter').classList.remove('show')
    //     })

        // const clearAll = () => {
        //     event.target.closest('ul').querySelectorAll('li').forEach(
        //         elem => {
        //             elem.classList.remove('selected')
        //         })
        // }

        // if (event.target.tagName === 'LI' && event.target.closest('.table-filter')) {
        //     if (event.target.hasAttribute(`data-key`)) {
        //         clearAll()
        //     }
        //     clearAll()
        //     event.target.classList.add('selected')
        //     Sort.by(event)
        // }
    // })

    // document.addEventListener('contextmenu', event => {
    //     document.querySelectorAll('th').forEach(elem => {
    //         if (elem.querySelector('.table-filter') !== null)
    //             elem.querySelector('.table-filter').classList.remove('show')
    //     })
    //     if (event.target.tagName === 'TH' & event.target.querySelector('.table-filter') !== null) {
    //         event.target.querySelector('.table-filter').classList.toggle('show')
    //     }
    // })
})