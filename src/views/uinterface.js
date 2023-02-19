export default class Uinterface {
    // To Translate from control to GoJS data types.
    constructor() {

    }

    run(automats) {


    }

    createNodes() {
        var nodeDataArray = [
            { key: "Alpha", size: 70, color: "lightblue", shape: "Circle" },
            { key: "Beta", size: 50, color: "orange", shape: "Rectangle" },
            { key: "Gamma", size: 60, color: "lightgreen", shape: "Triangle" },
            { key: "Delta", size: 40, color: "pink", shape: "Diamond" }
        ];

        var nodeTemplate = $(go.Node, "Auto",
            $(go.Shape, { fill: "white", stroke: "gray", strokeWidth: 2 },
                new go.Binding("figure", "shape"),
                new go.Binding("fill", "color")),
            $(go.TextBlock, { margin: 10, editable: true },
                new go.Binding("text", "key"))
        );

        var myDiagram = $(go.Diagram, "myDiagramDiv",
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

        var myDiagram = $(go.Diagram, "myDiagramDiv",
            {
                initialContentAlignment: go.Spot.Center
            }
        );

        myDiagram.linkTemplate = $(go.Link,
            $(go.Shape, { strokeWidth: 2 },
                new go.Binding("stroke", "color")),
            $(go.Shape, { toArrow: "OpenTriangle", stroke: null },
                new go.Binding("fill", "color"))
        );

        myDiagram.model = new go.GraphLinksModel([], linkDataArray);
    }

    animateNodes() {
        var animationManager = $(go.AnimationManager);
        var nodeOrder = ["Alpha", "Beta", "Gamma", "Delta"];

        var animation = new go.Animation();
        animation.add(0, (time) => {
            var index = Math.floor(time * 4);
            var node = myDiagram.findNodeForKey(nodeOrder[index]);
            if (node !== null) {
                var pos = node.position.copy();
                pos.x += node.actualBounds.width / 2;
                pos.y += node.actualBounds.height / 2;
                var text = myDiagram.makeTextBlock(nodeOrder[index], "Arial", 14, "black");
                text.opacity = 0;
                text.position = pos;
                myDiagram.add(text);
                animation.add(time + 1, (t) => {
                    text.opacity = t;
                    text.position = pos.copy().offset(0, -t * 20);
                });
                animation.add(time + 2, (t) => {
                    text.opacity = 1 - t;
                    text.position = pos.copy().offset(0, -20 + (t * 20));
                });
                animation.add(time + 3, (t) => {
                    myDiagram.remove(text);
                });
            }
        }, 4);

        animationManager.runAnimation(animation);
    }


    //     // Función para generar el diagrama GoJS a partir de los datos del archivo JSON
    //     generateDiagram(data) {
    //         // Crear el diagrama GoJS
    //         let $ = go.GraphObject.make
    //         let myDiagram = $(go.Diagram, 'myDiagramDiv')

    //         // Crear los nodos a partir de los datos del archivo JSON
    //         let nodeDataArray = []
    //         data.nodes.forEach(function (node) {
    //             nodeDataArray.push({ key: node.key, color: node.color })
    //         })

    //         // Crear las relaciones a partir de los datos del archivo JSON
    //         let linkDataArray = []
    //         data.links.forEach(function (link) {
    //             linkDataArray.push({ from: link.from, to: link.to, text: link.text })
    //         })

    //         // Configurar el modelo de datos del diagrama
    //         let model = new go.GraphLinksModel(nodeDataArray, linkDataArray)
    //         myDiagram.model = model
    //     }
}