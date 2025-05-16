class UtenzaUI {
    constructor(){
        this.utenza = JSON.parse(localStorage.getItem('utenzaPro')) || {}
    }

    renderConsume(){
        switch (this.utenza.consumo) {
            case 'monorario':
                return `<span>F0 <b>${this.utenza.f0} kw/h</b></span>`
            case 'triorario':
                return `<span>F1 <b>${this.utenza.f1} kw/h</b></span>
                        <span>F2 <b>${this.utenza.f2} kw/h</b></span>
                        <span>F3 <b>${this.utenza.f3} kw/h</b></span>`
            case 'biorario':
                return `<span>F1 <b>${this.utenza.f1} kw/h</b></span>
                        <span>F23 <b>${this.utenza.f23} kw/h</b></span>`
        }
    }
    renderDate(){
        const anno = this.utenza.dateBill.substring(0, 4); // "2025"
        const mese = Number(this.utenza.dateBill.substring(4, 6));
        const months = ['Gen','Feb','Mar','Apr','Mag','Jun','Lug','Ago','Set','Ott','Nov','Dic']
        return `<span>Data di Calcolo <b>${months[mese - 1]}/${anno}</b></span>`
    }

    render(){
       
        
      
        return `<div class="timeline">
        <span class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">Nome: <b>${this.utenza.nameUT}</b>
            </div>    
        </span>
        <span class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">Destinazione d'uso: <b>${this.utenza.servizio === 'casa' ? 'Domestico': 'Azienda'}</b>
            </div>    
        </span>
        ${this.utenza.servizio === 'casa' && 
            `<span class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">Tariffa di rete: <b>${['tdr'].includes(this.utenza.tariffa) ? 'TD Residente': 'TD Non Residente'}</b>
            </div>    
        </span>`}
         <span class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">Potenza Contatore: <b>${this.utenza.potenza} kw</b>
            </div>  
        </span>
        <span class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">Consumo: <b>${this.utenza.consumo}</b></div>  
            <div class="timeline-sub-content">${this.renderConsume()} </div>
        </span>
        <span class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">Fatturazione: <b>${this.utenza.fatturazione === 1 ? 'Mensile' : 'Bimestrale'}</b></div>  
            <div class="timeline-sub-content">${this.renderDate()}</div>
        </span>
        </div>`
    }
}

module.exports = UtenzaUI