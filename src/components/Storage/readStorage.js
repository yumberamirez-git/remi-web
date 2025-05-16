import firebase from 'firebase/app'
import { mascheraPublic } from "../ui/maskUI"
import { RenderContent, startConfigurator } from "../vendors/configurator";
import { NewUT, RenderNewUT, startNewUT } from "../vendors/newUT";
import { deleteUtenzaUser  } from "../Config/firebaseInit";
import { UtenzaBox } from "../vendors/utenzaBox";
import { Notifica } from '../helpers/notifica';
import renderBid from '../Bids/renderBid';
import { IconLight } from '../Media/Icons';


const DeleteIcon = `<svg width="24" height="8vh" viewBox="0 0 24 24" >
<path 
fill="white"
d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>`
const ViewIcon = `<svg width="30" height="8vh" viewBox="0 0 30 30"> 
<circle cx="5" cy="15" r="4" fill="white"/>
<circle cx="15" cy="15" r="4" fill="white"/>
<circle cx="25" cy="15" r="4" fill="white"/>
</svg>`


const IconPlus = `<svg width="4vh" height="4vh" viewBox="0 0 30 30">
<circle cx="15" cy="15" r="14" fill="white" stroke="gray" stroke-width="2" />
<line x1="10" x2="20" y1="15" y2="15" stroke="gray" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
<line x1="15" x2="15" y1="10" y2="20" stroke="gray" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const IconLuce = `<svg width="4vh" height="4vh" viewBox="0 0 48 48">
    <path fill="white" stroke="gray" strokeWidth="2"
    d="m10 16 a 1 1 0 0 1 30 0 c 0 0 0 5 -5 11 l -3 11 h -14 l -3 -11 c 0 0 -5 -5 -5 -11z
       m8 25 h 14
       m-9 -19 v 15 m 4 -15 v 15
       m -6 -21 a 1 1 0 0 1 8 0 a 1 1 0 0 1 -8 0
       m-1 28 h 10"/>
</svg>`
const IconGax = `<svg 
width="40" height="8vh"
viewBox="0 0 44 44">
    <path fill="white" stroke="gray" strokeWidth="2" 
    d="m12 38 c 0 0 12 12 24 0 c 2 -3 10 -10 -12 -34 c -4 13 -20 24 -12 34 
    m5 -1 c 0 0 6 6 12 0 c 1 -1.5  5 -5 -6 -17 c -2 6.5 -10 12 -6 17"/>
