import {Button} from '../element/Button.js'
import {PageRenderer} from '../content/PageRenderer.js'

export class ClickHandler {
    static #changePage(event) {
        event.preventDefault()
        Button.reset()

        const link = event.target.closest('a')
        const links = document.querySelectorAll('.nav-link__link')

        links.forEach(elem => elem.classList.remove('active'))
        link.classList.add('active')
        PageRenderer.renderPage(link.id)
    }

    static clickNavLink() {
        document.querySelectorAll('.nav-link__link')
            .forEach(elem => {
                elem.addEventListener('click', event => ClickHandler.#changePage(event))
            })
    }
}