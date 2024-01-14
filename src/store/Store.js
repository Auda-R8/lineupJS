export class Store {

    static #metaData = {
        types: [],
        senders: [],
        executors: [],
        directors: []

    }
    static #notifyData = []
    static #incomingData = []
    static #executorsData = []

    static #thisPage = null

    static pushIncomingData(data) {
        Store.#incomingData.push(data)
    }

    static pushExecutorsData(data) {
        Store.#executorsData.push(data)
    }

    static setThisPage(thisPage) {
        Store.#thisPage = thisPage
    }

    static setMetaData(name, data) {
        Store.#metaData[name] = []
        Store.#metaData[name].push(data)
    }

    static setNotifyData(data) {
        Store.#notifyData = []
        Store.#notifyData.push(data)
    }

    static setIncomingData(data) {
        Store.#incomingData = []
        Store.#incomingData.push(data)
    }

    static setExecutorsData(data) {
        Store.#executorsData = []
        Store.#executorsData.push(data)
    }

    static getThisPage() {

    }

    static getMetaData() {
        return Store.#metaData
    }

    static getNotifyData() {
        return Store.#notifyData
    }

    static getIncomingData() {
        return Store.#incomingData
    }

    static getExecutorsData() {
        return Store.#executorsData
    }

}