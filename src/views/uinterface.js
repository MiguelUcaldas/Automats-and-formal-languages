import Template from './template.js'
// import * as go from 'gojs'

export default class Uinterface {
    // To Translate from control to GoJS data types.
    constructor() {
        this.go = window.go
        this.$ = this.go.GraphObject.make  // Acceder al constructor de objetos GoJS

        // this.go = go

        this.automats = []
        this.automata = null

        this.diagrams = []
        this.diagram = null

        this.nodes = []
        this.links = []
        this.template = new Template()
    }

    run(automats) {
        console.log('Interface activated.')
        this.createDiagram()
    }

    createDiagram() {

        let myDiagram =
            this.$(this.go.Diagram, "myDiagramDiv",
                {
                    initialContentAlignment: this.go.Spot.Center,
                    // Otras opciones de configuración del diagrama
                }
            )
        this.diagram = myDiagram
    }
    createNodes() {
        var nodeDataArray = [
            { key: "Alpha", size: 70, color: "lightblue", shape: "Circle" },
            { key: "Beta", size: 50, color: "orange", shape: "Rectangle" },
            { key: "Gamma", size: 60, color: "lightgreen", shape: "Triangle" },
            { key: "Delta", size: 40, color: "pink", shape: "Diamond" }
        ];

        var nodeTemplate =
            this.$(go.Node, "Auto",
                this.$(go.Shape, { fill: "white", stroke: "gray", strokeWidth: 2 },
                    new go.Binding("figure", "shape"),
                    new go.Binding("fill", "color")),
                this.$(go.TextBlock, { margin: 10, editable: true },
                    new go.Binding("text", "key"))
            );

        var myDiagram = this.$(go.Diagram, "myDiagramDiv",
            {
                initialContentAlignment: go.Spot.Center
            }
        );

        myDiagram.nodeTemplate = nodeTemplate;
        myDiagram.model = new go.GraphLinksModel(nodeDataArray, []);
    }

    createLinks() {
        var linkDataArray = [
            { from: "Alpha", to: "Beta" },
            { from: "Gamma", to: "Delta" }
        ];

        var myDiagram = this.$(go.Diagram, "myDiagramDiv",
            {
                initialContentAlignment: go.Spot.Center
            }
        );

        myDiagram.linkTemplate = this.$(go.Link,
            this.$(go.Shape, { strokeWidth: 2 },
                new go.Binding("stroke", "color")),
            this.$(go.Shape, { toArrow: "OpenTriangle", stroke: null },
                new go.Binding("fill", "color"))
        );

        myDiagram.model = new go.GraphLinksModel([], linkDataArray);
    }
}

    // animateNodes() {
    //     var animationManager = this.go(go.AnimationManager)
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
    //                 text.opacity = t
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
