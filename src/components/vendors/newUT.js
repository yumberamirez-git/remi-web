import { saveUtenzaDB  } from "../Config/firebaseInit"
import { Message } from "../helpers/errorM";
import firebase from 'firebase/app'
import { isAuth } from "../auth";
//import { Notifica } from "../helpers/notifica";


export class NewUT{
    constructor(){
        this.newUTBox = document.createElement('div')
        this.newUTBox.classList.add('newUTBox')
        this.newUTBox.classList.add('ui-hide')
        document.body.appendChild(this.newUTBox)
        
        const newUTBoxContainer= document.createElement('div')
        newUTBoxContainer.classList.add('newUTBoxContainer')
        this.newUTBox.appendChild(newUTBoxContainer)

        this.headerContainer = document.createElement('div')
        newUTBoxContainer.appendChild(this.headerContainer)
        /*
        const utenza = JSON.parse(localStorage.getItem('utenza'))
        if(utenza){
        const closeBoxUT = document.createElement('span')
        closeBoxUT.classList.add('closebutton')
        this.headerContainer.appendChild(closeBoxUT)
        closeBoxUT.addEventListener('click', this.closebox.bind(this)) 
        }
      */
        this.backAction = 'confServ'
        // this.backButton = document.createElement('button')
        // this.backButton.classList.add('btn-back')
        // this.backButton.innerHTML = 'Indietro'
        // this.backButton.addEventListener('click', ()=> {
        //     document.querySelectorAll('.newBoxCotent')
        //     console.log('click back', this.backAction)
        // })
        //newUTBoxContainer.appendChild(this.backButton);

        this.contentNewUTBox = document.createElement('div')
        this.contentNewUTBox.classList.add('newBoxContent')
        this.newUTBox.appendChild(this.contentNewUTBox)
     }
     contentBox(val){
         this.contentNewUTBox.innerHTML = val
     }
    
     open (){
         this.newUTBox.classList.remove('ui-hide')
         this.newUTBox.classList.add('ui-show')
     }
     closebox (){
         this.newUTBox.classList.remove('ui-show')
         this.newUTBox.classList.add('ui-hide') 
         this.newUTBox.remove(this)  
     }
     btnclose (button) {
         this.newUTBox.innerHTML += button
     }

     introContentBox(val){
        this.contentNewUTBox.innerHTML = val
     }
      
}

