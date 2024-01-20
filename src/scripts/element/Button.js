import {AddHandler} from '../controller/AddHandler.js'
import {Select} from './Select.js'

export class Button {
    static reset() {
        document.querySelector('#saveAll-btn').classList.add('hide')
        document.querySelector('#cancelAll-btn').classList.add('hide')

        document.querySelector('#confirmAdd-btn').classList.add('hide')
        document.querySelector('#cancelAdd-btn').classList.add('hide')
    }

    static #activateAddBtns() {
        Button.reset()
        document.querySelector("#confirmAdd-btn").classList.remove('hide')
        document.querySelector("#cancelAdd-btn").classList.remove('hide')
    }

    static activateAddRow() {
        Button.#activateAddBtns()
        document.querySelector('#addRow').classList.add('active')
    }

    static activateEditRow() {
        Button.reset()

        document.querySelector('#saveAll-btn').classList.remove('hide')
        document.querySelector('#cancelAll-btn').classList.remove('hide')
    }

    static disableAddRow() {
        Button.reset()
        document.querySelector('#addRow').classList.remove('active')
    }

    static clickEditCancelRow() {

    }

}