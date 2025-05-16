
const useB20 = require('cb20')
const b20 = useB20.default()
class BollettaPowerHome {
        constructor(utenza, tariffa, offerta, per, perf1, perf2){
        this.utenza = utenza
        this.CMH = tariffa.currMonth
        this.LMH = tariffa.lastMonth
        this.offerta = offerta
        this.f0 = utenza.f0
        this.f1 = utenza.f1
        this.f2 = utenza.f2
        this.f3 = utenza.f3
        this.peak = utenza.fg  
        this.offpeak= utenza.fn    
        this.valuePeak = eval(offerta.value_peak) || false
        this.kwConsumati = ( this.f0 + this.f1 + this.f2 + this.f3 + this.peak + this.offpeak)
        this.kwbimestre = (this.kwConsumati / 2)
        this.percentualePeak = ((per || 0.63 ) * this.kwConsumati )
        this.percentualeOffPeak = (((1 - per) || 0.37 ) * this.kwConsumati) 
        this.percentualeF1 = ((perf1 || 0.43) * this.kwConsumati)
        this.percentualeF2 = ((perf2 || 0.24) * this.kwConsumati)
        this.percentualeF3 = ((((perf1 + perf2) - this.kwConsumati )|| 0.33) * this.kwConsumati) 
        this.pcvMaggiorato = offerta.pcv || 0
        this.quotaEnergiaTrasporto = tariffa.quotaenergiatrasporto || 0
        this.quotaFissaTrasporto = tariffa.quotafissatrasporto || 0
        this.quotaPotenzaTrasporto = tariffa.quotapotenzatrasporto || 0
        this.quotaEnergiaOneriSotto = tariffa.quotaonerisotto || 0
        this.quotaEnergiaOneriSopra = tariffa.quotaonerisopra || 0
        this.quotaFissaOneri = tariffa.quotafissaoneri || 0
        this.quotaPotenzaOneri = tariffa.quotapotenzaoneri || 0
        this.potenzaUtenza = utenza.potenza,
        this.maggiorazioneCco = offerta.indexMaggiorazioneCco || null
        this.maggiorazionePcv = offerta.indexMaggiorazionePcv || null
        this.sepa = offerta.sepa || 0
        this.periodo = utenza.fatturazione || 1
        this.costiGestione = offerta.costiGestione || 0
        this.totales = this.getBollettaPowerHome()
        }
//#region Vendita
        Bilanciamento(){
            this.bilanciamento = ( this.offerta.bilanciamento || 0 ) * this.kwConsumati
            return (this.bilanciamento)
        }

        Cco(){
            switch (this.periodo) {
                case 1:
                this.cco = indexHome(this.maggiorazioneCco, (this.offerta.cco || 0), this.CMH.days)    
                return (this.cco )    
                    break;
                case 2:
                    this.CCOH = {
                        cur: indexHome(this.maggiorazioneCco, (this.offerta.cco || 0), this.CMH.days),
                        las: indexHome(this.maggiorazioneCco, (this.offerta.cco || 0), this.LMH.days)
                        }
                    this.cco = this.CCOH.cur + this.CCOH.las
                return (this.cco)
                    break;
                default:
                    return 0
                    break;
            }
        }
        Pcv(){
            switch (this.periodo) {
                case 1:
                    return (indexHome(this.maggiorazionePcv, this.offerta.pcv, this.CMH.days) + this.CMH.pcv )
                    break;
                case 2:
                    this.PCVH = {
                    cur: (indexHome(this.maggiorazionePcv, this.offerta.pcv, this.CMH.days) + this.CMH.pcv ),
                    las: (indexHome(this.maggiorazionePcv, this.offerta.pcv, this.LMH.days) + this.LMH.pcv )
                    }
                    return (this.PCVH.cur + this.PCVH.las)
                    break;
                default:
                    return (this.CMH.pcv)
                    break;
            }
        }
        Pd(){
            switch (this.periodo) {
                case 1:
                this.dispacciamento = (this.CMH.pd * (this.kwConsumati * 1.104))
                this.dispacciamentoOfferta = ((this.offerta.pd || 0)* (this.kwConsumati * 1.104))
                return (this.dispacciamento + this.dispacciamentoOfferta)
                    break;
                case 2:
                 this.dispacciamentoCur = (this.CMH.pd * (this.kwbimestre * 1.104))
                 this.dispacciamentoLas = (this.LMH.pd * (this.kwbimestre * 1.104))
                 this.PD ={
                     cur: (((this.offerta.pd || 0 ) * (this.kwbimestre * 1.104)) + this.dispacciamentoCur),
                     las: (((this.offerta.pd || 0 ) *(this.kwbimestre * 1.104)) + this.dispacciamentoLas)
                 }
                return (this.PD.cur + this.PD.las)
                     break;
                default:
                return (this.CMH.pd * (this.kwConsumati * 1.104))
                     break;
            }
        }
        Dispbt(){
            switch (this.periodo) {
                case 1:
                return (this.CMH.dispbt)
                    break;
                case 2:
                return (this.CMH.dispbt + this.LMH.dispbt)
                    break;
                default:
                return (this.CMH.dispbt)   
                    break;
            }
        }
        MateriaPrima(){
            switch (this.offerta.bidIndex) {
                case 'fix':
                return this.FIX()
                break;
                case 'index':
                return this.INDOX()
                break;
                case 'pun':
                return this.PUN() 
                break;
                case 'tutela':
                return this.TUTELA() 
                break;
            }            
        }   

