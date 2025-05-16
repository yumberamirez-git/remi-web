

class ReportUI  {
    constructor(){
    
    }
    sumDeepValues(obj) {
        let total = 0;
      
        function traverse(value) {
          if (typeof value === 'number') {
            total += value;
          } else if (typeof value === 'object' && value !== null) {
            for (const key in value) {
              traverse(value[key]);
            }
          }
        }
      
        traverse(obj);
        return total;
      }

    generateQE(data, QE, pricing){
        const totalFix = this.sumDeepValues(data.fix.items);
        const totalVar = this.sumDeepValues(data.var.items);
        const totalPricing = this.sumDeepValues(pricing.items)
        return `<span class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        Servizi di Vendita <b>€ ${QE.toFixed(2).replace('.',',')}</b>
                    </div>
                    <div class="timeline-sub-content">
                        <span>Prezzo Energia<b>€ ${totalPricing.toFixed(2).replace('.',',')}</b></span>
                        <span>Quota fissa<b>€ ${totalFix.toFixed(2).replace('.',',')}</b></span>
                        <span>Quota variabile<b>€ ${totalVar.toFixed(2).replace('.',',')}</b></span> 
                    </div>
              
                </span>
            `
    }

    generateQT(data, QT){
        const totalFix = this.sumDeepValues(data.fix.items);
        const totalVar = this.sumDeepValues(data.var.items);
        const totalPow = this.sumDeepValues(data.pow.items);
        return `<span class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">Servizi di Trasporto <b>€ ${QT.toFixed(2).replace('.',',')}</b>
                    </div>
                    <div class="timeline-sub-content">
                        <span>Quota fissa<b>€ ${totalFix.toFixed(2).replace('.',',')}</b></span>
                        <span>Quota variabile<b>€ ${totalVar.toFixed(2).replace('.',',')}</b></span>
                        <span>Quota potenza<b>€ ${totalPow.toFixed(2).replace('.',',')}</b></span>
                    </div>
                </span>`
    }

    generateQO(data, QO){
        console.log('data QO ', data)
        const totalFix = this.sumDeepValues(data.fix.items);
        const totalVar = this.sumDeepValues(data.var.items);
        const totalPow = this.sumDeepValues(data.pow.items);
        return `<span class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">Oneri di Sistema <b>€ ${QO.toFixed(2).replace('.',',')}</b></div>
                    <div class="timeline-sub-content">
                        <span>Quota fissa<b>€ ${totalFix.toFixed(2).replace('.',',')}</b></span>
                        <span>Quota variabile<b>€ ${totalVar.toFixed(2).replace('.',',')}</b></span>
                        <span>Quota potenza<b>€ ${totalPow.toFixed(2).replace('.',',')}</b></span>
                    </div>
        </span>
        `
    }

    generateExcise( tax, TAX ){
      
        return `<span class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">Riepilogo Imposte <b>€ ${TAX.toFixed(2).replace('.',',')}</b></div>
                    <div class="timeline-sub-content">
                    ${Object.keys(tax.items).map(e => `<span>${e} <b>${tax.items[e].toFixed(2).replace('.',',')}</b></span>`).join('')}
                    </div>
        </span>
        `
    }

    generateAP(data){
        const totalAP = data.map(e => e.value).reduce((a, b)=> a + b);
        
        if(totalAP === 0) return ''
        return`<span class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">Altre Partite <b>€ ${totalAP.toFixed(2).replace('.',',')}</b></div>
                    <div class="timeline-sub-content">
                        ${ data.map(e => (`<span>${e.description} <b>€ ${e.value.toFixed(2).replace('.',',')}</b></span>`))}
                    </div>
                </span>`
    }

    generateTotale(data){
        return `<div class="cards-functions-container-content-item" style="margin-top:10px;">
                 <span>Totale <b>€ ${data.toFixed(2).replace('.',',')}</b></span>
        </div>
        `
    }

    renderUI(data){
      
        this.totals = data.totals
        return  `<div class="timeline">
                ${this.generateQE(data.QE, this.totals.QE, data.pricing)}
                ${this.generateQT(data.QT, this.totals.QT)}
                ${this.generateQO(data.QO, this.totals.QO)}
                ${this.generateExcise(data.tax, this.totals.tax)}
                ${!!data.AP.length && this.generateAP(data.AP)}
                ${this.generateTotale(data.absolute)}
        </div>
        
        `
    }
}

module.exports = ReportUI