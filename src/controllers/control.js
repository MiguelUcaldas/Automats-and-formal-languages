import Automata from '../models/automata.js'
import UInterface from '../views/uinterface.js'

export default class Control {
    constructor() {
        this.automats = []
        this.uinterface = new UInterface();

        this.jsonBtn = document.getElementById('fileInput')
        this.unionBtn = document.getElementById('unionBtn')
        this.nextBtn = document.getElementById('nextBtn')
        this.intersectionBtn = document.getElementById('intersectionBtn')
        this.inverseBtn = document.getElementById('inverseBtn')
        this.complementBtn = document.getElementById('complementBtn')
        this.clearBtn = document.getElementById('clearBtn')

        this.automataSel = document.getElementById('automataSel')

        this.jsonBtn.addEventListener('change', this.clickJson.bind(this))
        this.unionBtn.addEventListener('click', this.union.bind(this))
        this.nextBtn.addEventListener('click', this.next.bind(this))
        this.intersectionBtn.addEventListener('click', this.intersection.bind(this))
        this.inverseBtn.addEventListener('click', this.inverse.bind(this))
        this.complementBtn.addEventListener('click', this.complement.bind(this))
        this.clearBtn.addEventListener('click', this.clear.bind(this))

        this.automataSel.addEventListener('click', this.clear.bind(this))


        this.loadInterface()
    }

    loadInterface() {
        this.uinterface.run(this.automats)
    }

    union() {
        console.log('The union function was clicked.')
    }

    union() {
        console.log('The union function was clicked.')
    }

    intersection() {
        console.log('The intersection function was clicked.')
    }

    inverse() {
        console.log('The inverse function was clicked.')
    }

    complement() {
        console.log('The complement function was clicked.')
    }

    clear() {
        console.log('The clear function was clicked.')
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
                    files.length > 1 ?
                        this.showToast('New Automats from JSON!') :
                        this.showToast('New Automata from JSON!')

                    console.log('Json loaded as', automata)
                    this.automats.push(automata)
                    this.selectAutomata()
                }
            })(file)
            reader.readAsText(file)
        })
    }

    selectAutomata() {
        for (let i = 0; i < this.automats.length; i++) {
            let option = document.createElement(`option`)
            option.value = `value ${i}`
            option.textContent = `option ${i}`
            this.automataSel.appendChild(option)
        }
    }

    showToast(message) {
        const toastContainer = document.createElement('div');
        toastContainer.classList.add('toast-container');
        document.body.appendChild(toastContainer);

        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.appendChild(toast);

        toast.style.opacity = 0;
        toast.style.transform = 'translateX(100%)';

        setTimeout(() => {
            toast.style.opacity = 1;
            toast.style.transform = 'translateX(0)';
        }, 10);

        setTimeout(() => {
            toast.style.opacity = 0;
            toast.style.transform = 'translateX(-100%)';
            setTimeout(() => {
                toastContainer.remove();
            }, 500);
        }, 3000);
    }
}







