class BollettaGasHome {
    constructor(utenza,tariffa, offerta){
    this.utenza = utenza,
    this.CMH = tariffa.currMonth[utenza.ambito]
    this.LMH = tariffa.lastMonth[utenza.ambito]
    this.bidIndex = offerta.bidIndex
    this.TUTELAINDEX = offerta.tutela_index
    this.tariffa = tariffa,
    this.offerta = offerta,
    this.consumo = utenza.mc
    this.ambito = utenza.ambito
    this.periodo = utenza.fatturazione
    this.maggiorazionePDR = offerta.maggiorazionePDR
    this.indexMaggiorazionePDR = offerta.indexMaggiorazionePDR
    this.pcs = utenza.pcs
    this.sca1 = utenza.scaglioni[1]
    this.sca2 = utenza.scaglioni[2]
    this.sca3 = utenza.scaglioni[3]
    this.sca4 = utenza.scaglioni[4]
    this.sca5 = utenza.scaglioni[5]
    this.sca6 = utenza.scaglioni[6]
    this.contatore = Number(utenza.contatore)
    this.maggiorazioneQVD = offerta.compensazione_QVD || 0
    this.totales = this.getBollettaGasHome()
    this.cc = utenza.cc

    }

    
//#region vendita
Pdr(){
        switch (this.periodo) {
            case 1:
            this.maggiorazionePDR > 0 ? this.PDR = (this.CMH.qf_domestico + handleMaggiorazioni(this.indexMaggiorazionePDR, this.maggiorazionePDR, this.CMH.days, this.consumo)):
            this.PDR = this.CMH.qf_domestico 
            return this.PDR
            case 2:
            this.maggiorazionePDR > 0 ? 
            this.PDR = (
            (this.CMH.qf_domestico + handleMaggiorazioni(this.indexMaggiorazionePDR, this.maggiorazionePDR, this.CMH.days, (this.consumo / 2)))+
            (this.LMH.qf_domestico + handleMaggiorazioni(this.indexMaggiorazionePDR, this.maggiorazionePDR, this.LMH.days, (this.consumo / 2)))
            ):
            this.PDR = (this.CMH.qf_domestico + this.LMH.qf_domestico)
            return this.PDR
        }
}

Qvd(){
    switch (this.periodo) {
        case 1:
        this.qvd = {
            curr: {
                sca1: ((this.CMH.qvd + this.maggiorazioneQVD) * this.sca1),
                sca2: ((this.CMH.qvd + this.maggiorazioneQVD) * this.sca2),
                sca3: ((this.CMH.qvd + this.maggiorazioneQVD) * this.sca3),
                sca4: ((this.CMH.qvd + this.maggiorazioneQVD) * this.sca4),
                sca5: ((this.CMH.qvd + this.maggiorazioneQVD) * this.sca5),
                sca6: ((this.CMH.qvd + this.maggiorazioneQVD) * this.sca6)
            }     
        }
        this.QVD = (this.qvd.curr.sca1 + this.qvd.curr.sca2 + this.qvd.curr.sca3 + this.qvd.curr.sca4 + this.qvd.curr.sca5 + this.qvd.curr.sca6)
        return this.QVD
        case 2:
        this.qvd = {
            curr: {
                sca1: ((this.CMH.qvd + this.maggiorazioneQVD) * this.sca1),
                sca2: ((this.CMH.qvd + this.maggiorazioneQVD) * this.sca2),
                sca3: ((this.CMH.qvd + this.maggiorazioneQVD) * this.sca3),
                sca4: ((this.CMH.qvd + this.maggiorazioneQVD) * this.sca4),
                sca5: ((this.CMH.qvd + this.maggiorazioneQVD) * this.sca5),
                sca6: ((this.CMH.qvd + this.maggiorazioneQVD) * this.sca6)
            },
            last: {
                sca1: ((this.LMH.qvd + this.maggiorazioneQVD) * this.sca1),
                sca2: ((this.LMH.qvd + this.maggiorazioneQVD) * this.sca2),
                sca3: ((this.LMH.qvd + this.maggiorazioneQVD) * this.sca3),
                sca4: ((this.LMH.qvd + this.maggiorazioneQVD) * this.sca4),
                sca5: ((this.LMH.qvd + this.maggiorazioneQVD) * this.sca5),
                sca6: ((this.LMH.qvd + this.maggiorazioneQVD) * this.sca6)
            }
        }
        this.QVD = (this.qvd.curr.sca1 + this.qvd.curr.sca2 + this.qvd.curr.sca3 + this.qvd.curr.sca4 + this.qvd.curr.sca5 + this.qvd.curr.sca6)
        return this.QVD
    
    }
}

Ccr(){
        this.CCR = {
            curr : {
                sca1: ((this.CMH.ccr * this.pcs) * this.sca1),
                sca2: ((this.CMH.ccr * this.pcs) * this.sca2),
                sca3: ((this.CMH.ccr * this.pcs) * this.sca3),
                sca4: ((this.CMH.ccr * this.pcs) * this.sca4),
                sca5: ((this.CMH.ccr * this.pcs) * this.sca5),
                sca6: ((this.CMH.ccr * this.pcs) * this.sca6),
            },
            last: {
                sca1: ((this.CMH.ccr * this.pcs) * this.sca1),
                sca2: ((this.CMH.ccr * this.pcs) * this.sca2),
                sca3: ((this.CMH.ccr * this.pcs) * this.sca3),
                sca4: ((this.CMH.ccr * this.pcs) * this.sca4),
                sca5: ((this.CMH.ccr * this.pcs) * this.sca5),
                sca6: ((this.CMH.ccr * this.pcs) * this.sca6),
            }
            
        }
        this.ccr = this.offerta.ccr === true ? (this.CCR.curr.sca1 + this.CCR.curr.sca2 + this.CCR.curr.sca3 + this.CCR.curr.sca4 + this.CCR.curr.sca5 + this.CCR.curr.sca6) : 0
        return this.ccr 
}

MateriaPrimaGas(){
    switch (this.bidIndex) {
        case 'pfor':
         return this.PFOR()
        case 'cmen':
         return this.CMEN()
        case 'ttf':
         return this.TTF()
        case 'tutela':
         return this.TUTELA()
    }
}



PFOR(){
    switch (this.periodo) {
        case 1:
        this.PFOR_GAS = ((((this.offerta.pfor * 1000)/0.03852)/1000) * this.pcs)
        this.cur_pfor = {
            qint: this.CMH.qint * this.pcs,
            qpsv: this.CMH.qpsv * this.pcs,
            qmcv: this.CMH.qmcv || 0 * this.pcs ,
            pfor: this.PFOR_GAS
        }    
        this.prezzoGas = (this.cur_pfor.qint  + this.cur_pfor.qpsv + this.cur_pfor.qmcv + this.cur_pfor.pfor)
        this.mp_sca1 = (this.sca1 * this.prezzoGas)
        this.mp_sca2 = (this.sca2 * this.prezzoGas)
        this.mp_sca3 = (this.sca3 * this.prezzoGas)
        this.mp_sca4 = (this.sca4 * this.prezzoGas)
        this.mp_sca5 = (this.sca5 * this.prezzoGas)
        this.mp_sca6 = (this.sca6 * this.prezzoGas)
        this.materiaPrima = (this.mp_sca1 + this.mp_sca2 + this.mp_sca3 + this.mp_sca4 + this.mp_sca5 + this.mp_sca6)
        return this.materiaPrima
        case 2:
        this.PFOR_GAS = ((((this.offerta.pfor * 1000)/0.03852)/1000) * this.pcs)
        this.PFOR_BI = {
            curr: ((this.CMH.qint + this.CMH.qmcv + this.CMH.qpsv ) * this.pcs ) + this.PFOR_GAS, 
            last: ((this.LMH.qint + this.LMH.qmcv + this.LMH.qpsv ) * this.pcs ) + this.PFOR_GAS
        }
        this.mp_sca1 = (this.sca1 * this.PFOR_BI.curr)
        this.mp_sca2 = (this.sca2 * this.PFOR_BI.curr)
        this.mp_sca3 = (this.sca3 * this.PFOR_BI.curr)
        this.mp_sca4 = (this.sca4 * this.PFOR_BI.curr)
        this.mp_sca5 = (this.sca5 * this.PFOR_BI.curr)
        this.mp_sca6 = (this.sca6 * this.PFOR_BI.curr)
        this.materiaPrima = (this.mp_sca1 + this.mp_sca2 + this.mp_sca3 + this.mp_sca4 + this.mp_sca5 + this.mp_sca6)

        return this.materiaPrima
        
    }
}

CMEN(){
    switch (this.periodo) {
        case 1:
        this.CMEN_GAS = ((( this.offerta.cmen * 1000)/0.03852)/1000) * this.pcs
        this.mp_sca1 = (this.sca1 * this.CMEN_GAS)
        this.mp_sca2 = (this.sca2 * this.CMEN_GAS)
        this.mp_sca3 = (this.sca3 * this.CMEN_GAS)
        this.mp_sca4 = (this.sca4 * this.CMEN_GAS)
        this.mp_sca5 = (this.sca5 * this.CMEN_GAS)
        this.mp_sca6 = (this.sca6 * this.CMEN_GAS)
        this.materiaPrima = (this.mp_sca1 + this.mp_sca2 + this.mp_sca3 + this.mp_sca4 + this.mp_sca5 + this.mp_sca6)
        return this.materiaPrima
        case 2:
        this.CMEN_GAS = ((( this.offerta.cmen * 1000)/0.03852)/1000) * this.pcs
        this.mp_sca1 = (this.sca1 * this.CMEN_GAS)
        this.mp_sca2 = (this.sca2 * this.CMEN_GAS)
        this.mp_sca3 = (this.sca3 * this.CMEN_GAS)
        this.mp_sca4 = (this.sca4 * this.CMEN_GAS)
        this.mp_sca5 = (this.sca5 * this.CMEN_GAS)
        this.mp_sca6 = (this.sca6 * this.CMEN_GAS)
        this.materiaPrima = (this.mp_sca1 + this.mp_sca2 + this.mp_sca3 + this.mp_sca4 + this.mp_sca5 + this.mp_sca6)
        return this.materiaPrima
    }
}
TTF(){
    return console.log('ttf')
}
TUTELA(){
    switch (this.periodo) {
        case 1:
        this.TUTELA_GAS = (this.TUTELAINDEX === 'pfor' ?  
        ((this.CMH.pfor_arera * this.pcs) + this.offerta.pfor) :
         this.TUTELAINDEX === 'cmen' ? 
         ((this.CMH.cmen_arera  * this.pcs) + this.offerta.cmen) : 0 )

        this.mp_sca1 = (this.sca1 * this.TUTELA_GAS)
        this.mp_sca2 = (this.sca2 * this.TUTELA_GAS)
        this.mp_sca3 = (this.sca3 * this.TUTELA_GAS)
        this.mp_sca4 = (this.sca4 * this.TUTELA_GAS)
        this.mp_sca5 = (this.sca5 * this.TUTELA_GAS)
        this.mp_sca6 = (this.sca6 * this.TUTELA_GAS)
        this.materiaPrima = (this.mp_sca1 + this.mp_sca2 + this.mp_sca3 + this.mp_sca4 + this.mp_sca5 + this.mp_sca6)
        return this.materiaPrima
        case 2:
        this.TUTELA_GAS_CURR = (this.TUTELAINDEX === 'pfor' ?  
        ((this.CMH.pfor_arera * this.pcs) + this.offerta.pfor) :
         this.TUTELAINDEX === 'cmen' ? 
        ((this.CMH.cmen_arera  * this.pcs) + this.offerta.cmen) : 0 )
        this.TUTELA_GAS_LAST = (this.TUTELAINDEX === 'pfor' ?  
        ((this.LMH.pfor_arera * this.pcs) + this.offerta.pfor) :
         this.TUTELAINDEX === 'cmen' ? 
         ((this.LMH.cmen_arera  * this.pcs) + this.offerta.cmen) : 0 )

        this.mp_sca1 = (((this.sca1 / 2 )* this.TUTELA_GAS_CURR)+((this.sca1 / 2 ) * this.TUTELA_GAS_LAST))
        this.mp_sca2 = (((this.sca2 / 2 )* this.TUTELA_GAS_CURR)+((this.sca2 / 2 ) * this.TUTELA_GAS_LAST))
        this.mp_sca3 = (((this.sca3 / 2 )* this.TUTELA_GAS_CURR)+((this.sca3 / 2 ) * this.TUTELA_GAS_LAST))
        this.mp_sca4 = (((this.sca4 / 2 )* this.TUTELA_GAS_CURR)+((this.sca4 / 2 ) * this.TUTELA_GAS_LAST))
        this.mp_sca5 = (((this.sca5 / 2 )* this.TUTELA_GAS_CURR)+((this.sca5 / 2 ) * this.TUTELA_GAS_LAST))
        this.mp_sca6 = (((this.sca6 / 2 )* this.TUTELA_GAS_CURR)+((this.sca6 / 2 ) * this.TUTELA_GAS_LAST))
        this.materiaPrima = (this.mp_sca1 + this.mp_sca2 + this.mp_sca3 + this.mp_sca4 + this.mp_sca5 + this.mp_sca6)
        return this.materiaPrima
    }
}

Vendita_Gas(){
    this.pp = ( this.Pdr() + this.Ccr() + this.Qvd() + this.MateriaPrimaGas())
    return this.pp
}
//#endregion
//#region trasporto
QT(){
    switch (this.periodo) {
        case 1:
        this.qt = (this.CMH.QT * this.pcs)
        return this.qt
        case 2:
        this._qt = {
            curr: (this.CMH.QT * this.pcs),
            last: (this.LMH.QT * this.pcs)
        } 
        this.qt = (this._qt.curr + this._qt.last)
        return this.qt
        default:
        this.qt = (this.CMH.QT * this.pcs)
        return this.qt
    }
}

QuotaFissaTrasportoGas(){
    switch (this.cc) {
        case 'G1':
         this.periodo === 2 ? 
         this.quotafissa = (this.CMH.G1 + this.LMH.G1) :
         this.quotafissa =  this.CMH.G1
        return this.quotafissa
        case 'G2':
         this.periodo === 2 ? 
         this.quotafissa = (this.CMH.G2 + this.LMH.G2) :
         this.quotafissa =  this.CMH.G2
        return this.quotafissa
        case 'G3':
         this.periodo === 2 ? 
         this.quotafissa = (this.CMH.G3 + this.LMH.G3) :
         this.quotafissa =  this.CMH.G3
        return this.quotafissa
    }
}
G1(){
    switch (this.periodo) {
        case 1:
        this.quotafissa = (this.CMH.G1)
        return this.quotafissa
        case 2:
        this.quotafissa = (this.CMH.G1 + this.LMH.G1 )
        return this.quotafissa
    }
}
G2(){
    switch (this.periodo) {
        case 1:
        this.quotafissa = (this.CMH.G2)
        return this.quotafissa
        case 2:
        this.quotafissa = (this.CMH.G2 + this.LMH.G2)
        return this.quotafissa
    }
}
G3(){
    switch (this.periodo) {
        case 1:
        this.quotafissa = (this.CMH.G3)
        return this.quotafissa
        case 2:
        this.quotafissa = (this.CMH.G3 + this.LMH.G3 )
        return this.quotafissa
    }
}

Scaglioni_Trasporto_Gas(){
    switch (this.periodo) {
        case 1:
        this.LST = {
            curr: {
            sca1: (this.sca1 * (this.CMH.qv_trasporto_sc1 + this.qt)),
            sca2: (this.sca2 * (this.CMH.qv_trasporto_sc2 + this.qt)),
            sca3: (this.sca3 * (this.CMH.qv_trasporto_sc3 + this.qt)),
            sca4: (this.sca4 * (this.CMH.qv_trasporto_sc4 + this.qt)),
            sca5: (this.sca5 * (this.CMH.qv_trasporto_sc5 + this.qt)),
            sca6: (this.sca6 * (this.CMH.qv_trasporto_sc6 + this.qt)),
            }
        }
        this.QV_TS = (this.LST.curr.sca1 +this.LST.curr.sca2 + this.LST.curr.sca3 + this.LST.curr.sca4 + this.LST.curr.sca5 + this.LST.curr.sca6)
        return this.QV_TS
        case 2:
        this.LST = {
            curr: {
                sca1: (this.sca1 * (this.CMH.qv_trasporto_sc1 + this.qt)),
                sca2: (this.sca2 * (this.CMH.qv_trasporto_sc2 + this.qt)),
                sca3: (this.sca3 * (this.CMH.qv_trasporto_sc3 + this.qt)),
                sca4: (this.sca4 * (this.CMH.qv_trasporto_sc4 + this.qt)),
                sca5: (this.sca5 * (this.CMH.qv_trasporto_sc5 + this.qt)),
                sca6: (this.sca6 * (this.CMH.qv_trasporto_sc6 + this.qt)),
            },
            last: {
                sca1: (this.sca1 * (this.LMH.qv_trasporto_sc1 + this.qt)),
                sca2: (this.sca2 * (this.LMH.qv_trasporto_sc2 + this.qt)),
                sca3: (this.sca3 * (this.LMH.qv_trasporto_sc3 + this.qt)),
                sca4: (this.sca4 * (this.LMH.qv_trasporto_sc4 + this.qt)),
                sca5: (this.sca5 * (this.LMH.qv_trasporto_sc5 + this.qt)),
                sca6: (this.sca6 * (this.LMH.qv_trasporto_sc6 + this.qt)),
            }
        }
        this.QV_TS = (this.LST.curr.sca1 + this.LST.curr.sca2 + this.LST.curr.sca3 + this.LST.curr.sca4 + this.LST.curr.sca5 + this.LST.curr.sca6)
        return this.QV_TS
    }
}


TrasportoGas(){
    return (this.QuotaFissaTrasportoGas() + this.Scaglioni_Trasporto_Gas())
}
//#endregion
//#region oneri

QuotaFissaOneriGas(){
    switch (this.periodo) {
        case 1:
        this.QOFG = this.CMH.qf_oneri
        return this.QOFG
        case 2:
        this._QOF = {
            curr: this.CMH.qf_oneri,
            last: this.LMH.qf_oneri
        }
        this.QOFG = (this._QOF.curr + this._QOF.last)
        return this.QOFG
    }
}

Scaglioni_Oneri_Gas(){
        switch (this.periodo) {
            case 1:
            this.LSO = {
                curr: {
                sca1: (this.sca1 * this.CMH.qv_oneri_sc1),
                sca2: (this.sca2 * this.CMH.qv_oneri_sc2),
                sca3: (this.sca3 * this.CMH.qv_oneri_sc3),
                sca4: (this.sca4 * this.CMH.qv_oneri_sc4),
                sca5: (this.sca5 * this.CMH.qv_oneri_sc5),
                sca6: (this.sca6 * this.CMH.qv_oneri_sc6)
                }
            } 
            this.QV_OS = (this.LSO.curr.sca1 + this.LSO.curr.sca2 + this.LSO.curr.sca3 + this.LSO.curr.sca4 + this.LSO.curr.sca5 + this.LSO.curr.sca6)
            return this.QV_OS
            case 2:
            this.LSO = {
                curr: {
                    sca1: (this.sca1 * this.CMH.qv_oneri_sc1),
                    sca2: (this.sca2 * this.CMH.qv_oneri_sc2),
                    sca3: (this.sca3 * this.CMH.qv_oneri_sc3),
                    sca4: (this.sca4 * this.CMH.qv_oneri_sc4),
                    sca5: (this.sca5 * this.CMH.qv_oneri_sc5),
                    sca6: (this.sca6 * this.CMH.qv_oneri_sc6),
                },
                last: {
                    sca1: (this.sca1 * this.LMH.qv_oneri_sc1),
                    sca2: (this.sca2 * this.LMH.qv_oneri_sc2),
                    sca3: (this.sca3 * this.LMH.qv_oneri_sc3),
                    sca4: (this.sca4 * this.LMH.qv_oneri_sc4),
                    sca5: (this.sca5 * this.LMH.qv_oneri_sc5),
                    sca6: (this.sca6 * this.LMH.qv_oneri_sc6),
                }
            }
            this.QV_OS = (this.LSO.curr.sca1 + this.LSO.curr.sca2 + this.LSO.curr.sca3 + this.LSO.curr.sca4 + this.LSO.curr.sca5 + this.LSO.curr.sca6)
            return this.QV_OS
        }
}
Oneri_Gas(){
    return (this.QuotaFissaOneriGas() + this.Scaglioni_Oneri_Gas())
}
//#endregion
//#region imposte
AddRegionaliHome(){
        this.adds = {
            sc1: (this.sca1 * this.utenza.addRegionali[0] || 0),
            sc2: (this.sca2 * this.utenza.addRegionali[1] || 0),
            sc3: (this.sca3 * this.utenza.addRegionali[2] || 0),
            sc4: (this.sca4 * this.utenza.addRegionali[3] || 0),
            sc5: (this.sca5 * this.utenza.addRegionali[3] || 0),
            sc6: (this.sca6 * this.utenza.addRegionali[3] || 0)
        }            
        this.QRE = ( this.adds.sc1 + this.adds.sc2 + this.adds.sc3 +this.adds.sc4 + this.adds.sc5 + this.adds.sc6)
        return this.QRE
}

AccisaGas(){
        this.aci = {
            accisa1: this.sca1 * 0.04400,
            accisa2: this.sca2 * 0.17500,
            accisa3: this.sca3 * 0.17000,
            accisa4: this.sca4 * 0.18600,
            accisa5: this.sca5 * 0.18600,
            accisa6: this.sca6 * 0.18600
        }
        this.accisa = (this.aci.accisa1 + this.aci.accisa2 + this.aci.accisa3 + this.aci.accisa4 + this.aci.accisa5 + this.aci.accisa6)
        return this.accisa
}

Iva10Gas(){
        this.d10 = {
            vt_sca1: (this.LST.curr.sca1 * 10)/100,
            vt_sca2: (this.LST.curr.sca2 * 10)/100,
            qvd_sca1: (this.qvd.curr.sca1 * 10)/100,
            qvd_sca2: (this.qvd.curr.sca2 * 10)/100,
            ccr_sca1: (this.CCR.curr.sca1 * 10)/100,
            ccr_sca2: (this.CCR.curr.sca2 * 10)/100,
            vo_sc1: (this.LSO.curr.sca1 * 10)/100,
            vo_sc2: (this.LSO.curr.sca2 * 10)/100,
            add_sc1: this.adds.sc1 ? (this.adds.sc1 * 10)/100 : 0,
            add_sc2: this.adds.sc2 ? (this.adds.sc2 * 10)/100 : 0
        }
        this.iva10Gas = (this.d10.vt_sca1 + this.d10.vt_sca2 + this.d10.qvd_sca1 + this.d10.qvd_sca2 + this.d10.ccr_sca1 + this.d10.ccr_sca2 + this.d10.vo_sc1 + this.d10.vo_sc2 + this.d10.add_sc1 + this.d10.add_sc2)
        return this.iva10Gas
}

Iva22Gas(){
        this.D22 = {
            pdr:  (this.PDR * 22)/100,
            qvd_sc3:(this.qvd.curr.sca3 * 22)/100,
            qvd_sc4:(this.qvd.curr.sca4 * 22)/100,
            qvd_sc5:(this.qvd.curr.sca5 * 22)/100,
            qvd_sc6:(this.qvd.curr.sca6 * 22)/100,
            ccr_sc3: (this.CCR.curr.sca3 * 22)/100,
            ccr_sc4: (this.CCR.curr.sca4 * 22)/100,
            ccr_sc5: (this.CCR.curr.sca5 * 22)/100,
            ccr_sc6: (this.CCR.curr.sca6 * 22)/100,
            quote: (this.quotafissa * 22)/100,
            qf_o: (this.QOFG * 22)/100,
            mp_sc1: (this.mp_sca1 * 22)/100,
            mp_sc2: (this.mp_sca2 * 22)/100,
            mp_sc3: (this.mp_sca3 * 22)/100,    
            mp_sc4: (this.mp_sca4 * 22)/100, 
            mp_sc5: (this.mp_sca5 * 22)/100, 
            mp_sc6: (this.mp_sca6 * 22)/100, 
            vt_sc3: (this.LST.curr.sca3 * 22)/100,
            vt_sc4: (this.LST.curr.sca4 * 22)/100,
            vt_sc5: (this.LST.curr.sca5 * 22)/100,
            vt_sc6: (this.LST.curr.sca6 * 22)/100,
            vo_sc3: (this.LSO.curr.sca3 * 22)/100,
            vo_sc4: (this.LSO.curr.sca4 * 22)/100,
            vo_sc5: (this.LSO.curr.sca5 * 22)/100,
            vo_sc6: (this.LSO.curr.sca6 * 22)/100,
            add_sc3: this.adds.sc3 ? (this.adds.sc3 * 22)/100 : 0,
            add_sc4: this.adds.sc4 ? (this.adds.sc4 * 22)/100 : 0,
            add_sc5: this.adds.sc5 ? (this.adds.sc5 * 22)/100 : 0,
            add_sc6: this.adds.sc6 ? (this.adds.sc6 * 22)/100 : 0
        }
        this.iva22Gas = (this.D22.pdr + this.D22.quote + this.D22.qf_o + this.D22.mp_sc1 + this.D22.mp_sc2 + this.D22.mp_sc3 + this.D22.mp_sc4+ this.D22.mp_sc5 +this.D22.mp_sc6 +this.D22.vt_sc3 +this.D22.vt_sc4 + this.D22.vt_sc5 + this.D22.vt_sc6
            + this.D22.vo_sc3 + this.D22.vo_sc4 + this.D22.vo_sc5 + this.D22.vo_sc6 +this.D22.qvd_sc3 + this.D22.qvd_sc4 + this.D22.qvd_sc5 + this.D22.qvd_sc6 + this.D22.add_sc3 + this.D22.add_sc4 + this.D22.add_sc5 + this.D22.add_sc6 + this.D22.ccr_sc3 + this.D22.ccr_sc4 + this.D22.ccr_sc5 + this.D22.ccr_sc6 )
        return this.iva22Gas;
        
}


ImposteGas(){
    return (this.AddRegionaliHome() + this.AccisaGas() + this.Iva10Gas() + this.Iva22Gas())
 }
//#endregion
//#region altre partite
SEPA(){
    this.sepa = this.periodo === 1 ? this.offerta.sepa : this.periodo === 2 ? this.offerta.sepa * 2 : 0
    return this.sepa
}
INVIO(){
    this.invio = this.periodo === 1 ? this.offerta.invio : this.periodo === 2 ? this.offerta.invio * 2 : 0
    return this.invio
}
CostiGestione(){
    this.costo = this.periodo === 1 ? this.offerta.costiGestione : this.periodo === 2 ? this.offerta.costiGestione * 2 : 0
    return this.costo
}
AltrePartiteGas(){
    return this.SEPA() + this.INVIO() + this.CostiGestione()
}

//#endregion


TotaleBollettaGas(){
    return this.Vendita_Gas() + this.Oneri_Gas() + this.TrasportoGas() + this.ImposteGas() + this.AltrePartiteGas()
}

getBollettaGasHome(){
        return {
            _pdr: this.Pdr(),
            totaleBollettaGas: this.TotaleBollettaGas(),
            qvd: this.Qvd(),
            ccr: this.Ccr(),
            materiaPrima: this.MateriaPrimaGas(),
            vendita: this.Vendita_Gas(),
            qt: this.QT(),
            trasporto_fissa: this.QuotaFissaTrasportoGas(),
            scaglioni_trasporto: this.Scaglioni_Trasporto_Gas(),
            trasporto: this.TrasportoGas(),
            oneri_fissa: this.QuotaFissaOneriGas(),
            scaglioni_oneri: this.Scaglioni_Oneri_Gas(),
            oneri: this.Oneri_Gas(),
            addizionale: this.AddRegionaliHome(),
            accisa: this.AccisaGas(),
            iva_10: this.Iva10Gas(),
            iva_22: this.Iva22Gas(),
            imposte: this.ImposteGas(),
            sepa: this.SEPA(),
            invioFattura: this.INVIO(),
            altrePartite: this.AltrePartiteGas(),
            costiGestione: this.CostiGestione()
            }
    }
}

const handleMaggiorazioni = (index,a,b,c) => {
    switch (index) {
        case 'day':
            return ( a * b)
            break;
        case 'month':
            return ( a )
            break;
        case 'mc':
            return ( a * c )
            break;
    }
}
export default BollettaGasHome