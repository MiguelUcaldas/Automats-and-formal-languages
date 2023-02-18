import Automata from '../models/automata.js'

export default class Control {
    constructor() {
        this.automats = []
        this.isShowingToast = false


        this.jsonBtn = document.getElementById('fileInput')
        this.unionBtn = document.getElementById('unionBtn')
        this.intersectionBtn = document.getElementById('intersectionBtn')
        this.inverseBtn = document.getElementById('inverseBtn')
        this.complementBtn = document.getElementById('complementBtn')
        this.clearBtn = document.getElementById('clearBtn')

        this.jsonBtn.addEventListener('change', this.clickJson.bind(this))
        this.unionBtn.addEventListener('click', this.union.bind(this))
        this.intersectionBtn.addEventListener('click', this.intersection.bind(this))
        this.inverseBtn.addEventListener('click', this.inverse.bind(this))
        this.complementBtn.addEventListener('click', this.complement.bind(this))
        this.clearBtn.addEventListener('click', this.clear.bind(this))
    }

    union() {
        console.log('Hiciste clic en el botón 1')
        // Aquí puedes colocar la función que quieras ejecutar cuando se haga clic en el botón 1
    }

    intersection() {
        console.log('Hiciste clic en el botón 2')
        // Aquí puedes colocar la función que quieras ejecutar cuando se haga clic en el botón 2
    }

    inverse() {
        console.log('Hiciste clic en el botón 3')
        // Aquí puedes colocar la función que quieras ejecutar cuando se haga clic en el botón 3
    }

    complement() {
        console.log('Hiciste clic en el botón 4')
        // Aquí puedes colocar la función que quieras ejecutar cuando se haga clic en el botón 4
    }

    clear() {
        console.log('Hiciste clic en el botón 5')
    }

    loadJson() { }


    clickJson(e) {
        let files = Array.from(e.target.files)
        files.forEach(file => {
            let reader = new FileReader()
            reader.onload = ((file) => {
                return (e) => {
                    let data = JSON.parse(e.target.result)
                    let automata = new Automata()

                    automata.setStates(data.states)
                    automata.setTransitions(data.transitions)
                    automata.setAlphabet(data.alphabet)
                    console.log('Json loaded as', automata)
                    this.showToast('New Json loaded!')
                }
            })(file)
            reader.readAsText(file)
        })
    }

    crearObjeto(json) {
        // Aquí creas y devuelves un objeto desde el JSON recibido
        // Puedes adaptar esta función a la clase que quieras
        return {
            propiedad1: json.propiedad1,
            propiedad2: json.propiedad2,
            propiedad3: json.propiedad3
        }
    }

    createAutomata() {
        let newAutomata = new Automata()
    }


    showToast(message) {
        if (this.isShowingToast) {
            return
        }

        this.isShowingToast = true

        const toastContainer = document.createElement('div')
        toastContainer.classList.add('toast-container')
        document.body.appendChild(toastContainer)

        const toast = document.createElement('div')
        toast.classList.add('toast')
        toast.textContent = message
        toastContainer.appendChild(toast)

        toast.style.opacity = 0
        toast.style.transform = 'translateX(100%)'

        setTimeout(() => {
            toast.style.opacity = 1
            toast.style.transform = 'translateX(0)'
        }, 10)

        setTimeout(() => {
            toast.style.opacity = 0
            toast.style.transform = 'translateX(-100%)'
            setTimeout(() => {
                toastContainer.remove()
                this.isShowingToast = false
            }, 500)
        }, 3000)
    }

}







