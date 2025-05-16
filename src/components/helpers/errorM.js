export class Message{
    constructor(t){
        this.notificaContainer = document.createElement('div')
        this.notificaContainer.classList.add('Danger')
        this.notificaContainer.style.bottom = t     
        document.body.appendChild(this.notificaContainer)
        this.open(this.notificaContainer)
        
    }
    open(a){      
        setTimeout(function(){
           document.body.removeChild(a)
        },1500)
    }   
    content(val){
        this.notificaContainer.innerHTML = val
    }
    error(val){
        this.notificaContainer.innerHTML = val
    }
    remover(){
        this.notificaContainer.remove()
    }
}