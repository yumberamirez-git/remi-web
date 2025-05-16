import readStorage from "../Storage/readStorage";
import { Message } from "../helpers/errorM";
import firebase from 'firebase/app'
import { Notifica, codesError } from "../helpers/notifica";
import {Months} from '../helpers/date.js'
import { NewUT } from "./newUT.js";



export const RenderContent = () => {
    const confProgress = () => { return `<div id="confProgress"></div>`}
    const confCaption = () => { return `<div id="confCaption">caption</div>`}
    const confServ = () => {return `<div id="confServ" class="ui-show"><span class="btn-service" id="btnHome">Domestico</span><span class="btn-service" id="btnIndustry">Impresa</span></div>`}
    const setSer = () => {return `<div id="setSer" class="ui-hide"><span><span class="btn-service" id="btnPower">Energia</span><span class="btn-service" id="btnGas">Gas</span></div>`}
    const confType = () => {return `<div id="confType" class="ui-hide"><span class="btn-service"  id="residente">Residente</span><span id="no residente" class="btn-service" >Non Residente</span></div>`}
    const confRegione = () =>{return `<div id="confRegione" class="ui-hide"><label><span>CAP</span><input id="inputRegione" type="text" maxlength="5" minlength="5" /></label><button id="addRegione" class="Submit-btn">Cerca</button></div>`}
    const confRegioneOff = () =>{return `<div id="confRegioneOff" class="ui-hide">regioni</div>`}
    const confCitta = () =>{return `<div id="confCitta" class="ui-hide"></div>`}
    const confPotenza = () => { return `<div id="confPotenza" class="ui-hide">
            <div class="btn-label-input" id="potenza">
                <label>Potenza</label>
                <input id="idpotenza" type="text" maxlength="4" >
            </div><div class="btn-label-input ui-hide" id="impegnata" ><label>Impegnata</label><input id="Impegnata" type="text" maxlength="4" required></div><button class="Submit-btn">avanti</button></div>`}
    const confConsumoEnergia = () => {return `<div id="confConsumo" class="ui-hide"><span class="btn-service" id="monorario">Monorario</span><span class="btn-service" id="biorario">Biorario</span><span class="btn-service" id="triorario">Triorario</span></div>`}
    const confClasse = () => (`<div id="confClasse" class="ui-hide"><div id="groupClass"></div></div>`)
    const confConsumoGasPro = () =>{return `<div id="confConsumoGasPro" class="ui-hide"><span><span>Metri Cubi</span><input id="gasPro" type="text" maxlength="7"></span><button class="Submit-btn">Carica</button></div>`}
    const confConsumoGas = () =>{return `<div id="confConsumoGas" class="ui-hide"><span><span>Metri Cubi</span><input id="gasConsumato" type="text" maxlength="7"></span><button class="Submit-btn">Carica</button></div>`}
    const confFatt = () => { return `<div id="confFatt" class="ui-hide"><span class="btn-service" id="mensile">Mensile</span><span class="btn-service" id="bimestrale">Bimestrale</span></div>`}
    const confDate = () => {return `<div id="confDate" class="ui-hide" >
                <div id="year" class="btn-label-input">
                    <label>Anno</label>
                    <select id="dateBill" name="year" >
                        <option></option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                    </select>
                </div>
                <div id="dateMonths" class="date-months ui-hide">
                </div>
            </div>`}
    const confKw = () => { return `<div id="confkw" class="ui-hide"></div>`}
    const confReattiva = () => { return `<div id="confReattiva" class="ui-hide"></div>`}
    const confSave = () => { return `<div id="confSave" class="ui-hide"><div class="btn-label-input"><label>Nome Utenza</label><input id="nameUtenza" type="text" autocomplete="off" maxlength="17"/></div><button id="saveName" class="Submit-btn">Crea</button></div>`}
    const confAteco = () => { return `<div id="confAteco" class="ui-hide"><span> Codice Ateco <form><input type="text" maxlength="2"><input type="text" maxlength="2"><input type="text" maxlength="2"><input type="submit"></form></span></div>`}
    const confEnd = () => { return `<div id="confEnd" class="ui-hide"><button  class="Submit-btn">Continua</button></div>`}
    const confComparator = () => { return `<div id="confComparator" class="ui-hide">
        <div class="btn-label-input">
            <label>Importo</label>
            <input id="comparator" type="text" />
        </div>
        <button class="Submit-btn">Salva</button>
        </div>`}
    const slides = [confProgress()+''+confCaption()+''+confServ()+''+setSer()+''+confType()+''+confRegione()+''+confRegioneOff()+''+confCitta()+''+confPotenza()+''+confConsumoEnergia()+''+confClasse()+''+confConsumoGasPro()+''+confConsumoGas()+''+confFatt()+''+confDate()+''+confKw()+''+confReattiva()+''+confSave()+''+confAteco()+''+confComparator()+''+confEnd()]
    return slides
    }


 export const startConfigurator = () => {
    let newUTBoxContainer = document.querySelector('.newUTBoxContainer')
    let close  = document.createElement('button')
    close.innerHTML = 'chiudi'
    close.classList.add('btn-close')
    close.addEventListener('click', ()=> {
        let newUTBox = document.querySelector('.newUTBox')
        newUTBox.remove()
    })
    newUTBoxContainer.appendChild(close)

    let button = document.createElement('button')
    button.classList.add('btn-back','ui-hide')
    button.innerHTML = 'indietro'
    newUTBoxContainer.appendChild(button)
    
    const back = ['']


    button.addEventListener('click', () => {
    console.log('click da:', back);
    
    const i = back.length;
    if (i === 1) return; // oppure gestisci come "torna all'inizio"

    const current = back[i];
    const previous = back[i - 1];

    console.log('si va dietro a:', previous);

    document.getElementById(current).classList.add('ui-hide');
    document.getElementById(current).classList.remove('ui-show');
    document.getElementById(previous).classList.add('ui-show');
    document.getElementById(previous).classList.remove('ui-hide');

    back.pop(); // rimuove l'ultimo
    });

 
    let confCaption = document.getElementById('confCaption')
 
    confCaption.innerHTML = `Scegli il tipo d'utenza`
    let uno = {servizio: '',type: ''}

    confServ.addEventListener('click', e => {
            
            if(e.target.id === 'btnHome' ){
                back.push('confServ')
                uno.servizio = 'casa'         
                confServ.classList.remove('ui-show')
                confServ.classList.add('ui-hide')
                setSer.classList.remove('ui-hide')
                setSer.classList.add('ui-show')
                button.classList.remove('ui-hide')
                button.classList.add('ui-show')
                confCaption.innerHTML = `Scegli il tipo d'Utenza` 
            }
            if(e.target.id === 'btnIndustry'){
                back.push('confServ')
                uno.servizio = 'azienda'
                confServ.classList.remove('ui-show')
                confServ.classList.add('ui-hide')
                setSer.classList.remove('ui-hide')
                setSer.classList.add('ui-show')   
                confCaption.innerHTML = `Secgli il tipo d'Utenza`             
                }
                
    })

    setSer.addEventListener('click', e => {
           
            if(e.target.id === 'btnPower'){
                 uno.type = 'energia'
            
                if(uno.servizio === 'casa'){
                    back.push('setSer')
                    setSer.classList.remove('ui-show')
                    setSer.classList.add('ui-hide')
                    confType.classList.remove('ui-hide')
                    confType.classList.add('ui-show')
                    confCaption.innerHTML = `Scegli la destinazione d'uso`
                }
                if(uno.servizio === 'azienda'){
                    back.push('setSer')
                    setSer.classList.remove('ui-show')
                    setSer.classList.add('ui-hide')
                    confPotenza.classList.remove('ui-hide')
                    confPotenza.classList.add('ui-show')
                    impegnata.style.display = 'none'
                    confCaption.innerHTML = `Inserisci la Potenza del tuo contatore`
                }   
            }
            if(e.target.id === 'btnGas'){
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
                
                    confRegioneOff.classList.remove('ui-hide')
                    confRegioneOff.classList.add('ui-show')
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
            if(uno.servizio === 'casa'){groupClass.innerHTML = `<span>G4</span><span>G6</span><div>Altre</div>`}
            if(uno.servizio === 'azienda'){groupClass.innerHTML = `<span>G4</span><span>G6</span><span>G10</span><span>G16</span><span>G25</span><span>G40</span><div>Altre</div>`}
            confClasse.classList.remove('ui-hide')
            confClasse.classList.add('ui-show')
            confCaption.innerHTML = `Inserisci la classe del contatore`
        }
    })

    confType.addEventListener('click', e => {   
   
        if(e.target.textContent === 'Residente'){
            back.push('confType')
            uno.tariffa ='tdr'
            confType.classList.remove('ui-show')
            confType.classList.add('ui-hide')
            confPotenza.classList.remove('ui-hide')
            confPotenza.classList.add('ui-show')
            confCaption.innerHTML = `Inserisci la Potenza del contatore`
        }
        if(e.target.textContent === 'Non Residente'){
            back.push('confType')
            uno.tariffa = 'tdn'
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
                    let capCitta = inputRegione.selectionEnd
                    let CAP = inputRegione.value
                        if(capCitta === 5){     
                        let dba = firebase.firestore()
                        dba.collection('db-comuni').doc('cap')
                        .collection('comuni').where('cap','==',CAP)
                        .get()
                        .then(docs => {
                            if(docs.empty){
                                inputRegione.value = ''
                                let nots = new Message('25vh')
                                nots.error(`<span>CAP non trovato riprova</span>`)
                            }
                            if(docs.size > 4){
                                confCitta.innerHTML += `<small id="selInfo"></small>`
                            }
                            docs.forEach(doc => {
                                let cap = doc.id.split('-')[0]
                                let citta = doc.id.split('-')[1]
                                confCitta.innerHTML += `<span class="selectCap" id="${doc.id}"><span>${cap}</span><span>${citta}</span><span><img src="./dist/img/arrow-left-double.svg"></span></span>`
                                confCitta.classList.remove('ui-hide')
                                confCitta.classList.add('ui-show')
                                confRegione.classList.remove('ui-show')
                                confRegione.classList.add('ui-hide')
                                confCaption.innerHTML = `Scegli il Comune` 
                                });     
                            })
                        .catch(function(err){
                            let not = new Notifica('5vh')
                            not.errorContent(codesError(err.code))
                        })  
                        
                        } // capcitta
                        else{
                        let not = new Message('25vh')
                        not.error(`<span>il CAP é incompleto</span>`)
                        }        
            }  
    })

    confCitta.addEventListener('click', e => {
            e.preventDefault()
            if(e.target.matches('span'))
            {let ind = e.target.parentElement.id
                if(ind){
                    let db = firebase.firestore()
                    db.collection('db-comuni').doc('cap')
                    .collection('comuni').doc(ind)
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
                            if(uno.servizio === 'casa'){groupClass.innerHTML = `<span>G4</span><span>G6</span><div>altre</div>`}
                            if(uno.servizio === 'azienda'){groupClass.innerHTML = `<span>G4</span><span>G6</span><span>G10</span><span>G16</span><span>G25</span><span>G40</span><div>altre</div>`}
                            confCaption.innerHTML = `Inserisci la classe del contatore`
                        }         
                    })
                .catch(function(){
                    let not = new Message()
                    not.content(`<span>Città non trovata</span>`)
                })    
            }  
        }
    })

    confPotenza.addEventListener('keypress', (e) => {
        let evt = e || window.event;
        let key = evt.keyCode || evt.which;
        key = String.fromCharCode( key );
        let regex = /[0-9/./]/;
        if( !regex.test( key )){
            evt.returnValue = false;
            evt.preventDefault()
        }
    })

    confPotenza.addEventListener('keyup', e => {
            e.preventDefault()
            const potenzaPower = Number(idpotenza.value)
            if(uno.servizio === 'azienda'){
                if(potenzaPower > 16 && potenzaPower <= 100){
                impegnata.classList.remove('ui-hide')
                impegnata.classList.add('ui-show')    
                impegnata.style.display = 'flex'
                }else{
                impegnata.style.display = 'none'
                impegnata.classList.remove('ui-show')
                impegnata.classList.add('ui-hide')   
                }
                
            }else{
                impegnata.style.display = 'none'
            }
            if(potenzaPower > 100){
            e.returnValue = false
            e.target.value = ''
            let not = new Message('25vh')
            not.error(`<span>La potenza non deve superare 100Kw</span>`)
            }
        
    })

    Impegnata.addEventListener('keyup', e => {
        e.preventDefault()
        let impValue = Number(Impegnata.value)
        if(impValue > (Number(idpotenza.value) * 1.10) ){
            e.returnValue = false
            e.target.value = ''
            let not = new Message('15vh')
            not.error(`<span>La potenza impegnata non deve superare la potenza disponibile </span>`)
        }

    })

    confPotenza.addEventListener('click', e => {
            e.preventDefault()
            if(e.target.matches('button')){
                let potenzaPower = Number(idpotenza.value)
                if(potenzaPower > 0){
                    if(uno.tariffa === 'tdr' || uno.tariffa === 'tdn'){   
                    let valuePotenza = potenzaPower
                    uno.potenza = valuePotenza 
                    uno.impegnata = false
                    confPotenza.classList.remove('ui-show')
                    confPotenza.classList.add('ui-hide')
                    confConsumo.classList.remove('ui-hide')
                    confConsumo.classList.add('ui-show')
                    confCaption.innerHTML = `Scegli il tipo di consumo`  
                    }else{
                    const bta = Number(potenzaPower)
                    const imp = Number(Impegnata.value)
                    if(bta > 0 && bta <= 1.5){uno.tariffa = 'bta1', uno.potenza = bta, uno.impegnata = 0}
                    if(bta > 1.5 && bta <= 3){uno.tariffa = 'bta2', uno.potenza = bta, uno.impegnata = 0}
                    if(bta > 3 && bta <= 6){uno.tariffa = 'bta3', uno.potenza = bta, uno.impegnata = 0}
                    if(bta > 6 && bta <= 16.5){uno.tariffa = 'bta4', uno.potenza = bta, uno.impegnata = 0}
                    if(bta > 16.5 ){uno.tariffa = 'bta6', uno.potenza = bta, uno.impegnata = imp}
                    if(imp === null){
                        let not = new Message('15vh')
                        not.error(`<span>inserire la potenza impegnata</span>`)    
                        }else{
                            confPotenza.classList.remove('ui-show')
                            confPotenza.classList.add('ui-hide')
                            confConsumo.classList.remove('ui-hide')
                            confConsumo.classList.add('ui-show') 
                            confCaption.innerHTML = `Scegli il tipo di consumo`   
                        }
                    confPotenza.classList.remove('ui-show')
                    confPotenza.classList.add('ui-hide')
                    confConsumo.classList.remove('ui-hide')
                    confConsumo.classList.add('ui-show') 
                    confCaption.innerHTML = `Scegli il tipo di consumo`         
                    } 
                }else{
                let not = new Message('25vh')
                not.content(`<span class="contentMsg">non hai inserito la potenza</span>`)    
                }  
            }
    })

    confConsumo.addEventListener('click', e => {
            e.preventDefault()
            if(e.target.matches('#monorario')){
                uno.consumo = 'monorario'
                confCaption.innerHTML = `Inserisci il totale kw consumati`
                confConsumo.classList.remove('ui-show')
                confConsumo.classList.add('ui-hide')
                confkw.classList.remove('ui-hide')
                confkw.classList.add('ui-show')              
                confkw.innerHTML = `<form>
                    <div class="btn-label-input">
                        <label>F0</label>
                        <input id="fasciaMono" type="text" maxlength="7" autocomplete="off">
                    </div>
                    <button class="Submit-btn">Carica</button></form>`
                fasciaMono.addEventListener('keypress', e => {
                    let evt = e || window.event
                    let key = evt.keyCode || evt.which;
                        key = String.fromCharCode( key );
                        let regex = /[0-9/./]/;
                        if( !regex.test( key )){
                            evt.returnValue = false;
                            evt.preventDefault()
                        }
                    }) 
                fasciaMono.addEventListener('keyup', e => {
                    e.preventDefault()
                    let impValue = Number(fasciaMono.value)
                    if(impValue > 200000 ){
                        e.returnValue = false
                        e.target.value = ''
                        let not = new Message('15vh')
                        not.error(`<span>Il consumo non deve superare 200000 kw/h </span>`)
                    }
                })
                confkw.addEventListener('submit', e => {
                        e.preventDefault()
                        let valuef0 = Number(fasciaMono.value)
                        if(valuef0 > 0){
                        uno.f0 = valuef0
                        uno.f1 = 0, uno.f2 = 0, uno.f3 = 0, uno.fg = 0, uno.fn = 0
                        if(uno.potenza > 16){
                            confReattiva.innerHTML = `<form>
                                <div class="btn-label-input">
                                    <label>F0</label>
                                    <input id="rf0" type="text" maxlength="7" autocomplete="off">
                                </div>
                                <button class="Submit-btn">Carica</button></form>`
                            confkw.classList.remove('ui-show')
                            confkw.classList.add('ui-hide')
                            confReattiva.classList.remove('ui-hide')
                            confReattiva.classList.add('ui-show')  
                            confCaption.innerHTML = `Inserisci la Energia Reattiva per Fascia` 
                        }else{
                            confkw.classList.remove('ui-show')
                            confkw.classList.add('ui-hide')
                            confFatt.classList.remove('ui-hide')
                            confFatt.classList.add('ui-show')  
                            confCaption.innerHTML = `Scegli la periodicità delle bollette`   
                        }
                        
                        }else{
                            let not = new Message('20vh')
                            not.error(`<span>non hai inserito il consumo</span>`)
                        }
                    })
            }
            if(e.target.matches('#biorario')){
                uno.consumo = 'biorario'
                confCaption.innerHTML = `Inserisci i kw consumati per ogni fascia`
                confConsumo.classList.remove('ui-show')
                confConsumo.classList.add('ui-hide')
                confkw.classList.remove('ui-hide')
                confkw.classList.add('ui-show')
                confkw.innerHTML = `<form>
                    <div class="btn-label-input">
                        <label>F1</label>
                        <input id="fasciaGiorno" type="text" autocomplete="off" maxlength="7" />
                    </div>
                    <div class="btn-label-input">
                        <label>F23</label>
                        <input id="fasciaNotte" type="text" autocomplete="off" maxlength="7">
                    </div>
                    <button class="Submit-btn">Carica</button></form>`
                fasciaGiorno.addEventListener('keypress', e => {
                    let evt = e || window.event
                    let key = evt.keyCode || evt.which;
                        key = String.fromCharCode( key );
                        let regex = /[0-9/./]/;
                        if( !regex.test( key )){
                            evt.returnValue = false;
                            evt.preventDefault()
                        }
                    }) 
                fasciaGiorno.addEventListener('keyup', e => {
                    e.preventDefault()
                    let impValue = Number(fasciaGiorno.value)
                    let notteValue = Number(fasciaNotte.value) > 0 ? Number(fasciaNotte.value) : 0
                    if((impValue + notteValue) > 200000 ){
                        e.returnValue = false
                        e.target.value = ''
                        let not = new Message('15vh')
                        not.error(`<span>Il consumo non deve superare 200000 kw/h </span>`)
                    }
                })
                fasciaNotte.addEventListener('keypress', e => {
                    let evt = e || window.event
                    let key = evt.keyCode || evt.which;
                        key = String.fromCharCode( key );
                        let regex = /[0-9/./]/;
                        if( !regex.test( key )){
                            evt.returnValue = false;
                            evt.preventDefault()
                        }
                    }) 
                fasciaNotte.addEventListener('keyup', e => {
                    e.preventDefault()
                    let impValue = Number(fasciaNotte.value)
                    let giornoValue = Number(fasciaGiorno.value) ? Number(fasciaGiorno.value) : 0
                    if((impValue + giornoValue ) > 200000 ){
                        e.returnValue = false
                        e.target.value = ''
                        let not = new Message('15vh')
                        not.error(`<span>Il consumo non deve superare 200000 kw/h </span>`)
                    }
                })
                confkw.addEventListener('submit', e => {
                        e.preventDefault()
                        let valueGiorno = Number(fasciaGiorno.value)
                        let valueNotte = Number(fasciaNotte.value)
                        if(valueGiorno > 0 && valueNotte > 0){
                            uno.fg = valueGiorno, uno.fn = valueNotte, uno.f0 = false, uno.f1 = false, uno.f2 = false, uno.f3 = false
                            if(uno.potenza > 16){
                                confReattiva.innerHTML = `<form>
                                                            <div class="btn-label-input">
                                                                <label>F1</label>
                                                                <input id=rfg" type="text" autocomplete="off" maxlength="7" />
                                                            </div>
                                                            <div class="btn-label-input">
                                                                <label>F23</label>
                                                                <input id="rgn" type="text" autocomplete="off" maxlength="7">
                                                            </div>
                                                            <button class="Submit-btn">Carica</button></form>`
                                confkw.classList.remove('ui-show')
                                confkw.classList.add('ui-hide')
                                confReattiva.classList.remove('ui-hide')
                                confReattiva.classList.add('ui-show')  
                                confCaption.innerHTML = `Inserisci la Energia Reattiva per Fascia` 
                            }else{
                                confkw.classList.remove('ui-show')
                                confkw.classList.add('ui-hide')
                                confFatt.classList.remove('ui-hide')
                                confFatt.classList.add('ui-show') 
                                confCaption.innerHTML = `Scegli la periodicità delle bollette`
                            }
                        }
                        else{
                        let not = new Message('15vh')
                        not.error('<span>Non hai inserito il consumo</span>')
                        }
                    })
                }
            if(e.target.matches('#triorario')){
                uno.consumo = 'triorario'
                confCaption.innerHTML = `Inserisci i kw consumati per ogni fascia`
                confConsumo.classList.remove('ui-show')
                confConsumo.classList.add('ui-hide')
                confkw.classList.remove('ui-hide')
                confkw.classList.add('ui-show')
                confkw.innerHTML = `<form>
                    <div class="btn-label-input">
                        <label>F1</label>
                        <input id="fasciaUno" type="text" autocomplete="off" maxlength="7"/>
                    </div>
                    <div class="btn-label-input">
                        <label>F2</label>
                        <input id="fasciaDue" type="text" autocomplete="off" maxlength="7"/>
                    </div>
                    <div class="btn-label-input">
                        <label>F3</label>
                        <input id="fasciaTre" type="text" autocomplete="off" maxlength="7"/>
                    </div>
                    <button class="Submit-btn">Carica</button></form>`
                fasciaUno.addEventListener('keypress', e => {
                    let evt = e || window.event
                    let key = evt.keyCode || evt.which;
                        key = String.fromCharCode( key );
                        let regex = /[0-9/./]/;
                        if( !regex.test( key )){
                            evt.returnValue = false;
                            evt.preventDefault()
                        }
                    }) 
                fasciaUno.addEventListener('keyup', e => {
                    e.preventDefault()
                    let f1Value = Number(fasciaUno.value)
                    let f2Value = Number(fasciaDue.value) ? Number(fasciaDue.value) : 0
                    let f3Value = Number(fasciaTre.value) ? Number(fasciaTre.value) : 0
                    if((f1Value + f2Value + f3Value) > 200000 ){
                        e.returnValue = false
                        e.target.value = ''
                        let not = new Message('5vh')
                        not.error(`<span>Il consumo non deve superare 200000 kw/h </span>`)
                    }
                })
                fasciaDue.addEventListener('keypress', e => {
                    let evt = e || window.event
                    let key = evt.keyCode || evt.which;
                        key = String.fromCharCode( key );
                        let regex = /[0-9/./]/;
                        if( !regex.test( key )){
                            evt.returnValue = false;
                            evt.preventDefault()
                        }
                    }) 
                fasciaDue.addEventListener('keyup', e => {
                    e.preventDefault()
                    let f2Value = Number(fasciaDue.value)
                    let f1Value = Number(fasciaUno.value) ? Number(fasciaUno.value) : 0
                    let f3Value = Number(fasciaTre.value) ? Number(fasciaTre.value) : 0
                    if((f2Value + f1Value + f3Value) > 200000 ){
                        e.returnValue = false
                        e.target.value = ''
                        let not = new Message('5vh')
                        not.error(`<span>Il consumo non deve superare 200000 kw/h </span>`)
                    }
                })
                fasciaTre.addEventListener('keypress', e => {
                    let evt = e || window.event
                    let key = evt.keyCode || evt.which;
                        key = String.fromCharCode( key );
                        let regex = /[0-9/./]/;
                        if( !regex.test( key )){
                            evt.returnValue = false;
                            evt.preventDefault()
                        }
                    }) 
                fasciaTre.addEventListener('keyup', e => {
                    e.preventDefault()
                    let f3Value = Number(fasciaTre.value)
                    let f1Value = Number(fasciaUno.value) ? Number(fasciaUno.value) : 0
                    let f2Value = Number(fasciaDue.value) ? Number(fasciaDue.value) : 0
                    if((f3Value + f1Value + f2Value) > 200000 ){
                        e.returnValue = false
                        e.target.value = ''
                        let not = new Message('5vh')
                        not.error(`<span>Il consumo non deve superare 200000 kw/h </span>`)
                    }
                })
                confkw.addEventListener('submit', e => {
                        e.preventDefault()
                        let valuef1 = Number(fasciaUno.value)
                        let valuef2 = Number(fasciaDue.value)
                        let valuef3 = Number(fasciaTre.value)
                        if(valuef1 > 0 && valuef2 > 0 && valuef3 > 0){
                            if(uno.potenza > 16){
                                confReattiva.innerHTML = `<form>
                                                            <div class="btn-label-input">
                                                                <label>F1</label>
                                                                <input id="rf1" type="text" autocomplete="off" maxlength="7" />
                                                            </div>
                                                            <div class="btn-label-input">
                                                                <label>F2</label>
                                                                <input id="rf2" type="text" autocomplete="off" maxlength="7">
                                                            </div>
                                                            <div class="btn-label-input">
                                                                <label>F3</label>
                                                                <input id="rf3" type="text" autocomplete="off" maxlength="7">
                                                            </div>
                                                            <button class="Submit-btn">Carica</button></form>`
                                confkw.classList.remove('ui-show')
                                confkw.classList.add('ui-hide')
                                confReattiva.classList.remove('ui-hide')
                                confReattiva.classList.add('ui-show')  
                                confCaption.innerHTML = `Inserisci la Energia Reattiva per Fascia` 
                            }else{
                                uno.f1 = valuef1, uno.f2 = valuef2, uno.f3 = valuef3, uno.f0 = 0, uno.fg = 0, uno.fn = 0
                                confkw.classList.remove('ui-show')
                                confkw.classList.add('ui-hide')
                                confFatt.classList.remove('ui-hide')
                                confFatt.classList.add('ui-show') 
                                confCaption.innerHTML = `Scegli la periodicità delle bollette`
                            }
                        }else{
                            let not = new Message('7vh')
                            not.error(`<span>non hai inserito il consumo</span>`)
                        }
                    })
                }
            
    })

    confReattiva.addEventListener('click', e => {
        e.preventDefault()
        if(uno.consumo === 'monorario'){ 
                rf0.addEventListener('keypress', e => {
                    let evt = e || window.event
                    let key = evt.keyCode || evt.which;
                        key = String.fromCharCode( key );
                        let regex = /[0-9/./]/;
                        if( !regex.test( key )){
                            evt.returnValue = false;
                            evt.preventDefault()
                        }
                    }) 
                rf0.addEventListener('change', () => {
                    uno.r0 = Number(rf0.value)
                })
        }
        if(uno.consumo === 'biorario'){
                rfg.addEventListener('keypress', e => {
                    let evt = e || window.event
                    let key = evt.keyCode || evt.which;
                        key = String.fromCharCode( key );
                        let regex = /[0-9/./]/;
                        if( !regex.test( key )){
                            evt.returnValue = false;
                            evt.preventDefault()
                        }
                    }) 
                rfg.addEventListener('change', () => {
                    uno.rg = Number(rfg.value)
                })
                rfn.addEventListener('keypress', e => {
                    let evt = e || window.event
                    let key = evt.keyCode || evt.which;
                        key = String.fromCharCode( key );
                        let regex = /[0-9/./]/;
                        if( !regex.test( key )){
                            evt.returnValue = false;
                            evt.preventDefault()
                        }
                    }) 
                rfn.addEventListener('change', () => {
                    uno.rn = Number(rfn.value)
                })
        }
        if(uno.consumo === 'triorario'){
                rf1.addEventListener('keypress', e => {
                    let evt = e || window.event
                    let key = evt.keyCode || evt.which;
                        key = String.fromCharCode( key );
                        let regex = /[0-9/./]/;
                        if( !regex.test( key )){
                            evt.returnValue = false;
                            evt.preventDefault()
                        }
                    }) 
                rf1.addEventListener('change', () => {
                    uno.r1 = Number(rf1.value)
                })
                rf2.addEventListener('keypress', e => {
                    let evt = e || window.event
                    let key = evt.keyCode || evt.which;
                        key = String.fromCharCode( key );
                        let regex = /[0-9/./]/;
                        if( !regex.test( key )){
                            evt.returnValue = false;
                            evt.preventDefault()
                        }
                    }) 
                rf2.addEventListener('change', () => {
                    uno.r2 = Number(rf2.value)
                })
                rf3.addEventListener('keypress', e => {
                    let evt = e || window.event
                    let key = evt.keyCode || evt.which;
                        key = String.fromCharCode( key );
                        let regex = /[0-9/./]/;
                        if( !regex.test( key )){
                            evt.returnValue = false;
                            evt.preventDefault()
                        }
                    }) 
                rf3.addEventListener('change', () => {
                    uno.r3 = Number(rf3.value)
                })
        }
        if(e.target.matches('button')){
            confReattiva.classList.remove('ui-show')
            confReattiva.classList.add('ui-hide')
            confFatt.classList.remove('ui-hide')
            confFatt.classList.add('ui-show')  
            confCaption.innerHTML = `Scegli la periodicità delle bollette`   
        }
    })


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
                    confCaption.innerHTML = `Inserisci il totale dei mc che hai consumato`    
                }
            }
            if(e.target.matches('div')){
                    confClasse.innerHTML = `<span id="otherClass"><span>G</span><input id="classeContatore" type="text" maxlength="3" /></span><button class="Submit-btn">Carica</button>`
                    
                    classeContatore.addEventListener('keyup', e => {
                                e.preventDefault()
                                let value = Number(classeContatore.value)
                                if(value > 100){
                                    e.returnValue = false
                                    e.target.value = ''
                                    let not = new Message('25vh')
                                    not.error(`<span>La classe inserita non é valida</span>`)
                                }
                    })
                    confClasse.addEventListener('click', e => {
                        if(e.target.matches('button')){
                            let cont = Number(classeContatore.value)     
                            if(cont > 0){
                                uno.contatore = cont
                                confClasse.classList.remove('ui-show')
                                confClasse.classList.add('ui-hide')
                                confConsumoGasPro.classList.remove('ui-hide')
                                confConsumoGasPro.classList.add('ui-show')
                                confCaption.innerHTML = `Inserisci il totale del consumo, di gas metano attuale` 
                            }else{
                                let not = new Message('25vh')
                                not.error(`<span>Inserire la classe del contatore</span>`)
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

    confConsumoGasPro.addEventListener('keypress',( e )=> {
        let evt = e || window.event;
        let key = evt.keyCode || evt.which;
        key = String.fromCharCode( key );
        let regex = /[0-9/./]/;
        if( !regex.test( key )){
            evt.returnValue = false;
            evt.preventDefault();
        }
    })

    confConsumoGasPro.addEventListener('keyup', e => {
        e.preventDefault()
        let Value = Number(gasPro.value)
        if(Value > 200000 || Value === null){
            e.returnValue = false;
            e.target.value = '';
            let not = new Message('25vh');
            not.error(`<span>Il valore inserito non é valido</span>`);
        }
    })

    confConsumoGasPro.addEventListener('click', e => {
            e.preventDefault()
            console.log(e)
            if(e.target.matches('button')){
                let gasProC = Number(gasPro.value)
                if(gasProC || gasPro.value === '0'){
                uno.mcAnno = Number(gasPro.value)
                confConsumoGasPro.classList.remove('ui-show')
                confConsumoGasPro.classList.add('ui-hide')
                confConsumoGas.classList.remove('ui-hide')
                confConsumoGas.classList.add('ui-show')
                confCaption.innerHTML = `Inserisci i metri cubi consumati`
                }else{
                    let notifica = new Message('25vh')
                    notifica.error(`<span>inserire il consumo attuale</span>`)           
                } 
            }
    })

    gasConsumato.addEventListener('keypress', e => {
            let evt = e || window.event;
            let key = evt.keyCode || evt.which;
            key = String.fromCharCode( key );
            let regex = /[0-9/./]/;
            if( !regex.test( key )){
                evt.returnValue = false;
                evt.preventDefault()
            }
    })
    gasConsumato.addEventListener('keyup', e => {
        let GASPRO =   uno.mcAnno
        let GAS = Number(gasConsumato.value)
        if((GASPRO + GAS ) > 200000){
            e.returnValue = false;
            e.target.value = '';
            let not = new Message('25vh');
            not.error(`<span>Il valore inserito supera i 200000 metri cubi</span>`);
        }
    })
    confConsumoGas.addEventListener('click', e => {
        e.preventDefault()
        if(e.target.matches('button')){
            let mcs = Number(gasConsumato.value)
            if(mcs || gasConsumato.value === '0'){
            uno.mc = mcs
                if(uno.mcAnno >= 0 && Number(gasConsumato.value )>= 0 ){
                    uno.scaglioni = scaglioni(mcs,uno.mcAnno)
                }
                    confConsumoGas.classList.remove('ui-show')
                    confConsumoGas.classList.add('ui-hide')
                    confFatt.classList.remove('ui-hide')
                    confFatt.classList.add('ui-show')
                    confCaption.innerHTML = `Inserisci la periodicità delle bollette`    
            }else{
                let notifica = new Message('25vh')
                notifica.error(`<span>inserire il consumo</span>`)
            }
            
        }              
    })   

    confFatt.addEventListener('click', e => {
            if(e.target.matches('#mensile')){uno.fatturazione = 1}
            if(e.target.matches('#bimestrale')){uno.fatturazione = 2}
            confFatt.classList.remove('ui-show')
            confFatt.classList.add('ui-hide')
            confDate.classList.remove('ui-hide')
            confDate.classList.add('ui-show')
            confCaption.innerHTML = `Scegli la data di Calcolo`
    })

    dateBill.addEventListener('change', (e)=> {
        e.preventDefault()
        const months = document.getElementById('dateMonths')
        const button = document.createElement('button')
        button.innerHTML = 'Salva'
        button.classList.add('Submit-btn')
    
        let dateBill = ''
        if(e.target.value === null) return;
        months.classList.remove('ui-hide')
        months.classList.add('ui-show')
        const monthsData = Array(12)
        const checkDisabled = (i)=>{
            if(uno.servizio === 'casa' && uno.type === 'energia'){
                let tariffe = JSON.parse(localStorage.getItem('rete_td'))
                return Object.keys(tariffe).includes(i) ? undefined : "disabled"
            }
            if(uno.servizio === 'azienda' && uno.type === 'energia'){
                let tariffe = JSON.parse(localStorage.getItem(`rete_${uno.tariffa}`))
                return Object.keys(tariffe).includes(i) ? undefined : "disabled"
            }
        }
        for(let i = 1; i <= 12; i++){   
            let check = `${e.target.value}${i < 10 ? `0${i}` : i}`
            monthsData[i] = `<button type="button" ${checkDisabled(check)} data-click="${check}" >${Months[i -1]}</button>`
        }
        months.innerHTML = ''
        months.innerHTML = monthsData.join('')

        months.addEventListener('click', e => {
            e.preventDefault()
        dateBill = e.target.getAttribute('data-click')
        confDate.appendChild(button)
        })

        button.addEventListener('click' ,()=>{
            uno.dateBill = dateBill
            confDate.classList.remove('ui-show')
            confDate.classList.add('ui-hide')
            confComparator.classList.remove('ui-hide')
            confComparator.classList.add('ui-show')
            confCaption.innerHTML = `inserisci l'importo della attuale bolletta`
        })
        
    })

    comparator.addEventListener('keypress', (e) => {
        let evt = e || window.event;
        let key = evt.keyCode || evt.which;
        key = String.fromCharCode( key );
        let regex = /[0-9/,/]/;
        if( !regex.test( key )){
            evt.returnValue = false;
            evt.preventDefault()
        }
    })

    comparator.addEventListener('change', e => {
        uno.average = Number(e.target.value.replace(',','.'))
        confComparator.classList.remove('ui-show')
        confComparator.classList.add('ui-hide')
        confSave.classList.remove('ui-hide')
        confSave.classList.add('ui-show')
        confCaption.innerHTML = `inserisci il nome dell'utenza`
    })

    confSave.addEventListener('click', e => {
            e.preventDefault()
            if(e.target.id === 'saveName'){  
                let utenzaNome = nameUtenza.value
                if(utenzaNome){   
                uno.nameUT = utenzaNome.toLowerCase()
                uno.ateco = false
                let date = new Date()
                let giorno = date.getDate()
                let mes = date.getUTCMonth()+1
                let anno = date.getFullYear()
                let mese
                if(giorno < 10 ){giorno = 0+''+date.getDate()}
                if(mes < 10){mese = 0+''+mes}
                let dataCreated = giorno+'/'+mese+'/'+anno
                        if(dataCreated){
                            uno.data = dataCreated
                            let utenze = JSON.parse(localStorage.getItem('utenze'))
                            let newUT = []
                            newUT.push(utenze)
                            newUT.push(uno)
                            localStorage.setItem('utenze',JSON.stringify(newUT.filter(Boolean)))
                            confSave.classList.remove('ui-show')
                            confSave.classList.add('ui-hide') 
                            confEnd.classList.remove('ui-hide')
                            confEnd.classList.add('ui-show')
                            confCaption.innerHTML = `L'Utenza ${uno.nameUT} è stata creata con successo`
                        }else{
                            let not  = new Message('25vh')
                            not.error(`<span>abbiamo rilevato un problema con la data riprova</span>`)
                        } 
                }else{
                    let not = new Message('25vh')
                    not.error(`<span>Inserire un nominativo a questa Utenza</span>`)
                }   
            }
    })

    confAteco.addEventListener('submit', e => {
            e.preventDefault()
            let af = e.path[0][0].value, ad = e.path[0][1].value, au = e.path[0][2].value
            uno.ateco = af+ad+au
            confAteco.classList.remove('ui-show')
            confAteco.classList.add('ui-hide')
            confEnd.classList.remove('ui-hide')
            confEnd.classList.add('ui-show')
            confCaption.innerHTML = 'la tua utenza è stata creata'
    })

    confEnd.addEventListener('click', e => {
            e.preventDefault()
            if(e.target.matches('.successForm')){ 
            let confbox = document.querySelector('.newUTBox')
            confbox.remove()
            readStorage()
            }
        })

    confProgress.innerHTML = `<span class="coverIntro"><img src="./dist/img/people.jpg"> </span>` 
    
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
    //let diff = consumiSca[hh] - pro 

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