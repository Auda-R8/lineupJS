import {Store} from '../../store/Store.js'
import {FetchData} from '../database/FetchData.js'
import {PageRenderer} from '../content/PageRenderer.js'
import {HandlerDataRows} from '../handler/HandlerDataRows.js'

export class Loader {
    static async loadData() {
        await Store.reset()

        await FetchData.fetchMeta('types').then(rows => HandlerDataRows.handlerMeta(rows.sort((a, b) => b.counter - a.counter), 'types'))
        await FetchData.fetchMeta('senders').then(rows => HandlerDataRows.handlerMeta(rows.sort((a, b) => b.counter - a.counter), 'senders'))
        await FetchData.fetchMeta('directors').then(rows => HandlerDataRows.handlerMeta(rows.sort((a, b) => b.counter - a.counter), 'directors'))
        await FetchData.fetchMeta('executors').then(rows => HandlerDataRows.handlerMeta(rows.sort((a, b) => b.counter - a.counter), 'executors'))

        await FetchData.fetchExecutorsTable().then(rows => HandlerDataRows.handlerExecutors(rows))

        await PageRenderer.registerPartials()
        await FetchData.fetchIncoming().then(async rows => await HandlerDataRows.handlerIncoming(rows))
        await PageRenderer.renderPageByName(Store.getThisPage())
        // await FetchData.fetchNotify().then(rows => HandlerDataRows.handlerNotify(rows))
    }
}