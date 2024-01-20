import {Button} from '../element/Button.js'
import {PageRenderer} from '../content/PageRenderer.js'
import {AddHandler} from './AddHandler.js'
import {EditHandler} from './EditHandler.js'
import {Store} from '../../store/Store.js'

export class ClickHandler {
    static #changePage(event) {
        event.preventDefault()
        Button.reset()

        const link = event.target.closest('a')
        const links = document.querySelectorAll('.nav-link__link')

        links.forEach(elem => elem.classList.remove('active'))
        link.classList.add('active')
        PageRenderer.renderPageByLink(link.id)
    }

    static clickNavLink() {
        document.querySelectorAll('.nav-link__link')
            .forEach(elem => {
                elem.addEventListener('click', event => ClickHandler.#changePage(event))
            })
    }

    static clickButtonAdd() {
        document.querySelector('#addRow-btn').addEventListener('click', () => Button.activateAddRow())
    }

    static confirmAdd() {
        document.querySelector('#confirmAdd-btn').addEventListener('click', () => {
            Button.reset()
            document.querySelector('#addRow').classList.remove('active')
            AddHandler.addData()
        })
    }

    static clickEditRow() {
        document.querySelector('#saveAll-btn').addEventListener('click', () => {
            Button.reset()
            EditHandler.postData()
        })
    }

    static clickButtonEdit() {
        document.querySelector('#table-container').addEventListener('click', event => {
            if (event.target.closest('.editBtn')) {
                Button.activateEditRow()
                EditHandler.editData(event.target.closest('tr'))
            }
        })
    }

    static clickEditCancelRow() {
        document.querySelector('#cancelAll-btn').addEventListener('click', () => {
            Button.reset()
            EditHandler.cancelEdit()
        })
    }

    static clickCancelRow() {
        document.querySelector('#cancelAdd-btn').addEventListener('click', () => Button.disableAddRow())
    }
}