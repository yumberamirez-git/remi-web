class BollettaGasBusiness {
    constructor(utenza, tariffa, offerta){
            this.utenza = utenza,
            this.CMH = tariffa.currMonth[utenza.ambito]
            this.LMH = tariffa.lastMonth[utenza.ambito]
            this.index_bid = offerta.index_bid || 'PFOR'
            this.tariffa = tariffa,
            this.offerta = offerta,
            this.consumo = utenza.mc
            this.ambito = utenza.ambito
            this.periodo = utenza.fatturazione
            this.pcs = utenza.pcs
            this.sca1 = utenza.scaglioni[1]
            this.sca2 = utenza.scaglioni[2]
            this.sca3 = utenza.scaglioni[3]
            this.sca4 = utenza.scaglioni[4]
            this.sca5 = utenza.scaglioni[5]
            this.sca6 = utenza.scaglioni[6]
            this.contatore = Number(utenza.contatore)
            this.maggiorazioneQVD = offerta.compensazione_QVD || 0
            this.totales = this.getBollettaGasBusiness()
            this.cc = utenza.cc
            this.add_sc1 = utenza.addRegionali[0] || 0
            this.add_sc2 = utenza.addRegionali[1] || 0
            this.add_sc3 = utenza.addRegionali[2] || 0
            this.add_sc4 = utenza.addRegionali[3] || 0
            this.add_sc5 = utenza.addRegionali[3] || 0
            this.add_sc6 = utenza.addRegionali[3] || 0

    }

//#region vendita

Pdr(){
    switch (this.periodo) {
        case 1:
        this.pdr = this.CMH.qf_domestico 
        return this.pdr
        case 2:
        this._pdr = {
            curr: this.CMH.qf_domestico, 
            last: this.LMH.qf_domestico
        }
        this.pdr = (this._pdr.curr + this._pdr.last)
        return this.pdr
        default:
        this.pdr = this.CMH.qf_domestico 
        return this.pdr
    }
}
Qvd(){
    switch (this.periodo) {
        case 1:
        this._qvd = {
            sca1: ((this.CMH.qvd + this.maggiorazioneQVD) * this.sca1),
            sca2: ((this.CMH.qvd + this.maggiorazioneQVD) * this.sca2),
            sca3: ((this.CMH.qvd + this.maggiorazioneQVD) * this.sca3),
            sca4: ((this.CMH.qvd + this.maggiorazioneQVD) * this.sca4),
            sca5: ((this.CMH.qvd + this.maggiorazioneQVD) * this.sca5),
            sca6: ((this.CMH.qvd + this.maggiorazioneQVD) * this.sca6),
        }
        this.qvd = (this._qvd.sca1 + this._qvd.sca2 + this._qvd.sca3 + this._qvd.sca4 + this._qvd.sca5 + this._qvd.sca6)
        return this.qvd
        case 2:
        this._qvd = {
            curr: (this.CMH.qvd + this.maggiorazioneQVD) * (this.consumo / 2),
            last: (this.LMH.qvd + this.maggiorazioneQVD) * (this.consumo / 2)
        }
        this.qvd = (this._qvd.curr + this._qvd.last)
        return this.qvd
        default:
        this.qvd = ((this.CMH.qvd + this.maggiorazioneQVD )* this.consumo)
        return this.qvd
    }
}

Ccr(){
    switch (this.periodo) {
        case 1:
        this._ccr = {
            sca1: ((this.CMH.ccr * this.pcs) * this.sca1),
            sca2: ((this.CMH.ccr * this.pcs) * this.sca2),
            sca3: ((this.CMH.ccr * this.pcs) * this.sca3),
            sca4: ((this.CMH.ccr * this.pcs) * this.sca4),
            sca5: ((this.CMH.ccr * this.pcs) * this.sca5),
            sca6: ((this.CMH.ccr * this.pcs) * this.sca6),
        }
        this.ccr = (this._ccr.sca1 + this._ccr.sca2 + this._ccr.sca3 + this._ccr.sca4 + this._ccr.sca5 + this._ccr.sca6)
        return this.offerta.ccr === true ? this.ccr : 0
        case 2:
        this._ccr = {
            curr: ((this.CMH.ccr * this.pcs) * (this.consumo / 2)),
            last: ((this.LMH.ccr * this.pcs)* ( this.consumo / 2))
        }
        this.ccr = (this._ccr.curr + this._ccr.last)
        return this.ccr
        default:
        this.ccr = ((this.CMH.ccr * this.pcs) * this.consumo)
        return this.ccr
    }
}


PFOR(){
    switch (this.periodo) {
        case 1:
        this.cur_pfor = {
            qint: this.CMH.qint * this.pcs,
            qpsv: this.CMH.qpsv * this.pcs,
            qmcv: this.CMH.qmcv || 0 * this.pcs ,
            pfor: (((this.offerta.pfor * 1000)/0.03852)/1000) * this.pcs
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
        return
        default:
        return 0
    }
}
CMEN(){
    switch (this.periodo) {
        case 1:
        this.cmen = ((( this.offerta.cmen * 1000)/0.03852)/1000) * this.pcs
        this.mp_sca1 = (this.sca1 * this.cmen)
        this.mp_sca2 = (this.sca2 * this.cmen)
        this.mp_sca3 = (this.sca3 * this.cmen)
        this.mp_sca4 = (this.sca4 * this.cmen)
        this.mp_sca5 = (this.sca5 * this.cmen)
        this.mp_sca6 = (this.sca6 * this.cmen)
        this.materiaPrima = (this.mp_sca1 + this.mp_sca2 + this.mp_sca3 + this.mp_sca4 + this.mp_sca5 + this.mp_sca6)
        return this.materiaPrima
        case 2:
        return
        default:
        return 0
    }
}

MateriaPrimaGas(){
    switch (this.index_bid) {
        case 'PFOR':
         return this.PFOR()
        case 'CMEN':
         return this.CMEN()
        case 'TTF':
        return this.TTF()
        default:
        return this.CMEN()
    }
}

Vendita_Gas(){
    return (this.Pdr() +this.Qvd() + this.Ccr()+ this.MateriaPrimaGas())
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

G1(){
    switch (this.periodo) {
        case 1:
        this.quotafissa = (this.CMH.G1)
        return this.quotafissa
        case 2:
        this.quotafissa = (this.CMH.G1 + this.LMH.G1 )
        return this.quotafissa
        default:
        this.quotafissa = (this.CMH.G1) 
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
        default:
        this.quotafissa = (this.CMH.G2) 
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
        default:
        this.quotafissa = (this.CMH.G3) 
        return this.quotafissa
    }
}


QuotaFissaTrasportoGas(){
    switch (this.cc) {
        case 'G1':
        return this.G1()
        case 'G2':
        return this.G2()
        case 'G3':
        return this.G3()
        default:
        return this.G1()
    }
}

Scaglioni_Trasporto_Gas(){
    switch (this.periodo) {
        case 1:
        this.BLST = {
            sca1: (this.sca1 * (this.CMH.qv_trasporto_sc1 + this.qt)),
            sca2: (this.sca2 * (this.CMH.qv_trasporto_sc2 + this.qt)),
            sca3: (this.sca3 * (this.CMH.qv_trasporto_sc3 + this.qt)),
            sca4: (this.sca4 * (this.CMH.qv_trasporto_sc4 + this.qt)),
            sca5: (this.sca5 * (this.CMH.qv_trasporto_sc5 + this.qt)),
            sca6: (this.sca6 * (this.CMH.qv_trasporto_sc6 + this.qt)),
        }
        this.QV_TS_B = (this.BLST.sca1 +this.BLST.sca2 + this.BLST.sca3 + this.BLST.sca4 + this.BLST.sca5 + this.BLST.sca6)
        return this.QV_TS_B
        case 2:
        return 0
        default:
        return this.QV_TS_B
    }
}

Trasporto_Gas(){
    return (this.QuotaFissaTrasportoGas() + this.Scaglioni_Trasporto_Gas())
}
//#endregion
//#region Oneri


QuotaFissaOneriGas(){
    switch (this.periodo) {
        case 1:
        this.QOFGB = this.CMH.qf_oneri
        return this.QOFGB
        case 2:
        this._QOF = {
            curr: this.CMH.qf_oneri,
            last: this.LMH.qf_oneri
        }
        this.QOFGB = (this._QOF.curr + this._QOF.last)
        return this.QOFGB
        default:
        this.QOFGB = this.CMH.qf_oneri
        return this.QOFGB
    }
}

Scaglioni_Oneri_Gas(){
    switch (this.periodo) {
        case 1:
        this.LSOB = {
            sca1: (this.sca1 * this.CMH.qv_oneri_sc1),
            sca2: (this.sca2 * this.CMH.qv_oneri_sc2),
            sca3: (this.sca3 * this.CMH.qv_oneri_sc3),
            sca4: (this.sca4 * this.CMH.qv_oneri_sc4),
            sca5: (this.sca5 * this.CMH.qv_oneri_sc5),
            sca6: (this.sca6 * this.CMH.qv_oneri_sc6),
        } 
        this.QV_OSB = (this.LSOB.sca1 + this.LSOB.sca2 + this.LSOB.sca3 + this.LSOB.sca4 + this.LSOB.sca5 + this.LSOB.sca6)
        return this.QV_OSB
        case 2:
        return 0
        default:
        return 0
    }
}

Oneri_Gas(){
return (this.QuotaFissaOneriGas() + this.Scaglioni_Oneri_Gas())
}
//#endregion

//#region imposte

AddRegionali(){
    switch (this.periodo) {
        case 1:
        this.addizionale = {
            sca1: (this.sca1 * this.add_sc1),
            sca2: (this.sca2 * this.add_sc2),
            sca3: (this.sca3 * this.add_sc3),
            sca4: (this.sca4 * this.add_sc4),
            sca5: (this.sca5 * this.add_sc5),
            sca6: (this.sca6 * this.add_sc6)
        }
        this.addRegion = (this.addizionale.sca1 + this.addizionale.sca2 + this.addizionale.sca3 +this.addizionale.sca4 + this.addizionale.sca5 + this.addizionale.sca6)
        return this.addRegion
        case 2:
        return 0
        default:
        return this.addRegion
    }
}

Accisa(){
    switch (this.periodo) {
        case 1:
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
        case 2:
        return 0
        default:
        return 0
    }
}

Iva10Gas(){
    switch (this.periodo) {
        case 1:
        this.d10 = {  
            qvd_sca1: (this._qvd.sca1 * 10)/100,
            qvd_sca2: (this._qvd.sca2 * 10)/100,
            ccr_sca1: (this._ccr.sca1 * 10)/100,
            ccr_sca2: (this._ccr.sca2 * 10)/100,
            vt_sca1: (this.BLST.sca1 * 10)/100,
            vt_sca2: (this.BLST.sca2 * 10)/100,
            vo_sca1: (this.LSOB.sca1 * 10)/100,
            vo_sca2: (this.LSOB.sca2 * 10)/100,
            ac_sca1: (this.aci.accisa1 * 10)/100,
            ac_sca2: (this.aci.accisa2 * 10)/100,
            add_sca1: this.addizionale ?  (this.addizionale.sca1 * 10)/100 : 0,
            add_sca2: this.addizionale ?  (this.addizionale.sca2 * 10)/100 : 0
        }
        this.iva10Gas = (this.d10.vt_sca1 + this.d10.vt_sca2 + this.d10.qvd_sca1 + this.d10.qvd_sca2 + this.d10.ccr_sca1 + this.d10.ccr_sca2 + this.d10.vo_sca1 + this.d10.vo_sca2 + this.d10.ac_sca1 + this.d10.ac_sca2 + this.d10.add_sca1 + this.d10.add_sca2 )
        return this.iva10Gas
        case 2:
        return 10
        default:
        return this.iva10Gas = 0

    }
}

Iva22Gas(){
    switch (this.periodo) {
        case 1:
        this.D22 = {
            pdr:  (this.pdr * 22)/100,
            qvd_sc3:(this._qvd.sca3 * 22)/100,
            qvd_sc4:(this._qvd.sca4 * 22)/100,
            qvd_sc5:(this._qvd.sca5 * 22)/100,
            qvd_sc6:(this._qvd.sca6 * 22)/100,
            quote: (this.quotafissa * 22)/100,
            qf_o: (this.QOFGB * 22)/100,
            mp_sc1: (this.mp_sca1 * 22)/100,
            mp_sc2: (this.mp_sca2 * 22)/100,
            mp_sc3: (this.mp_sca3 * 22)/100,    
            mp_sc4: (this.mp_sca4 * 22)/100, 
            mp_sc5: (this.mp_sca5 * 22)/100, 
            mp_sc6: (this.mp_sca6 * 22)/100, 
            vt_sc3: (this.BLST.sca3 * 22)/100,
            vt_sc4: (this.BLST.sca4 * 22)/100,
            vt_sc5: (this.BLST.sca5 * 22)/100,
            vt_sc6: (this.BLST.sca6 * 22)/100,
            vo_sc3: (this.LSOB.sca3 * 22)/100,
            vo_sc4: (this.LSOB.sca4 * 22)/100,
            vo_sc5: (this.LSOB.sca5 * 22)/100,
            vo_sc6: (this.LSOB.sca6 * 22)/100,
            ac_sc3: (this.aci.accisa3 * 22)/100,
            ac_sc4: (this.aci.accisa4 * 22)/100,
            ac_sc5: (this.aci.accisa5 * 22)/100,
            ac_sc6: (this.aci.accisa6 * 22)/100,
            add_sc3: this.addizionale ? (this.addizionale.sca3 * 22)/100 : 0,
            add_sc4: this.addizionale ? (this.addizionale.sca4 * 22)/100 : 0,
            add_sc5: this.addizionale ? (this.addizionale.sca5 * 22)/100 : 0,
            add_sc6: this.addizionale ? (this.addizionale.sca6 * 22)/100 : 0

        }
        this.iva22Gas = (this.D22.pdr + this.D22.quote + this.D22.qf_o + this.D22.mp_sc1 + this.D22.mp_sc2 + this.D22.mp_sc3 + this.D22.mp_sc4+ this.D22.mp_sc5 +this.D22.mp_sc6 +this.D22.vt_sc3 +this.D22.vt_sc4 + this.D22.vt_sc5 + this.D22.vt_sc6
            + this.D22.vo_sc3 + this.D22.vo_sc4 + this.D22.vo_sc5 + this.D22.vo_sc6 +this.D22.qvd_sc3 + this.D22.qvd_sc4 + this.D22.qvd_sc5 + this.D22.qvd_sc6 + this.D22.ac_sc3 + this.D22.ac_sc4 + this.D22.ac_sc5 + this.D22.ac_sc6 + this.D22.add_sc3 + this.D22.add_sc4 + this.D22.add_sc5 + this.D22.add_sc6)
        return this.iva22Gas;
        case 2:
        return 10
        default:
        return this.iva22Gas = 0
    }
}

ImposteGas(){
    return ( this.AddRegionali() + this.Accisa()  + this.Iva10Gas() + this.Iva22Gas() )
}

//#endregion

TotaleBolletta(){
    return ( this.Vendita_Gas() + this.Trasporto_Gas() + this.Oneri_Gas() + this.ImposteGas())
}
    
getBollettaGasBusiness(){
        return {
            totaleBolletta: this.TotaleBolletta(),
            pdr: this.Pdr(),
            qvd: this.Qvd(),
            ccr: this.Ccr(),
            qt: this.QT(),
            vendita: this.Vendita_Gas(),
            materiaPrima: this.MateriaPrimaGas(),
            qf_gas: this.QuotaFissaTrasportoGas(),
            sct_gas: this.Scaglioni_Trasporto_Gas(),
            trasporto: this.Trasporto_Gas(),
            qf_oneri: this.QuotaFissaOneriGas(),
            sco_gas:this.Scaglioni_Oneri_Gas(),
            oneri: this.Oneri_Gas(),
            accisa: this.Accisa(),
            iva_10: this.Iva10Gas(),
            iva_22: this.Iva22Gas(),
            imposte: this.ImposteGas(),
            addizionale_regionale: this.AddRegionali()

        }
    }
}

export default BollettaGasBusiness