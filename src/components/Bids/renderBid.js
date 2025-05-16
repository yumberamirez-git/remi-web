import Header from "../Header"
import firebase from 'firebase/app'
import App from '../App'
import BusinessGasUI from './BusinessGasUI';
import BusinessPowerUI from "./BusinessPowerUI";
import HomePowerUI from './HomePowerUI';
import HomeGasUI from './HomeGasUI';
import CardFunctions from "../Card/CardFunctionsUI";


const CardUI = require("../Card/CardUI")

const Light = `<svg 
width="40" height="8vh"
viewBox="0 0 44 44">
    <path fill="white" stroke="gray" strokeWidth="2"
    d="m10 16 a 1 1 0 0 1 30 0 c 0 0 0 5 -5 11 l -3 11 h -14 l -3 -11 c 0 0 -5 -5 -5 -11z
       m8 25 h 14
       m-9 -19 v 15 m 4 -15 v 15
       m -6 -21 a 1 1 0 0 1 8 0 a 1 1 0 0 1 -8 0
       m-1 28 h 10"/>
</svg>`
const IconGas = `<svg class="svg_gas"
viewBox="0 0 34 34">
    <path fill="white" stroke="gray" strokeWidth="3" opacity="0.8"
    d="m 5 25 c 0 0 10 10 18 0 c 0 0 10 -10 -10 -22 c 0 0 4 10 -6 14 a 71 16 14 0 0 -2 8"/>
</svg>`
const ArrowLeft = `<svg width="32" height="100%" viewBox="0 0 36 36">
<line x1="5" x2="16" y1="20" y2="10" fill="gray" stroke="gray" stroke-width="4" stroke-linecap="round"
stroke-linejoin="round"/> 
<line x1="5" x2="16" y1="20" y2="30" fill="gray" stroke="gray" stroke-width="4" stroke-linecap="round"
stroke-linejoin="round"/> 
<line x1="5" x2="26" y1="20" y2="20" fill="gray" stroke="gray" stroke-width="4" stroke-linecap="round"
stroke-linejoin="round"/> 
</svg>`

const renderBid = (a) => {
    let init = setInterval(() => {
        if(document.readyState === 'complete'){
        clearInterval(init)
        
        const settingsHeader = document.querySelector('#settingsHeader')
        const CB = document.querySelector('#app')
        settingsHeader.innerHTML = ArrowLeft
        settingsHeader.addEventListener('click', () => {
            CB.innerHTML = App()
        })
        const utenzaPro = JSON.parse(localStorage.getItem('utenzaPro'))
        const titleCards = document.querySelector('.cards-bids-title')
        const cardsBids = document.querySelector('.cards-bids')
        const cardsFunctions  = document.querySelector('.cards-functions')
        cardsBids.innerHTML = ''
        cardsFunctions.innerHTML = ''
      
        if(utenzaPro.servizio === 'casa'){
            if(utenzaPro.type === 'gas'){
                titleCards.innerHTML =  `<span>${IconGas}<h3>Gas casa</h3></span><h3>${utenzaPro.nameUT}</h3>` 
                let orderGasHome = HomeGasUI()
                orderGasHome.forEach(gas => {
                console.log(gas)
                let cardGas = new CardUI(gas)
                cardsBids.appendChild(cardGas)
                })
            }
            if(utenzaPro.type === 'energia'){ 
                titleCards.innerHTML = `<span>${Light}<h3>Energia Domestico</h3></span><h3>${utenzaPro.nameUT}</h3>`
                HomePowerUI().then(bid => {
                    let snapShot = new CardUI(bid[0])
                    snapShot.setAverage(utenzaPro.average)
                    cardsBids.appendChild(snapShot)
                    let functions = new CardFunctions(bid[0])
                    cardsFunctions.appendChild(functions)
                })
                .catch(err => console.log(err))
            }

        }
        if(utenzaPro.servizio === 'azienda'){
            if(utenzaPro.type === 'energia'){
            titleCards.innerHTML = `<span>${Light}<h3>Energia Azienda</h3></span><h3>${utenzaPro.nameUT}</h3> `
                BusinessPowerUI().then(bids => {
                    let snapShot = new CardUI(bids[0])
                    snapShot.setAverage(utenzaPro.average)
                    cardsBids.appendChild(snapShot)
                    let functions = new CardFunctions(bids[0])
                    cardsFunctions.appendChild(functions)
                })
                .catch(err => console.log(err))
            }
            if(utenzaPro.type === 'gas'){
                titleCards.innerHTML =  `<span>${Light}<h3>Gas Azienda</h3></span><h3>${utenzaPro.nameUT}</h3>` 
                let orderGasBusiness = BusinessGasUI()
                orderGasBusiness.forEach(gasBus =>{
                let cardsGas = new CardUI(gasBus)
                cardsBids.appendChild(cardsGas)
                })
                
            }
          }
        }
    },200)
    const user = firebase.auth().currentUser
    return (
        `${user ? Header(user) : Header()}
        <div class="renderBid">
            <div class="cards-bids-title"></div>
            <div class="cards-bids"></div>
            <div class="cards-functions"></div>
        </div>`
        )
}

export default renderBid