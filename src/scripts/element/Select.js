// TODO Сделать рефакторинг

import {Store} from '../../store/Store.js'

export class Select {

    static init() {
        Select.#createSelect()
        Select.#createMultiSelect()
    }

    static #createSelect() {
        document.querySelectorAll('.select-container').forEach(elem => {

            // Фиксим баг с input
            // Заполняем placeholder
            // elem.querySelector('.select__input').value = function()

            // Нажатие на input Открывает select
            elem.querySelector('.select__input').addEventListener('click', event => {
                elem.querySelector('.select__dropdownList').classList.add('show')
            })

            // Обработчик нажатия на элементы списка
            elem.querySelector('.select__dropdownList').addEventListener('click', event => {
                Array.from(elem.querySelector('.select__dropdownList').children).forEach(item => {
                    item.classList.remove('selected')
                })
                if (event.target.tagName === 'LI' && !event.target.className.includes('forAddMeta')) {
                    elem.querySelector('.select__input').setAttribute('data-value', event.target.getAttribute('data-value'))
                    elem.querySelector('.select__input').setAttribute('value', event.target.textContent)
                    elem.querySelector('.select__input').value = event.target.textContent
                    elem.querySelector('.select__dropdownList').classList.remove('show')
                    event.target.classList.add('selected')
                } else {
                    elem.querySelector('.select__input').setAttribute('data-value', event.target.getAttribute('data-value'))
                    elem.querySelector('.select__input').value = ''
                    elem.querySelector('.select__input').placeholder = 'Название'
                    elem.querySelector('.select__dropdownList').classList.remove('show')
                    event.target.classList.add('selected')
                }
            })

            Select.openDropDownList(elem)
            Select.inputListener(elem)
            Select.closeDropDownList(elem)
        })
    }

    static #createMultiSelect() {
        document.querySelectorAll('.multiselect-container').forEach(elem => {

            // Нажатие на input Открывает select
            elem.querySelector('.select__input').addEventListener('click', event => {
                elem.querySelector('.select__dropdownList').classList.add('show')
            })

            // Обработчик нажатия на элементы списка
            elem.querySelector('.select__dropdownList').addEventListener('click', event => {
                // let arr = elem.querySelectorAll('li')
                event.target.classList.toggle('selected')
                elem.querySelector('.select__dropdownList').querySelectorAll('li').forEach(item => {
                    if (item.className.includes('selected')) {
                        let secondItem = Array.from(elem.querySelector('.select__dropdownList').querySelectorAll('li'))[1]
                        elem.querySelector('.select__dropdownList').insertBefore(item, secondItem)
                    }
                })

                let selectedItems = []
                elem.querySelectorAll('.selected').forEach(selected => {
                    if (selected.getAttribute('data-value') > Store.getMetaData().executors.length) {
                        elem.querySelector('.select__input').setAttribute('data-value', event.target.getAttribute('data-value'))
                        elem.querySelector('.select__input').value = ''
                        elem.querySelector('.select__input').placeholder = 'Название'
                        elem.querySelector('.select__dropdownList').classList.remove('show')
                        event.target.classList.add('selected')
                    } else {
                        elem.querySelector('.select__input').setAttribute('data-value', 0)
                        selectedItems.push(selected.textContent)
                    }
                })
                if (elem.querySelector('.select__input').getAttribute('data-value') > Store.getMetaData().executors.length)
                    elem.querySelector('.select__input').value = ''
                else elem.querySelector('.select__input').value = selectedItems.join(', ')
            })

            Select.openDropDownList(elem)
            Select.inputListener(elem)
            Select.closeDropDownList(elem)
        })
    }

    static openDropDownList(elem) {
        // Обработчик нажатия на кнопку открытия селекта
        elem.querySelector('.select__dropdownButton').addEventListener('click', event => {
            elem.querySelector('.select__dropdownList').classList.add('show')
        })
    }

    static inputListener(elem) {
        // Обработчик ввода текста в input
        elem.querySelector('.select__input').addEventListener('input', () => {
            let inputValue = elem.querySelector('.select__input').value.toLowerCase()
            let options = Array.from(elem.querySelector('.select__dropdownList').children)
            elem.querySelector('.select__dropdownList').classList.add('show')

            options.forEach(item => {
                if (item.textContent.toLowerCase().includes(inputValue) || item.classList.contains('selected')) {
                    // Возможно понадобится, а возможно и нет (скорее нет чем да)
                    // elem.querySelector('.select__input').setAttribute('incomingData-value', item.getAttribute('incomingData-value'))
                    item.style.display = 'block'
                } else {
                    item.style.display = 'none'
                }
            })
        })
    }

    static closeDropDownList(elem) {
        // Обработка нажатия вне селекта
        document.addEventListener('click', event => {
            if (!elem.contains(event.target)) {
                elem.querySelector('.select__dropdownList').classList.remove('show')
            }
        })
    }
}