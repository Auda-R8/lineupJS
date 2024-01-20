

export class Validate {

    static validId(id) {
        if (id === null || id === undefined || id === '-') return 0
        else return id
    }

    static validMetaData(value) {
        if (value === null || value === '-' || value === undefined || value === '') return 'Отсутствует'
        else return value
    }

    static validDate(date) {
        if (date === null || date === undefined || date === '' || date === '-') return null
        else return date
    }

    static validDateValue(date) {
        if (date === null || date === undefined || date === '' || date === '-') return '-'
        else return date.split('-').reverse().join('.')
    }

    static validValue(value) {
        if (value === null || value === '-' || value === undefined || value === '') return '-'
        else return value
    }

    static validStatus(statusId) {
        if (statusId === 0) return 'Не выполнен'
        else if (statusId === 1) return 'Выполнен'
        else if (statusId === 2) return 'Во входящих'
        else if (statusId === 3) return '-'
    }
}