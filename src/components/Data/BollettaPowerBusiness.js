
class BollettaPowerBusiness {
    constructor(utenza,tariffa,offerta,per,perf1, perf2){
        this.utenza = utenza
        this.CM = tariffa.curMonth
        this.LM = tariffa.lastMonth
        this.offerta = offerta
        this.f0 = utenza.f0 || 0
        this.f1 = utenza.f1 || 0
        this.f2 = utenza.f2 || 0
        this.f3 = utenza.f3 || 0
        this.peak = utenza.fg || 0
        this.offpeak = utenza.fn || 0
        this.valuePeak = eval(offerta.value_peak) || false
        this.kwConsumati = ( this.f0 + this.f1 + this.f2 +this.f3 + this.peak + this.offpeak)
        this.kwConsumatiBimestrale = this.kwConsumati / 2
        this.maggiorazionePcv = offerta.pcv || 0
        this.indexMaggiorazionePcv = offerta.indexMaggiorazionePcv || null
        this.periodo = utenza.fatturazione
        this.maggiorazionePd = offerta.pd || 0
        this.potenza = utenza.potenza
        this.cco = offerta.cco || 0
        this.indexMaggiorazioneCco = offerta.indexMaggiorazioneCco || null
        this.percentualePeak = (( per || 0.63 ) * this.kwConsumati )
        this.percentualeOffPeak = (((1 - per) || 0.37 ) * this.kwConsumati)
        this.percentualeF1 = (perf1 || 0.43) * this.kwConsumati
        this.percentualeF2 = (perf2 || 0.24) * this.kwConsumati
        this.percentualeF3 = ((((perf1 + perf2) - this.kwConsumati ) || 0.33)  * this.kwConsumati),
        this.costiGestione = offerta.costiGestione || 0
        this.totales = this.getBolletaPowerBusiness()
        this.IMPEGNATA = utenza.impegnata || 0
    }

    //#region Vendita
    Bilancimento(){
        this.bilanciamento = ( this.offerta.bilanciamento || 0 ) * this.kwConsumati
            return (this.bilanciamento)
    }
    Pcv(){
        switch (this.periodo) {
            case 1:
            return (indexCCO(this.indexMaggiorazionePcv,this.maggiorazionePcv,this.CM.days) + this.CM.pcv )
            break;
            case 2:
                this.PCV = {
                    cur: (indexCCO(this.indexMaggiorazionePcv,this.maggiorazionePcv,this.CM.days) + this.CM.pcv),
                    las: (indexCCO(this.indexMaggiorazionePcv,this.maggiorazionePcv,this.LM.days) + this.LM.pcv)
                }
            return (this.PCV.cur + this.PCV.las)
            break;
            default:
            return (indexCCO(this.indexMaggiorazionePcv,this.maggiorazionePcv,this.CM.days) + this.CM.pcv )
            break;
        }
    }
    Dispacciamento(){
        switch (this.periodo) {
            case 1:
            this.PD = {
                kw:  (this.kwConsumati * 1.104),
                value: ( (this.CM.pd )+ (this.maggiorazionePd || 0))
            }
            return (this.PD.kw * this.PD.value)
            break;
            case 2: 
             this.PD = {
                 cur: ((this.CM.pd + (this.maggiorazionePd || 0))*( this.kwConsumatiBimestrale * 1.104)),
                 las: ((this.LM.pd + (this.maggiorazionePd || 0))*( this.kwConsumatiBimestrale * 1.104))
             }
             return (this.PD.cur + this.PD.las)
            break;
            default:
            return (this.PD.kw * this.PD.value)
            break;
        }
        
    }
    Dispbt(){
        switch (this.periodo) {
            case 1:
                return (this.CM.dispbt)
                break;
            case 2:
               this.DIS = {
                   cur: this.CM.dispbt,
                   las: this.LM.dispbt
               } 
               return ( this.DIS.cur + this.DIS.las )
               break;
            default:
                return (this.CM.dispbt)
                break;
        }
    }
    Cco(){ 
        switch (this.periodo) {
            case 1:
                return ( indexCCO((this.indexMaggiorazioneCco || null), this.cco, this.CM.days))
                break;
            case 2:
                this.CCO = {
                    cur: indexCCO((this.indexMaggiorazioneCco || null), this.cco, this.CM.days),
                    las: indexCCO((this.indexMaggiorazioneCco || null), this.cco, this.LM.days)
                }
                return (this.CCO.cur + this.CCO.las)
                break;
            default:
                return ( indexCCO(this.indexMaggiorazioneCco, this.cco, this.CM.days))
                break;
        }
    }
    MateriaPrima(){
        switch (this.offerta.bidIndex) {
            case 'tutela':
            return this.TUTELABTA()
                break;
            case 'pun':
            return this.PUNBTA()
                break;
            case 'index':
            return this.INDEXBTA()
            break;
            case 'fix':
            return this.FIXBTA()
            break;
        }
    }

