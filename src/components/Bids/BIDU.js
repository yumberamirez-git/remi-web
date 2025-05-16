class BIDU {
    constructor(){
        this.bidu = document.createElement('div')
        this.bidu.classList.add('bidu')
        
        document.body.appendChild(this.bidu)
    
        this.headerBidu = document.createElement('div')
        this.headerBidu.classList.add('header-bidu')
        this.bidu.appendChild(this.headerBidu)

        this.imgHeader = document.createElement('img')
        this.imgHeader.classList.add('logo')
        this.imgHeader.src = './dist/img/people.jpg'
        this.headerBidu.appendChild(this.imgHeader)
        
        this.title = document.createElement('span')
        this.title.classList.add('header-logo')
        this.title.innerHTML = 'PEOPLE'
        this.headerBidu.appendChild(this.title)

        this.close = document.createElement('span')
        this.close.classList.add('returnTop')
        this.close.addEventListener('click', this.closed.bind(this))
        this.headerBidu.appendChild(this.close)

        

        this.content = document.createElement('div')
        this.content.classList.add('content-bidu')
        this.bidu.appendChild(this.content)
    
    }
  
    closed(){
        this.bidu.remove(this)
    }
    contente(val){
        
        if(val.value.type === 'energia'){
            if(val.value.service === 'casa'){
            this.cano = val.mac.totales.canone !== null ? `<label><span>Canone TV</span><span>${val.mac.totales.canone}</span></label>` : ''
            this.sepa = val.mac.totales.sepa !== 0 ? `<label><span>Domicilazione</span><span>${val.mac.totales.sepa}</span></label>`: ''
            this.invio = val.mac.totales.invioFattura !== 0 ? `<label><span>Fattura Web</span><span>${val.mac.totales.invioFattura}</span></label>` :''
            this.other = val.mac.totales.costiGestione !== 0 ? `<label><span>Costi Gestione</span><span>${val.mac.totales.costiGestione}</span></label>`:''
            }else{
            this.cano = ''
            this.sepa = val.mac.totales.sepa !== 0 ? `<label><span>Adebitto Diretto IBAN</span><span>${val.mac.totales.sepa}</span></label>` : ''
            this.invio = val.mac.totales.invioFattura !== 0 ? `<label><span>Fattura Web</span><span>${val.mac.totales.invioFattura}</span></label>` : ''
            this.other = val.mac.totales.costiGestione !== 0 ? `<label><span>Costi Gestione</span><span>${val.mac.totales.costiGestione}</span></label>` : ''
            }
            
        }
        else{
            if(val.value.service === 'casa'){
                this.cano =  ''
                this.sepa = val.mac.totales.sepa !== 0 ? `<label><span>Domicilazione</span><span>${val.mac.totales.sepa}</span></label>`: ''
                this.invio = val.mac.totales.invioFattura !== 0 ? `<label><span>Fattura Web</span><span>${val.mac.totales.invioFattura}</span></label>` :''
                this.other = val.mac.totales.costiGestione !== 0 ? `<label><span>Costi Gestione</span><span>${val.mac.totales.costiGestione}</span></label>`:''
                }else{
                this.cano = ''
                this.sepa = val.mac.totales.sepa !== 0 ? `<label><span>Adebitto Diretto IBAN</span><span>${val.mac.totales.sepa}</span></label>` : ''
                this.invio = val.mac.totales.invioFattura !== 0 ? `<label><span>Fattura Web</span><span>${val.mac.totales.invioFattura}</span></label>` : ''
                this.other = val.mac.totales.costiGestione !== 0 ? `<label><span>Costi Gestione</span><span>${val.mac.totales.costiGestione}</span></label>` : ''
                }
        }
        /*if(val.value.service === 'casa'){
            if(val.value.type === 'power'){
              this.cano = val.mac.totales.canone !== 0 ? `<label><span>Canone TV </span><span>€ ${parseFloat(val.mac.totales.canone).toFixed(2).replace('.',',')}</span></label>` : ''
              this.invio = val.mac.totales.invioFattura !== 0 ? `<label><span>Fattura Web</span><span>€ ${parseFloat(val.mac.totales.invioFattura).toFixed(2).replace('.',',')}</span></span>` : ''
              this.sepa = val.mac.totales.sepa !== 0 ? `<label><span>Domiciliazione</span><span>€ ${parseFloat(val.mac.totales.sepa).toFixed(2).replace('.',',')}</span></span>` : ''

            }
            if(val.value.type === 'gas'){
                this.cano = val.mac.totales.costiGestione !== 0 ? `<label><span>Costi di Gestione </span><span>€ ${parseFloat(val.mac.totales.costiGestione).toFixed(2).replace('.',',')}</span></label>` : ''
                this.sepa = val.mac.totales.sepa !== 0 ? `<label><span>Domiciliazione</span><span>€ ${parseFloat(val.mac.totales.sepa).toFixed(2).replace('.',',')}</span></span>` : ''
                this.invio = val.mac.totales.invio !== 0 ? `<label><span>Fattura Web</span><span>€ ${parseFloat(val.mac.totales.invioFattura).toFixed(2).replace('.',',')}</span></span>` : ''
            }
        
        }


        if(val.value.service === 'azienda'){
            if(val.mac.sepa !== 0){
                this.sepa = `<label><span>Domiciliazione</span><span>€ ${parseFloat(val.mac.totales.sepa).toFixed(2).replace('.',',')}</span></span>`
            }else{this.sepa = ''}
            if(val.mac.invio !== 0){
                this.invio = `<label><span>Fattura Web</span><span>€ ${parseFloat(val.mac.totales.invioFattura).toFixed(2).replace('.',',')}</span></span>` 
            }else{this.invio = ''}
                this.cano = ''
        }
*/
        this.src = val.value.src || val.value.logo
        this.content.innerHTML = `<div>
        <div class="logo-for"><img src="${'dist/logo/'+this.src}" /><small>${val.value.fornitore}</small></div>
        <div class="title-bid">
        
        </div>
        <div class="box-acc">
        <span class="box-item ${val.value.fornitore}">
        <span>offerta:</span> <h3>${val.value.name}</h3>
        </span>
        <span class="box-item">
        <span>% 10</span><span>vendita</span><span>€ ${parseFloat(val.mac.totales.vendita).toFixed(2).replace('.',',')}</span>
        </span>
        <span class="box-item">
        <span>%</span><span>trasporto</span><span>€ ${parseFloat(val.mac.totales.trasporto).toFixed(2).replace('.',',')}</span>
        </span>
        <span class="box-item">
        <span>%</span><span>oneri</span><span>€ ${parseFloat(val.mac.totales.oneri).toFixed(2).replace('.',',')}</span>
        </span>
        <span class="box-item">
        <span>%</span><span>imposte</span><span>€ ${parseFloat(val.mac.totales.imposte).toFixed(2).replace('.',',')}</span>
        </span>
        <span class="box-item">
        <span>%</span><span>altre partite</span><span>€ ${parseFloat(val.mac.totales.altrePartite).toFixed(2).replace('.',',')}</span>
        </span>
        ${this.cano}
        ${this.sepa}
        ${this.invio}
        ${this.other}
        </div>

        <div>`
    }
}
module.exports = BIDU
