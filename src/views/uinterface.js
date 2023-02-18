export default class Uinterface {
    // To Translate from control to GoJS data types.
    constructor() {

    }












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