    INDEXBTA(){
        return this.periodo === 2 ? this.INDEXBTABI() : this.INDEXBTAME()
    }
    FIXBTA(){
        return this.periodo === 2 ? this.FIXBTABI() : this.FIXBTAME()
    }
    PUNBTA(){
        return this.periodo === 2 ? this.PUNBTABI() : this.PUNBTAME()
    }
    TUTELABTA(){
        return this.periodo === 2 ? this.TUTELABTABI() : this.TUTELABTAME()
    }
    INDEXBTAME(){
        this.IME = {
            curr: {
                f0: (this.f0 * 1.104),
                f1: (this.f1 * 1.104),
                f2: (this.f2 * 1.104),
                f3: (this.f3 * 1.104),
                peak: (this.valuePeak ? (this.valuePeak * 1.104) : (this.percentualePeak * 1.104) ),
                offpeak: ( this.valuePeak ? ((this.kwConsumati - this.valuePeak ) * 1.104) : (this.percentualeOffPeak * 1.104)),
                A1: (this.percentualeF1 * 1.104),
                A2: (this.percentualeF2 * 1.104),
                A3: (this.percentualeF3 * 1.104),
                A0: (this.kwConsumati * 1.104)
            }
        }
        switch(this.utenza.consumo){
            case 'monorario':
            this.prezzo_mono = (
            this.offerta.consumo === 'monorario' ?
            (this.IME.curr.f0 * this.offerta.f0) :
            this.offerta.consumo === 'biorario' ?
            ((this.IME.curr.peak * this.offerta.peak)+
            (this.IME.curr.offpeak * this.offerta.offpeak)) :
            this.offerta.consumo === 'triorario' ? 
            ((this.IME.curr.A1 * this.offerta.f1)+
            (this.IME.curr.A2 * this.offerta.f2)+
            (this.IME.curr.A3 * this.offerta.f3)):
            0
            )
            return this.prezzo_mono
            break;
            case 'biorario':
                this.prezzo_bio = (
                    this.offerta.consumo === 'monorario' ?
                    ((this.IME.curr.peak * this.offerta.f0)+
                    (this.IME.curr.offpeak * this.offerta.f0)) :
                    this.offerta.consumo === 'biorario' ?
                    ((this.IME.curr.peak * this.offerta.peak)+
                    (this.IME.curr.offpeak * this.offerta.offpeak)) :
                    this.offerta.consumo === 'triorario' ? 
                    ((this.IME.curr.A1 * this.offerta.f1)+
                    (this.IME.curr.A2 * this.offerta.f2)+
                    (this.IME.curr.A3 * this.offerta.f3)):
                    0
                    )
            return this.prezzo_bio
            break;
            case 'triorario':
                this.index_tri = (
                this.offerta.consumo === 'monorario' ?
                (this.IME.curr.A0 * this.offerta.f0) :
                this.offerta.consumo === 'biorario' ?
                ((this.IME.curr.peak * this.offerta.peak)+
                (this.IME.curr.offpeak * this.offerta.offpeak)) :
                this.offerta.consumo === 'triorario' ? 
                ((this.IME.curr.f1 * this.offerta.f1)+
                (this.IME.curr.f2 * this.offerta.f2)+
                (this.IME.curr.f3 * this.offerta.f3)):
                0
                )
            return this.index_tri
            break;

        }


    }

    INDEXBTABI(){
        this.IBI = {
            curr: {
                f0: (this.f0/2) * 1.104,
                f1: (this.f1/2) * 1.104,
                f2: (this.f2/2) * 1.104,
                f3: (this.f3/2) * 1.104,
                peak: (this.valuePeak ? ((this.valuePeak / 2) * 1.104) : ((this.percentualePeak /2 ) * 1.104) ),
                offpeak: ( this.valuePeak ? (((this.kwConsumati - this.valuePeak)/2 )* 1.104) : ((this.percentualeOffPeak /2 ) * 1.104)),
                A1: (this.percentualeF1 / 2) * 1.104,
                A2: (this.percentualeF2 / 2) * 1.104,
                A3: (this.percentualeF3 / 2) * 1.104,
                A0: (this.kwbimestre  * 1.104 )
            },
            last : {
                f0: (this.f0 / 2 ) * 1.104,
                f1: (this.f1 / 2 ) * 1.104,
                f2: (this.f2 / 2 ) * 1.104,
                f3: (this.f3 / 2 ) * 1.104,
                peak: (this.valuePeak ? ((this.valuePeak / 2) * 1.104) : ((this.percentualePeak /2 )* 1.104) ),
                offpeak: ( this.valuePeak ? (((this.kwConsumati - this.valuePeak) /2 )* 1.104) : ((this.percentualeOffPeak /2 )* 1.104)),
                A1: (this.percentualeF1 / 2 ) * 1.104,
                A2: (this.percentualeF2 / 2 ) * 1.104,
                A3: (this.percentualeF3 / 2 ) * 1.104,
                A0: (this.kwbimestre  * 1.104 ) 
                }
            } 
        switch(this.utenza.consumo){
            case 'monorario':
            this.prezzo_mono_bi = (
                    this.offerta.consumo === 'monorario' ?
                    ((this.IBI.curr.f0 * this.offerta.f0)+
                     (this.IBI.last.f0) * this.offerta.f0) :
                    this.offerta.consumo === 'biorario' ?
                    ((this.IBI.curr.peak * this.offerta.peak)+
                    (this.IBI.curr.offpeak * this.offerta.offpeak)+
                    (this.IBI.last.peak * this.offerta.offpeak)+
                    (this.IBI.last.offpeak * this.offerta.offpeak)) :
                    this.offerta.consumo === 'triorario' ? 
                    ((this.IBI.curr.A1 * this.offerta.f1)+
                    (this.IBI.curr.A2 * this.offerta.f2)+
                    (this.IBI.curr.A3 * this.offerta.f3)+
                    (this.IBI.last.A1 * this.offerta.f1)+
                    (this.IBI.last.A2 * this.offerta.f2)+
                    (this.IBI.last.A3 * this.offerta.f3)):
                    0
                    )
            return this.prezzo_mono_bi
            break;
            case 'biorario':
                this.prezzo_bio_bi = (
                    this.offerta.consumo === 'monorario' ?
                    ((this.IBI.curr.A0 * this.offerta.f0)+
                    (this.IBI.last.A0 * this.offerta.f0)):
                    this.offerta.consumo === 'biorario' ?
                    ((this.IBI.curr.peak * this.offerta.peak)+
                    (this.IBI.curr.offpeak * this.offerta.offpeak)+
                    (this.IBI.last.peak * this.offerta.peak)+
                    (this.IBI.last.offpeak * this.offerta.offpeak)):
                    this.offerta.consumo === 'triorario' ? 
                    ((this.IBI.curr.A1 * this.offerta.f1)+
                    (this.IBI.curr.A2 * this.offerta.f2)+
                    (this.IBI.curr.A3 * this.offerta.f3)+
                    (this.IBI.last.A1 * this.offerta.f1)+
                    (this.IBI.last.A2 * this.offerta.f2)+
                    (this.IBI.last.A3 * this.offerta.f3)):
                    0
                    )
            return this.prezzo_bio_bi
            break;
            case 'triorario':
                this.index_tri_bi = (
                    this.offerta.consumo === 'monorario' ?
                    ((this.IBI.curr.A0 * this.offerta.f0)+
                    (this.IBI.last.A0 * this.offerta.f0)):
                    this.offerta.consumo === 'biorario' ?
                    ((this.IBI.curr.peak * this.offerta.peak)+
                    (this.IBI.curr.offpeak * this.offerta.offpeak)+
                    (this.IBI.last.peak * this.offerta.peak)+
                    (this.IBI.last.offpeak * this.offerta.offpeak)):
                    this.offerta.consumo === 'triorario' ? 
                    ((this.IBI.curr.f1 * this.offerta.f1)+
                    (this.IBI.curr.f2 * this.offerta.f2)+
                    (this.IBI.curr.f3 * this.offerta.f3)+
                    (this.IBI.last.f1 * this.offerta.f1)+
                    (this.IBI.last.f2 * this.offerta.f2)+
                    (this.IBI.last.f3 * this.offerta.f3)):
                    0
                    )
            return this.index_tri_bi
            break;
        }
    }