export const RenderNewUT = () => {
    const confProgress = () => { return `<div id="confProgress"></div>`}
    //const confInfo = () => { return `<div id="confInfo"></div>`}
    const confCaption = () => { return `<div id="confCaption"></div>`}
    const confServ = () => {return `<div id="confServ" class="ui-show"><span><p id="btnHome">Casa</p></span><span><p id="btnIndustry">Azienda</p></span></div>`}
    const setSer = () => {return `<div id="setSer" class="ui-hide"><span><p id="powerSet"></p><p>Energia</p></span><span><p id="gasSet"><p>Gas</p></span></div>`}
    const confType = () => {return `<div id="confType" class="ui-hide"><span id="residente">Residente</span><span id="no residente">Non Residente</span></div>`}
    const confRegione = () =>{return `<div id="confRegione" class="ui-hide"><span><input id="inputRegione" type="number"></span><button id="addRegione" class="Submit-btn">Cerca</button></div>`}
    const confRegioneOff = () =>{return `<div id="confRegioneOff" class="ui-hide">regioni</div>`}
    const confCitta = () =>{return `<div id="confCitta" class="ui-hide"></div>`}
    const confPotenza = () => { return `<div id="confPotenza" class="ui-hide"><label id="potenza"><span>Potenza</span><input id="idpotenza" type="number" value="" step="0.01" min="0" max="200" required></label><label id="impegnata" class="imp"><span>Impegnata</span><input id="idImpegnata" type="number" value="" step="0.01" min="0" max="200" required></label><button class="Submit-btn">avanti</button></div>`}
    const confConsumoEnergia = () => {return `<div id="confConsumo" class="ui-hide"><span class="btnConsumo" id="monorario">Monorario</span><span class="btnConsumo" id="biorario">Biorario</span><span class="btnConsumo" id="triorario">Triorario</span></div>`}
    const confClasse = () => (`<div id="confClasse" class="ui-hide"><div id="groupClass"></div></div>`)
    const confConsumoGasPro = () =>{return `<div id="confConsumoGasPro" class="ui-hide"><input id="gasPro" type="number" required><button id="mcGasAnno" class="Submit-btn">Carica</button></div>`}
    const confConsumoGas = () =>{return `<div id="confConsumoGas" class="ui-hide"><input id="gasConsumato" type="number" required><button id="mc" class="Submit-btn">Carica</button></div>`}
    const confFatt = () => { return `<div id="confFatt" class="ui-hide"><span id="mensile">Mensile</span><span id="bimestrale">Bimestrale</span></div>`}
    const confKw = () => { return `<div id="confkw" class="ui-hide"></div>`}
    const confSave = () => { return `<div id="confSave" class="ui-hide"><span><input id="nameUtenza" type="text" autocomplete="off" maxlength="17"/></span><button id="saveName" class="Save-btn">Creare</button></div>`}
    const confAteco = () => { return `<div id="confAteco" class="ui-hide"><span> Codice Ateco <form><input type="text" maxlength="2"><input type="text" maxlength="2"><input type="text" maxlength="2"><input type="submit"></form></span></div>`}
    const confEnd = () => { return `<div id="confEnd" class="ui-hide"><span><img class="successForm" src="./dist/img/okUtenza.svg"></span><p> fai click per continuare</p></div>`}
 
   const slides = [confProgress()+''+confCaption()+''+confServ()+''+setSer()+''+confType()+''+confRegione()+''+confRegioneOff()+''+confCitta()+''+confPotenza()+''+confConsumoEnergia()+''+confClasse()+''+confConsumoGasPro()+''+confConsumoGas()+''+confFatt()+''+confKw()+''+confSave()+''+confAteco()+''+confEnd()]
    return slides
            }


