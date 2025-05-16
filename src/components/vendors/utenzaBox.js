export class UtenzaBox{
    constructor(){
        this.utenzaBox = document.createElement('div')
        this.utenzaBox.classList.add('utenzaBox')
        this.utenzaBox.classList.add('ui-hide')
        document.body.appendChild(this.utenzaBox)

        this.utenzaBoxCaption = document.createElement('div')
        this.utenzaBoxCaption.classList.add('utenzaBoxCaption')
        this.utenzaBox.appendChild(this.utenzaBoxCaption)
            
        this.logo = document.createElement('img')
        this.logo.src = './dist/img/people.jpg'
        this.utenzaBoxCaption.appendChild(this.logo)

        this.scripUtenza = document.createElement('span')
        this.scripUtenza.classList.add('header-logo')
        this.scripUtenza.innerHTML = 'PEOPLE'
        this.utenzaBoxCaption.appendChild(this.scripUtenza)

        const closeUtenzaBox = document.createElement('span')
        closeUtenzaBox.classList.add('closebutton')
        this.utenzaBoxCaption.appendChild(closeUtenzaBox)
        closeUtenzaBox.addEventListener('click', this.closeboxUT.bind(this))

        

        this.utenzaBoxContent = document.createElement('div')
        this.utenzaBoxContent.classList.add('contentUtenzaBox')
        this.utenzaBox.appendChild(this.utenzaBoxContent)


     }
     contentBoxGas(val){
         this.utenzaBoxContent.innerHTML = val
     }
    
     contentBoxPower(val){
        this.utenzaBoxContent.innerHTML = val
    }
   
     open (){
         this.utenzaBox.classList.remove('ui-hide')
         this.utenzaBox.classList.add('ui-show')
     }
     closeboxUT (){
         this.utenzaBox.classList.remove('ui-show')
         this.utenzaBox.classList.add('ui-hide') 
         this.utenzaBox.remove(this) 
     }
     
}