    FIXBTAME(){
        this.FME = {
            curr: {
            f0: (this.f0 * 1.104),
            f1: (this.f1 * 1.104),
            f2: (this.f2 * 1.104),
            f3: (this.f3 * 1.104),
            peak: (this.valuePeak ? (this.valuePeak * 1.104) : (this.percentualePeak * 1.104) ),
            offpeak: ( this.valuePeak ? ((this.kwConsumati - this.valuePeak ) * 1.104) : (this.percentualeOffPeak* 1.104)),
            A1: (this.percentualeF1 * 1.104),
            A2: (this.percentualeF2 * 1.104),
            A3: (this.percentualeF3 * 1.104),
            A0: (this.kwConsumati * 1.104)
            }
        } 
        switch(this.utenza.consumo){
            case 'monorario':
            this.fix_mono = (
                    this.offerta.consumo === 'monorario' ?
                    (this.FME.curr.f0 * this.offerta.f0) :
                    this.offerta.consumo === 'biorario' ?
                    ((this.FME.curr.peak * this.offerta.peak) +
                    (this.FME.curr.offpeak * this.offerta.offpeak)) :
                    this.offerta.consumo === 'triorario' ? 
                    ((this.FME.curr.A1 * this.offerta.f1) +
                    (this.FME.curr.A2 * this.offerta.f2) +
                    (this.FME.curr.A3 * this.offerta.f3)):
                    0 
                    )
            return this.fix_mono
            break;
            case 'biorario':
                this.fix_bio = (
                    this.offerta.consumo === 'monorario' ?
                    ((this.FME.curr.peak * this.offerta.f0)+
                    (this.FME.curr.offpeak * this.offerta.f0)):
                    this.offerta.consumo === 'biorario' ?
                    ((this.FME.curr.peak * this.offerta.peak) +
                    (this.FME.curr.offpeak * this.offerta.offpeak)) :
                    this.offerta.consumo === 'triorario' ? 
                    ((this.FME.curr.A1 * this.offerta.f1) +
                    (this.FME.curr.A2 * this.offerta.f2) +
                    (this.FME.curr.A3 * this.offerta.f3)):
                    0 
                    )
            return this.fix_bio
            break;
            case 'triorario':
                this.fix_tri = (
                    this.offerta.consumo === 'monorario' ?
                    (this.FME.curr.A0 * this.offerta.f0) :
                    this.offerta.consumo === 'biorario' ?
                    ((this.FME.curr.peak * this.offerta.peak) +
                    (this.FME.curr.offpeak * this.offerta.offpeak)) :
                    this.offerta.consumo === 'triorario' ? 
                    ((this.FME.curr.f1 * this.offerta.f1) +
                    (this.FME.curr.f2 * this.offerta.f2) +
                    (this.FME.curr.f3 * this.offerta.f3)):
                    0 
                    )
            return this.fix_tri
            break;
        }
    }