export const startNewUT= () => {
    confProgress.innerHTML = `<span class="coverIntro"><img src="./dist/img/people.jpg"> </span>` 
    
    //let confInfo = document.getElementById('confInfo')
    let confCaption = document.getElementById('confCaption')
    //confInfo.innerHTML = `Iniziamo ..`
    confCaption.innerHTML = `Scegli la destinazione`
    let uno = {
                       nameUT: '',
                       servizio: ''
                   }
        
confServ.addEventListener('click', e => {
if(e.target.id === 'btnHome' ){
    uno.servizio = 'casa'
    confServ.classList.remove('ui-show')
    confServ.classList.add('ui-hide')
    setSer.classList.remove('ui-hide')
    setSer.classList.add('ui-show')   
     
    confInfo.innerHTML = `<img src="./dist/img/scriptUtenze.svg">`
    confCaption.innerHTML = `Scegli il tipo d'Utenza` 
}
if(e.target.id === 'btnIndustry'){
    uno.servizio = 'azienda'
    confServ.classList.remove('ui-show')
    confServ.classList.add('ui-hide')
    setSer.classList.remove('ui-hide')
    setSer.classList.add('ui-show')   
    confInfo.innerHTML = `<img src="./dist/img/scriptUtenze.svg">`
    confCaption.innerHTML = `Scegli il tipo d'Utenza`             
    }
    
})

setSer.addEventListener('click', e => {
    if(e.target.id === 'powerSet'){
    uno.type = 'energia'
    if(uno.servizio === 'casa'){
    setSer.classList.remove('ui-show')
    setSer.classList.add('ui-hide')
    confType.classList.remove('ui-hide')
    confType.classList.add('ui-show')
    confCaption.innerHTML = `Scegli la destinazione d'uso`
    }
    if(uno.servizio === 'azienda'){
    setSer.classList.remove('ui-show')
    setSer.classList.add('ui-hide')
    confPotenza.classList.remove('ui-hide')
    confPotenza.classList.add('ui-show')
    confCaption.innerHTML = `Inserisci la Potenza del contatore`
    }   
    }
    if(e.target.id === 'gasSet'){
       uno.type = 'gas'
       setSer.classList.remove('ui-show')
       setSer.classList.add('ui-hide')
       if(navigator.onLine){
        confRegione.classList.remove('ui-hide')
        confRegione.classList.add('ui-show')
        confCaption.innerHTML = `Inserisci il CAP della tua città`
       }else{
        let regioni = ['LOMBARDIA','VENETO','FRIULI VENEZIA GIULIA','PIEMONTE','VALLE D\'AOSTA','LIGURIA','ABRUZZO','TRENTINO ALTO ADIGE','TOSCANA','EMILIA ROMAGNA','LAZIO','MOLISE','PUGLIA','UMBRIA','MARCHE','BASILICATA','CAMPANIA','CALABRIA','SICILIA','SARDEGNA']
        confRegioneOff.innerHTML = `<span id="selInfo"></span>`
       regioni.forEach(doc => {
       confRegioneOff.innerHTML += `<span class="selectCap" id="${doc}"><p>${doc}</p><img src="./dist/img/arrow-left-double.svg"></span>` 
       })
       confRegione.classList.remove('ui-hide')
       confRegione.classList.add('ui-show')
       confCaption.innerHTML = `Inserisci la Regione`  
       }
     }
})

confRegioneOff.addEventListener('click', e => {
    e.preventDefault()
    if(e.target.className = 'selectCap'){
        let ind = e.target.parentElement.id
        uno.ambito = regioni(ind)
        uno.addRegionali = addRegionali(ind,null)
        uno.pcs = 0.03852
        confRegioneOff.classList.remove('ui-show')
        confRegioneOff.classList.add('ui-hide')
        if(uno.servizio === 'casa'){groupClass.innerHTML = `<span>G4</span><span>G6</span><div>oltre</div>`}
        if(uno.servizio === 'azienda'){groupClass.innerHTML = `<span>G4</span><span>G6</span><span>G10</span><span>G16</span><span>G25</span><span>G40</span><div>oltre</div>`}
        confClasse.classList.remove('ui-hide')
        confClasse.classList.add('ui-show')
        confCaption.innerHTML = `Inserisci la classe del contatore`
    }
})


confType.addEventListener('click', e => {   
if(e.target.textContent === 'Residente'){
    uno.tariffa ='tdr'
    confType.classList.remove('ui-show')
    confType.classList.add('ui-hide')
    confPotenza.classList.remove('ui-hide')
    confPotenza.classList.add('ui-show')
    confCaption.innerHTML = `Inserisci la Potenza del contatore`
}
if(e.target.textContent === 'Non Residente'){
    uno.tariffa = 'td'
    confType.classList.remove('ui-show')
    confType.classList.add('ui-hide')
    confPotenza.classList.remove('ui-hide')
    confPotenza.classList.add('ui-show')
    confCaption.innerHTML = `Inserisci la Potenza del contatore`
}

})

confRegione.addEventListener('keypress', (e) => {
    let evt = e || window.event;
    let key = evt.keyCode || evt.which;
    key = String.fromCharCode( key );
    let regex = /[0-9]/;
    if( !regex.test( key )){
        evt.returnValue = false;
        evt.preventDefault()
    }
})

confRegione.addEventListener('click', e =>{
    e.preventDefault()
        if(e.target.id === 'addRegione'){
            let capCitta = inputRegione.value
                if(capCitta){     
                let dba = firebase.firestore()
                dba.collection('db-comuni').doc('cap')
                .collection('comuni').where('cap','==',capCitta)
                .get()
                .then(docs => {
                    if(docs.empty){
                        inputRegione.value = ''
                        let nots = new Message()
                        nots.content(`<span class="contentMsg">CAP non trovato</span>`)
                    }
                    if(docs.size > 4){
                        confCitta.innerHTML += `<span id="selInfo"></span>`  
                        }
                    docs.forEach(doc => {      
                        confCitta.innerHTML += `<span class="selectCap" id="${doc.id}"><p>${doc.id}</p><img src="./dist/img/arrow-left-double.svg"></span>`
                        confCitta.classList.remove('ui-hide')
                        confCitta.classList.add('ui-show')
                        confRegione.classList.remove('ui-show')
                        confRegione.classList.add('ui-hide')
                        confCaption.innerHTML = `Scegli la Città` 
                        });     
                    })
                .catch(function(err){console.log(err)})        
            }//capcitta
            else{
            let not = new Message()
            not.content(`<span class="contentMsg">CAP non inserito</span>`)
            }        
    }  
})

confCitta.addEventListener('click', e => {
    e.preventDefault()
    if(e.target.className = 'selectCap'){
        let indice = e.target.parentElement.id
        if(indice){
            let dbs = firebase.firestore()
            dbs.collection('db-comuni').doc('cap')
            .collection('comuni').doc(indice)
            .get()
            .then(function(doc){
                if(doc.exists){
                    uno.pcs = doc.data().pcs
                    uno.ambito = doc.data().ambito
                    uno.comune = doc.data().comune
                    uno.addRegionali = addRegionali(doc.data().regione,doc.data().zonaClimatica)
                    confCitta.classList.remove('ui-show')
                    confCitta.classList.add('ui-hide')
                    confClasse.classList.remove('ui-hide')
                    confClasse.classList.add('ui-show')
                    if(uno.servizio === 'casa'){groupClass.innerHTML = `<span>G4</span><span>G6</span><div>oltre</div>`}
                    if(uno.servizio === 'azienda'){groupClass.innerHTML = `<span>G4</span><span>G6</span><span>G10</span><span>G16</span><span>G25</span><span>G40</span><div>oltre</div>`}
                    confCaption.innerHTML = `Inserisci la classe del contatore`
                }         
            })
        .catch(function(){
            let not = new Message()
            not.content(`<span class="contentMsg">Città non trovata</span>`)
        })    
    }  
}
})


confPotenza.addEventListener('keyup', e => {
    e.preventDefault()
    if(uno.servizio === 'azienda'){
        let potenzaPower = idpotenza.valueAsNumber
        if(potenzaPower > 16){
        impegnata.classList.remove('imp')
        impegnata.classList.add('open')    
        }else{
        impegnata.classList.remove('open')
        impegnata.classList.add('imp')   
        }
    }
})

confPotenza.addEventListener('click', e => {
e.preventDefault()
if(e.target.matches('button')){
    let valuePotenza = idpotenza.valueAsNumber
    if(valuePotenza > 0){
        if(uno.tariffa === 'tdr' || uno.tariffa === 'tdn'){   
            uno.potenza = valuePotenza 
            uno.impegnata = false
            confPotenza.classList.remove('ui-show')
            confPotenza.classList.add('ui-hide')
            confConsumo.classList.remove('ui-hide')
            confConsumo.classList.add('ui-show')
            confCaption.innerHTML = `Scegli il tipo di consumo`  
        }else{
        let bta = idpotenza.valueAsNumber
        let imp = impegnata.valueAsNumber
        if(bta > 0 && bta <= 1.5){uno.tariffa = 'bta1', uno.potenza = bta, uno.impegnata = false}
        if(bta > 1.5 && bta <= 3){uno.tariffa = 'bta2', uno.potenza = bta, uno.impegnata = false}
        if(bta > 3 && bta <= 6){uno.tariffa = 'bta3', uno.potenza = bta, uno.impegnata = false}
        if(bta > 6 && bta <= 16.5){uno.tariffa = 'bta4', uno.potenza = bta, uno.impegnata = false}
        if(bta > 16.5 ){uno.tariffa = 'bta6', uno.potenza = bta, uno.impegnata = imp}
        confPotenza.classList.remove('ui-show')
        confPotenza.classList.add('ui-hide')
        confConsumo.classList.remove('ui-hide')
        confConsumo.classList.add('ui-show') 
        confCaption.innerHTML = `Scegli il tipo di consumo`  
        }
    }else{
        let not = new Message()
        not.content(`<span class="contentMsg">non hai inserito la potenza</span>`)    
    }   
}
})//fine del evento potenza


confConsumo.addEventListener('click', e => {
    e.preventDefault()
    if(e.target.matches('#monorario')){
        uno.consumo = 'monorario'
        confCaption.innerHTML = `Inserisci i kw consumati`
        confConsumo.classList.remove('ui-show')
        confConsumo.classList.add('ui-hide')
        confkw.classList.remove('ui-hide')
        confkw.classList.add('ui-show')                
        confkw.innerHTML = `<form><label class="formSpan"><span>F0</span><input id="fasciaMono" type="number" autocomplete="off" required="true"></label><button class="Submit-btn">Carica</button></form>`
        confkw.addEventListener('submit', e => {
                e.preventDefault()
                let valuef0 = fasciaMono.valueAsNumber
                uno.f0 = valuef0
                uno.f1 = false, uno.f2 = false, uno.f3 = false, uno.fg = false, uno.fn = false
                confkw.classList.remove('ui-show')
                confkw.classList.add('ui-hide')
                confFatt.classList.remove('ui-hide')
                confFatt.classList.add('ui-show')  
                confCaption.innerHTML = `Scegli la periodicità delle bollette` 
            })
    }
    if(e.target.matches('#biorario')){
        uno.consumo = 'biorario'
        confCaption.innerHTML = `Inserisci i kw consumati`
        confConsumo.classList.remove('ui-show')
        confConsumo.classList.add('ui-hide')
        confkw.classList.remove('ui-hide')
        confkw.classList.add('ui-show')
        confkw.innerHTML = `<form><label class="formSpan"><span>F1</span><input id="fasciaGiorno" type="number" autocomplete="off" required="true"></label><label><span>F23</span><input id="fasciaNotte" type="number" autocomplete="off" required="true"></label><button class="Submit-btn">Carica</button></form>`
        confkw.addEventListener('submit', e => {
                e.preventDefault()
                let valueGiorno = fasciaGiorno.valueAsNumber 
                let valueNotte = fasciaNotte.valueAsNumber
                uno.fg = valueGiorno, uno.fn = valueNotte, uno.f0 = false, uno.f1 = false, uno.f2 = false, uno.f3 = false
                confkw.classList.remove('ui-show')
                confkw.classList.add('ui-hide')
                confFatt.classList.remove('ui-hide')
                confFatt.classList.add('ui-show') 
                confCaption.innerHTML = `Scegli la periodicità delle bollette`
            })
        }
    if(e.target.matches('#triorario')){
        uno.consumo = 'triorario'
        confCaption.innerHTML = `Inserisci i kw consumati per ogni fascia`
        confConsumo.classList.remove('ui-show')
        confConsumo.classList.add('ui-hide')
        confkw.classList.remove('ui-hide')
        confkw.classList.add('ui-show')
        confkw.innerHTML = `<form><label><span>F1</span><input id="fasciaUno" type="number" autocomplete="off" required="true"></label><label><span>F2</span><input id="fasciaDue" type="number" autocomplete="off" required="true"></label><label><span>F3</span><input id="fasciaTre" type="number" autocomplete="off" required="true"></label><button class="Submit-btn">Carica</button></form>`
        confkw.addEventListener('submit', e => {
                e.preventDefault()
                let valuef1 = fasciaUno.valueAsNumber
                let valuef2 = fasciaDue.valueAsNumber 
                let valuef3 = fasciaTre.valueAsNumber
                uno.f1 = valuef1, uno.f2 = valuef2, uno.f3 = valuef3, uno.f0 = false, uno.fg = false, uno.fn = false
                confkw.classList.remove('ui-show')
                confkw.classList.add('ui-hide')
                confFatt.classList.remove('ui-hide')
                confFatt.classList.add('ui-show') 
                confCaption.innerHTML = `Scegli la periodicità delle bollette`
            })
        }
})//fine evento consumo

confClasse.addEventListener('click', e => {
    e.preventDefault()
  if(e.target.matches('span')){
        let classeBox = e.target.innerHTML
        if(classeBox === 'G4' || classeBox === 'G6'|| classeBox === 'G10'|| classeBox === 'G16'||classeBox === 'G25' || classeBox === 'G40'){
            let tai = classeBox.split('G')[1]
            uno.contatore = tai
            confClasse.classList.remove('ui-show')
            confClasse.classList.add('ui-hide')
            confConsumoGasPro.classList.remove('ui-hide')
            confConsumoGasPro.classList.add('ui-show')
            confCaption.innerHTML = `Inserisci il consumo progressivo`    
        }
        
    }
    if(e.target.matches('div')){
            confClasse.innerHTML = `<span id="otherClass"><p>G</p><input id="classeContatore" type="number"></span><button class="submitForm"></button>`
            confClasse.addEventListener('click', e => {
                if(e.target.matches('button')){
                    let cont = classeContatore.valueAsNumber
                    if(cont > 0){
                        uno.contatore = cont
                        confClasse.classList.remove('ui-show')
                        confClasse.classList.add('ui-hide')
                        confConsumoGasPro.classList.remove('ui-hide')
                        confConsumoGasPro.classList.add('ui-show')
                        confCaption.innerHTML = `Inserisci il consumo progressivo` 
                    }else{
                        let not = new Message()
                        not.content(`<span class="contentMsg">Inserire la classe del contatore </span>`)
                    }
                }
            })
        }
        if(uno.contatore){switch (uno.contatore) {
            case (Number(uno.contatore) <= 6):
            return uno.cc = 'G1'
            case (Number(uno.contatore) >= 10 && Number(uno.contatore) <= 40):
            return uno.cc = 'G2';
            case (Number(uno.contatore)> 40):
            return uno.cc = 'G3';
            default:
            return uno.cc = 'G1';
        } 
    }   
})

confConsumoGasPro.addEventListener('click', e => {
    e.preventDefault()
    if(e.target.matches('button')){
        let gasProC = gasPro.valueAsNumber
        if(gasProC >= 0){
        uno.mcAnno  = gasProC
        confConsumoGasPro.classList.remove('ui-show')
        confConsumoGasPro.classList.add('ui-hide')
        confConsumoGas.classList.remove('ui-hide')
        confConsumoGas.classList.add('ui-show')
        confCaption.innerHTML = `Inserisci il consumo`
        }else{
            let notifica = new Message()
            notifica.content(`<span class="contentMsg">devi compilare tutti i campi</span>`)           
        }      
    }
})

confConsumoGas.addEventListener('click', e => {
    e.preventDefault()
    if(e.target.matches('button')){
       let mcs = gasConsumato.valueAsNumber
       if(mcs >= 0){
       uno.mc = mcs
       if(uno.mcAnno >= 0 && gasConsumato.valueAsNumber >= 0 ){
           uno.scaglioni = scaglioni(mcs,uno.mcAnno)
       }
       confConsumoGas.classList.remove('ui-show')
       confConsumoGas.classList.add('ui-hide')
       confFatt.classList.remove('ui-hide')
       confFatt.classList.add('ui-show')
       confCaption.innerHTML = `Inserisci la periodicità delle bollette`    
       }else{
           let notifica = new Message()
           notifica.content(`<span class="contentMsg">devi inserire il consumo</span>`)
       }
       
    }              
}) 

confFatt.addEventListener('click', e => {
    if(e.target.matches('#mensile')){uno.fatturazione = 1}
    if(e.target.matches('#bimestrale')){uno.fatturazione = 2}
    confFatt.classList.remove('ui-show')
    confFatt.classList.add('ui-hide')
    confSave.classList.remove('ui-hide')
    confSave.classList.add('ui-show')
    confCaption.innerHTML = `Ora puoi salvare l'utenza `
})//fine del evento fatturazione

confSave.addEventListener('click', e => {
    e.preventDefault()
    if(e.target.id === 'saveName'){  
        let nomeUtenza = nameUtenza.value
            if(nomeUtenza){
            uno.nameUT  = nomeUtenza
            uno.ateco = false
            let date = new Date()
            let giorno = date.getDate()
            let mes = date.getUTCMonth()+1
            let anno = date.getFullYear()
            let mese
            if(giorno < 10 ){giorno = 0+''+date.getDate()}
            if(mes < 10){mese = 0+''+mes}
            let dateCreated = giorno+'/'+mese+'/'+anno   
                if(dateCreated){
                uno.data = dateCreated
                confSave.classList.remove('ui-show')
                confSave.classList.add('ui-hide') 
                confEnd.classList.remove('ui-hide')
                confEnd.classList.add('ui-show')
                confCaption.innerHTML = 'la tua utenza è stata creata ..' 
                let user = firebase.auth().currentUser
                    if(user){
                    let local = JSON.parse(localStorage.getItem('utenzeUser'))
                        if(local){
                            local.push(uno)
                            localStorage.setItem('utenzeUser',JSON.stringify(local)) 
                            saveUtenzaDB(user.email,uno.nameUT,uno)
                        }else{
                            let undo = []
                            undo.push(uno)
                            localStorage.setItem('utenzeUser',JSON.stringify(undo))
                            saveUtenzaDB(user.email,uno.nameUT,uno)
                        }   
                    
                    }else{
                    let not = new Message()
                    not.content(`<span class="contentMsg">Ce un errore con le credenziali</span>`)   
                    }
                }else{
                        let not = new Message()
                        not.content(`<span class="contentMsg">ce un errore con la data</span>`)
                }

        }else{
            let not  = new Message()
            not.content('<span class="contentMsg">Inserire un Nominativo a questa Utenza </span>')
        }
    }

})//fine del evento save

confEnd.addEventListener('click', e => {
    if(e.target.matches('.successForm')){
        let newBox = document.querySelector('.newUTBox')
        newBox.remove()
        isAuth()
    }
})

const scaglioni =(a,b)=>{
    let pro = b
    let consumo = a
    let som = parseInt(consumo + pro)
    let position = [0,120,480,1560,5000,80000,200000]
    let consumiSca = [0,120,360,1080,3440,75000,125000]
    let sca = [0,1,2,3,4,5,6]
    let objsca = [0,0,0,0,0,0,0]
    
    
    let un = position.findIndex((pos) => pos > pro)
    let hh = sca.findIndex((sc)=> sc === un )
    let diff = consumiSca[hh] - pro 

    if(pro <= position[hh] && som <= position[hh]){
        objsca[hh] = consumo 
    }
    if(pro <= position[hh] && som > position[hh] && som <= position[hh+1]){
        let unos = (pro < position[hh].valueOf() ) ? position[hh]-pro : 0
        objsca[hh] = unos, objsca[hh+1] = consumo - unos 
        }   
    if(pro <= position[hh] && som > position[hh] && som > position[hh+1] && som <= position[hh+2]){
        let unos =(pro < position[hh].valueOf() ) ? position[hh]-pro : 0
        let dos = consumiSca[hh+1].valueOf()
        objsca[hh] = unos, objsca[hh+1] = dos, objsca[hh+2] = consumo - (unos+dos)
    }
    if(pro <= position[hh] && som > position[hh] && som > position[hh+1] && som > position[hh+2] && som <= position[hh+3]){
        let unos = (pro < position[hh].valueOf() ) ? position[hh]-pro : 0
        let dos = consumiSca[hh+1].valueOf()
        let res = consumiSca[hh+2].valueOf()
        objsca[hh] = unos,objsca[hh+1] = dos,objsca[hh+2] = res,objsca[hh+3] = consumo -( objsca[hh+2].valueOf()+objsca[hh+1].valueOf()+objsca[hh].valueOf())
    }
    if(pro <= position[hh] && som > position[hh] && som > position[hh+1] && som > position[hh+2] && som > position[hh+3] && som <= position[hh+4]){
        let unos = (pro < position[hh].valueOf() ) ? position[hh]-pro : 0
        let dos = consumiSca[hh+1].valueOf()
        let res = consumiSca[hh+2].valueOf()
        let qua = consumiSca[hh+3].valueOf()
        objsca[hh] = unos,objsca[hh+1] = dos,objsca[hh+2] = res,objsca[hh+3] = qua,objsca[hh+4] = consumo -( objsca[hh+3].valueOf() + objsca[hh+2].valueOf()+objsca[hh+1].valueOf()+objsca[hh].valueOf())
    }
    if(pro <= position[hh] && som > position[hh] && som > position[hh+1] && som > position[hh+2] && som > position[hh+3] && som > position[hh+4] && som <= position[hh+5]){
        let unos = (pro < position[hh].valueOf() ) ? position[hh]-pro : 0
        let dos = consumiSca[hh+1].valueOf()
        let res = consumiSca[hh+2].valueOf()
        let qua = consumiSca[hh+3].valueOf()
        let cin = consumiSca[hh+4].valueOf()
        objsca[hh] = unos,objsca[hh+1] = dos,objsca[hh+2] = res,objsca[hh+3] = qua,objsca[hh+4] = cin,objsca[hh+5] = consumo - ( objsca[hh+4].valueOf() + objsca[hh+3].valueOf() + objsca[hh+2].valueOf()+objsca[hh+1].valueOf()+objsca[hh].valueOf())
    }
   return objsca
    }  

const regioni = (a) => {
    let ambitoRegionale
    if(a === 'VAllE D\'AOSTA' || a === 'PIEMONTE' || a === 'LIGURIA') ambitoRegionale = 'noc'
    if(a === 'FRIULI VENEZIA GIULIA'|| a === 'VENETO' ||a === 'TRENTINO ALTO ADIGE' || a === 'LOMBARDIA' || a === 'EMILIA ROMAGNA') ambitoRegionale = 'nor'
    if(a === 'TOSCANA' || a === 'UMBRIA' || a === 'MARCHE') ambitoRegionale = 'cen'
    if(a === 'ABRUZZO' ||a === 'MOLISE' || a === 'PUGLIA' || a === 'BASILICATA' ) ambitoRegionale = 'cor'
    if(a === 'LAZIO'|| a === 'CAMPANIA' ) ambitoRegionale = 'coc'
    if(a === 'SICILIA' || a === 'CALABRIA') ambitoRegionale = 'mer'
    return ambitoRegionale
    }

} 
    
