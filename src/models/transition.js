export default class Transition {
    constructor(start, end, data) {
        this.start = start
        this.end = end
        this.data = data
        this.pass = true
    }

    setStart(start) {
        this.start = start
    }
    getStart() {
        return this.start
    }

    setEnd(end) {
        this.end = end
    }
    getEnd() {
        return this.end
    }

    setData(load) {
        this.data = load
    }
    getData() {
        return this.data
    }

    setPass(pass) {
        this.pass = pass
    }
    getPass() {
        return this.pass
    }

    toString() {
        return `(${this.start} → ${this.end} ⟨${this.data} | ${this.pass}⟩)`
    }

}