    FIXBTABI(){
        this.FBI = {
            curr: {
                f0: (this.f0/2) * 1.104,
                f1: (this.f1/2) * 1.104,
                f2: (this.f2/2) * 1.104,
                f3: (this.f3/2) * 1.104,
                peak: (this.valuePeak ? ((this.valuePeak / 2) * 1.104) : ((this.percentualePeak/2 )* 1.104) ),
                offpeak: ( this.valuePeak ? (((this.kwConsumati - this.valuePeak)/2 )* 1.104) : ((this.percentualeOffPeak/2 )* 1.104)),
                A1: (this.percentualeF1/2) *1.104,
                A2: (this.percentualeF2/2) * 1.104,
                A3: (this.percentualeF3/2) * 1.104,
                A0: (this.kwConsumati /2 ) * 1.104
            },
            last : {
                f0: (this.f0/2 ) * 1.104,
                f1: (this.f1/2 )* 1.104,
                f2: (this.f2/2 )* 1.104,
                f3: (this.f3/2 )* 1.104,
                peak: (this.valuePeak ? ((this.valuePeak / 2) * 1.104) : ((this.percentualePeak/2 )* 1.104) ),
                offpeak: ( this.valuePeak ? (((this.kwConsumati - this.valuePeak)/2 )* 1.104) : ((this.percentualeOffPeak/2 )* 1.104)),
                A1: (this.percentualeF1 / 2) * 1.104,
                A2: (this.percentualeF2 / 2) * 1.104,
                A3: (this.percentualeF3 / 2) * 1.104,
                A0: (this.kwConsumati / 2 ) * 1.104 
                }
            }
        switch(this.utenza.consumo){
            case 'monorario':
                this.fix_mono_bi = (
                    this.offerta.consumo === 'monorario' ?
                    ((this.FBI.curr.f0 * this.offerta.f0)+
                    (this.FBI.last.f0 * this.offerta.f0)):
                    this.offerta.consumo === 'biorario' ?
                    ((this.FBI.curr.peak * this.offerta.peak)+
                    (this.FBI.curr.offpeak * this.offerta.offpeak)+
                    (this.FBI.last.peak * this.offerta.peak)+
                    (this.FBI.last.offpeak * this.offerta.offpeak)):
                    this.offerta.consumo === 'triorario' ? 
                    ((this.FBI.curr.A1 * this.offerta.f1)+
                    (this.FBI.curr.A2 * this.offerta.f2)+
                    (this.FBI.curr.A3 * this.offerta.f3)+
                    (this.FBI.last.A1 * this.offerta.f1)+
                    (this.FBI.last.A2 * this.offerta.f2)+
                    (this.FBI.last.A3 * this.offerta.f3)):
                    0
                    )
            return this.fix_mono_bi
            case 'biorario':
                this.fix_bio_bi = (
                    this.offerta.consumo === 'monorario' ?
                    ((this.FBI.curr.A0 * this.offerta.f0)+
                    (this.FBI.last.A0 * this.offerta.f0)):
                    this.offerta.consumo === 'biorario' ?
                    ((this.FBI.curr.peak * this.offerta.peak) +
                    (this.FBI.curr.offpeak * this.offerta.offpeak)+
                    (this.FBI.last.peak * this.offerta.peak)+
                    (this.FBI.last.offpeak * this.offerta.offpeak)) :
                    this.offerta.consumo === 'triorario' ? 
                    ((this.FBI.curr.A1 * this.offerta.f1)+
                    (this.FBI.curr.A2 * this.offerta.f2)+
                    (this.FBI.curr.A3 * this.offerta.f3)+
                    (this.FBI.last.A1 * this.offerta.f1)+
                    (this.FBI.last.A2 * this.offerta.f2)+
                    (this.FBI.last.A3 * this.offerta.f3)):
                    0 
                    )
            return this.fix_bio_bi
            case 'triorario':
                this.fix_tri_bi = (
                    this.offerta.consumo === 'monorario' ?
                    ((this.FBI.curr.A0 * this.offerta.f0)+
                    (this.FBI.last.A0 * this.offerta.f0)):
                    this.offerta.consumo === 'biorario' ?
                    ((this.FBI.curr.peak * this.offerta.peak)+
                    (this.FBI.curr.offpeak * this.offerta.offpeak)+
                    (this.FBI.last.peak * this.offerta.peak)+
                    (this.FBI.last.offpeak * this.offerta.offpeak)):
                    this.offerta.consumo === 'triorario' ? 
                    ((this.FBI.curr.f1 * this.offerta.f1)+
                    (this.FBI.curr.f2 * this.offerta.f2)+
                    (this.FBI.curr.f3 * this.offerta.f3)+
                    (this.FBI.last.f1 * this.offerta.f1)+
                    (this.FBI.last.f2 * this.offerta.f2)+
                    (this.FBI.last.f3 * this.offerta.f3)):
                    0 
                    )
            return this.fix_tri_bi
        } 
    }
    
    PUNBTAME(){
        this.PME = {
            curr: {
            f0: (this.f0 * 1.104),
            f1: (this.f1 * 1.104),
            f2: (this.f2 * 1.104),
            f3: (this.f2 * 1.104),
            peak: (this.valuePeak ? (this.valuePeak * 1.104) : (this.percentualePeak * 1.104) ),
            offpeak: ( this.valuePeak ? ((this.kwConsumati - this.valuePeak ) * 1.104) : (this.percentualeOffPeak* 1.104)),
            A1: (this.percentualeF1 * 1.104),
            A2: (this.percentualeF2 * 1.104),
            A3: (this.percentualeF3 * 1.104),
            A0: (this.kwConsumati * 1.104)
            }
        } 
        switch(this.utenza.consumo){
            case 'monorario':
            this.pun_mono = (
                    this.offerta.consumo === 'monorario' ?
                    (this.PME.curr.f0 * (this.CM.pun.f0 + this.offerta.f0)) :
                    this.offerta.consumo === 'biorario' ?
                    ((this.PME.curr.peak * (this.CM.pun.peak + this.offerta.peak))+
                    (this.PME.curr.offpeak * (this.CM.pun.offpeak + this.offerta.offpeak))) :
                    this.offerta.consumo === 'triorario' ? 
                    ((this.PME.curr.A1 * (this.CM.pun.f1 + this.offerta.f1))+
                    (this.PME.curr.A2 * (this.CM.pun.f2 + this.offerta.f2))+
                    (this.PME.curr.A3 * (this.CM.pun.f3 + this.offerta.f3))):
                    0 
                    )
            return this.pun_mono
            break;
            case 'biorario':
                this.offerta.punFasce ?
                this.pun_bio = (
                    ((this.PME.curr.A1 * (this.CM.pun.f1 + this.offerta.f1))+
                    (this.PME.curr.A2 * (this.CM.pun.f2 + this.offerta.f2))+
                    (this.PME.curr.A3 * (this.CM.pun.f3 + this.offerta.f3)))
                    ) :
                this.pun_bio = (
                        this.offerta.consumo === 'monorario' ?
                        (this.PME.curr.f0 * (this.CM.pun.f0 + this.offerta.f0)) :
                        this.offerta.consumo === 'biorario' ?
                        ((this.PME.curr.peak * (this.CM.pun.peak + this.offerta.peak))+
                        (this.PME.curr.offpeak * (this.CM.pun.offpeak + this.offerta.offpeak))) :
                        this.offerta.consumo === 'triorario' ? 
                        ((this.PME.curr.A1 * (this.CM.pun.f1 + this.offerta.f1))+
                        (this.PME.curr.A2 * (this.CM.pun.f2 + this.offerta.f2))+
                        (this.PME.curr.A3 * (this.CM.pun.f3 + this.offerta.f3))):
                        0 
                        )
            return this.pun_bio
            break;
            case 'triorario':
               this.pun_tri = (
                this.offerta.consumo === 'monorario' ?
                (this.PME.curr.A0 * (this.CM.pun.f0 + this.offerta.f0)) :
                this.offerta.consumo === 'biorario' ?
                ((this.PME.curr.peak * (this.CM.pun.peak + this.offerta.peak))+
                (this.PME.curr.offpeak * (this.CM.pun.offpeak + this.offerta.offpeak))) :
                this.offerta.consumo === 'triorario' ? 
                ((this.PME.curr.f1 * (this.CM.pun.f1 + this.offerta.f1))+
                (this.PME.curr.f2 * (this.CM.pun.f2 + this.offerta.f2))+
                (this.PME.curr.f3 * (this.CM.pun.f3 + this.offerta.f3))):
                0 
                )
            return this.pun_tri
            break;
        }
    }

