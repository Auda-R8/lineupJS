import {Store} from '../../store/Store.js'
import {Select} from '../element/Select.js'
import {UpdateData} from '../database/UpdateData.js'
import {PostData} from '../database/PostData.js'

export class AddHandler {

    static #dataAdd = []
    static #dataSave = []

    static addData() {
        if (Store.getThisPage().includes('incoming')) {
            AddHandler.#addIncoming().then()
        } else {
            AddHandler.#addMeta().then()
        }
    }

    static async #addIncoming() {
        AddHandler.#dataAdd = []
        AddHandler.#dataAdd.id = document.querySelector('#addId').getAttribute('data-value')

        AddHandler.#dataAdd.typeId = document.querySelector('#addTypeId').getAttribute('data-value')
        AddHandler.#dataAdd.typeName = document.querySelector('#addTypeId').value

        AddHandler.#dataAdd.senderId = document.querySelector('#addSenderId').getAttribute('data-value')
        AddHandler.#dataAdd.senderName = document.querySelector('#addSenderId').value
        AddHandler.#dataAdd.requisiteDate = document.querySelector('#addRequisiteDate').value
        AddHandler.#dataAdd.requisiteNumber = document.querySelector('#addRequisiteNumber').value

        AddHandler.#dataAdd.directorId = document.querySelector('#addDirectorId').getAttribute('data-value')
        AddHandler.#dataAdd.directorName = document.querySelector('#addDirectorId').value

        AddHandler.#dataAdd.description = document.querySelector('#addDescription').value
        AddHandler.#dataAdd.resolutionDesc = document.querySelector('#addResolutionDesc').value
        AddHandler.#dataAdd.resolutionDate = document.querySelector('#addResolutionDate').value
        AddHandler.#dataAdd.executionDate = document.querySelector('#addExecutionDate').value

        AddHandler.#dataAdd.info = document.querySelector('#addInfo').value
        AddHandler.#dataAdd.statusId = document.querySelector('#addStatusId').value
        AddHandler.#dataAdd.statusName = document.querySelector('#addStatusId').options[document.querySelector('#addStatusId').selectedIndex].textContent
        AddHandler.#dataAdd.termControlDate = document.querySelector('#addTermControlDate').value

        AddHandler.#dataAdd.executionId = document.querySelector('#addId').getAttribute('data-value')
        AddHandler.#dataAdd.executorId = []

        const selectedExecutors = []
        Array.from(document.querySelector('#addExecutor').children).forEach((elem, index) => {
            if (index === 0 && elem.className.includes('selected')){
                selectedExecutors.push(document.querySelector('.multiselect-container').querySelector('.select__input').value)
                AddHandler.#dataAdd.executorId.push(elem.dataset.value)
                return
            }
            if (elem.className.includes('selected')) {
                selectedExecutors.push(elem.textContent)
                AddHandler.#dataAdd.executorId.push(elem.dataset.value)
            }
        })
        AddHandler.#dataAdd.executorName = selectedExecutors.join(', ') || 'Отсутствует'

        console.log(AddHandler.#dataAdd)

        await PostData.post(AddHandler.#dataAdd)

        AddHandler.#dataAdd = []
        AddHandler.#dataSave = []
    }

    static async #addMeta() {
        AddHandler.#dataAdd = []
        AddHandler.#dataAdd.id = document.querySelector('#addId').getAttribute('data-value')
        AddHandler.#dataAdd.name = document.querySelector('#addName').value
        AddHandler.#dataAdd.counter = 0
        AddHandler.#dataAdd.enable = document.querySelector('#addEnable').value

        await PostData.post(AddHandler.#dataAdd)

        AddHandler.#dataAdd = []
    }
}