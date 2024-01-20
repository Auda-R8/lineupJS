import {Store} from '../../store/Store.js'
import {Connection} from './Connection.js'
import {HandlerDataRows} from '../handler/HandlerDataRows.js'
import {Loader} from '../interface/Loader.js'

export class PostData {

    static async post(data) {
        if (Store.getThisPage().includes('incoming'))
            PostData.#postIncoming(data).then()
        else PostData.#postMeta(data).then()
    }

    static async #postIncoming(data) {
        try {
            let lastId = data.id
            console.log(data)

            await new Promise(async (resolve, reject) => {
                (await Connection.connect()).run(
                    `INSERT INTO requisite (sender_id, number, date)
                     VALUES (?, ?, ?)`,
                    [data.senderId, data.num, data.requisiteDate],
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

            // const row = await new Promise(async (resolve, reject) => {
            //     (await Connection.connect()).all(`SELECT incoming.id                 AS id,
            //                    incoming.description        AS description,
            //
            //                    incoming.type_id            AS typeId,
            //                    types.name                  AS typeName,
            //
            //                    incoming.requisite_id       AS requisiteId,
            //                    requisite.date              AS requisiteDate,
            //                    requisite.number            AS requisiteNumber,
            //
            //                    requisite.sender_id         AS senderId,
            //                    senders.name                AS senderName,
            //
            //                    incoming.resolution_id      AS resolutionId,
            //                    resolutions.resolution      AS resolutionDesc,
            //                    resolutions.resolution_date AS resolutionDate,
            //
            //                    resolutions.director_id     AS directorId,
            //                    directors.name              AS directorName,
            //
            //                    execution.id                AS executionId,
            //                    execution.date              AS executionDate,
            //
            //                    incoming.info               AS info,
            //                    incoming.complete           AS statusId,
            //                    incoming.term_control       AS termControl
            //             FROM incoming
            //                      LEFT JOIN types
            //                                ON types.id = incoming.type_id
            //                      LEFT JOIN requisite ON requisite.id = incoming.requisite_id
            //                      LEFT JOIN senders ON senders.id = requisite.sender_id
            //                      LEFT JOIN resolutions ON resolutions.id = incoming.resolution_id
            //                      LEFT JOIN directors ON directors.id = resolutions.director_id
            //                      LEFT JOIN execution ON execution.id = incoming.execution_id
            //             WHERE incoming.id = ${data.id};`,
            //         (err, row) => {
            //             if (err) reject(err)
            //             else resolve(row)
            //         }
            //     )
            // })

            await Loader.loadData()

            await Connection.disconnect()
            return true
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    static
    async addMetadata(data, tableName) {
        try {
            let lastInsertedId = data.id
            console.log(lastInsertedId)

            await new Promise((resolve, reject) => {
                this.connect().run(
                    `INSERT INTO ${tableName} (name, enable)
                     VALUES (?, ?);`,
                    [data.name, data.enable],
                    err => {
                        if (err) reject(err)
                        else resolve()
                    })
            })

            const row = await new Promise((resolve, reject) => {
                this.connect().all(
                    `SELECT *
                     FROM ${tableName}
                     WHERE id = ?`,
                    [lastInsertedId],
                    (err, row) => {
                        if (err) reject(err)
                        else resolve(row)
                    })
            })

            console.log(row)
            await Manager.getMetadata()[tableName].push(row)
            await HandlerData.handlerMetadata(row, tableName)
            await Manager.getMetadataTable(tableName)

            console.log("updated!");

            this.connect().close()
            return true;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }


    static async #postMeta(data) {
        console.log(data)
        return
        try {
            let lastInsertedId = data.id
            console.log(lastInsertedId)

            await new Promise((resolve, reject) => {
                this.connect().run(
                    `INSERT INTO ${tableName} (name, enable)
                     VALUES (?, ?);`,
                    [data.name, data.enable],
                    err => {
                        if (err) reject(err)
                        else resolve()
                    })
            })

            const row = await new Promise((resolve, reject) => {
                this.connect().all(
                    `SELECT *
                     FROM ${tableName}
                     WHERE id = ?`,
                    [lastInsertedId],
                    (err, row) => {
                        if (err) reject(err)
                        else resolve(row)
                    })
            })

            console.log(row)
            await Manager.getMetadata()[tableName].push(row)
            await HandlerData.handlerMetadata(row, tableName)
            await Manager.getMetadataTable(tableName)

            console.log("updated!");

            this.connect().close()
            return true;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}