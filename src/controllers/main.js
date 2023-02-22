import Control from './control.js'

document.addEventListener('DOMContentLoaded', init)

async function init() {
    new Control()
    // go()
}

async function go() {
    let go = window.go;

    let $ = go.GraphObject.make;  // Acceder al constructor de objetos GoJS
    // Crear el diagrama
    let myDiagram =
        $(go.Diagram, "myDiagramDiv",
            {
                // Configurar el diagrama
                "undoManager.isEnabled": true // Permite deshacer y rehacer cambios
            });

    // Crear los nodos
    myDiagram.nodeTemplate =
        $(go.Node, "Auto",
            $(go.Shape, "Rectangle", { fill: "white" }),
            $(go.TextBlock, { margin: 8 },
                new go.Binding("text", "key"))
        );

    // Crear las relaciones
    myDiagram.linkTemplate =
        $(go.Link,
            $(go.Shape),
            $(go.Shape, { toArrow: "Standard" }),
            $(go.TextBlock,
                new go.Binding("text", "key"))
        );

    let model = $(go.GraphLinksModel);

    model.nodeDataArray = [
        { key: "Nodo 1" },
        { key: "Nodo 2" }
    ];

    model.linkDataArray = [
        { from: "Nodo 1", to: "Nodo 2", key: "Relación" }
    ];

    myDiagram.model = model;
}