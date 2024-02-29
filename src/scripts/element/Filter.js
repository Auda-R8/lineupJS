import {Store} from "../../store/Store.js"
import {PageRenderer} from "../content/PageRenderer.js"

export class Filter {
    static element
    static elementId
    static elementType

    static #replace(elem, index) {
        const saveElem = elem
        Store.getIncomingData().splice(index, 1)
        Store.getIncomingData().unshift(saveElem)

        console.log(Store.getIncomingData())
    }

    static async by(event) {
        Filter.element = event.target
        Filter.elementId = event.target.getAttribute('data-value')
        Filter.elementType = event.target.closest('th').getAttribute('data-filter')

        const callSort = {
            types: this.sortTypes,
            receipt: this.sortReceipt,
            senders: this.sortSenders,
            directors: this.sortDirectors,
            executors: this.sortExecutors,
            executorDate: this.sortExecutorDate,
            termControl: this.sortTermControl,
            status: this.sortStatus
        }

        console.log(Store.getIncomingData())

        await callSort[this.elementType]()
        PageRenderer.renderPageByName('incoming')
    }

    static sortTypes() {
        Store.getIncomingData().forEach((elem, index) => {
            if (parseInt(elem.typeId) === parseInt(Filter.elementId))
                Filter.#replace(elem, index)
        })
    }

    static sortReceipt() {
        Store.getIncomingData().forEach((elem, index) => {
            if (new Date(elem.requisiteDateValue).getMonth() + 1 === parseInt(Filter.elementId))
                Filter.#replace(elem, index)
        })
    }

    static sortSenders() {
        Store.getIncomingData().forEach((elem, index) => {
            if (parseInt(elem.senderId) === parseInt(Filter.elementId))
                Filter.#replace(elem, index)
        })
    }

    static sortDirectors() {
        Store.getIncomingData().forEach((elem, index) => {
            if (parseInt(elem.directorId) === parseInt(Filter.elementId))
                Filter.#replace(elem, index)
        })
    }

    static sortExecutors() {

        const getIndex = (incoming_id) => {
            return Store.getIncomingData().findIndex(item => parseInt(item.id) === parseInt(incoming_id))
        }

        const getItem = (incoming_id) => {
            return Store.getIncomingData().find(elem => parseInt(elem.id) === parseInt(incoming_id))
        }

        Store.getExecutorsData().forEach(item => {
            if (parseInt(Filter.elementId) === parseInt(item.executor_id))
                Filter.#replace(getItem(item.incoming_id), getIndex(item.incoming_id))
        })
    }

    static sortExecutorDate() {
        Store.getIncomingData().forEach((elem, index) => {
            if (new Date(elem.executionDateValue).getMonth() + 1 === parseInt(Filter.elementId))
                Filter.#replace(elem, index)
        })
    }

    static sortTermControl() {
        Store.getIncomingData().forEach((elem, index) => {
            if (new Date(elem.termControlDateValue).getMonth() + 1 === parseInt(Filter.elementId))
                Filter.#replace(elem, index)
        })
    }

    static sortStatus() {
        Store.getIncomingData().forEach((elem, index) => {
            if (parseInt(elem.statusId) === parseInt(Filter.elementId))
                Filter.#replace(elem, index)
        })
    }
}