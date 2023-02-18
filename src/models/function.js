import State from "./state"

export default class Function {
    constructor(automata, string) {
        this.actualState = null
        this.automata = automata
        this.string = string
        this.reading = 0
    }

    activate(string) {
        this.actualState = this.automata.getStates()[0]
        let acceptable = false
        for (let i = 0; i < string.length; i++) {
            acceptable = this.nextState()
        }
    }

    nextState() {
        if (this.reading === this.string.length) {
            console.log('All string has been red.')
            return
        }
        if (this.actualState == null) {
            console.log('No initial state. Defined to initial one.')
            this.actualState = this.automata.getStates()[0]
            return
        }
        let transitions = this.automata.getTransitions()
        let adjacent = this.automata.actualState.getAdjacent()

        transitions.forEach(transition => {
            if (this.actualState.getData() === transition.getStart()) {
                adjacent.forEach(state => {
                    if (state.getData() === transition.getEnd()) {
                        // Final verification
                        if (transition.getData() === this.string[this.reading]) {
                            // State changing!
                            console.log('previous state: ' + this.actualState.getData())
                            this.actualState = state
                            console.log('actual state: ' +
                                this.actualState.getData(), 'changed by', this.string[this.reading])
                            return this.actualState
                        }
                    }
                })
            }
        })
        this.reading++
    }

    setActualState(actualState) {
        this.actualState = actualState
    }
}