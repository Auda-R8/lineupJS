import {Connection} from './Connection.js'

export class FetchData {

    static async fetchIncoming() {
        return await new Promise(async (resolve, reject) => {
            (await Connection.connect()).all(`
                SELECT incoming.id                 AS id,
                       incoming.description        AS description,
                       
                       incoming.type_id            AS typeId,
                       types.name                  AS typeName,
                       
                       incoming.requisite_id       AS requisiteId,
                       requisite.date              AS requisiteDate,
                       requisite.number            AS requisiteNumber,
                       
                       requisite.sender_id         AS senderId,
                       senders.name                AS senderName,
                       
                       incoming.resolution_id      AS resolutionId,
                       resolutions.resolution      AS resolutionDesc,
                       resolutions.resolution_date AS resolutionDate,
                       
                       resolutions.director_id     AS directorId,
                       directors.name              AS directorName,
                       
                       execution.id                AS executionId,
                       execution.date              AS executionDate,
                       
                       incoming.info               AS info,
                       incoming.complete           AS statusId,
                       incoming.term_control       AS termControl
                FROM incoming
                         LEFT JOIN types
                                   ON types.id = incoming.type_id
                         LEFT JOIN requisite ON requisite.id = incoming.requisite_id
                         LEFT JOIN senders ON senders.id = requisite.sender_id
                         LEFT JOIN resolutions ON resolutions.id = incoming.resolution_id
                         LEFT JOIN directors ON directors.id = resolutions.director_id
                         LEFT JOIN execution ON execution.id = incoming.execution_id;
            `, (err, rows) => {
                if (err) reject(err)
                Connection.disconnect()
                resolve(rows)
            })
        })
    }

    static async fetchMeta(tableName) {
        return await new Promise(async (resolve, reject) => {
            await Connection.connect().all(`
                SELECT *
                FROM ${tableName}
            `, (err, rows) => {
                if (err) reject(err)
                Connection.disconnect()
                resolve(rows)
            })
        })
    }

    static async fetchNotify() {
        return await new Promise(async (resolve, reject) => {
            await Connection.connect().all(`
                SELECT id, term_control
                FROM incoming
                WHERE complete = 0
            `, (err, rows) => {
                if (err) reject(err)
                Connection.disconnect()
                resolve(rows)
            })
        })
    }

    static async getExecutorsTable() {
        return await new Promise(async (resolve, reject) => {
            await Connection.connect().all(`
                SELECT execution.id AS en, name, e.id AS executor_id, incoming.id AS id
                FROM execution
                         JOIN execution_executors on execution.id = execution_executors.execution_id
                         JOIN executors e on execution_executors.executor_id = e.id
                         JOIN incoming on execution.id = incoming.execution_id;
            `, (err, rows) => {
                if (err) reject(err)
                Connection.disconnect()
                resolve(rows)
            })
        })
    }
}