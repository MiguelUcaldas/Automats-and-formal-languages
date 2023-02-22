import Template from './template.js'

export default class Uinterface {
    // To Translate from control to GoJS data types.
    constructor() {
        this.go = window.go
        this.$ = this.go.GraphObject.make  // Acceder al constructor de objetos GoJS

        this.automats = []
        this.automata = null

        // this.diagrams = []
        this.diagram = null

        this.nodes = []
        this.links = []
        this.template = new Template()
        this.myDiv = document.getElementById('myDiagramDiv')
    }

    /**
     * Run initializes the view of the automats we're working with.
     * @param {automats} automats is the global object that hast to be in a separated Diagram for each one. Also when is given should be global in the constructor, so interface can create each one with a function.
     */
    run(automats) {
        console.log('Interface activated.')
        this.automats = automats
        this.createAutomats()
    }

    createAutomats() {
        this.createDiagram()

        this.automats.forEach(automata => {
            this.createNodes(automata.getStates())
            this.createLinks(automata.getTransitions())
        })
        console.log(this.nodes)
        this.diagram.model = new go.GraphLinksModel(this.nodes, this.links)
    }

    createDiagram() {
        this.diagram =
            this.$(go.Diagram, this.myDiv,
                { initialContentAlignment: go.Spot.Center }
            )
    }

    createNodes(states) {
        states.forEach(state => {
            this.nodes.push({ key: state.data, size: 50, color: 'lightblue', shape: 'Circle' })
        })
        // this.nodes = [
        //     { key: 'Alpha', size: 70, color: 'lightblue', shape: 'Circle' },
        //     { key: 'Beta', size: 50, color: 'orange', shape: 'Rectangle' },
        //     { key: 'Gamma', size: 60, color: 'lightgreen', shape: 'Triangle' },
        //     { key: 'Delta', size: 40, color: 'pink', shape: 'Diamond' }
        // ]

        this.diagram.nodeTemplate =
            this.$(go.Node, 'Auto',
                this.$(go.Shape, { fill: 'white', stroke: 'gray', strokeWidth: 2 },
                    new go.Binding('figure', 'shape'),
                    new go.Binding('fill', 'color')),
                this.$(go.TextBlock, { margin: 10, editable: true },
                    new go.Binding('text', 'key'))
            )
        // this.diagram.model = new go.GraphLinksModel(nodeDataArray, [])
    }

    createLinks(transitions) {
        transitions.forEach(transition => {
            this.links.push({ from: transition.start, to: transition.end, color: 'green' })
        })
        // this.links = [
        //     { from: 'Alpha', to: 'Beta' },
        //     { from: 'Gamma', to: 'Delta' }
        // ]

        this.diagram.linkTemplate =
            this.$(go.Link,
                this.$(go.Shape, { strokeWidth: 2 },
                    new go.Binding('stroke', 'color')),
                this.$(go.Shape, { toArrow: 'OpenTriangle', stroke: null },
                    new go.Binding('fill', 'color'))
            )

        // this.diagram.model = new go.GraphLinksModel(this.nodes, []/* linkDataArray */)
    }
}

// animateNodes() {
//     var animationManager =
// this.go(go.AnimationManager)
//     var nodeOrder = ['Alpha', 'Beta', 'Gamma', 'Delta']

//     var animation = new this.go.Animation()
//     animation.add(0, (time) => {
//         var index = Math.floor(time * 4)
//         var node = myDiagram.findNodeForKey(nodeOrder[index])
//         if (node !== null) {
//             var pos = node.position.copy()
//             pos.x += node.actualBounds.width / 2
//             pos.y += node.actualBounds.height / 2
//             var text = myDiagram.makeTextBlock(nodeOrder[index], 'Arial', 14, 'black')
//             text.opacity = 0
//             text.position = pos
//             myDiagram.add(text)
//             animation.add(time + 1, (t) => {
//                 text.opacity =
// t
    //                 text.position = pos.copy().offset(0, -t * 20)
    //             })
    //             animation.add(time + 2, (t) => {
    //                 text.opacity = 1 - t
    //                 text.position = pos.copy().offset(0, -20 + (t * 20))
    //             })
    //             animation.add(time + 3, (t) => {
    //                 myDiagram.rem2ove(text)
    //             })
    //         }
    //     }, 4)

    //     animationManager.runAnimation(animation)
    // }
