import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { Notifica, codesError } from '../helpers/notifica'


const config = {
  apiKey: "AIzaSyB3NWS945Mwpt1Il3n7RquYNTXCec2Pc9s",
  authDomain: "wuefire-bbe47.firebaseapp.com",
  databaseURL: "https://wuefire-bbe47.firebaseio.com",
  projectId: "wuefire-bbe47",
  storageBucket: "wuefire-bbe47.appspot.com",
  messagingSenderId: "1090800108157",
  appId: "1:1090800108157:web:1f4bcb7e5a83dddd"
}

const init = firebase.initializeApp(config)

const Firestore = init.firestore()

export const fireBids = () => {
    let homeGas = []
    let busGas = []
    let homePower = []
    const busPower = []
    const power_bids = []
    Firestore.collection('offerte').doc('energia').collection('people').get()
    .then(onSnapshot => {
            onSnapshot.forEach(doc => {
               power_bids.push({...doc.data(),  logo: 'eco.png'})
            })
            localStorage.setItem('bids_power', JSON.stringify(power_bids))
    })
    .catch(error => {
        let errCode = error.code
        let not = new Notifica()
        not.errorContent(codesError(errCode))
    })

}

export const saveUtenzaDB = (a,c,d) => {
     let dats = d
     Firestore.collection('users').doc(a).collection('utenze').doc(c)
     .set(dats)
     .then(function(){
        let not = new Notifica()
        not.successContent(`Utenza salvata con successo`)
    })
    .catch(function(error){
        let errCode = error.code
        let not = new Notifica()
        not.errorContent(codesError(errCode))
    })
}

export const fireUtenzeUser = (utente) => {
    let ur = []
    Firestore.collection('users').doc(utente).collection('utenze').orderBy('data','asc').get()
    .then(onSnapshot => {
       onSnapshot.forEach(doc => { 
           let item = doc.data()
           ur.push(item)
           localStorage.setItem('utenze', JSON.stringify(ur))      
       })
    })
    .catch(function(error){
        let errCode = error.code
        let not = new Notifica()
        not.errorContent(codesError(errCode))
    })
}

export const deleteUtenzaUser = (utente,utenza) =>{
    Firestore.collection('users').doc(utente)
    .collection('utenze').doc(utenza).delete()
    .then(function(){
        let not = new Notifica()
        not.successContent(`Utenza eliminata con successo`)
        fireUtenzeUser(utente)
        })
    .catch(function(error){
        let codee = error.code
        let not = new Notifica()
        not.errorContent(codesError(codee))
    })
}


export const fireTariffePower = () => {
    Promise.all([
        Firestore.collection('tariffe').doc('bta1').get(),
        Firestore.collection('tariffe').doc('bta2').get(),
        Firestore.collection('tariffe').doc('bta3').get(),
        Firestore.collection('tariffe').doc('bta4').get(),
        Firestore.collection('tariffe').doc('bta5').get(),
        Firestore.collection('tariffe').doc('bta6').get(),
        Firestore.collection('tariffe').doc('td').get()
    ]).then(([bta1, bta2, bta3, bta4, bta5, bta6, td])=> {
        if(bta1.exists){
            localStorage.setItem('rete_bta1', JSON.stringify(bta1.data()))
        }
        if(bta2.exists){
            localStorage.setItem('rete_bta2', JSON.stringify(bta2.data()))
        }
        if(bta3.exists){
            localStorage.setItem('rete_bta3', JSON.stringify(bta3.data()))
        }
        if(bta4.exists){
            localStorage.setItem('rete_bta4', JSON.stringify(bta4.data()))
        }
        if(bta5.exists){
            localStorage.setItem('rete_bta5', JSON.stringify(bta5.data()))
        }
        if(bta6.exists){
            localStorage.setItem('rete_bta6', JSON.stringify(bta6.data()))
        }
        if(td.exists){
            localStorage.setItem('rete_td', JSON.stringify(td.data()))
        }
    }).catch(error => {
        let errCode = error.code
        let not = new Notifica()
        not.errorContent(codesError(errCode))
    })

}

export const getTariffeGas = ()=> {
    Firestore.collection('tariffe').doc('GAS').get()
    .then(doc => {
        if(doc.exists){
            localStorage.setItem('rete_gas', JSON.stringify(doc.data()))
        }else{
            console.log('no existe')
        }
    })
    .catch(err => {
        let errCode = err.code
        let not = new Notifica()
        not.errorContent(codesError(errCode))
    })
}
