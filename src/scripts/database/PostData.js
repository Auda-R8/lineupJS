import {Store} from '../../store/Store.js'
import {Connection} from './Connection.js'
import {HandlerDataRows} from '../handler/HandlerDataRows.js'
import {Loader} from '../interface/Loader.js'

export class PostData {

    static async post(data) {
        console.log(Store.getThisPage())
        if (Store.getThisPage().includes('incoming'))
            PostData.#postIncoming(data).then()
        else PostData.#postMeta(data).then()
    }

    static async #postIncoming(data) {
        try {
            console.log(data)

            if (data.typeId > Store.getMetaData()['types'].length) {
                await new Promise(async (resolve, reject) => {
                    (await Connection.connect()).run(
                        `INSERT INTO 'types' (name, enable, counter)
                     VALUES (?, ?, ?);`,
                        [data.typeName, 1, 0],
                        err => {
                            if (err) reject(err)
                            else resolve()
                        })
                })
            }

            if (data.senderId > Store.getMetaData()['senders'].length) {
                await new Promise(async (resolve, reject) => {
                    (await Connection.connect()).run(
                        `INSERT INTO 'senders' (name, enable, counter)
                     VALUES (?, ?, ?);`,
                        [data.senderName, 1, 0],
                        err => {
                            if (err) reject(err)
                            else resolve()
                        })
                })
            }

            if (data.directorId > Store.getMetaData()['directors'].length) {
                await new Promise(async (resolve, reject) => {
                    (await Connection.connect()).run(
                        `INSERT INTO 'directors' (name, enable, counter)
                         VALUES (?, ?, ?);`,
                        [data.directorName, 1, 0],
                        err => {
                            if (err) reject(err)
                            else resolve()
                        })
                })
            }

            if (data.executorId > Store.getMetaData()['executors'].length) {
                await new Promise(async (resolve, reject) => {
                    (await Connection.connect()).run(
                        `INSERT INTO 'executors' (name, enable, counter)
                     VALUES (?, ?, ?);`,
                        [data.executorName, 1, 0],
                        err => {
                            if (err) reject(err)
                            else resolve()
                        })
                })
            }


            await new Promise(async (resolve, reject) => {
                (await Connection.connect()).run(
                    `INSERT INTO requisite (sender_id, number, date)
                     VALUES (?, ?, ?)`,
                    [data.senderId, data.requisiteNumber, data.requisiteDate],
                    (err => {
                        if (err) reject(err)
                        else resolve()
                    })
                )
            })

            await new Promise(async (resolve, reject) => {
                (await Connection.connect()).run(`
                            UPDATE senders
                            SET counter = counter + 1
                            WHERE id = ?`,
                    [data.senderId],
                    err => {
                        if (err) reject(err)
                        else resolve()
                    }
                )
            })

            await new Promise(async (resolve, reject) => {
                (await Connection.connect()).run(`
                            UPDATE directors
                            SET counter = counter + 1
                            WHERE id = ?`,
                    [data.directorId],
                    err => {
                        if (err) reject(err)
                        else resolve()
                    }
                )
            })

            await new Promise(async (resolve, reject) => {
                (await Connection.connect()).run(`
                            UPDATE types
                            SET counter = counter + 1
                            WHERE id = ?`,
                    [data.typeId],
                    err => {
                        if (err) reject(err)
                        else resolve()
                    }
                )
            })

            let lastRequisiteId
            lastRequisiteId = await new Promise(async (resolve, reject) => {
                (await Connection.connect()).get(
                    `SELECT id AS id
                     FROM requisite
                     ORDER BY id DESC
                     LIMIT 1`,
                    (err, row) => {
                        if (err) reject(err)
                        else resolve(row.id)
                    }
                )
            })

            await new Promise(async (resolve, reject) => {
                (await Connection.connect()).run(
                    `INSERT INTO resolutions (director_id, resolution, resolution_date)
                     VALUES (?, ?, ?)`,
                    [data.directorId, data.resolutionDesc, data.resolutionDate],
                    err => {
                        if (err) reject(err)
                        else resolve()
                    }
                )
            })

            let lastResolutionId
            lastResolutionId = await new Promise(async (resolve, reject) => {
                (await Connection.connect()).get(
                    `SELECT id AS id
                     FROM resolutions
                     ORDER BY id DESC
                     LIMIT 1`,
                    (err, row) => {
                        if (err) reject(err)
                        else resolve(row.id)
                    }
                )
            })

            await new Promise(async (resolve, reject) => {
                (await Connection.connect()).run(
                    `INSERT INTO execution (date)
                     VALUES (?)`,
                    [data.executionDate],
                    err => {
                        if (err) reject(err)
                        else resolve()
                    }
                )
            })

            let lastExecutionId
            lastExecutionId = await new Promise(async (resolve, reject) => {
                (await Connection.connect()).get(
                    `SELECT id AS id
                     FROM execution
                     ORDER BY id DESC
                     LIMIT 1`,
                    (err, row) => {
                        if (err) reject(err)
                        else resolve(row.id)
                    }
                )
            })


            await Promise.all(
                data.executorId.map(async (id) => {
                    await new Promise(async (resolve, reject) => {
                        (await Connection.connect()).run(
                            `UPDATE executors
                             SET counter = counter + 1
                             WHERE id = ?`,
                            [id],
                            err => {
                                if (err) reject(err)
                                else resolve()
                            }
                        )
                    })
                })
            )

            await Promise.all(
                data.executorId.map(async (id) => {
                    await new Promise(async (resolve, reject) => {
                        (await Connection.connect()).run(
                            "INSERT INTO execution_executors (execution_id, executor_id) VALUES(?, ?)",
                            [lastExecutionId, id],
                            (err) => {
                                if (err) reject(err)
                                else resolve()
                            }
                        )
                    })
                })
            )

            await new Promise(async (resolve, reject) => {
                (await Connection.connect()).run(
                    `INSERT INTO incoming (type_id, requisite_id, resolution_id, execution_id, description,
                                           term_control, info, complete)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [data.typeId, lastRequisiteId, lastResolutionId, lastExecutionId, data.description, data.termControlDate, data.info, data.statusId],
                    err => {
                        if (err) reject(err)
                        else resolve()
                    }
                )
            })

            await Loader.loadData()

            await Connection.disconnect()
            return true
        } catch (err) {
            console.log(err)
            throw err
        }
    }
    static async #postMeta(data) {
        try {
                await new Promise(async (resolve, reject) => {
                    (await Connection.connect()).run(
                        `INSERT INTO ${Store.getThisPage()} (name, enable, counter)
                         VALUES (?, ?, ?);`,
                        [data.name, data.enable, data.counter],
                        err => {
                            if (err) reject(err)
                            else resolve()
                        })
                })

            await Loader.loadData()
            await Connection.disconnect()
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}