const addRegionali = (amb,zona) => {
    let addRegionali
    if(amb === 'PIEMONTE'){ addRegionali = [0.02200,0.05800,0.05800,0.05800]}
    if(amb === 'FRIULI VENEZIA GIULIA'){addRegionali = []}
    if(amb === 'VENETO'){addRegionali = [0.007747,0.023241,0.025823,0.030987]}
    if(amb === 'LIGURIA'){
        if(zona === 'C' || zona == 'D'){addRegionali =  [0.02200,0.05800,0.05800,0.05800]}
        if(zona === 'E'){addRegionali = [0.01550,0.01550,0.01550,0.01550]}
        if(zona === 'F'){addRegionali = [0.01030,0.01030,0.01030,0.01030]}
    }
    if(amb === 'TOSCANA'){addRegionali = [0.02200,0.030987,0.030987,0.030987]}
    if(amb === 'UMBRIA'){addRegionali = [0.005165,0.005165,0.005165,0.005165]}
    if(amb === 'MARCHE'){addRegionali = [0.01550,0.01810,0.02070,0.02580]}
    if(amb === 'LAZIO'){addRegionali = [0.02200,0.030990,0.030990,0.030990]}
    if(amb === 'ABRUZZO'){
        if(zona === 'E' || zona === 'F'){addRegionali = [0.01033,0.01033,0.01033,0.01033]}
        else addRegionali = [0.01900,0.023241,0.025823,0.025823]
    }
    if(amb === 'MOLISE'){addRegionali = [0.01900,0.030987,0.030987,0.030987]}
    if(amb === 'CAMPANIA'){addRegionali = [0.0190,0.031000,0.031000,0.031000]}
    if(amb === 'BASILICATA'){addRegionali = [0.01900,0.025823,0.025823,0.025823]}
    if(amb === 'CALABRIA'){addRegionali = [0.005165,0.005165,0.005165,0.005165]}
    if(amb === 'VALLE D\'AOSTA'){addRegionali = []}
    if(amb === 'TRENTINO ALTO ADIGE'){addRegionali = []}
    if(amb === 'LOMBARDIA'){addRegionali = []}
    if(amb === 'EMILIA ROMAGNA'){addRegionali = [0.02200,0.030987,0.030987,0.030987]}
    if(amb === 'SICILIA'){addRegionali = []}
    if(amb === 'SARDEGNA'){addRegionali = []}
    return addRegionali
}