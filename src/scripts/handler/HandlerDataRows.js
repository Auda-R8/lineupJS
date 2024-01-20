import {Validate} from './Validate.js'
import {Store} from '../../store/Store.js'

export class HandlerDataRows {
    static async handlerIncoming(rows) {
        await rows.forEach(row => {
            let saveRow = {
                id: row.id,
                description: Validate.validValue(row.description),

                // Types
                typeId: Validate.validId(row.typeId),
                typeName: Validate.validMetaData(row.typeName),

                // Requisites
                requisiteId: Validate.validId(row.requisiteId),
                requisiteDate: Validate.validDate(row.requisiteDate),
                requisiteDateValue: Validate.validDateValue(row.requisiteDate),
                requisiteNumber: Validate.validValue(row.requisiteNumber),

                // Senders
                senderId: Validate.validId(row.senderId),
                senderName: Validate.validMetaData(row.senderName),

                // Directors
                directorId: Validate.validId(row.directorId),
                directorName: Validate.validMetaData(row.directorName),

                // Resolutions
                resolutionId: Validate.validId(row.resolutionId),
                resolutionDesc: Validate.validValue(row.resolutionDesc),
                resolutionDate: Validate.validDate(row.resolutionDate),
                resolutionDateValue: Validate.validDateValue(row.resolutionDate),

                // Executions
                executionId: Validate.validId(row.executionId),
                executionDate: Validate.validDate(row.executionDate),
                executionDateValue: Validate.validDateValue(row.executionDate),

                // Executors
                executorId: HandlerDataRows.#getExecutorsId(row.id, row.executionId),
                executorName: HandlerDataRows.#getExecutorsName(row.id, row.executionId),

                info: Validate.validValue(row.info),
                statusId: Validate.validId(row.statusId),
                statusName: Validate.validStatus(row.statusId),

                termControlDate: Validate.validDate(row.termControl),
                termControlDateValue: Validate.validDateValue(row.termControl)
            }

            Store.pushIncomingData(saveRow)
        })
    }

    static async handlerMeta(rows, name) {
        await rows.forEach(row => {
            let saveRow = {
                id: row.id,
                name: Validate.validValue(row.name),
                counter: row.counter,
                enable: row.enable
            }

            Store.pushMetaData(saveRow, name)
        })
    }

    static handlerExecutors(rows) {
        const result = new Map()

        rows.forEach(elem => {
            let saveRow = {
                execution_id: elem.en,
                incoming_id: elem.id,
                executor_name: elem.name,
                executor_id: elem.executor_id
            }
            Store.pushExecutorsData(saveRow)
            if (result.has(elem.id)) {
                result.get(elem.id).push(elem.name);
            } else {
                result.set(elem.id, [elem.name]);
            }
        })
    }

    static #getExecutorsName(incomingId, executionId) {
        let name = []
        Store.getExecutorsData().forEach(elem => {
            if (elem.incoming_id === incomingId && elem.execution_id === executionId) {
                name.push(elem.executor_name)
            }
        })

        return name.length > 0 ? name.join(', ') : 'Отсутствует'
    }

    static #getExecutorsId(incomingId, executionId) {
        let id = []

        Store.getMetaData().executors.forEach(elem => {
            if (elem.incoming_id === incomingId && elem.execution_id === executionId) {
                id.push(elem.executor_id)
            }
        })

        return id
    }
}