import {Store} from '../../store/Store.js'
import {Connection} from './Connection.js'
import {PageRenderer} from '../content/PageRenderer.js'
import {FetchData} from './FetchData.js'
import {HandlerDataRows} from '../handler/HandlerDataRows.js'
import {Loader} from '../interface/Loader.js'

export class UpdateData {
    static async updateData(edited, saved) {
        if (Store.getThisPage().includes('incoming')) await UpdateData.#updateIncoming(edited, saved).then()
        else await UpdateData.#updateMeta(edited, saved[0]).then()
    }

    static async #updateIncoming(edited, saved) {
        console.log(edited)
        console.log(saved)

        // Это индекс массива IncomingData
        const index = edited.id

        try {
            if (edited.typeId !== saved.typeId) {
                await new Promise(async (resolve, reject) => {
                    (await Connection.connect()).run(
                        `UPDATE incoming
                         SET type_id = ?
                         WHERE id = ?`,
                        [parseInt(edited.typeId), parseInt(edited.id)],
                        err => {
                            if (err) reject(err)
                            resolve("Тип Вход. обновлен!")
                        }
                    )
                })

                await Store.changeIncomingElementById(index, 'typeId', edited.typeId)
                await Store.changeIncomingElementById(index, 'typeName', edited.typeName)
            }

            if (edited.requisiteDate !== saved.requisiteDate) {
                await new Promise(async (resolve, reject) => {
                    (await Connection.connect()).run(`
                                UPDATE requisite
                                SET date = ?
                                WHERE id = ?`,
                        [edited.requisiteDate, edited.id],
                        err => {
                            if (err) reject(err)
                            else resolve()
                        }
                    )
                })

                await Store.changeIncomingElementById(index, 'requisiteDate', edited.requisiteDate)
                await Store.changeIncomingElementById(index, 'requisiteDateValue', edited.requisiteDate.split('-').reverse().join('.'))
            }

            if (parseInt(edited.senderId) !== parseInt(saved.senderId)) {
                await new Promise(async (resolve, reject) => {
                    (await Connection.connect()).run(`
                                UPDATE requisite
                                SET sender_id = ?
                                WHERE id = ?`,
                        [edited.senderId, edited.id],
                        err => {
                            if (err) reject(err)
                            else resolve()
                        }
                    )
                })

                Store.changeIncomingElementById(index, 'senderId', edited.senderId)
                Store.changeIncomingElementById(index, 'senderName', edited.senderName)
            }

            if (edited.requisiteNumber === '') edited.requisiteNumber = saved.requisiteNumber
            if (edited.requisiteNumber !== saved.requisiteNumber) {
                await new Promise(async (resolve, reject) => {
                    (await Connection.connect()).run(`
                                UPDATE requisite
                                SET number = ?
                                WHERE id = ?`,
                        [edited.requisiteNumber, edited.id],
                        err => {
                            if (err) reject(err)
                            else resolve()
                        }
                    )
                })

                Store.changeIncomingElementById(index, 'requisiteNumber', edited.requisiteNumber)
            }

            if (edited.description === '') edited.description = saved.description
            if (edited.description !==  saved.description) {
                await new Promise(async (resolve, reject) => {
                    (await Connection.connect()).run(`
                                UPDATE incoming
                                SET description = ?
                                WHERE id = ?`,
                        [edited.description, edited.id],
                        err => {
                            if (err) reject(err)
                            else resolve()
                        }
                    )
                })

                Store.changeIncomingElementById(index, 'description', edited.description)
            }

            if (parseInt(edited.directorId) !== parseInt(saved.directorId)) {
                await new Promise(async (resolve, reject) => {
                    (await Connection.connect()).run(`
                                UPDATE resolutions
                                SET director_id = ?
                                WHERE id = ?`,
                        [edited.directorId, edited.id],
                        err => {
                            if (err) reject(err)
                            else resolve()
                        }
                    )
                })

                Store.changeIncomingElementById(index, 'directorId', edited.directorId)
                Store.changeIncomingElementById(index, 'directorName', edited.directorName)
            }

            if (edited.resolutionDesc === '') edited.resolutionDesc = saved.resolutionDesc
            if (edited.resolutionDesc !== saved.resolutionDesc) {
                await new Promise(async(resolve, reject) => {
                    (await Connection.connect()).run(`
                                UPDATE resolutions
                                SET resolution = ?
                                WHERE id = ?`,
                        [edited.resolutionDesc, edited.id],
                        err => {
                            if (err) reject(err)
                            else resolve()
                        }
                    )
                })

                Store.changeIncomingElementById(index, 'resolutionDesc', edited.resolutionDesc)
            }

            if (edited.resolutionDate === '') edited.resolutionDate = saved.resolutionDate
            if (edited.resolutionDate !== saved.resolutionDate) {
                await new Promise(async(resolve, reject) => {
                    (await Connection.connect()).run(`
                                UPDATE resolutions
                                SET resolution_date = ?
                                WHERE id = ?`,
                        [edited.resolutionDate, edited.id],
                        err => {
                            if (err) reject(err)
                            else resolve()
                        }
                    )
                })

                Store.changeIncomingElementById(index, 'resolutionDate', edited.resolutionDate)
                Store.changeIncomingElementById(index, 'resolutionDateValue', edited.resolutionDate.split('-').reverse().join('.'))
            }

            await new Promise(async (resolve, reject) => {
                (await Connection.connect()).run(
                    `DELETE
                     FROM execution_executors
                     WHERE execution_id = ?`,
                    [edited.executionId],
                    err => {
                        if (err) reject(err)
                        else resolve()
                    }
                )
            }).then()

            await edited.executorId.forEach(elem => {
                new Promise(async(resolve, reject) => {
                    (await Connection.connect()).run(
                        "INSERT INTO execution_executors (execution_id, executor_id) VALUES(?, ?)",
                        [edited.executionId, elem],
                        (err) => {
                            if (err) reject(err)
                            else resolve()
                        }
                    )
                })
            })

            Store.changeIncomingElementById(index, 'executorId', edited.executorId)
            Store.changeIncomingElementById(index, 'executorName', edited.executorName)

            if (edited.executionDate !== saved.executionDate) {
                await new Promise(async (resolve, reject) => {
                    (await Connection.connect()).run(`
                                UPDATE execution
                                SET date = ?
                                WHERE id = ?`,
                        [edited.executionDate, edited.executionId],
                        err => {
                            if (err) reject(err)
                            else resolve()
                        }
                    )
                })

                Store.changeIncomingElementById(index, 'executionDate', edited.executionDate)
                Store.changeIncomingElementById(index, 'executionDateValue', edited.executionDate.split('-').reverse().join('.'))
            }

            if (edited.termControlDate !== saved.termControlDate) {
                await new Promise(async (resolve, reject) => {
                    (await Connection.connect()).run(`
                                UPDATE incoming
                                SET term_control = ?
                                WHERE id = ?`,
                        [edited.termControlDate, edited.id],
                        err => {
                            if (err) reject(err)
                            else resolve()
                        }
                    )
                })

                Store.changeIncomingElementById(index, 'termControlDate', edited.termControlDate)
                Store.changeIncomingElementById(index, 'termControlDateValue', edited.termControlDate.split('-').reverse().join('.'))
            }

            if (edited.info === '') edited.info = saved.info
            else if (edited.info !== saved.info) {
                await new Promise(async(resolve, reject) => {
                   (await Connection.connect()).run(`
                                UPDATE incoming
                                SET info = ?
                                WHERE id = ?`,
                        [edited.info, edited.id],
                        err => {
                            if (err) reject(err)
                            else resolve()
                        }
                    )
                })

               Store.changeIncomingElementById(index, 'info', edited.info)
            }


            if (edited.statusId !== saved.statusId) {
                await new Promise(async (resolve, reject) => {
                    (await Connection.connect()).run(`
                                UPDATE incoming
                                SET complete = ?
                                WHERE id = ?`,
                        [edited.statusId, edited.id],
                        err => {
                            if (err) reject(err)
                            else resolve()
                        }
                    )
                })

                Store.changeIncomingElementById(index, 'statusId', edited.statusId)
                Store.changeIncomingElementById(index, 'statusName', edited.statusName)
            }

            await FetchData.fetchExecutorsTable().then(rows => HandlerDataRows.handlerExecutors(rows))
            await PageRenderer.renderPageByName(Store.getThisPage())
            await Connection.disconnect()
        } catch (err) {
            console.log(err)
            throw (err)
        }
    }

    static async #updateMeta(edited, saved) {
        console.log(saved.name)
        console.log(edited.name)
        console.log(edited.id)
        console.log(edited)
        console.log(Store.getThisPage())
        try {

            if (edited.name === '') edited.name = saved.name
            if (edited.name !== saved.name) {
                await new Promise(async (resolve, reject) => {
                    (await Connection.connect()).run(`
                                UPDATE ${Store.getThisPage()}
                                SET name = ?
                                WHERE id = ?`,
                        [edited.name, parseInt(edited.id)],
                        err => {
                            if (err) reject(err)
                            else resolve()
                        }
                    )
                })
                Store.changeMetaElementById(edited.id, Store.getThisPage(),'name', edited.name)
            }

            if (edited.enable !== saved.enable) {
                await new Promise(async (resolve, reject) => {
                    (await Connection.connect()).run(`
                                UPDATE ${Store.getThisPage()}
                                SET enable = ?
                                WHERE id = ?`,
                        [edited.enable, parseInt(edited.id)],
                        (err => {
                            if (err) reject(err)
                            else resolve()
                        })
                    )
                })

                Store.changeMetaElementById(edited.id, Store.getThisPage(),'enable', edited.enable)
            }

            await Loader.loadData()
            await Connection.disconnect()
        } catch (err) {
            console.log(err)
            throw err
        }
    }
}