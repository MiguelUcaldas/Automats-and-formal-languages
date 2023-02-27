export default class Function {
    constructor(automata) {
        this.automata = automata
        this.string = ''
        this.index = 0
        this.actualState = this.getInitialState()
    }

    setString(string) {
        this.string = string
    }

    getInitialState() {
        // console.log('AUTO:', this.automata)
        let states = this.automata.states
        for (let i = 0; i < states.length; i++) {
            // console.log(states)
            if (states[i].isStart) {
                return states[i]
            }
        }
    }

    activate(string) {
        this.actualState = this.automata.getStates()[0]
        let acceptable = false
        for (let i = 0; i < string.length; i++) {
            if (this.actualState.isEnd())
                acceptable = this.getNextState()
        }
    }

    getNextState() {
        if (this.index === this.string.length) {
            console.log('All string has been red.')
            return
        }
        let flag = true

        let transitions = this.automata.getTransitions()
        transitions.forEach(transition => {
            if ((this.actualState.data === transition.start) && flag) {
                let chars = transition.chars
                chars.forEach(char => {
                    if (char === this.string[this.index] && flag) {
                        console.log(`In AS ${this.actualState.data} == TS ${transition.start} Transition found!`)
                        // console.log('actual state: ' + this.actualState.data, 'changed by', this.string[this.index])
                        // GET THE STATE, NOT THE NAME CHAR

                        let alphabet = this.automata.getAlphabet()
                        if (alphabet.test(this.string[this.index])) {
                            console.log('TEST PASSED')
                            this.actualState = this.automata.getState(transition.end)
                            this.index++
                            console.log('STATE RETURNED:', this.actualState)
                            flag = false
                            // return this.actualState
                        } else {
                            console.log('Invalid char: ' + this.string[this.index])
                        }
                    }
                })
            } else {
                console.log(`In AS ${this.actualState.data} == TS ${transition.start} No transition found.`)
            }
        })
    }

    setActualState(actualState) {
        this.actualState = actualState
    }
    getActualState() {
        return this.actualState
    }
}