    PUNBTABI(){
        this.PBI = {
            curr: {
                f0: (this.f0/2 * 1.104),
                f1: (this.f1/2 * 1.104),
                f2: (this.f2/2 * 1.104),
                f3: (this.f3/2 * 1.104),
                peak: (this.valuePeak ? ((this.valuePeak / 2) * 1.104) : ((this.percentualePeak/2 )* 1.104) ),
                offpeak: ( this.valuePeak ? (((this.kwConsumati - this.valuePeak)/2 )* 1.104) : ((this.percentualeOffPeak/2 )* 1.104)),
                A1: (this.percentualeF1 / 2) * 1.104,
                A2: (this.percentualeF2 / 2) * 1.104,
                A3: (this.percentualeF3 / 2)* 1.104,
                A0: (this.kwConsumati / 2) * 1.104
            },
            last : {
                f0: (this.f0/2 * 1.104),
                f1: (this.f1/2 * 1.104),
                f2: (this.f2/2 * 1.104),
                f3: (this.f3/2 * 1.104),
                peak: (this.valuePeak ? ((this.valuePeak / 2) * 1.104) : ((this.percentualePeak/2 )* 1.104) ),
                offpeak: ( this.valuePeak ? (((this.kwConsumati - this.valuePeak)/2 )* 1.104) : ((this.percentualeOffPeak/2 )* 1.104)),
                A1: (this.percentualeF1 / 2) * 1.104,
                A2: (this.percentualeF2 / 2) * 1.104,
                A3: (this.percentualeF3 / 2) * 1.104,
                A0: (this.kwConsumati / 2) * 1.104  
            }
        } 
        switch(this.utenza.consumo){
            case 'monorario':
            this.pun_mono_bi = (
                    this.offerta.consumo === 'monorario' ?
                    ((this.PBI.curr.f0 * (this.CM.pun.f0 + this.offerta.f0))+
                    (this.PBI.last.f0 * (this.LM.pun.f0 + this.offerta.f0))) :
                    this.offerta.consumo === 'biorario' ?
                    ((this.PBI.curr.peak * (this.CM.pun.peak + this.offerta.peak))+
                    (this.PBI.curr.offpeak * (this.CM.pun.offpeak + this.offerta.offpeak))+
                    (this.PBI.last.peak * (this.LM.pun.peak + this.offerta.peak))+
                    (this.PBI.curr.peak * (this.LM.pun.peak + this.offerta.peak))) :
                    this.offerta.consumo === 'triorario' ? 
                    ((this.PBI.curr.A1 * (this.CM.pun.f1 + this.offerta.f1))+
                    (this.PBI.curr.A2 * (this.CM.pun.f2 + this.offerta.f2))+
                    (this.PBI.curr.A3 * (this.CM.pun.f3 + this.offerta.f3))+
                    (this.PBI.last.A1 * (this.LM.pun.f1 + this.offerta.f1))+
                    (this.PBI.last.A2 * (this.LM.pun.f2 + this.offerta.f2))+
                    (this.PBI.last.A3 * (this.LM.pun.f3 + this.offerta.f3))
                    ):
                    0 
                    )
            return this.pun_mono_bi
            break;
            case 'biorario':
                this.offerta.punFasce ?
                this.pun_bio_bi = (
                    ((this.PBI.curr.A1 * (this.CM.pun.f1 + this.offerta.f1))+
                    (this.PBI.curr.A2 * (this.CM.pun.f2 + this.offerta.f2))+
                    (this.PBI.curr.A3 * (this.CM.pun.f3 + this.offerta.f3))+
                    (this.PBI.last.A1 * (this.LM.pun.f1 + this.offerta.f1))+
                    (this.PBI.last.A2 * (this.LM.pun.f2 + this.offerta.f2))+
                    (this.PBI.last.A3 * (this.LM.pun.f3 + this.offerta.f3))
                    )) :
                this.pun_bio_bi = (
                        this.offerta.consumo === 'monorario' ?
                        ((this.PBI.curr.f0 * (this.CM.pun.f0 + this.offerta.f0)) +
                        ((this.PBI.last.f0 * (this.LM.pun.f0 + this.offerta.f0)))) :
                        this.offerta.consumo === 'biorario' ?
                        ((this.PBI.curr.peak * (this.CM.pun.peak + this.offerta.peak))+
                        (this.PBI.curr.offpeak * (this.CM.pun.offpeak + this.offerta.offpeak))+
                        (this.PBI.last.peak * (this.LM.pun.peak + this.offerta.peak))+
                        (this.PBI.last.offpeak * (this.LM.pun.offpeak + this.offerta.offpeak))
                        ) :
                        this.offerta.consumo === 'triorario' ? 
                        ((this.PBI.curr.A1 * (this.CM.pun.f1 + this.offerta.f1))+
                        (this.PBI.curr.A2 * (this.CM.pun.f2 + this.offerta.f2))+
                        (this.PBI.curr.A3 * (this.CM.pun.f3 + this.offerta.f3))+
                        (this.PBI.last.A1 * (this.LM.pun.f1 + this.offerta.f1))+
                        (this.PBI.last.A2 * (this.LM.pun.f2 + this.offerta.f2))+
                        (this.PBI.last.A3 * (this.LM.pun.f3 + this.offerta.f3))
                        ):
                        0 
                        )
            return this.pun_bio_bi
            break;
            case 'triorario':
                this.pun_tri_bi = (
                    this.offerta.consumo === 'monorario' ?
                    ((this.PBI.curr.A0 * (this.CM.pun.f0 + this.offerta.f0))+
                    ((this.PBI.last.A0 * (this.LM.pun.f0 + this.offerta.f0)))) :
                    this.offerta.consumo === 'biorario' ?
                    ((this.PBI.curr.peak * (this.CM.pun.peak + this.offerta.peak))+
                    (this.PBI.curr.offpeak * (this.CM.pun.offpeak + this.offerta.offpeak))+
                    (this.PBI.last.peak * (this.LM.pun.peak + this.offerta.peak))+
                    (this.PBI.last.offpeak * (this.LM.pun.offpeak + this.offerta.offpeak))):
                    this.offerta.consumo === 'triorario' ? 
                    ((this.PBI.curr.f1 * (this.CM.pun.f1 + this.offerta.f1))+
                    (this.PBI.curr.f2 * (this.CM.pun.f2 + this.offerta.f2))+
                    (this.PBI.curr.f3 * (this.CM.pun.f3 + this.offerta.f3))+
                    (this.PBI.last.f1 * (this.LM.pun.f1 + this.offerta.f1))+
                    (this.PBI.last.f2 * (this.LM.pun.f2 + this.offerta.f2))+
                    (this.PBI.last.f3 * (this.LM.pun.f3 + this.offerta.f3))):
                    0 
                )
            return this.pun_tri_bi
            break;
        }
    }

