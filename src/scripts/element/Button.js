
export class Button {
    static reset() {
        console.log('reset')
        document.querySelector('#saveAll-btn').classList.add('hide')
        document.querySelector('#cancelAll-btn').classList.add('hide')

        document.querySelector('#confirmAdd-btn').classList.add('hide')
        document.querySelector('#cancelAdd-btn').classList.add('hide')
    }
}