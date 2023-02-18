import State from './state.js'
import Transition from './transition.js'
/* TODO: Maybe FunctionTrans class??? */

export default class Automata {
    constructor(transition) {
        this.states = []
        this.transitions = []
        this.alphabet = ''
        this.transitionFunction = transition
        // this.Function = algorithm
    }

    runTransitionFunction() {
        this.transitionFunction()
    }

    setStates(states) {
        this.states = states
    }
    getStates() {
        return this.states
    }
    getState(data) {
        return this.states.find(state => state.data.includes(data))
        // console.log(`State "${data}" couldn't be found.`)
    }

    setTransitions(transitions) {
        this.transitions = transitions
    }
    getTransitions() {
        return this.transitions
    }

    getAlphabet() {
        return this.alphabet
    }

    existObj(list, obj) {
        return list.some(item => JSON.stringify(item) === JSON.stringify(obj))
    }

    existState(data) {
        return this.states.some(state => state.data.includes(data));
    }

    newState(data, final) {
        let newState = new State(data)
        if (final) newState.isEnd = true
        if (this.existObj(this.states, newState)) {
            console.log('State already exists.')
            return
        }

        this.states.push(newState)
        console.log('New state added.')
    }

    newTransition(start, end, data) {
        let newTransition = new Transition(start, end, data)

        if (this.existObj(this.transitions, newTransition)) {
            console.log('Transition already exists.')
            return
        }

        if (this.existState(start) && this.existState(end)) {
            if (this.alphabet.test(data)) {
                let state = this.getState(start)
                state.getAdjacent().push(end)
                this.transitions.push(newTransition)

                console.log('New transition added.')
                return
            }
        }
        console.log('No transition added.')
    }

    setAlphabet(symbols) {
        this.alphabet = new RegExp(`^[${symbols}]+$`)
        console.log('Alphabet defined.')
    }

    seeStates(str = '') {
        this.states.forEach(state => {
            str += state.toString() + ' '
        })
        return str
    }

    seeTransitions() {
        let str = ''
        this.transitions.forEach(transition => {
            str += transition.toString() + ' '
        })
        return str
    }

    /*  */

    readString(string) {
        // read each character of the string
        for (let i = 0; i < string.length; i++) {
            console.log(string[i])

        }
    }


    // activate() {

    // }

}