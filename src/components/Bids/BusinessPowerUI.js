
const useB20 = require('cb20')
const b20 = useB20.default()

const sortBusinessPower = async () => {
const bidsPower = JSON.parse(localStorage.getItem('bids_power'))
const bids = bidsPower.filter(e => e.rate === 'td')
    let arr = []
    for(let prop in bids){
        if(bids.hasOwnProperty(prop)){
            arr.push({
                price: 0,
                value: bids[prop],
                mac:   0,
                index: bids[prop].indexed,
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
    const utenza = JSON.parse(localStorage.getItem('utenzaPro'))
    if(!utenza) return;
    const quote = JSON.parse(localStorage.getItem(`rete_${utenza.tariffa}`))
    const powerBids = JSON.parse(localStorage.getItem('bids_power'))
    const bid = powerBids.filter(e => e.rate === 'bt')
    
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
        let generateData = await b20.generatePowerBid( [{
            request:{
                core:'default',
                root: 'bid',
                rate: 'bt',
                useIndexed: 'pun',
                power: utenza.impegnata > 0 && utenza.tariffa === 'bta6' ? utenza.impegnata : utenza.potenza,
                consume: consumo,
                resident: false,
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
                        {ref:"ppe", quote:'QEV'},
                        {ref:"dispbt", quote:'QEF'},
                        {ref:"uc6",quote:"QTP"}
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
                        td: [],
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
                        {ref:"Energia Reattiva (tra il 33 % ed il 75 %) - F1", quote:'QTV', index:"fix",value: 118 * 0.01046 },
                        {ref:"Energia Reattiva (tra il 33 % ed il 75 %) - F2", quote:'QTV', index:"fix",value: 97 * 0.01046 },
                    ]
                }
            }
        }])
        console.log(generateData[0].response)
         return generateData[0].response
    } catch (error) {
        console.log(error)
    }
   
}

const BusinessPowerUI = () => {
   let orderCardsPowerBusiness = sortBusinessPower() 
   return orderCardsPowerBusiness
}

export default BusinessPowerUI