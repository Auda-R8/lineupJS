const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')

import {Helper} from '../helper/Helper.js'
import {Store} from '../../store/Store.js'
import {Select} from '../element/Select.js'

export class PageRenderer {
    static #pages = [
        {
            link: 'journal-link',
            page: 'incoming',
            method: PageRenderer.#renderIncoming
        },
        {
            link: 'type-link',
            page: 'types',
            method: PageRenderer.#renderMeta
        },
        {
            link: 'sender-link',
            page: 'senders',
            method: PageRenderer.#renderMeta
        },
        {
            link: 'director-link',
            page: 'directors',
            method: PageRenderer.#renderMeta
        },
        {
            link: 'executor-link',
            page: 'executors',
            method: PageRenderer.#renderMeta
        },
        {
            link: 'settings-link',
            page: 'settings',
            method: PageRenderer.#renderSettings
        }
    ]

    static #container = document.querySelector('#table-container')
    static #notify = document.querySelector('#notification-content')
    static #template

    static registerPartials() {
        handlebars.registerPartial('incomingHeader', fs.readFileSync(path.resolve(__dirname, 'components/tables/incomingHead.hbs'), 'utf8'))
        handlebars.registerPartial('incomingBody', fs.readFileSync(path.resolve(__dirname, 'components/tables/incomingBody.hbs'), 'utf8'))
        handlebars.registerPartial('editRow', fs.readFileSync(path.resolve(__dirname, 'components/rows/editRow.hbs'), 'utf8'))
    }

    static renderPageByName(pageName) {
        PageRenderer.#pages.forEach(elem => {
            elem.page.includes(pageName) ? elem.method(elem.page) : null
        })
    }

    static renderPageByLink(link) {
        PageRenderer.#pages.forEach(elem => {
            elem.link.includes(link) ? elem.method(elem.page) : null
        })
    }

    static #renderIncoming(page) {
        Store.setThisPage(page)
        Helper.helperIncoming()

        PageRenderer.#container.classList.add('limiter')
        PageRenderer.#template = handlebars.compile(fs.readFileSync(path.resolve(__dirname, 'components/tables/incoming.hbs'), 'utf8'))
        PageRenderer.#container.innerHTML = PageRenderer.#template({
            incomingData: Store.getIncomingData(),
            metaData: Store.getMetaData(),
            executors: Store.getExecutorsData()
        })

        Select.init()
    }

    static #renderMeta(page) {
        Store.setThisPage(page)
        Helper.helperMeta()

        PageRenderer.#container.classList.remove('limiter')
        PageRenderer.#template = handlebars.compile(fs.readFileSync(path.resolve(__dirname, 'components/tables/meta.hbs'), 'utf8'))
        PageRenderer.#container.innerHTML = PageRenderer.#template({
            metaData: Store.getMetaData()[page]
        })

        Select.init()
    }

    static #renderSettings(page) {
        Store.setThisPage(page)
        Helper.helperSettings()

        PageRenderer.#container.classList.remove('limiter')
        PageRenderer.#template = handlebars.compile(fs.readFileSync(path.resolve(__dirname, 'components/tables/settings.hbs'), 'utf8'))
        PageRenderer.#container.innerHTML = PageRenderer.#template()

        Select.init()
    }
}