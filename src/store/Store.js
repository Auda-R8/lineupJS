const path = require('path')

export class Store {
    static #thisPage = null

    static getMetaData() {

    }

    static getIncomingData() {

    }

    static setThisPage(page) {
        Store.#thisPage = page
    }
}