export class UpdateData {

    static async updateIncoming(editedData, savedData) {
        console.log("Edited Data")
        console.log(editedData)
        console.log("Saved Data")
        console.log(savedData)
        // const getIndex = () => Stage.data.incomingData.findIndex(item => parseInt(item.id) === parseInt(editedData.id))
        // try {
        //     if (editedData.typeID !== savedData[0][1]) {
        //         await new Promise((resolve, reject) => {
        //             this.connect().run(
        //                 `UPDATE incoming
        //                  SET type_id = ?
        //                  WHERE id = ?`,
        //                 [parseInt(editedData.typeID), parseInt(editedData.id)],
        //                 err => {
        //                     if (err) reject(err)
        //                     resolve("Тип Вход. обновлен!")
        //                 }
        //             )
        //         })
        //
        //         console.log(getIndex())
        //         Stage.data.incomingData[getIndex()].typeId = editedData.typeID
        //         Stage.data.incomingData[getIndex()].typeName = editedData.typeName
        //     }
        //
        //     if (editedData.receipt !== savedData[0][2]) {
        //         await new Promise((resolve, reject) => {
        //             this.connect().run(`
        //                         UPDATE requisite
        //                         SET date = ?
        //                         WHERE id = ?`,
        //                 [editedData.receipt, editedData.requisiteID],
        //                 err => {
        //                     if (err) reject(err)
        //                     else resolve()
        //                 }
        //             )
        //         })
        //
        //         Stage.data.incomingData[getIndex()].receiptValue = editedData.receipt
        //         Stage.data.incomingData[getIndex()].receipt = editedData.receipt.split('-').reverse().join('.')
        //     }
        //
        //     if (parseInt(editedData.senderID) !== parseInt(savedData[0][3])) {
        //         await new Promise((resolve, reject) => {
        //             this.connect().run(`
        //                         UPDATE requisite
        //                         SET sender_id = ?
        //                         WHERE id = ?`,
        //                 [editedData.senderID, editedData.requisiteID],
        //                 err => {
        //                     if (err) reject(err)
        //                     else resolve()
        //                 }
        //             )
        //         })
        //
        //         Stage.data.incomingData[getIndex()].senderId = editedData.senderID
        //         Stage.data.incomingData[getIndex()].senderName = editedData.senderName
        //     }
        //
        //     if (editedData.num === '') editedData.num = savedData[0][4]
        //     if (editedData.num !== savedData[0][4]) {
        //         await new Promise((resolve, reject) => {
        //             this.connect().run(`
        //                         UPDATE requisite
        //                         SET number = ?
        //                         WHERE id = ?`,
        //                 [editedData.num, editedData.requsiteID],
        //                 err => {
        //                     if (err) reject(err)
        //                     else resolve()
        //                 }
        //             )
        //         })
        //
        //         Stage.data.incomingData[getIndex()].num = editedData.num
        //     }
        //
        //     if (editedData.desc === '') editedData.desc = savedData[0][5]
        //     if (editedData.desc !== savedData[0][5]) {
        //         await new Promise((resolve, reject) => {
        //             this.connect().run(`
        //                         UPDATE incoming
        //                         SET description = ?
        //                         WHERE id = ?`,
        //                 [editedData.desc, editedData.id],
        //                 err => {
        //                     if (err) reject(err)
        //                     else resolve()
        //                 }
        //             )
        //         })
        //
        //         Stage.data.incomingData[getIndex()].desc = editedData.desc
        //     }
        //
        //     if (parseInt(editedData.directorID) !== parseInt(savedData[0][6])) {
        //         await new Promise((resolve, reject) => {
        //             this.connect().run(`
        //                         UPDATE resolutions
        //                         SET director_id = ?
        //                         WHERE id = ?`,
        //                 [editedData.directorID, editedData.resolutionID],
        //                 err => {
        //                     if (err) reject(err)
        //                     else resolve()
        //                 }
        //             )
        //         })
        //
        //         Stage.data.incomingData[getIndex()].directorId = editedData.directorID
        //         Stage.data.incomingData[getIndex()].directorName = editedData.directorName
        //     }
        //
        //     if (editedData.resolution === '') editedData.resolution = savedData[0][7]
        //     if (editedData.resolution !== savedData[0][7]) {
        //         await new Promise((resolve, reject) => {
        //             this.connect().run(`
        //                         UPDATE resolutions
        //                         SET resolution = ?
        //                         WHERE id = ?`,
        //                 [editedData.resolution, editedData.resolutionID],
        //                 err => {
        //                     if (err) reject(err)
        //                     else resolve()
        //                 }
        //             )
        //         })
        //
        //         Stage.data.incomingData[getIndex()].resolution = editedData.resolution
        //     }
        //
        //     if (editedData.resolutionDate === '') editedData.resolutionDate = savedData[0][8]
        //     if (editedData.resolutionDate !== savedData[0][8]) {
        //         await new Promise((resolve, reject) => {
        //             this.connect().run(`
        //                         UPDATE resolutions
        //                         SET resolution_date = ?
        //                         WHERE id = ?`,
        //                 [editedData.resolutionDate, editedData.resolutionID],
        //                 err => {
        //                     if (err) reject(err)
        //                     else resolve()
        //                 }
        //             )
        //         })
        //
        //         Stage.data.incomingData[getIndex()].resolutionDateValue = editedData.resolutionDate
        //         Stage.data.incomingData[getIndex()].resolutionDate = editedData.resolutionDate.split('-').reverse().join('.')
        //     }
        //
        //     await new Promise((resolve, reject) => {
        //         this.connect().run(
        //             `DELETE
        //              FROM execution_executors
        //              WHERE execution_id = ?`,
        //             [editedData.executionID],
        //             err => {
        //                 if (err) reject(err)
        //                 else resolve()
        //             }
        //         )
        //     }).then()
        //
        //     await editedData.executorsID.forEach(elem => {
        //         new Promise((resolve, reject) => {
        //             this.connect().run(
        //                 "INSERT INTO execution_executors (execution_id, executor_id) VALUES(?, ?)",
        //                 [editedData.executionID, elem],
        //                 (err) => {
        //                     if (err) reject(err)
        //                     else resolve()
        //                 }
        //             )
        //         })
        //     })
        //
        //     if (editedData.executionDate !== savedData[0][10]) {
        //         await new Promise((resolve, reject) => {
        //             this.connect().run(`
        //                         UPDATE execution
        //                         SET date = ?
        //                         WHERE id = ?`,
        //                 [editedData.executionDate, editedData.executionID],
        //                 err => {
        //                     if (err) reject(err)
        //                     else resolve()
        //                 }
        //             )
        //         })
        //
        //         Stage.data.incomingData[getIndex()].executorDateValue = editedData.executionDate
        //         Stage.data.incomingData[getIndex()].executorDate = editedData.executionDate.split('-').reverse().join('.')
        //     }
        //
        //     if (editedData.termControl !== savedData[0][11]) {
        //         await new Promise((resolve, reject) => {
        //             this.connect().run(`
        //                         UPDATE incoming
        //                         SET term_control = ?
        //                         WHERE id = ?`,
        //                 [editedData.termControl, editedData.id],
        //                 err => {
        //                     if (err) reject(err)
        //                     else resolve()
        //                 }
        //             )
        //         })
        //
        //         Stage.data.incomingData[getIndex()].termControlValue = editedData.termControl
        //         Stage.data.incomingData[getIndex()].termControl = editedData.termControl.split('-').reverse().join('.')
        //     }
        //
        //     if (editedData.info === '') editedData.info = savedData[0][12]
        //     else if (editedData.info !== savedData[0][12]) {
        //         await new Promise((resolve, reject) => {
        //             this.connect().run(`
        //                         UPDATE incoming
        //                         SET info = ?
        //                         WHERE id = ?`,
        //                 [editedData.info, editedData.id],
        //                 err => {
        //                     if (err) reject(err)
        //                     else resolve()
        //                 }
        //             )
        //         })
        //
        //         Stage.data.incomingData[getIndex()].info = editedData.info
        //     }
        //
        //
        //     if (editedData.status !== savedData[0][13]) {
        //         await new Promise((resolve, reject) => {
        //             this.connect().run(`
        //                         UPDATE incoming
        //                         SET complete = ?
        //                         WHERE id = ?`,
        //                 [editedData.status, editedData.id],
        //                 err => {
        //                     if (err) reject(err)
        //                     else resolve()
        //                 }
        //             )
        //         })
        //
        //         Stage.data.incomingData[getIndex()].statusId = editedData.status
        //         Stage.data.incomingData[getIndex()].statusName = editedData.statusName
        //     }
        //
        //     Stage.data.lastId = await new Promise((resolve, reject) => {
        //         this.connect().get(`
        //                     SELECT id
        //                     FROM incoming
        //                     ORDER BY id DESC LIMIT 1`,
        //             (err, row) => {
        //                 if (err) reject(err)
        //                 else resolve(row)
        //             })
        //     })
        //
        //     console.log(Stage.data.incomingData)
        //     Stage.data.executorsTable = [];
        //     await Database.getExecutorsTable().then(rows => {
        //         HandlerData.handlerExecutors(rows)
        //     })
        //     await Handler.updateEditedRow(Manager.getThisTable(), savedData, editedData)
        //     await Manager.loadNotify()
        //
        //     this.connect().close()
        // } catch (err) {
        //     console.log(err)
        //     throw (err)
        // }
    }

    static async updateMetadata(editedData, savedData, tableName) {
        try {

            if (editedData.name === '') {
                editedData.name = savedData[0][1]
            }

            if (editedData.name !== savedData[0][1]) {
                await new Promise((resolve, reject) => {
                    this.connect().run(`
                                UPDATE ${tableName}
                                SET name = ?
                                WHERE id = ?`,
                        [editedData.name, parseInt(editedData.id)],
                        err => {
                            if (err) reject(err)
                            else resolve()
                        }
                    )
                })

                Stage.data.metaData[tableName][editedData.id - 1].name = editedData.name
            }

            if (editedData.enable !== savedData[0][2]) {
                await new Promise((resolve, reject) => {
                    this.connect().run(`
                                UPDATE ${tableName}
                                SET enable = ?
                                WHERE id = ?`,
                        [editedData.enable, parseInt(editedData.id)],
                        (err => {
                            if (err) reject(err)
                            else resolve()
                        })
                    )
                })

                Stage.data.metaData[tableName][editedData.id - 1].enable = editedData.enable
            }

            await Handler.updateEditedRow('metadata', tableName, editedData)

            this.connect().close()
        } catch (err) {
            console.log(err)
            throw err
        }
    }
}