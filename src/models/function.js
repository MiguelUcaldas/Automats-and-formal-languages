export default class Function {
    constructor(automata, string) {
        this.actualState = this.getInitialState()
        this.automata = automata
        this.string = string
        this.index = 0
    }

    getInitialState() {
        let states = this.automata.getStates()
        for (let i = 0; i < states.length; i++) {
            if (states[i].getIsStart()) {
                return states[i]
            }
        }
    }

    activate(string) {
        this.actualState = this.automata.getStates()[0]
        let acceptable = false
        for (let i = 0; i < string.length; i++) {
            if (this.actualState.isEnd())
                acceptable = this.nextState()
        }
    }

    nextState() {
        if (this.index === this.string.length) {
            console.log('All string has been red.')
            return
        }

        let transitions = this.automata.getTransitions()
        transitions.forEach(transition => {
            if (actualState.getData() === transition.getStart().getData()) {
                chars = transition.getChars()
                chars.forEach(char => {
                    if (char === this.string[this.index]) {
                        console.log('actual state: ' + this.actualState.getData(), 'changed by', this.string[this.index])
                        this.actualState = transition.getEnd()

                        let alphabet = this.automata.getAlphabet()
                        if (alphabet.test(this.string[this.index])) {
                            this.index++
                            return this.actualState
                        } else {
                            console.log('Invalid char: ' + this.string[this.index])
                        }
                    }
                })
            }
        })
        console.log('No transition found.')
    }

    setActualState(actualState) {
        this.actualState = actualState
    }
}