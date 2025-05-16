import { isAuth, signIn, signOut, registerUser } from './components/auth';
import {AUTH, isUser, fireBids, fireUtenzeUser,  getTariffeGas, fireTariffePower} from './components/Config/firebaseInit';
import firebase from 'firebase/app'
import { IconLock, IconLogo, IconMail, IconRemi, IconView, IconViewOff } from './components/Media/Icons';
import { Notifica } from './components/helpers/notifica';


if('serviceWorker' in navigator){
    window.addEventListener('load', ()=> {
        navigator.serviceWorker.register('./sw.js')
        .catch(err => console.log('registro anullato' + err))
    })
}


fireBids()
fireTariffePower()
getTariffeGas()



export const iniApp = () =>{  
    return `<main class="appStart">
    <div class="overlay" id="init">${IconLogo('100%')}</div>
    <span id="imgON">${IconRemi('33%')}<span class="linear-script">ENERGIA | GAS</span></span>
    <div id="text-caption">Gestisci le tue simulazioni e offerte in u'unica dashboard</div>
    <span class="form-card" id="onSubmit">
    <form>
        <div class="form-control">
            <label>${IconMail}</Label>
            <input placeholder="Email" name="email" type="text"/>
            <span></span>
        </div>
        <div class="form-control">
            <label>${IconLock}</Label>
            <input id="password" placeholder="Password" name="password" type="password"/>
            <span id="view">${IconView}</span>
        </div>
        <button class="form-submit" id="upLogin">Entra</button>
    </form>
    </span>
    <div id="text-caption">Non hai un account ? <a>Registrati</a></div>
    <div id="prome"></div>
    </main>`
}

const copyWrite = document.getElementById('copywrite')
copyWrite.innerHTML = 'REMI'

const oN = document.getElementById('app')
//oN.innerHTML = iniApp()
firebase.auth().onAuthStateChanged(user => {
        if(user){
        fireUtenzeUser(user.email)
        let doc = `<main class="CB"></main>`
        oN.innerHTML = doc
        isAuth(user)
        }else{
        oN.innerHTML = iniApp()     
        }
    })

let init = document.getElementById('init')   
init.addEventListener('click', () => {
    if(document.readyState === 'complete'){
        let doc = `<main class="CB"></main>`
        oN.innerHTML = doc  
        isAuth()
    }
     
})


let passwordInput = document.getElementById('password')
let viewPassword = document.getElementById('view')
viewPassword.addEventListener('click',()=>{
    if(!passwordInput.value) return;
    if(passwordInput.classList.contains('active')){
        passwordInput.classList.remove('active') 
        passwordInput.type ='password'
        viewPassword.innerHTML = IconView
    }else{
       passwordInput.classList.add('active') 
       passwordInput.type ='text' 
       viewPassword.innerHTML = IconViewOff
    }
    
})

let onSubmit = document.getElementById('onSubmit')
onSubmit.addEventListener('submit', e => {
    e.preventDefault()
    const email = e.target[0].value
    const pass = e.target[1].value
    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(function(user){
        if(user.user.emailVerified === true){
            fireUtenzeUser(user.user.email)  
            let apps = document.getElementById('app')
            apps.innerHTML = `<main class="CB"><main>`
            isAuth(user.user)
        }else{
            sio.innerHTML = `<div class="introStart"><span><h4>Verifica la tua email per accedere</h4><img src="./dist/img/emailverified.png"></span></div>`
            setTimeout( function(){
            window.location.href = 'index.html'
            },2000)
        }
    })
    .catch(function(error){
        let not = new Notifica()
        let errCode = error.code
        let errMes = error.message
        console.log(errCode+' / '+errMes)
        not.infoContent(codesError(errCode))
        })
        
    

//       registerPage.addEventListener('click', e => {
//         let caption = document.querySelector('.captionSection')
//         let sig = document.querySelector('.Sign')
//         caption.style.backgroundImage = 'none'
//         sig.style.display = 'none'
//         caption.innerHTML = registerUser()
//         btnLogin.addEventListener('click', e => {
//             e.preventDefault()
//             let email = txtEmail.value
//             let password = txtPassword.value
//             let displayNames = txtDisplayName.value
//             let utente = firebase.auth().currentUser

            // firebase.auth().createUserWithEmailAndPassword(email, pass)
            // .then(function(user){
            //     user.user.updateProfile({
            //         displayName: 'Yumber Ramirez',
            //         emailVerified: false
            //     })
            //    user.user.sendEmailVerification()
            //     .then(function(){
            //     firebase.auth().signOut()
            //     let heo = document.createElement('div')  
            //     heo.classList.add('modal')  
            //     heo.innerHTML = `<div class="introStart"><span><h4>Abbiamo inviato una email di verifica</h4><img src="./dist/img/emailverified.png"></span></div>`
            //     document.body.appendChild(heo)

            //     setTimeout( function(){
            //         window.location.href = 'index.html'
            //         heo.remove()
            //         },2000)   
            // })

            // })
            // .catch(function(error){
            //     password = ''
            //     let not = new Notifica()
            //     let errCode = error.code
            //     not.errorContent(codesError(errCode))
            // })        
//         })//fine del event btnlogin
//       })//fine del event registerUTENTE
//     }
//     if(e.target.innerText === 'ESCI'){ 
//     signOut()
//     } 
})

