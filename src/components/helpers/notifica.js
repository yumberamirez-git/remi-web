export class Notifica {
    constructor(){
        this.notificaContainer = document.createElement('div')
        this.notificaContainer.classList.add('notifica')
        document.body.appendChild(this.notificaContainer)
        this.open(this.notificaContainer)
        
    }
    open(a){      
        setTimeout(function(){
        document.body.removeChild(a)
        },5000)
    }
    errorContent(val){
        this.notificaContainer.innerHTML = `<span class="error"><img src="./dist/img/notUtenza.png"><p>${val}</p></span>`
    }
    successContent(val){
        this.notificaContainer.innerHTML = `<span class="success"><img src="./dist/img/okUtenza.png"><p>${val}</p></span>`
    }
    infoContent(val){
        this.notificaContainer.innerHTML = `<span class="info"><img src="./dist/img/infoUtenza.png"><p>${val}</p></span>`
    }
    remover(){
        this.notificaContainer.remove()
    }
}

export const codesError = (a) =>{
    let b 
    switch (a) {
        case 'auth/invalid-email':
           b = "l'indirizzo email inserito non è corretto" 
            break;
        case 'auth/wrong-password':
           b = "la password inserita non è corretta"
           break;
        case 'auth/user-not-found':
           b = "i dati inseriti non corrispondo ad un utente"
           break;
        case 'auth/internal-error':
            b = "errore interno ricarica la pagina"
            break;
        case 'auth/email-already-in-use':
            b = "la email inserita corrisponde ad un utente"   
            break; 
        case 'auth/user-disabled':
            b = "questo utente è disabilitato"
        default: 
            b = "i dati inseriti non sono corretti"
            break;
    }
    return b
}