</svg>`

const readStorage = () => {
    const initStorage = setInterval(() => {
        if(document.readyState === 'complete'){ 
            clearInterval(initStorage)

            firebase.auth().onAuthStateChanged(user => {
            if(user){ 
                renderItems('utenze')       
                storageCaption.innerHTML = `<span id="newUT">Nuova Utenza</span>`
                title_ps.innerHTML = `<h3>Lista Utenze</h3>`   

                const newut = document.getElementById('newUT')
                let local = JSON.parse(localStorage.getItem('utenze'))
                let un = local ? local.length : 0
                if(un === 6){
                    lengthUT.innerHTML = `limite di utenze raggiunto` 
                }
                if(un < 6){
                    lengthUT.innerHTML = `puoi creare ancora ${ 6 - un } utenze`
                }

                newut.addEventListener('click', e => {
                e.preventDefault() 
                        if(un === 6 ){
                            let not = new Notifica()
                            not.infoContent(`limite raggiunto`)        
                        }else{
                            const newUtenza = new NewUT()
                            newUtenza.contentBox(RenderContent())
                            newUtenza.open()
                            startConfigurator()  
                        }
                })
                renderUtenza('utenze')
            }//fine se ce un user
           
            else{
            renderItems('utenze')  
            storageCaption.innerHTML = `<span id="newUT">Nuova Utenza</span>`
            title_ps.innerHTML = `<h3>Lista Utenze</h3>`

            let newut = document.getElementById('newUT')
            newut.addEventListener('click', e => {
            let newUtenzaGuest = new NewUT()
            newUtenzaGuest.contentBox(RenderContent())
            newUtenzaGuest.open()
            startConfigurator()
            }) 
            renderUtenza('utenze')
        
            }
          }) 
            
       }//fine del if complete

    },100)//fine del interval



const renderUtenza = (ut) =>{
        let utenza = JSON.parse(localStorage.getItem(ut))
        let itemService = document.querySelectorAll('.itemService')
        itemService.forEach(item => {
                item.addEventListener('touchmove', e => {
                    if(e.touches[0].screenX < 200){
                    item.querySelector('.deleteItem').classList.add('iconDelete')
                    item.querySelector('.viewItem').classList.add('iconView')
                    }
                    else if(e.touches[0].screenX > 200){
                    item.querySelector('.deleteItem').classList.remove('iconDelete')
                    item.querySelector('.viewItem').classList.remove('iconView')
                    }   
                })
            })
            
        let itemsHandlerBid = document.querySelectorAll('.desItemService')
        itemsHandlerBid.forEach(item => {
            item.addEventListener('click', () => {
                let nomeUT = item.id.split('-')[1]
                let indexArray = utenza.findIndex((utenza) => utenza.nameUT === nomeUT)
                let utenzaChange = utenza[indexArray]
                localStorage.setItem('utenzaPro', JSON.stringify(utenzaChange))
                let app = document.getElementById('app')
                app.innerHTML = renderBid()
            })
        })

        let deleteItems = document.querySelectorAll('.deleteItem') 
        deleteItems.forEach(Item => {
            Item.addEventListener('click', () => {                 
                let indexItem = utenza.findIndex((utenza) => utenza.nameUT === Item.id)
                document.querySelector('.deleteItem').classList.remove('iconDelete')
                document.querySelector('.viewItem').classList.remove('iconView')
                utenza.splice(indexItem,1)
                localStorage.setItem(ut,JSON.stringify(utenza))
                Item.parentElement.remove() 
                if(utenza.length === 0){
                    localStorage.removeItem(ut)
                    localStorage.removeItem('utenzaPro')
                    let privateStorage = document.getElementById('privateStorage')
                    privateStorage.innerHTML = `<div class="mesNot"><span class="arrowUp"></span>Non ci sono Utenze <br> crea una Utenza per continuare</div>`
                    }
                if(ut === 'utenzeUser'){
                    lengthUT.innerHTML = `hai ancora ${6 - utenza.length} Utenze disponibili`
                    let user = firebase.auth().currentUser
                    if(user){
                        deleteUtenzaUser(user.email,Item.id) 
                    }else{
                        console.log('error delete items')
                    }   
                }
                    
            })
        
        })

        let viewItems = document.querySelectorAll('.viewItem')
        viewItems.forEach(viewItem => {
            viewItem.addEventListener('click', e => {
                e.preventDefault()
                let nomeUT = viewItem.id.split('-')[1]
                document.querySelector('.deleteItem').classList.remove('iconDelete')
                document.querySelector('.viewItem').classList.remove('iconView')
                let indexArray = utenza.findIndex((utenza) => utenza.nameUT === nomeUT)
                let uti = utenza[indexArray]
                let utenzaBox = new UtenzaBox()
                utenzaBox.open() 
                    if(ut === 'utenza'){
                        if(uti.type === 'energia'){
                        let consumoFascia = [uti.f0,uti.f1,uti.f2,uti.f3,uti.fg,uti.fn]   
                        utenzaBox.contentBoxPower(mascheraPublic(uti.type,uti.nameUT,uti.servizio,uti.tariffa,uti.consumo,consumoFascia,uti.potenza,uti.fatturazione,uti.data,uti.impegnata))
                        }
                        if(uti.type === 'gas'){
                        let consumoScaglioni = [uti.scaglioni[0],uti.scaglioni[1],uti.scaglioni[2],uti.scaglioni[3],uti.scaglioni[4],uti.scaglioni[5],uti.scaglioni[6]]    
                        utenzaBox.contentBoxGas(mascheraPublic(uti.type,uti.nameUT,uti.servizio,uti.ambito,uti.pcs,consumoScaglioni,uti.contatore,uti.fatturazione,uti.data,[uti.mcAnno,uti.mc]))
                        }
                    }
                    if(ut === 'utenze'){
                        if(uti.type === 'energia'){
                        let consumoFascia = [uti.f0,uti.f1,uti.f2,uti.f3,uti.fg,uti.fn]    
                        utenzaBox.contentBoxPower(mascheraPublic(uti.type,uti.nameUT,uti.servizio,uti.tariffa,uti.consumo,consumoFascia,uti.potenza,uti.fatturazione,uti.data,uti.impegnata))
                        }
                        if(uti.type === 'gas'){
                        let consumoScaglioni = [uti.scaglioni[0],uti.scaglioni[1],uti.scaglioni[2],uti.scaglioni[3],uti.scaglioni[4],uti.scaglioni[5],uti.scaglioni[6]]    
                        utenzaBox.contentBoxGas(mascheraPublic(uti.type,uti.nameUT,uti.servizio,uti.ambito,uti.pcs,consumoScaglioni,uti.contatore,uti.fatturazione,uti.data,[uti.mcAnno,uti.mc]))
                        }
                    }
            })
        })
         
       }     

 
const renderItems = (a) => {
let utenze = JSON.parse(localStorage.getItem(a))
    if(utenze){
        let privateStorage = document.getElementById('privateStorage')
        let title_ps = document.getElementById('title_ps')
        privateStorage.innerHTML = ''
         utenze.forEach(utenza => {
            if(utenza.type === 'energia'){
            title_ps.innerHTML = `<h4>Lista Utenze</h4>`
            privateStorage.innerHTML += `<div class="itemService ${utenza.nameUT}"><span class="deleteItem" id="${utenza.nameUT}">${DeleteIcon}</span><span class="viewItem" id="view-${utenza.nameUT}">${ViewIcon}</span><span class="desItemService" id="bid-${utenza.nameUT}">${IconLight}<span class="nameItem"><span>${utenza.nameUT}</span><span>${utenza.servizio === 'casa' ? 'Domestico' :'Azienda'} - ${utenza.consumo}</span></span><span class="expandUT"></span></span></div>`
            }
            if(utenza.type === 'gas'){
            title_ps.innerHTML = `<h4>Lista Utenze</h4>`    
            privateStorage.innerHTML += `<div class="itemService ${utenza.nameUT}"><span class="deleteItem" id="${utenza.nameUT}">${DeleteIcon}</span><span class="viewItem" id="view-${utenza.nameUT}">${ViewIcon}</span><span class="desItemService" id="bid-${utenza.nameUT}">${IconGax}<span class="nameItem"><span>${utenza.nameUT}</span><span>${utenza.servizio === 'casa' ? 'Domestico' :'Azienda'} - ${utenza.comune ? utenza.comune : ''}</span> </span><span class="expandUT"></span></span></div>`
            }     
        })   
    }else{
          privateStorage.innerHTML = `<div class="mesNot"><span class="arrowUp"></span>Non ci sono Utenze <br> crea una Utenza per continuare</div>`
         }
     
}  

return `<div id="archivioUtenze" class="readStorage Content-section ui-show">
<div id="storageCaption"></div>
<div id="title_ps"></div>
<div id="privateStorage"></div>
<div id="lengthUT"></div>
</div>`

}





export default readStorage