    TUTELABTAME(){
        this.TME = {
            curr: {
            f0: (this.f0),
            f1: (this.f1),
            f2: (this.f2),
            f3: (this.f2),
            peak: (this.f1),
            offpeak: (this.f2 + this.f3),
            A1: (this.percentualeF1),
            A2: (this.percentualeF2),
            A3: (this.percentualeF3),
            A0: (this.kwConsumati)
            }
        }
        switch(this.utenza.consumo){
            case 'monorario':
            this.tutela_mono = (
                    this.offerta.consumo === 'monorario' ?
                    (this.TME.curr.f0 * (this.CM.tutela.f0 + this.offerta.f0)) :
                    this.offerta.consumo === 'biorario' ?
                    ((this.TME.curr.peak * (this.CM.tutela.peak + this.offerta.peak))+
                    (this.TME.curr.offpeak * (this.CM.tutela.offpeak + this.offerta.offpeak))) :
                    this.offerta.consumo === 'triorario' ? 
                    ((this.TME.curr.A1 * (this.CM.tutela.f1 + this.offerta.f1))+
                    (this.TME.curr.A2 * (this.CM.tutela.f2 + this.offerta.f2))+
                    (this.TME.curr.A3 * (this.CM.tutela.f3 + this.offerta.f3))):
                    0 
                    )
            return this.tutela_mono
            break;
            case 'biorario':
                this.tutela_bio = (
                        this.offerta.consumo === 'monorario' ?
                        (this.TME.curr.f0 * (this.CM.tutela.f0 + this.offerta.f0)) :
                        this.offerta.consumo === 'biorario' ?
                        ((this.TME.curr.peak * (this.CM.tutela.peak + this.offerta.peak))+
                        (this.TME.curr.offpeak * (this.CM.tutela.offpeak + this.offerta.offpeak))) :
                        this.offerta.consumo === 'triorario' ? 
                        ((this.TME.curr.A1 *(this.CM.tutela.f1 + this.offerta.f1))+
                        (this.TME.curr.A2 * (this.CM.tutela.f2 + this.offerta.f2))+
                        (this.TME.curr.A3 * (this.CM.tutela.f3 + this.offerta.f3))):
                        0 
                        )
            return this.tutela_bio
            break;
            case 'triorario':
               this.tutela_tri = (
                this.offerta.consumo === 'monorario' ?
                (this.TME.curr.A0 * (this.CM.tutela.f0 + this.offerta.f0)) :
                this.offerta.consumo === 'biorario' ?
                ((this.TME.curr.peak * (this.CM.tutela.peak + this.offerta.peak))+
                (this.TME.curr.offpeak * (this.CM.tutela.offpeak + this.offerta.offpeak))) :
                this.offerta.consumo === 'triorario' ? 
                ((this.TME.curr.f1 * (this.CM.tutela.f1 + this.offerta.f1))+
                (this.TME.curr.f2 * (this.CM.tutela.f2 + this.offerta.f2))+
                (this.TME.curr.f3 * (this.CM.tutela.f3 + this.offerta.f3))):
                0 
                )
            return this.tutela_tri
            break;
        }
    }

