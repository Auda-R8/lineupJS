const handlebars = require('handlebars')

import {Store} from '../../store/Store.js'

export class Helper {

    static helperEditIncoming() {
        Helper.#getStatus()
        Helper.#getSelectedItem()
        Helper.#getSelectedExecutors()
    }

    static helperEditMeta() {
        Helper.#getStatus()
    }

    static helperIncoming() {
        Helper.#getNewId()
        Helper.#getMonthList()
        Helper.#getMetaDataList()
    }

    static helperMeta() {
        Helper.#getNewId()
        Helper.#getTextForEnableColumn()
    }

    static helperSettings() {

    }

    static #getNewId() {
        handlebars.registerHelper('getNewId', () => {
            if (Store.getThisPage().includes('incoming')) return Store.getIncomingData().length + 1
            else return Store.getMetaData()[Store.getThisPage()].length + 1
        })
    }

    static #getSelectedExecutors() {
        handlebars.registerHelper('getSelectedExecutors', (execution, executors, incoming_id, execution_id) => {
            let arr = []
            let result = []

            execution.forEach(elem => {
                if (parseInt(incoming_id) === parseInt(elem.incoming_id) && parseInt(execution_id) === parseInt(elem.execution_id)) {
                    arr.push(elem.executor_id)
                }
            })

            executors.forEach(elem => {
                if (arr.includes(elem.id))
                    result.unshift('<li data-value="' + elem.id + '" class="selected">' + elem.name + '</li>')
                else
                    result.push('<li data-value="' + elem.id + '">' + elem.name + '</li>')
            })

            return result.join('\n')
        })
    }

    static #getStatus() {
        handlebars.registerHelper('getStatus', (value, target) => {
            if (value === target) return'selected'
        })
    }

    static #getSelectedItem() {
        handlebars.registerHelper('getSelectedItem', (index, name) => {
            let getRows = elem => {
                if (elem.enable === 0) return
                if (parseInt(elem.id) === parseInt(index))
                    return '<li data-value="' + elem.id + '" class="selected">' + elem.name + '</li>'
                else
                    return '<li data-value="' + elem.id + '">' + elem.name + '</li>'
            }

            return Store.getMetaData()[name].map(getRows).join('\n')
        })
    }

    static #getTextForEnableColumn() {
        handlebars.registerHelper('getTextForEnableColumn', enable => {
            if (parseInt(enable) === 0) return "Выкл"
            else if (parseInt(enable) === 1) return "Вкл"
        })
    }

    static #getMonthList() {
        handlebars.registerHelper('getMonthList', () => {
            return `
                <li data-value="1">Январь</li>
                <li data-value="2">Февраль</li>
                <li data-value="3">Март</li>
                <li data-value="4">Апрель</li>
                <li data-value="5">Май</li>
                <li data-value="6">Июнь</li>
                <li data-value="7">Июль</li>
                <li data-value="8">Август</li>
                <li data-value="9">Сентябрь</li>
                <li data-value="10">Октябрь</li>
                <li data-value="11">Ноябрь</li>
                <li data-value="12">Декабрь</li>`
        })
    }

    static #getMetaDataList() {
        handlebars.registerHelper('getMetaDataList', (metadata, name) => {
            let getRows = elem => {
                if (elem.enable === 1) return '<li data-value="' + elem.id + '">' + elem.name + '</li>'
            }
            const names = {
                types: Store.getMetaData().types.map(getRows).join('\n'),
                senders: Store.getMetaData().senders.map(getRows).join('\n'),
                directors: Store.getMetaData().directors.map(getRows).join('\n'),
                executors: Store.getMetaData().executors.map(getRows).join('\n')
            }
            return names[name]
        })
    }
}