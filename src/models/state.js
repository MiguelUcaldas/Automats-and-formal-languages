export default class State {
    constructor(data) {
        this.data = data
        this.isEnd = false
        this.adjacent = []
    }

    setData(data) {
        this.data = data
    }
    getData() {
        return this.data
    }

    getAdjacent() {
        return this.adjacent
    }
    setAdjacent(adjacent) {
        this.adjacent = adjacent
    }

    toString() {
        let brackets = !this.adjacent.length ? '[ ]' : `[ ${this.adjacent} ]`
        let data = this.data + ' | ' + brackets
        return this.isEnd ? `((${data}))` : `(${data})`
    }
}