    TUTELABTABI(){
        this.TBI = {
            curr: {
            f0: (this.f0 / 2),
            f1: (this.f1 / 2),
            f2: (this.f2 / 2),
            f3: (this.f3 / 2),
            peak: (this.f1 / 2 ),
            offpeak: (this.f2 + this.f3 ) / 2,
            A1: (this.percentualeF1 / 2),
            A2: (this.percentualeF2 / 2),
            A3: (this.percentualeF3 / 2),
            A0: (this.kwConsumati / 2 )
            },
            last: {
            f0: (this.f0 / 2),
            f1: (this.f1 / 2),
            f2: (this.f2 / 2),
            f3: (this.f3 / 2),
            peak: (this.f1 / 2),
            offpeak: (this.f2 + this.f3 ) / 2,
            A1: (this.percentualeF1 / 2),
            A2: (this.percentualeF2 / 2),
            A3: (this.percentualeF3 / 2),
            A0: (this.kwConsumati / 2 )  
            }
        }
        switch(this.utenza.consumo){
            case 'monorario':
            this.tutela_mono_bi = (
                    this.offerta.consumo === 'monorario' ?
                    ((this.TBI.curr.f0 * (this.CM.tutela.f0 + this.offerta.f0))+ 
                    (this.TBI.last.f0 * (this.LM.tutela.f0 + this.offerta.f0))):
                    this.offerta.consumo === 'biorario' ?
                    ((this.TBI.curr.peak * (this.CM.tutela.peak + this.offerta.peak))+
                    (this.TBI.curr.offpeak * (this.CM.tutela.offpeak + this.offerta.offpeak))+
                    (this.TBI.last.peak * (this.LM.tutela.peak + this.offerta.peak))+
                    (this.TBI.last.offpeak * (this.LM.tutela.offpeak + this.offerta.offpeak))):
                    this.offerta.consumo === 'triorario' ? 
                    ((this.TBI.curr.A1 * (this.CM.tutela.f1 + this.offerta.f1))+
                    (this.TBI.curr.A2 * (this.CM.tutela.f2 + this.offerta.f2))+
                    (this.TBI.curr.A3 * (this.CM.tutela.f3 + this.offerta.f3))+
                    (this.TBI.last.A1 * (this.LM.tutela.f1 + this.offerta.f1))+
                    (this.TBI.last.A2 * (this.LM.tutela.f2 + this.offerta.f2))+
                    (this.TBI.last.A3 * (this.LM.tutela.f3 + this.offerta.f3))):
                    0 
                    )
            return this.tutela_mono_bi
            break;
            case 'biorario':
                this.tutela_bio_bi = (
                        this.offerta.consumo === 'monorario' ?
                        ((this.TBI.curr.f0 * (this.CM.tutela.f0 + this.offerta.f0))+
                        (this.TBI.last.f0 * (this.LM.tutela.f0 + this.offerta.f0))):
                        this.offerta.consumo === 'biorario' ?
                        ((this.TBI.curr.peak * (this.CM.tutela.peak + this.offerta.peak))+
                        (this.TBI.curr.offpeak * (this.CM.tutela.offpeak + this.offerta.offpeak))+
                        (this.TBI.last.peak * (this.LM.tutela.peak + this.offerta.peak))+
                        (this.TBI.last.offpeak * (this.LM.tutela.offpeak + this.offerta.offpeak))):
                        this.offerta.consumo === 'triorario' ? 
                        ((this.TBI.curr.A1 * (this.CM.tutela.peak + this.offerta.f1))+
                        (this.TBI.curr.A2 * (this.CM.tutela.offpeak + this.offerta.f2))+
                        (this.TBI.curr.A3 * (this.CM.tutela.offpeak + this.offerta.f3))+
                        (this.TBI.last.A1 * (this.LM.tutela.peak + this.offerta.f1))+
                        (this.TBI.last.A2 * (this.LM.tutela.offpeak + this.offerta.f2))+
                        (this.TBI.last.A3 * (this.LM.tutela.offpeak + this.offerta.f3))):
                        0 
                        )
            return this.tutela_bio_bi
            break;
            case 'triorario':
               this.tutela_tri_bi = (
                this.offerta.consumo === 'monorario' ?
                ((this.TBI.curr.A0 * (this.CM.tutela.f0 + this.offerta.f0))+
                (this.TBI.last.A0 * (this.LM.tutela.f0 + this.offerta.f0))):
                this.offerta.consumo === 'biorario' ?
                ((this.TBI.curr.peak * (this.CM.tutela.peak + this.offerta.peak))+
                (this.TBI.curr.offpeak * (this.CM.tutela.offpeak + this.offerta.offpeak))+
                (this.TBI.last.peak * (this.LM.tutela.peak + this.offerta.peak))+
                (this.TBI.last.offpeak * (this.LM.tutela.offpeak + this.offerta.offpeak))):
                this.offerta.consumo === 'triorario' ? 
                ((this.TBI.curr.f1 * (this.CM.tutela.peak + this.offerta.f1))+
                (this.TBI.curr.f2 * (this.CM.tutela.offpeak + this.offerta.f2))+
                (this.TBI.curr.f3 * (this.CM.tutela.offpeak + this.offerta.f3))+
                (this.TBI.last.f1 * (this.LM.tutela.peak + this.offerta.f1))+
                (this.TBI.last.f2 * (this.LM.tutela.offpeak + this.offerta.f2))+
                (this.TBI.last.f3 * (this.LM.tutela.offpeak + this.offerta.f3))):
                0 
                )
            return this.tutela_tri_bi
            break;
        }
    }
   
    Vendita(){
       return (this.Pcv() + this.Dispacciamento() + this.Dispbt() + this.Cco() + this.MateriaPrima() + this.Bilancimento())
    }
    //#endregion

