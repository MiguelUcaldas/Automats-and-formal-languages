import Template from './template.js'

export default class UInterface {
    // To Translate from control to GoJS data types.
    constructor() {
        this.go = window.go
        this.$ = this.go.GraphObject.make  // Accesor to the object constructor of GoJS

        this.automats = []
        this.automata = null

        this.diagram = null

        this.nodes = []
        this.links = []
        this.template = new Template()
        this.myDiv = document.getElementById('myDiagramDiv')
    }

    /**
     * Run initializes the view of the automats we're working with.
     * @param {automats} automats is the global list that has the Automats objects. Also, when is given * should be global in the constructor, so interface can create and edit each one as needed.
     */
    run(automats) {
        console.log('Interface activated.')
        this.automats = automats
        this.createDiagram()

        this.createAutomats()
    }

    createAutomats() {
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

    //| Red: ##FC8181, #F6AD55 | Green #48BB78, #9AE6B4 | Blue: #4FD1C5, #81E6D9 |
    createNodes(states) {
        states.forEach(state => {
            this.nodes.push({ key: state.data, size: 50, color: 'lightblue', shape: 'Circle' })
        })

        this.diagram.nodeTemplate = this.getNodeTemplate('#FC8181', '#F6AD55');
    }

    createLinks(transitions) {
        transitions.forEach(transition => {
            this.links.push({ from: transition.start, to: transition.end, color: 'green' })
        })

        this.diagram.linkTemplate = this.getLinkTemplate();
    }

    getNodeTemplate(color0, color1) {
        return this.$(go.Node, 'Auto',
            this.$(go.Shape, 'Circle', // Cambiar la forma del nodo a un círculo
                {
                    fill: this.$(go.Brush, 'Linear', {  // Crear un gradiente de color
                        0: color0,  // Color de inicio
                        1: color1   // Color de fin
                    }),
                    strokeWidth: 2,  // Aumentar el grosor del borde del nodo
                    stroke: '#FEB2B2'  // Cambiar el color del borde
                }),
            this.$(go.TextBlock, { margin: 8 },
                new go.Binding('text', 'key'))
        )
    }

    getLinkTemplate() {
        return this.$(go.Link,
            { curve: go.Link.Bezier },
            this.$(go.Shape, { strokeWidth: 2, stroke: '#CBD5E0' }), // Cambiar el grosor y color de la línea de la relación
            this.$(go.Shape, { toArrow: 'Standard', stroke: '#CBD5E0' }), // Cambiar el color y agregar la flecha de la relación
            this.$(go.TextBlock,
                new go.Binding('text', 'key'))
        )
    }
}