        PUN(){
            return this.periodo === 2 ? this.PUN_BIMES() : this.PUN_MES()
        }
        FIX(){
            return this.periodo === 2 ? this.FIX_BIMES() : this.FIX_MES()
        }

        INDOX(){
            return this.periodo === 2 ? this.INDEX_BIMES() : this.INDEX_MES()
        }

        TUTELA(){
            return this.periodo === 2 ? this.TUTELA_BIMES() : this.TUTELA_MES()
        }
        TUTELA_MES(){
            this.TUTELAMES = {
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
                        (this.TUTELAMES.curr.f0 * (this.CMH.tutela.f0 + this.offerta.f0)) :
                        this.offerta.consumo === 'biorario' ?
                        ((this.TUTELAMES.curr.peak * (this.CMH.tutela.peak + this.offerta.peak))+
                        (this.TUTELAMES.curr.offpeak * (this.CMH.tutela.offpeak + this.offerta.offpeak))) :
                        this.offerta.consumo === 'triorario' ? 
                        ((this.TUTELAMES.curr.A1 * (this.CMH.tutela.peak + this.offerta.f1))+
                        (this.TUTELAMES.curr.A2 * (this.CMH.tutela.offpeak + this.offerta.f2))+
                        (this.TUTELAMES.curr.A3 * (this.CMH.tutela.offpeak + this.offerta.f3))):
                        0 
                        )
                return this.tutela_mono
                break;
                case 'biorario':
                    this.tutela_bio = (
                            this.offerta.consumo === 'monorario' ?
                            (this.TUTELAMES.curr.f0 * (this.CMH.tutela.f0 + this.offerta.f0)) :
                            this.offerta.consumo === 'biorario' ?
                            ((this.TUTELAMES.curr.peak * (this.CMH.tutela.peak + this.offerta.peak))+
                            (this.TUTELAMES.curr.offpeak * (this.CMH.tutela.offpeak + this.offerta.offpeak))) :
                            this.offerta.consumo === 'triorario' ? 
                            ((this.TUTELAMES.curr.A1 * (this.CMH.tutela.peak + this.offerta.peak))+
                            (this.TUTELAMES.curr.A2 * (this.CMH.tutela.offpeak + this.offerta.offpeak))+
                            (this.TUTELAMES.curr.A3 * (this.CMH.tutela.offpeak + this.offerta.offpeak))):
                            0 
                            )
                return this.tutela_bio
                break;
                case 'triorario':
                   this.tutela_tri = (
                    this.offerta.consumo === 'monorario' ?
                    (this.TUTELAMES.curr.A0 * (this.CMH.tutela.f0 + this.offerta.f0)) :
                    this.offerta.consumo === 'biorario' ?
                    ((this.TUTELAMES.curr.peak * (this.CMH.tutela.peak + this.offerta.peak))+
                    (this.TUTELAMES.curr.offpeak * (this.CMH.tutela.offpeak + this.offerta.offpeak))) :
                    this.offerta.consumo === 'triorario' ? 
                    ((this.TUTELAMES.curr.f1 * (this.CMH.tutela.peak + this.offerta.peak))+
                    (this.TUTELAMES.curr.f2 * (this.CMH.tutela.offpeak + this.offerta.offpeak))+
                    (this.TUTELAMES.curr.f3 * (this.CMH.tutela.offpeak + this.offerta.offpeak))):
                    0 
                    )
                return this.tutela_tri
                break;
            }
        }

        TUTELA_BIMES(){
            this.TUTELABIMES = {
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
                        ((this.TUTELABIMES.curr.f0 * (this.CMH.tutela.f0 + this.offerta.f0))+ 
                        (this.TUTELABIMES.last.f0 * (this.LMH.tutela.f0 + this.offerta.f0))):
                        this.offerta.consumo === 'biorario' ?
                        ((this.TUTELABIMES.curr.peak * (this.CMH.tutela.peak + this.offerta.peak))+
                        (this.TUTELABIMES.curr.offpeak * (this.CMH.tutela.offpeak + this.offerta.offpeak))+
                        (this.TUTELABIMES.last.peak * (this.LMH.tutela.peak + this.offerta.peak))+
                        (this.TUTELABIMES.last.offpeak * (this.LMH.tutela.offpeak + this.offerta.offpeak))):
                        this.offerta.consumo === 'triorario' ? 
                        ((this.TUTELABIMES.curr.A1 * (this.CMH.tutela.peak + this.offerta.f1))+
                        (this.TUTELABIMES.curr.A2 * (this.CMH.tutela.offpeak + this.offerta.f2))+
                        (this.TUTELABIMES.curr.A3 * (this.CMH.tutela.offpeak + this.offerta.f3))+
                        (this.TUTELABIMES.last.A1 * (this.LMH.tutela.peak + this.offerta.f1))+
                        (this.TUTELABIMES.last.A2 * (this.LMH.tutela.offpeak + this.offerta.f2))+
                        (this.TUTELABIMES.last.A3 * (this.LMH.tutela.offpeak + this.offerta.f3))):
                        0 
                        )
                return this.tutela_mono_bi
                break;
                case 'biorario':
                    this.tutela_bio_bi = (
                            this.offerta.consumo === 'monorario' ?
                            ((this.TUTELABIMES.curr.f0 * (this.CMH.tutela.f0 + this.offerta.f0))+
                            (this.TUTELABIMES.last.f0 * (this.LMH.tutela.f0 + this.offerta.f0))):
                            this.offerta.consumo === 'biorario' ?
                            ((this.TUTELABIMES.curr.peak * (this.CMH.tutela.peak + this.offerta.peak))+
                            (this.TUTELABIMES.curr.offpeak * (this.CMH.tutela.offpeak + this.offerta.offpeak))+
                            (this.TUTELABIMES.last.peak * (this.LMH.tutela.peak + this.offerta.peak))+
                            (this.TUTELABIMES.last.offpeak * (this.LMH.tutela.offpeak + this.offerta.offpeak))):
                            this.offerta.consumo === 'triorario' ? 
                            ((this.TUTELABIMES.curr.A1 * (this.CMH.tutela.peak + this.offerta.f1))+
                            (this.TUTELABIMES.curr.A2 * (this.CMH.tutela.offpeak + this.offerta.f2))+
                            (this.TUTELABIMES.curr.A3 * (this.CMH.tutela.offpeak + this.offerta.f3))+
                            (this.TUTELABIMES.last.A1 * (this.LMH.tutela.peak + this.offerta.f1))+
                            (this.TUTELABIMES.last.A2 * (this.LMH.tutela.offpeak + this.offerta.f2))+
                            (this.TUTELABIMES.last.A3 * (this.LMH.tutela.offpeak + this.offerta.f3))):
                            0 
                            )
                return this.tutela_bio_bi
                break;
                case 'triorario':
                   this.tutela_tri_bi = (
                    this.offerta.consumo === 'monorario' ?
                    ((this.TUTELABIMES.curr.A0 * (this.CMH.tutela.f0 + this.offerta.f0))+
                    (this.TUTELABIMES.last.A0 * (this.LMH.tutela.f0 + this.offerta.f0))):
                    this.offerta.consumo === 'biorario' ?
                    ((this.TUTELABIMES.curr.peak * (this.CMH.tutela.peak + this.offerta.peak))+
                    (this.TUTELABIMES.curr.offpeak * (this.CMH.tutela.offpeak + this.offerta.offpeak))+
                    (this.TUTELABIMES.last.peak * (this.LMH.tutela.peak + this.offerta.peak))+
                    (this.TUTELABIMES.last.offpeak * (this.LMH.tutela.offpeak + this.offerta.offpeak))):
                    this.offerta.consumo === 'triorario' ? 
                    ((this.TUTELABIMES.curr.f1 * (this.CMH.tutela.peak + this.offerta.f1))+
                    (this.TUTELABIMES.curr.f2 * (this.CMH.tutela.offpeak + this.offerta.f2))+
                    (this.TUTELABIMES.curr.f3 * (this.CMH.tutela.offpeak + this.offerta.f3))+
                    (this.TUTELABIMES.last.f1 * (this.LMH.tutela.peak + this.offerta.f1))+
                    (this.TUTELABIMES.last.f2 * (this.LMH.tutela.offpeak + this.offerta.f2))+
                    (this.TUTELABIMES.last.f3 * (this.LMH.tutela.offpeak + this.offerta.f3))):
                    0 
                    )
                return this.tutela_tri_bi
                break;
            }
        }

        PUN_MES(){
            this.PUNMES = {
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
                        (this.PUNMES.curr.f0 * (this.CMH.pun.f0 + this.offerta.f0)) :
                        this.offerta.consumo === 'biorario' ?
                        ((this.PUNMES.curr.peak * (this.CMH.pun.peak + this.offerta.peak))+
                        (this.PUNMES.curr.offpeak * (this.CMH.pun.offpeak + this.offerta.offpeak))) :
                        this.offerta.consumo === 'triorario' ? 
                        ((this.PUNMES.curr.A1 * (this.CMH.pun.f1 + this.offerta.f1))+
                        (this.PUNMES.curr.A2 * (this.CMH.pun.f2 + this.offerta.f2))+
                        (this.PUNMES.curr.A3 * (this.CMH.pun.f3 + this.offerta.f3))):
                        0 
                        )
                return this.pun_mono
                break;
                case 'biorario':
                    this.offerta.punFasce ?
                    this.pun_bio = (
                        ((this.PUNMES.curr.A1 * (this.CMH.pun.f1 + this.offerta.f1))+
                        (this.PUNMES.curr.A2 * (this.CMH.pun.f2 + this.offerta.f2))+
                        (this.PUNMES.curr.A3 * (this.CMH.pun.f3 + this.offerta.f3)))
                        ) :
                    this.pun_bio = (
                            this.offerta.consumo === 'monorario' ?
                            (this.PUNMES.curr.f0 * (this.CMH.pun.f0 + this.offerta.f0)) :
                            this.offerta.consumo === 'biorario' ?
                            ((this.PUNMES.curr.peak * (this.CMH.pun.peak + this.offerta.peak))+
                            (this.PUNMES.curr.offpeak * (this.CMH.pun.offpeak + this.offerta.offpeak))) :
                            this.offerta.consumo === 'triorario' ? 
                            ((this.PUNMES.curr.A1 * (this.CMH.pun.f1 + this.offerta.f1))+
                            (this.PUNMES.curr.A2 * (this.CMH.pun.f2 + this.offerta.f2))+
                            (this.PUNMES.curr.A3 * (this.CMH.pun.f3 + this.offerta.f3))):
                            0 
                            )
                return this.pun_bio
                break;
                case 'triorario':
                   this.pun_tri = (
                    this.offerta.consumo === 'monorario' ?
                    (this.PUNMES.curr.A0 * (this.CMH.pun.f0 + this.offerta.f0)) :
                    this.offerta.consumo === 'biorario' ?
                    ((this.PUNMES.curr.peak * (this.CMH.pun.peak + this.offerta.peak))+
                    (this.PUNMES.curr.offpeak * (this.CMH.pun.offpeak + this.offerta.offpeak))) :
                    this.offerta.consumo === 'triorario' ? 
                    ((this.PUNMES.curr.f1 * (this.CMH.pun.f1 + this.offerta.f1))+
                    (this.PUNMES.curr.f2 * (this.CMH.pun.f2 + this.offerta.f2))+
                    (this.PUNMES.curr.f3 * (this.CMH.pun.f3 + this.offerta.f3))):
                    0 
                    )
                return this.pun_tri
                break;
            }
        }
        PUN_BIMES(){
            this.PUNBIMES = {
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
                        ((this.PUNBIMES.curr.f0 * (this.CMH.pun.f0 + this.offerta.f0))+
                        (this.PUNBIMES.last.f0 * (this.LMH.pun.f0 + this.offerta.f0))) :
                        this.offerta.consumo === 'biorario' ?
                        ((this.PUNBIMES.curr.peak * (this.CMH.pun.peak + this.offerta.peak))+
                        (this.PUNBIMES.curr.offpeak * (this.CMH.pun.offpeak + this.offerta.offpeak))+
                        (this.PUNBIMES.last.peak * (this.LMH.pun.peak + this.offerta.peak))+
                        (this.PUNBIMES.curr.peak * (this.LMH.pun.peak + this.offerta.peak))) :
                        this.offerta.consumo === 'triorario' ? 
                        ((this.PUNBIMES.curr.A1 * (this.CMH.pun.f1 + this.offerta.f1))+
                        (this.PUNBIMES.curr.A2 * (this.CMH.pun.f2 + this.offerta.f2))+
                        (this.PUNBIMES.curr.A3 * (this.CMH.pun.f3 + this.offerta.f3))+
                        (this.PUNBIMES.last.A1 * (this.LMH.pun.f1 + this.offerta.f1))+
                        (this.PUNBIMES.last.A2 * (this.LMH.pun.f2 + this.offerta.f2))+
                        (this.PUNBIMES.last.A3 * (this.LMH.pun.f3 + this.offerta.f3))
                        ):
                        0 
                        )
                return this.pun_mono_bi
                break;
                case 'biorario':
                    this.offerta.punFasce ?
                    this.pun_bio_bi = (
                        ((this.PUNBIMES.curr.A1 * (this.CMH.pun.f1 + this.offerta.f1))+
                        (this.PUNBIMES.curr.A2 * (this.CMH.pun.f2 + this.offerta.f2))+
                        (this.PUNBIMES.curr.A3 * (this.CMH.pun.f3 + this.offerta.f3))+
                        (this.PUNBIMES.last.A1 * (this.LMH.pun.f1 + this.offerta.f1))+
                        (this.PUNBIMES.last.A2 * (this.LMH.pun.f2 + this.offerta.f2))+
                        (this.PUNBIMES.last.A3 * (this.LMH.pun.f3 + this.offerta.f3))
                        )) :
                    this.pun_bio_bi = (
                            this.offerta.consumo === 'monorario' ?
                            ((this.PUNBIMES.curr.f0 * (this.CMH.pun.f0 + this.offerta.f0)) +
                            ((this.PUNBIMES.last.f0 * (this.LMH.pun.f0 + this.offerta.f0)))) :
                            this.offerta.consumo === 'biorario' ?
                            ((this.PUNBIMES.curr.peak * (this.CMH.pun.peak + this.offerta.peak))+
                            (this.PUNBIMES.curr.offpeak * (this.CMH.pun.offpeak + this.offerta.offpeak))+
                            (this.PUNBIMES.last.peak * (this.LMH.pun.peak + this.offerta.peak))+
                            (this.PUNBIMES.last.offpeak * (this.LMH.pun.offpeak + this.offerta.offpeak))
                            ) :
                            this.offerta.consumo === 'triorario' ? 
                            ((this.PUNBIMES.curr.A1 * (this.CMH.pun.f1 + this.offerta.f1))+
                            (this.PUNBIMES.curr.A2 * (this.CMH.pun.f2 + this.offerta.f2))+
                            (this.PUNBIMES.curr.A3 * (this.CMH.pun.f3 + this.offerta.f3))+
                            (this.PUNBIMES.last.A1 * (this.LMH.pun.f1 + this.offerta.f1))+
                            (this.PUNBIMES.last.A2 * (this.LMH.pun.f2 + this.offerta.f2))+
                            (this.PUNBIMES.last.A3 * (this.LMH.pun.f3 + this.offerta.f3))
                            ):
                            0 
                            )
                return this.pun_bio_bi
                break;
                case 'triorario':
                    this.pun_tri_bi = (
                        this.offerta.consumo === 'monorario' ?
                        ((this.PUNBIMES.curr.A0 * (this.CMH.pun.f0 + this.offerta.f0))+
                        ((this.PUNBIMES.last.A0 * (this.LMH.pun.f0 + this.offerta.f0)))) :
                        this.offerta.consumo === 'biorario' ?
                        ((this.PUNBIMES.curr.peak * (this.CMH.pun.peak + this.offerta.peak))+
                        (this.PUNBIMES.curr.offpeak * (this.CMH.pun.offpeak + this.offerta.offpeak))+
                        (this.PUNBIMES.last.peak * (this.LMH.pun.peak + this.offerta.peak))+
                        (this.PUNBIMES.last.offpeak * (this.LMH.pun.offpeak + this.offerta.offpeak))):
                        this.offerta.consumo === 'triorario' ? 
                        ((this.PUNBIMES.curr.f1 * (this.CMH.pun.f1 + this.offerta.f1))+
                        (this.PUNBIMES.curr.f2 * (this.CMH.pun.f2 + this.offerta.f2))+
                        (this.PUNBIMES.curr.f3 * (this.CMH.pun.f3 + this.offerta.f3))+
                        (this.PUNBIMES.last.f1 * (this.LMH.pun.f1 + this.offerta.f1))+
                        (this.PUNBIMES.last.f2 * (this.LMH.pun.f2 + this.offerta.f2))+
                        (this.PUNBIMES.last.f3 * (this.LMH.pun.f3 + this.offerta.f3))):
                        0 
                    )
                return this.pun_tri_bi
                break;
            }
        }

        FIX_MES(){
            this.FIXMES = {
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
                        (this.FIXMES.curr.f0 * this.offerta.f0) :
                        this.offerta.consumo === 'biorario' ?
                        ((this.FIXMES.curr.peak * this.offerta.peak) +
                        (this.FIXMES.curr.offpeak * this.offerta.offpeak)) :
                        this.offerta.consumo === 'triorario' ? 
                        ((this.FIXMES.curr.A1 * this.offerta.f1) +
                        (this.FIXMES.curr.A2 * this.offerta.f2) +
                        (this.FIXMES.curr.A3 * this.offerta.f3)):
                        0 
                        )
                return this.fix_mono
                break;
                case 'biorario':
                    this.fix_bio = (
                        this.offerta.consumo === 'monorario' ?
                        ((this.FIXMES.curr.peak * this.offerta.f0)+
                        (this.FIXMES.curr.offpeak * this.offerta.f0)):
                        this.offerta.consumo === 'biorario' ?
                        ((this.FIXMES.curr.peak * this.offerta.peak) +
                        (this.FIXMES.curr.offpeak * this.offerta.offpeak)) :
                        this.offerta.consumo === 'triorario' ? 
                        ((this.FIXMES.curr.A1 * this.offerta.f1) +
                        (this.FIXMES.curr.A2 * this.offerta.f2) +
                        (this.FIXMES.curr.A3 * this.offerta.f3)):
                        0 
                        )
                return this.fix_bio
                break;
                case 'triorario':
                    this.fix_tri = (
                        this.offerta.consumo === 'monorario' ?
                        (this.FIXMES.curr.A0 * this.offerta.f0) :
                        this.offerta.consumo === 'biorario' ?
                        ((this.FIXMES.curr.peak * this.offerta.peak) +
                        (this.FIXMES.curr.offpeak * this.offerta.offpeak)) :
                        this.offerta.consumo === 'triorario' ? 
                        ((this.FIXMES.curr.f1 * this.offerta.f1) +
                        (this.FIXMES.curr.f2 * this.offerta.f2) +
                        (this.FIXMES.curr.f3 * this.offerta.f3)):
                        0 
                        )
                return this.fix_tri
                break;
            }
        }

        FIX_BIMES(){
            this.FIXBIMES = {
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
                        ((this.FIXBIMES.curr.f0 * this.offerta.f0)+
                        (this.FIXBIMES.last.f0 * this.offerta.f0)):
                        this.offerta.consumo === 'biorario' ?
                        ((this.FIXBIMES.curr.peak * this.offerta.peak)+
                        (this.FIXBIMES.curr.offpeak * this.offerta.offpeak)+
                        (this.FIXBIMES.last.peak * this.offerta.peak)+
                        (this.FIXBIMES.last.offpeak * this.offerta.offpeak)):
                        this.offerta.consumo === 'triorario' ? 
                        ((this.FIXBIMES.curr.A1 * this.offerta.f1)+
                        (this.FIXBIMES.curr.A2 * this.offerta.f2)+
                        (this.FIXBIMES.curr.A3 * this.offerta.f3)+
                        (this.FIXBIMES.last.A1 * this.offerta.f1)+
                        (this.FIXBIMES.last.A2 * this.offerta.f2)+
                        (this.FIXBIMES.last.A3 * this.offerta.f3)):
                        0
                        )
                return this.fix_mono_bi
                case 'biorario':
                    this.fix_bio_bi = (
                        this.offerta.consumo === 'monorario' ?
                        ((this.FIXBIMES.curr.A0 * this.offerta.f0)+
                        (this.FIXBIMES.last.A0 * this.offerta.f0)):
                        this.offerta.consumo === 'biorario' ?
                        ((this.FIXBIMES.curr.peak * this.offerta.peak) +
                        (this.FIXBIMES.curr.offpeak * this.offerta.offpeak)+
                        (this.FIXBIMES.last.peak * this.offerta.peak)+
                        (this.FIXBIMES.last.offpeak * this.offerta.offpeak)) :
                        this.offerta.consumo === 'triorario' ? 
                        ((this.FIXBIMES.curr.A1 * this.offerta.f1)+
                        (this.FIXBIMES.curr.A2 * this.offerta.f2)+
                        (this.FIXBIMES.curr.A3 * this.offerta.f3)+
                        (this.FIXBIMES.last.A1 * this.offerta.f1)+
                        (this.FIXBIMES.last.A2 * this.offerta.f2)+
                        (this.FIXBIMES.last.A3 * this.offerta.f3)):
                        0 
                        )
                return this.fix_bio_bi
                case 'triorario':
                    this.fix_tri_bi = (
                        this.offerta.consumo === 'monorario' ?
                        ((this.FIXBIMES.curr.A0 * this.offerta.f0)+
                        (this.FIXBIMES.last.A0 * this.offerta.f0)):
                        this.offerta.consumo === 'biorario' ?
                        ((this.FIXBIMES.curr.peak * this.offerta.peak)+
                        (this.FIXBIMES.curr.offpeak * this.offerta.offpeak)+
                        (this.FIXBIMES.last.peak * this.offerta.peak)+
                        (this.FIXBIMES.last.offpeak * this.offerta.offpeak)):
                        this.offerta.consumo === 'triorario' ? 
                        ((this.FIXBIMES.curr.f1 * this.offerta.f1)+
                        (this.FIXBIMES.curr.f2 * this.offerta.f2)+
                        (this.FIXBIMES.curr.f3 * this.offerta.f3)+
                        (this.FIXBIMES.last.f1 * this.offerta.f1)+
                        (this.FIXBIMES.last.f2 * this.offerta.f2)+
                        (this.FIXBIMES.last.f3 * this.offerta.f3)):
                        0 
                        )
                return this.fix_tri_bi
            } 
        }

        INDEX_MES(){
            this.INDEXMES = {
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
                (this.INDEXMES.curr.f0 * this.offerta.f0) :
                this.offerta.consumo === 'biorario' ?
                ((this.INDEXMES.curr.peak * this.offerta.peak)+
                (this.INDEXMES.curr.offpeak * this.offerta.offpeak)) :
                this.offerta.consumo === 'triorario' ? 
                ((this.INDEXMES.curr.A1 * this.offerta.f1)+
                (this.INDEXMES.curr.A2 * this.offerta.f2)+
                (this.INDEXMES.curr.A3 * this.offerta.f3)):
                0
                )
                return this.prezzo_mono
                break;
                case 'biorario':
                    this.prezzo_bio = (
                        this.offerta.consumo === 'monorario' ?
                        ((this.INDEXMES.curr.peak * this.offerta.f0)+
                        (this.INDEXMES.curr.offpeak * this.offerta.f0)) :
                        this.offerta.consumo === 'biorario' ?
                        ((this.INDEXMES.curr.peak * this.offerta.peak)+
                        (this.INDEXMES.curr.offpeak * this.offerta.offpeak)) :
                        this.offerta.consumo === 'triorario' ? 
                        ((this.INDEXMES.curr.A1 * this.offerta.f1)+
                        (this.INDEXMES.curr.A2 * this.offerta.f2)+
                        (this.INDEXMES.curr.A3 * this.offerta.f3)):
                        0
                        )
                return this.prezzo_bio
                break;
                case 'triorario':
                    this.index_tri = (
                    this.offerta.consumo === 'monorario' ?
                    (this.INDEXMES.curr.A0 * this.offerta.f0) :
                    this.offerta.consumo === 'biorario' ?
                    ((this.INDEXMES.curr.peak * this.offerta.peak)+
                    (this.INDEXMES.curr.offpeak * this.offerta.offpeak)) :
                    this.offerta.consumo === 'triorario' ? 
                    ((this.INDEXMES.curr.f1 * this.offerta.f1)+
                    (this.INDEXMES.curr.f2 * this.offerta.f2)+
                    (this.INDEXMES.curr.f3 * this.offerta.f3)):
                    0
                    )
                return this.index_tri
                break;

            }
        }

        INDEX_BIMES(){
            this.INDEXBIMES = {
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
                        ((this.INDEXBIMES.curr.f0 * this.offerta.f0)+
                         (this.INDEXBIMES.last.f0) * this.offerta.f0) :
                        this.offerta.consumo === 'biorario' ?
                        ((this.INDEXBIMES.curr.peak * this.offerta.peak)+
                        (this.INDEXBIMES.curr.offpeak * this.offerta.offpeak)+
                        (this.INDEXBIMES.last.peak * this.offerta.offpeak)+
                        (this.INDEXBIMES.last.offpeak * this.offerta.offpeak)) :
                        this.offerta.consumo === 'triorario' ? 
                        ((this.INDEXBIMES.curr.A1 * this.offerta.f1)+
                        (this.INDEXBIMES.curr.A2 * this.offerta.f2)+
                        (this.INDEXBIMES.curr.A3 * this.offerta.f3)+
                        (this.INDEXBIMES.last.A1 * this.offerta.f1)+
                        (this.INDEXBIMES.last.A2 * this.offerta.f2)+
                        (this.INDEXBIMES.last.A3 * this.offerta.f3)):
                        0
                        )
                return this.prezzo_mono_bi
                break;
                case 'biorario':
                    this.prezzo_bio_bi = (
                        this.offerta.consumo === 'monorario' ?
                        ((this.INDEXBIMES.curr.A0 * this.offerta.f0)+
                        (this.INDEXBIMES.last.A0 * this.offerta.f0)):
                        this.offerta.consumo === 'biorario' ?
                        ((this.INDEXBIMES.curr.peak * this.offerta.peak)+
                        (this.INDEXBIMES.curr.offpeak * this.offerta.offpeak)+
                        (this.INDEXBIMES.last.peak * this.offerta.peak)+
                        (this.INDEXBIMES.last.offpeak * this.offerta.offpeak)):
                        this.offerta.consumo === 'triorario' ? 
                        ((this.INDEXBIMES.curr.A1 * this.offerta.f1)+
                        (this.INDEXBIMES.curr.A2 * this.offerta.f2)+
                        (this.INDEXBIMES.curr.A3 * this.offerta.f3)+
                        (this.INDEXBIMES.last.A1 * this.offerta.f1)+
                        (this.INDEXBIMES.last.A2 * this.offerta.f2)+
                        (this.INDEXBIMES.last.A3 * this.offerta.f3)):
                        0
                        )
                return this.prezzo_bio_bi
                break;
                case 'triorario':
                    this.index_tri_bi = (
                        this.offerta.consumo === 'monorario' ?
                        ((this.INDEXBIMES.curr.A0 * this.offerta.f0)+
                        (this.INDEXBIMES.last.A0 * this.offerta.f0)):
                        this.offerta.consumo === 'biorario' ?
                        ((this.INDEXBIMES.curr.peak * this.offerta.peak)+
                        (this.INDEXBIMES.curr.offpeak * this.offerta.offpeak)+
                        (this.INDEXBIMES.last.peak * this.offerta.peak)+
                        (this.INDEXBIMES.last.offpeak * this.offerta.offpeak)):
                        this.offerta.consumo === 'triorario' ? 
                        ((this.INDEXBIMES.curr.f1 * this.offerta.f1)+
                        (this.INDEXBIMES.curr.f2 * this.offerta.f2)+
                        (this.INDEXBIMES.curr.f3 * this.offerta.f3)+
                        (this.INDEXBIMES.last.f1 * this.offerta.f1)+
                        (this.INDEXBIMES.last.f2 * this.offerta.f2)+
                        (this.INDEXBIMES.last.f3 * this.offerta.f3)):
                        0
                        )
                return this.index_tri_bi
                break;
            }
        }

        cb20(data, request){
           return b20.getPowerBids(data,request)
        }
    
        Vendita(){
            return ( this.Bilanciamento() + this.Cco() + this.Pd() + this.Pcv() + this.MateriaPrima() + this.Dispbt())
        }