    //#region Trasporto
    QuotaEnergiaTrasporto(){
        switch (this.periodo) {
            case 1:
            return  ( this.CM.quotaenergiatrasporto * this.kwConsumati )
            break;
            case 2:
                this.QET = {
                    QC: (this.CM.quotaenergiatrasporto * this.kwConsumatiBimestrale ),
                    QL: (this.LM.quotaenergiatrasporto * this.kwConsumatiBimestrale)
                }
                return ( this.QET.QC + this.QET.QL ) 
            break;
            default:
            return ( this.CM.quotaenergiatrasporto * this.kwConsumati )
            break;
        } 
    }
    QuotaFissaTrasporto(){
        switch (this.periodo) {
            case 1:
                return ( this.CM.quotafissatrasporto)
                break;
            case 2: 
                return ( this.CM.quotafissatrasporto + this.LM.quotafissatrasporto)
            default:
                return ( this.CM.quotafissatrasporto)
                break;
        }
    }
    QuotaPotenzaTrasporto(){
        switch (this.periodo) {
            case 1:
                this.IMPEGNATA > 0 ?
                 this.QPT = ( this.CM.quotapotenzatrasporto * this.utenza.impegnata) :
                 this.QPT = ( this.CM.quotapotenzatrasporto * this.potenza)
            return this.QPT
            case 2:
                this.IMPEGNATA > 0 ?
                this.QPT = ((this.CM.quotapotenzatrasporto * this.utenza.impegnata) + (this.LM.quotapotenzatrasporto * this.utenza.impegnata)):
                this.QPT = ((this.CM.quotapotenzatrasporto * this.potenza) + (this.LM.quotapotenzatrasporto * this.potenza))
            return this.QPT
        }
    }
    Trasporto(){
        return (this.QuotaEnergiaTrasporto() + this.QuotaFissaTrasporto() + this.QuotaPotenzaTrasporto())
    }
    //#endregion

    //#region Oneri
    QuotaEnergiaOneri(){
        switch (this.periodo) {
            case 1:
                return (this.CM.quotaenergiaoneri * this.kwConsumati)
                break;
            case 2:
                this.QEO = {
                    cur: (this.CM.quotaenergiaoneri * this.kwConsumatiBimestrale),
                    las: (this.LM.quotaenergiaoneri * this.kwConsumatiBimestrale)
                }
                return (this.QEO.cur + this.QEO.las)
                break;
            default:
                return (this.CM.quotaenergiaoneri * this.kwConsumati)
                break;
        }
    }
    QuotaFissaOneri(){
        switch (this.periodo) {
            case 1:
                return (this.CM.quotafissaoneri)
                break;
            case 2:
                return (this.CM.quotafissaoneri + this.LM.quotafissaoneri)
                break;
            default:
                return (this.CM.quotafissaoneri)
                break;
        }
    }
    QuotaPotenzaOneri(){
        switch (this.periodo) {
            case 1:
                return (this.CM.quotapotenzaoneri * this.potenza)
                break;
            case 2:
                this.QPO = {
                    cur: (this.CM.quotapotenzaoneri * this.potenza),
                    las: (this.LM.quotapotenzaoneri * this.potenza)
                }
                return (this.QPO.cur + this.QPO.las)
                break;
            default:
                return (this.CM.quotapotenzaoneri * this.potenza)
                break;
        }
    }
    Oneri(){
        return ( this.QuotaEnergiaOneri() + this.QuotaFissaOneri() + this.QuotaPotenzaOneri())
    }
    //#endregion

    //#region Imposte
    Accisa(){
        return (this.kwConsumati * 0.0125)
    }
    Iva(){
        this.ivaVendita = (this.Vendita() * 0.22)
        this.ivaTrasporto = (this.Trasporto() * 0.22)
        this.ivaOneri = (this.Oneri() * 0.22)
        this.ivaAccise = (this.Accisa() * 0.22)
        return ( this.ivaVendita + this.ivaTrasporto + this.ivaOneri + this.ivaAccise)
    }
    Imposte(){
        return (this.Accisa() + this.Iva())
    }
    //#endregion

    //#region AltrePartite

    Sepa(){
        switch (this.periodo) {
            case 1:
            return this.sepa = this.offerta.sepa || 0
                break;
            case  2:
            return this.sepa = ((this.offerta.sepa || 0 ) *  2 )
                break
            default:
            return this.sepa = this.offerta.sepa || 0
                break;
        }
    }
    InvioFattura(){
        return this.invio = ((this.offerta.invio || 0 ) * this.utenza.fatturazione)
    }
    CostiGestione(){
        switch (this.periodo) {
            case 1:
            return (this.costiGestione * this.periodo)
            case 2:
            return (this.costiGestione * this.periodo)        
            default:
            return (this.costiGestione * this.periodo)
        }
    }
    AltrePartite(){
        return (this.Sepa() + this.InvioFattura() + this.CostiGestione() )
    }
    //#endregion

    TotaleBolletta(){
        return ( this.Vendita() + this.Trasporto() + this.Oneri() + this.Imposte())
    }

    getBolletaPowerBusiness(){
        return {
            bilanciamento: this.Bilancimento(),
            dispacciamento: this.Dispacciamento(),
            dipbt: this.Dispbt(),
            pcv: this.Pcv(),
            cco: this.Cco(),
            materia: this.MateriaPrima(),
            vendita: this.Vendita(),
            qet: this.QuotaEnergiaTrasporto(),
            qft: this.QuotaFissaTrasporto(),
            qpt: this.QuotaPotenzaTrasporto(),
            trasporto: this.Trasporto(),
            qeo: this.QuotaEnergiaOneri(),
            qfo: this.QuotaFissaOneri(),
            qpo: this.QuotaPotenzaOneri(),
            oneri: this.Oneri(),
            imposte: this.Imposte(),
            iva: this.Iva(),
            accisa: this.Accisa(),
            totaleBolletta: this.TotaleBolletta(),
            sepa: this.Sepa(),
            invioFattura: this.InvioFattura(),
            costiGestione: this.CostiGestione(),
            altrePartite: this.AltrePartite()
            }
   } 
}//fine class

export default BollettaPowerBusiness

const indexCCO = (index,a,b) =>{
    switch (index) {
        case 'day':
            return ( a * b)
            break;
        case 'month':
            return ( a )
            break;
        default:
            return 0
            break;
    }
}


