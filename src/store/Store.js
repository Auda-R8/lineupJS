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

    static reset() {
        Store.#metaData = {
            types: [],
            senders: [],
            executors: [],
            directors: []
        }
        Store.#incomingData =[]
        Store.#executorsData = []
    }

    static pushIncomingData(data) {
        Store.#incomingData.push(data)
    }

    static pushMetaData(data, name) {
        Store.#metaData[name].push(data)
    }

    static pushExecutorsData(data) {
        Store.#executorsData.push(data)
    }

    static setThisPage(thisPage) {
        Store.#thisPage = thisPage
    }

    static changeIncomingElementById(id, property, value) {
        console.log(Store.#incomingData)
        console.log(Store.#incomingData[id - 1])
        Store.#incomingData[id - 1][property] = value
    }

    static changeMetaElementById(id, arr, property, value) {
        Store.#metaData[arr][id - 1][property] = value
    }

    static setMetaData(name, data) {
        Store.#metaData[name] = []
        Store.#metaData[name].push(data)
    }

    static resetMetaData(name) {
        Store.#metaData[name] = []
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
        return Store.#thisPage
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