//#endregion

//#region Trasporto
        QuotaFissaTrasporto(){
            switch (this.periodo) {
                case 1:
                return (this.CMH.quotafissatrasporto)    
                case 2:
                return (this.CMH.quotafissatrasporto + this.LMH.quotafissatrasporto)
                default:
                return (this.CMH.quotafissatrasporto)
            }
        }
        QuotaEnergiaTrasporto(){
            switch (this.periodo) {
                case 1:
                return (this.CMH.quotaenergiatrasporto * this.kwConsumati)
                case 2:
                    this.QETH = {
                        cur: (this.CMH.quotaenergiatrasporto * this.kwbimestre),
                        las: (this.LMH.quotaenergiatrasporto * this.kwbimestre) 
                        }
                return (this.QETH.cur + this.QETH.las)
                default:
                return (this.CMH.quotaenergiatrasporto * this.kwConsumati)
            }
        }
        QuotaPotenzaTrasporto(){
            switch (this.periodo) {
                case 1:
                return (this.CMH.quotapotenzatrasporto * this.potenzaUtenza)
                    break;
                case 2:
                this.QPTH = {
                    cur: (this.CMH.quotapotenzatrasporto * this.potenzaUtenza),
                    las: (this.LMH.quotapotenzatrasporto * this.potenzaUtenza)
                }
                return (this.QPTH.cur + this.QPTH.las)
                    break;
                default:
                return (this.CMH.quotapotenzatrasporto * this.potenzaUtenza)
                    break;
            }
        }
        Trasporto(){
        return (this.QuotaFissaTrasporto() + this.QuotaEnergiaTrasporto() + this.QuotaPotenzaTrasporto())
        }
