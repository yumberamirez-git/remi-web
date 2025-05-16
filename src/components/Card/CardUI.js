//const BIDU = require('../Bids/BIDU')

class CardUI extends HTMLElement{
   constructor(data){     
    super();
   this.classList.add('card-container')
   this.id = data.data.index
   this.utenza = data.value
   this.configuration = data.data.configuration
   this.bid = data.data.bid 
   this.quotes = data.data.quotes
   this.response = data.data.data[0]
   this.average = 0
//    this.addEventListener('click', e => {
//        e.preventDefault()
//        let on = new BIDU()
//        on.contente(this.utenza)
//        })
    }

    setAverage(cost){
        this.average = cost
    }

    connectedCallback(){
        
    this.innerHTML = `<div class="card-logo">
    <img src=${'dist/logo/eco.png'}></img>
    </div>
    <div class="card-caption">
    <span>offerta</span>
    <span>${this.bid.name }</span>
    <span>Totale <b>€ ${parseFloat(this.response.result.absolute).toFixed(2).replace('.',',')}</b> </span>
    </div>
    <div class="card-price">
    <p>Risparmio</p>
    <span>€ ${parseFloat(this.average - this.response.result.absolute).toFixed(2).replace('.',',')}</span>
    </div>`

    }

    
}

customElements.define('card-ui', CardUI)

module.exports = CardUI
