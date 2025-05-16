import BollettaGasBusiness from '../Data/BollettaGasBusiness'

const sortBusinessGas = () => {
const rete = JSON.parse(localStorage.getItem('rete_gas'))
const gasBus = JSON.parse(localStorage.getItem('gas_bus'))
const utenzaPro = JSON.parse(localStorage.getItem('utenzaPro'))
const mesi = {
    currMonth: rete['2019M12'],
    lastMonth: rete['2019M11']
    }

        let arr = []
                            for(let prop in gasBus){
                                if(gasBus.hasOwnProperty(prop)){
                                    arr.push({
                                        price: renderCalcolo(utenzaPro, mesi, gasBus[prop]).price,
                                        value: gasBus[prop],
                                        mac:   renderCalcolo(utenzaPro, mesi, gasBus[prop]).mac,
                                        index: gasBus.findIndex(bio => bio.id === gasBus[prop].id)
                                    })
                                  }
                              }
                            arr.sort( function(a,b){
                                return a.price - b.price;
                            })
                            return arr;
                            
}

const renderCalcolo = (utenza, tariffa, offerta) => {
    let newCalcolo = new BollettaGasBusiness(utenza,tariffa,offerta)
    let totaleBolletta = newCalcolo.getBollettaGasBusiness().totaleBolletta 
    return {
        mac: newCalcolo,    
        price: totaleBolletta
    }
}

const BusinessGasUI = ()=> {
    let orderCardsGasBus = sortBusinessGas() 
    return orderCardsGasBus
}
export default BusinessGasUI