//#endregion

//#region Oneri
        QuotaFissaOneri(){
            switch (this.utenza.tariffa) {
                case 'tdn':
                return this.getNotResident()
                    break;
                case 'tdr':
                return this.getResident()
                    break;
                default: 
                return this.getResident()
                    break;
            }
            
        }
        QuotaEnergiaOneri(){
            switch (this.periodo) {
                case 1:
                    this.sopraPromed = (this.kwConsumati / this.CMH.days ) - (150 / this.CMH.days)
                    this.sottoPromed = (150 / this.CMH.days)
                    this.QEE = {
                        sotto: ((this.sottoPromed * this.CMH.days ) * this.CMH.quotaonerisotto),
                        sopra: ((this.sopraPromed || 0 * this.CMH.days ) * this.CMH.quotaonerisopra)
                    }
                    return ( this.QEE.sotto + this.QEE.sopra)
                case 2:
                    this.QEOH = {
                        curSotto: (this.kwbimestre * this.CMH.quotaonerisotto),
                        curSopra: (this.kwbimestre * this.CMH.quotaonerisopra),
                        lasSotto:( this.kwbimestre * this.LMH.quotaonerisotto),
                        lasSopra:( this.kwbimestre * this.LMH.quotaonerisopra)
                    }
                return (this.QEOH.curSotto + this.QEOH.curSopra + this.QEOH.lasSopra + this.QEOH.lasSotto)    
                break;
                default:
                return 0
                break;
            } 
        }
        QuotaPotenzaOneri(){
            switch (this.periodo) {
                case 1:
                return (this.CMH.quotapotenzaoneri || 0) 
                    break;
                case 2:
                return ((this.CMH.quotapotenzaoneri || 0 ) + (this.LMH.quotapotenzaoneri || 0))
                break;
                default:
                return (this.CMH.quotapotenzaoneri || 0) 
                    break;
            }
        }
        getResident(){
            return 0
        }
        getNotResident(){
            switch (this.periodo) {
                case 1:
                return (this.CMH.quotafissaoneri)
                case 2:
                return (this.CMH.quotafissaoneri + this.LMH.quotafissaoneri)
                default:
                return (this.CMH.quotafissaoneri)  
            }
        }
        Oneri(){
            return (this.QuotaFissaOneri() + this.QuotaEnergiaOneri() + this.QuotaPotenzaOneri())
        }
        
