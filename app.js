document.addEventListener('DOMContentLoaded', init)

async function init() {
    // enter()
    // read()
    // let program = new Control()

    // program.optionsMenu()
    // Obtener el botón de carga de archivos
    let fileInput = document.getElementById('fileInput')

    // Agregar un evento al botón de carga de archivos
    fileInput.addEventListener('change', function (event) {
        // Obtener el archivo seleccionado
        let file = event.target.files[0]

        // Crear un lector de archivos
        let reader = new FileReader()

        // Agregar un evento para cuando el archivo se cargue correctamente
        reader.addEventListener('load', function (event) {
            // Obtener los datos del archivo JSON
            let data = JSON.parse(event.target.result)

            // Generar el diagrama GoJS a partir de los datos del archivo JSON
            generateDiagram(data)
        })

        // Leer el archivo como texto
        reader.readAsText(file)
    })

    // Función para generar el diagrama GoJS a partir de los datos del archivo JSON
    function generateDiagram(data) {
        // Crear el diagrama GoJS
        let $ = go.GraphObject.make
        let myDiagram = $(go.Diagram, 'myDiagramDiv')

        // Crear los nodos a partir de los datos del archivo JSON
        let nodeDataArray = []
        data.nodes.forEach(function (node) {
            nodeDataArray.push({ key: node.key, color: node.color })
        })

        // Crear las relaciones a partir de los datos del archivo JSON
        let linkDataArray = []
        data.links.forEach(function (link) {
            linkDataArray.push({ from: link.from, to: link.to, text: link.text })
        })

        // Configurar el modelo de datos del diagrama
        let model = new go.GraphLinksModel(nodeDataArray, linkDataArray)
        myDiagram.model = model
    }
}
    // Crear el diagrama
    // let $ = go.GraphObject.make  // Acceder al constructor de objetos GoJS
    // let myDiagram =
    //     $(go.Diagram, 'myDiagramDiv',
    //         {
        //             // Configurar el diagrama
//             'undoManager.isEnabled': true // Permite deshacer y rehacer cambios
//         })

// // Crear los nodos
// myDiagram.nodeTemplate =
//     $(go.Node, 'Auto',
//         $(go.Shape, 'Circle', // Cambiar la forma del nodo a un círculo
//             {
//                 fill: $(go.Brush, 'Linear', {  // Crear un gradiente de color
//                     0: '#FC8181',  // Color de inicio
//                     1: '#F6AD55'   // Color de fin
//                 }),
//                 strokeWidth: 2,  // Aumentar el grosor del borde del nodo
//                 stroke: '#FEB2B2'  // Cambiar el color del borde
//             }),
//         $(go.TextBlock, { margin: 8 },
//             new go.Binding('text', 'key'))
//     )

// // Crear las relaciones
// myDiagram.linkTemplate =
//     $(go.Link,
//         $(go.Shape, { strokeWidth: 2, stroke: '#CBD5E0' }), // Cambiar el grosor y color de la línea de la relación
//         $(go.Shape, { toArrow: 'Standard', stroke: '#CBD5E0' }), // Cambiar el color y agregar la flecha de la relación
//         $(go.TextBlock,
//             new go.Binding('text', 'key'))
//     )

// let model = $(go.GraphLinksModel)

// model.nodeDataArray = [
//     { key: 'Nodo 1' },
//     { key: 'Nodo 2' }
// ]

// model.linkDataArray = [
//     { from: 'Nodo 1', to: 'Nodo 2', key: 'Relación' }
// ]

// myDiagram.model = model
