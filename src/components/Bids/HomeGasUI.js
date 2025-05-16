import BollettaGasHome from '../Data/BollettaGasHome'



const sortHomeGas = () => {
const rete = JSON.parse(localStorage.getItem('rete_gas'))
const gasHome = JSON.parse(localStorage.getItem('gas_home'))
const utenzaPro = JSON.parse(localStorage.getItem('utenzaPro'))
const mesi = {
    currMonth: rete['2020M01'],
    lastMonth: rete['2019M12']
    }

        let arr = []
                            for(let prop in gasHome){
                                if(gasHome.hasOwnProperty(prop)){
                                    arr.push({
                                        price: renderCalcolo(utenzaPro, mesi, gasHome[prop]).price,
                                        value: gasHome[prop],
                                        mac:   renderCalcolo(utenzaPro, mesi, gasHome[prop]).mac,
                                        index: gasHome.findIndex(bio => bio.id === gasHome[prop].id)
                                    })
                                  }
                              }
                            arr.sort( function(a,b){
                                return a.price - b.price;
                            })
                            return arr;
                            
}

const renderCalcolo = (utenza, tariffa, offerta) => {
    let newCalcolo = new BollettaGasHome(utenza,tariffa,offerta)
    let totaleBollettaGas = newCalcolo.getBollettaGasHome().totaleBollettaGas 
    return {
        mac: newCalcolo,
        price: totaleBollettaGas
    }
}

const HomeGasUI = ()=> {
    let orderCardsGasHome = sortHomeGas() 
    return orderCardsGasHome
}
export default HomeGasUI