//#endregion

//#region Imposte

Accisa(){
    switch (this.periodo) {
        case 1:
        this.consumoMon = handleVarEnergia(this.kwConsumati,this.CMH.days)
        this.QEE = {
            sotto: (this.consumoMon.sotto * 0),
            sopra: (this.consumoMon.sopra * 0.02200)
        }
        return ( this.QEE.sotto + this.QEE.sopra)
        case 2:
                this.accisaCur = handleVarEnergia(this.kwbimestre,this.CMH.days)
                this.accisaLas = handleVarEnergia(this.kwbimestre,this.LMH.days)
                this.AH = {
                    curSotto: (this.accisaCur.sotto * 0),
                    curSopra: (this.accisaCur.sopra * 0.02200),
                    lasSotto:( this.accisaLas.sotto * 0),
                    lasSopra:( this.accisaLas.sopra * 0.02200)
                }
        return (this.AH.curSotto + this.AH.curSopra + this.AH.lasSopra + this.AH.lasSotto)    
        default:
        return 0
    }
}

Iva(){
    this.ivaVendita = this.Vendita() * 0.10
    this.ivaTrasporto = this.Trasporto() * 0.10
    this.ivaOneri = this.Oneri() * 0.10
    this.ivaAccisa = this.Accisa() * 0.10
    return (this.ivaVendita + this.ivaTrasporto + this.ivaOneri + this.ivaAccisa)
}

