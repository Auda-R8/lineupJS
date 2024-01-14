const handlebars = require('handlebars')

export class Helper {

    static getMetadataList() {
        handlebars.registerHelper('getMetadataList', (metadata, name) => {
            let getRows = elem => {
                if (elem.enable === 1) return '<li data-value="' + elem.id + '">' + elem.name + '</li>'
            }

            if (name.includes('types'))
                return metadata.types.map(getRows).join('\n')
            else if (name.includes('senders'))
                return metadata.senders.map(getRows).join('\n')
            else if (name.includes('directors'))
                return metadata.directors.map(getRows).join('\n')
            else if (name.includes('executors'))
                return metadata.executors.map(getRows).join('\n')
            else return undefined
        })
    }
}