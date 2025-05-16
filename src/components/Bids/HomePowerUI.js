import BollettaPowerHome from "../Data/BollettaPowerHome"

const useB20 = require('cb20')
const b20 = useB20.default()

const sortHomePower = async () => {
const powerBids = JSON.parse(localStorage.getItem('bids_power'))
const bid = powerBids.filter(e => e.rate === 'td')
    let arr = []
    for(let prop in bid){
        if(bid.hasOwnProperty(prop)){
            arr.push({
                price: 0,
                value: 0,
                mac:   0,
                index: 0,
                data: await renderCalcolo()
            })
            }
        }
        
    arr.sort( function(a,b){
        return a.price - b.price;
    })
    return arr;
                        
}
const renderCalcolo = async () => {

    const quote = JSON.parse(localStorage.getItem('rete_td'))
    const powerBids = JSON.parse(localStorage.getItem('bids_power'))
    const bid = powerBids.filter(e => e.rate === 'td')
    const utenza = JSON.parse(localStorage.getItem('utenzaPro'))
    const consumo = []
    if(utenza.consumo === 'monorario'){
        consumo.push({ ref: 'f0', value: utenza.f0})
    }
    if(utenza.consumo === 'biorario'){
        consumo.push(
            { ref: 'peak', value: utenza.fg},
            { ref: 'off', value: utenza.fn}  
        )
    }
    if(utenza.consumo === 'triorario'){
        consumo.push(
            { ref: 'f1', value: utenza.f1},
            { ref: 'f2', value: utenza.f2},
            { ref: 'f3', value: utenza.f3}    
        )
    }
  
    try {
      let generateData = await b20.generatePowerBid( [ {
            request:{
                core:'default',
                root: 'bid',
                rate: 'td',
                resident: ['tdr'].includes(utenza.tariffa),
                useIndexed: 'pun',
                power: utenza.potenza,
                consume: consumo,
                includes: [],
                ateco: utenza.ateco
            },
            payload:{ 
                configuration:{ 
                    lossNet: 0.100,
                    tax: 0.22,
                    subTax: 0.10,
                    percentages: [0.44,0.23],
                    noQuotes:[
                        {ref:"ppe", quote:'QEV'}
                    ],
                    quotesNotPE:[ 
                        {ref:"σ3",quote:"QTV"},
                        {ref:"uc3",quote:"QTV"},
                        {ref:"uc6",quote:"QTV"},
                        {ref:"asos",quote:"QOV"},
                        {ref:"arim",quote:"QOV"}
                    ],
                    excise: {
                        bt: [
                            0.0125,
                            0.0075,
                            4820
                        ],
                        td: [
                            0.0227
                        ],
                        mt: [
                            0.0075,
                            4830
                        ]},
                    AP: {
                        td: [
                            {
                                description: "canone TV",
                                value: 9,
                                index: "month",
                                option: "resident"
                            }
                        ],
                        bt: [],
                        mt: null
                    }
                },
                quote:quote[utenza.dateBill],
                bid:{
                    ...bid[0],
                    includes:[
                        ...bid[0].includes,
                        {ref:"Corrispettivo orario mercato capacità", quote:"QEV", index:"kw", value:quote[utenza.dateBill].CM},
                    ]
                }
            }
        }])  
       

        return generateData[0].response
    } catch (error) {
        console.log(error)
    }

}

const HomePowerUI = async () => {
   let orderCardsPowerHome =  await sortHomePower() 
   return orderCardsPowerHome
}

export default HomePowerUI