Imposte(){
    return ( this.Iva() + this.Accisa())
}
//#endregion

TotaleBolletta(){
    return (this.Vendita() + this.Trasporto() + this.Oneri() + this.Imposte() + this.AltrePartite())
}
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
CanoneTV(){
    switch (this.periodo) {
        case 1:
        this.canoneTV = this.utenza.tariffa !== 'tdr' ? null : TVR(this.CMH.month) 
        return this.canoneTV
        case 2: 
        this.biTV = {
                cur:  TVR(this.CMH.month),
                last: TVR(this.LMH.month)
            }
        this.canoneTV = this.utenza.tariffa !== 'tdr' ? null : (this.biTV.cur + this.biTV.last)
        return this.canoneTV 
        default:
            this.canoneTV = null
            return this.canoneTV
    }
}
AltrePartite(){
    return (this.Sepa() + this.InvioFattura() + this.CanoneTV())
}

getBollettaPowerHome() {
            return {
               vendita: this.Vendita(),
               prezzo: this.MateriaPrima(),
               trasporto: this.Trasporto(),
               oneri: this.Oneri(),
               imposte: this.Imposte(),
               totaleBolletta: this.TotaleBolletta(),
               bilanciamento: this.Bilanciamento(),
               altrePartite : (this.Sepa() + this.InvioFattura() + this.CanoneTV()),
               accisa: this.Accisa(),
               sepa: this.Sepa(),
               canone: this.CanoneTV(),
               invioFattura: this.InvioFattura(),
               costiGestione: this.costiGestione
            }
        }
}
export default BollettaPowerHome

const indexHome = (index,a,b) =>{
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
const handleVarEnergia = (kw,tar) =>{
    let consumed = kw / tar
    let divide = (150 /tar)
    let soglie = [0,divide,600]
    const oneris = {}
    if(consumed > soglie[1] && consumed <= soglie[2]){
        oneris.sopra = (consumed - soglie[1]) * tar
        oneris.sotto = divide * tar
    }
    if(consumed <= soglie[1]){
        oneris.sotto = consumed * tar
        oneris.sopra = 0
    }
    return oneris
}

const TVR = (mese) => {
    switch (mese){
        case 'Gennaio':
        return 9.00
        case 'Febbraio':
        return 9.00
        case 'Marzo':
        return 9.00
        case 'Aprile':
        return 9.00
        case 'Maggio':
        return 9.00
        case 'Giugno':
        return 9.00
        case 'Luglio':
        return 9.00
        case 'Agosto':
        return 9.00
        case 'Settembre':
        return 9.00
        case 'Ottobre':
        return 9.00
        case 'Novembre':
        return 0.00
        case 'Dicembre':
        return 0.00
    }
}