import {Store} from '../../store/Store.js'
import {Select} from '../element/Select.js'
import {Helper} from '../helper/Helper.js'
import {UpdateData} from '../database/UpdateData.js'
import {PageRenderer} from '../content/PageRenderer.js'

const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')

export class EditHandler {

    static #dataSave = []
    static #dataEdit = []

    static #saveData(data) {
        EditHandler.#dataSave.push(data)
    }

    static #setEditingStyle(row) {
        document.querySelectorAll('tr').forEach(elem => elem.classList.remove('editing'))
        row.classList.add('editing')
    }

    static #resetEditingStyle() {
        document.querySelector('.editing').classList.remove('editing')
    }

    static postData() {
        if (Store.getThisPage().includes('incoming')) EditHandler.#postIncoming()
        else EditHandler.#postMeta()
    }

    static editData(row) {
        if (Store.getThisPage().includes('incoming')) EditHandler.#editIncoming(row)
        else EditHandler.#editMeta(row)
    }

    static cancelEdit() {
        if (Store.getThisPage().includes('incoming')) EditHandler.#cancelIncoming()
        else EditHandler.#cancelMeta()
    }

    static async #postIncoming() {
        EditHandler.#dataEdit = []
        EditHandler.#dataEdit.id = document.querySelector('#editId').getAttribute('data-value')

        EditHandler.#dataEdit.typeId = document.querySelector('#editTypeId').getAttribute('data-value')
        EditHandler.#dataEdit.typeName = document.querySelector('#editTypeId').value

        EditHandler.#dataEdit.senderId = document.querySelector('#editSenderId').getAttribute('data-value')
        EditHandler.#dataEdit.senderName = document.querySelector('#editSenderId').value
        EditHandler.#dataEdit.requisiteDate = document.querySelector('#editRequisiteDate').value
        EditHandler.#dataEdit.requisiteNumber = document.querySelector('#editRequisiteNumber').value

        EditHandler.#dataEdit.directorId = document.querySelector('#editDirectorId').getAttribute('data-value')
        EditHandler.#dataEdit.directorName = document.querySelector('#editDirectorId').value

        EditHandler.#dataEdit.description = document.querySelector('#editDescription').value
        EditHandler.#dataEdit.resolutionDesc = document.querySelector('#editResolutionDesc').value
        EditHandler.#dataEdit.resolutionDate = document.querySelector('#editResolutionDate').value
        EditHandler.#dataEdit.executionDate = document.querySelector('#editExecutionDate').value

        EditHandler.#dataEdit.info = document.querySelector('#editInfo').value
        EditHandler.#dataEdit.statusId = document.querySelector('#editStatusId').value
        EditHandler.#dataEdit.statusName =document.querySelector('#editStatusId').options[document.querySelector('#editStatusId').selectedIndex].textContent
        EditHandler.#dataEdit.termControlDate = document.querySelector('#editTermControlDate').value

        EditHandler.#dataEdit.executionId = document.querySelector('#editExecutor').getAttribute('data-value')
        EditHandler.#dataEdit.executorId = []

        const selectedExecutors = []
            Array.from(document.querySelector('#editExecutor').children).forEach(elem => {
                if (elem.className.includes('selected')) {
                    selectedExecutors.push(elem.textContent)
                    EditHandler.#dataEdit.executorId.push(elem.dataset.value)
                }
            })
        EditHandler.#dataEdit.executorName = selectedExecutors.join(', ') || 'Отсутствует'

        console.log(EditHandler.#dataEdit)

        await UpdateData.updateData(EditHandler.#dataEdit, EditHandler.#dataSave)

        EditHandler.#dataEdit = []
        EditHandler.#dataSave = []
    }

    static async #postMeta() {
        EditHandler.#dataEdit = []
        EditHandler.#dataEdit.id = document.querySelector('#editId').getAttribute('data-value')
        EditHandler.#dataEdit.name = document.querySelector('#editName').value
        EditHandler.#dataEdit.enable = document.querySelector('#editEnable').value

        await UpdateData.updateData(EditHandler.#dataEdit, EditHandler.#dataSave)

        EditHandler.#dataEdit = []
        EditHandler.#dataSave = []
    }

    static #cancelIncoming() {
        Helper.helperIncoming()
        console.log(EditHandler.#dataSave)
        const row = document.querySelector('.editing')
        const template = handlebars.compile(fs.readFileSync(path.resolve(__dirname, 'components/rows/cancelEditIncoming.hbs'), 'utf8'))
        row.innerHTML = template({
            saveData: EditHandler.#dataSave
        })

        EditHandler.#dataSave = []
        EditHandler.#dataEdit = []
        EditHandler.#resetEditingStyle()
    }

    static #cancelMeta() {
        Helper.helperMeta()
        console.log(EditHandler.#dataSave)
        const row = document.querySelector('.editing')
        const template = handlebars.compile(fs.readFileSync(path.resolve(__dirname, 'components/rows/cancelEditMeta.hbs'), 'utf8'))
        row.innerHTML = template({
            saveData: EditHandler.#dataSave
        })

        EditHandler.#dataSave = []
        EditHandler.#dataEdit = []
        EditHandler.#resetEditingStyle()
    }

    static #editIncoming(row) {
        EditHandler.#setEditingStyle(row)
        EditHandler.#dataSave = []
        EditHandler.#saveData(Store.getIncomingData()[row.getAttribute('data-value') - 1])
        Helper.helperEditIncoming()

        const template = handlebars.compile(fs.readFileSync(path.resolve(__dirname, 'components/rows/editingIncomingRow.hbs'), 'utf8'))
        row.innerHTML = template({
            saveData: EditHandler.#dataSave,
            metaData: Store.getMetaData(),
            executors: Store.getExecutorsData(),
        })
        Select.init()
    }

    static #editMeta(row) {
        EditHandler.#dataSave = []
        const id = row.getAttribute('data-value')
        const data = (Store.getMetaData()[Store.getThisPage()]).find(elem => elem.id === parseInt(id))
        EditHandler.#saveData(data)
        EditHandler.#setEditingStyle(row)

        Helper.helperEditMeta()
        const template = handlebars.compile(fs.readFileSync(path.resolve(__dirname, 'components/rows/editingMetaRow.hbs'), 'utf8'))
        row.innerHTML = template({
            saveData: EditHandler.#dataSave
        })
    }
}