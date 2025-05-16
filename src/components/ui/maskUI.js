const IconGax = `<svg 
width="44" height="44"
viewBox="0 0 44 44">
    <path fill="transparent" stroke="white" opacity=".6" stroke-width="2" 
    d="m12 38 c 0 0 12 12 24 0 c 2 -3 10 -10 -12 -34 c -4 13 -20 24 -12 34 
    m5 -1 c 0 0 6 6 12 0 c 1 -1.5  5 -5 -6 -17 c -2 6.5 -10 12 -6 17"/>
</svg>`
const IconLux = `<svg 
width="80" height="84"
viewBox="0 0 44 44">
    <path fill="transparent" stroke="#cb7a2d" stroke-width="2" opacity=".6"
    d="m10 16 a 1 1 0 0 1 30 0 c 0 0 0 5 -5 11 l -3 11 h -14 l -3 -11 c 0 0 -5 -5 -5 -11z
       m8 25 h 14
       m-9 -19 v 15 m 4 -15 v 15
       m -6 -21 a 1 1 0 0 1 8 0 a 1 1 0 0 1 -8 0
       m-1 28 h 10"/>
</svg>`
export const mascheraPublic = (types,name,service,tipo,consumo,consumi,potenza,fatt,dataCreated,impegnata) => {
   const consumoEnergia = (consumi[0] + consumi[1] + consumi[2] + consumi[3] + consumi[4] + consumi[5])

   let f = fatt
   let fascia = ['F0','F1','F2','F3','F23'] 
   let imp = ''
   let fas = ''
   let type
  
   if(consumo === 'monorario'){
      fas = `<th>${fascia[0]}</th>`
      consumi = `<td>${consumi[0]}</td>`
   }
   if(consumo === 'biorario'){
      fas = `<th>${fascia[1]}</th><th>${fascia[4]}</th>`
      consumi = `<td>${consumi[4]}</td><td>${consumi[5]}</td>`   
   }
   if(consumo === 'triorario'){
      fas = `<th>${fascia[1]}</th><th>${fascia[2]}</th><th>${fascia[3]}</th>`
      consumi = `<td>${consumi[1]}</td><td>${consumi[2]}</td><td>${consumi[3]}</td>`   
   }
   
let destro
let prelievo
let consumis,pre,pott,img,perte,anca,utt
   if(types === 'energia'){
      type = 'Energia Elettrica'
   
      utt = `<div id="rsp_Utenza" class="rspPower">${IconLux}<div><span>${name}</span><span>${type}</span></div></div>`
      if(tipo === 'tdr'){
         destro = `<p>Tariffa Rete:</p><p>TD Residente</p>`
      }else{
         destro = `<p>Tariffa Rete:</p><p>TD No Residente</p>`
      }

      if(tipo === 'bta1' || tipo === 'bta2' || tipo === 'bta3' || tipo === 'bta4' || tipo === 'bta5' || tipo === 'bta6'){
         destro = `<p>Tariffa Rete:</p><p>${tipo.toUpperCase()}</p>`
      }
      prelievo = `<p>Tipo Prelievo:</p><p>${consumo}</p>`
      pre = `<p>Consumo:</p><p>${consumoEnergia} <small>kw\/h</small></p>`
      consumis = `<table id="tablePower">
      <tr><th><small>Fascia</small></th>${fas}<tr>
      <tr><td><small>Kw</small></td>${consumi}</tr>
      </table>`
      pott = `<span><p>Potenza disponibile:</p><p>${potenza} kw</p></span>`
      if(fatt === 1) perte = `<p>Fatturazione:</p><p>Mensile</p>`
      else if(fatt === 2) perte = `<p>Fatturazione:</p><p>Bimestrale</p>`
      anca = `<p>Utenza creata il:</p><p>${dataCreated}</p>`
      if(impegnata > 0){
      imp = `<span><p>Potenza Impegnata:</p><p>${impegnata} kw</p></span>`
   }else{
      imp = ''
   }
   }
   if(types === 'gas'){
      let t = tipo,ambito
      type = 'Gas Metano'
      if(t === 'nor'){ambito = 'Nord Orientale'}
      if(t === 'noc'){ambito = 'Nord Occidentale'}
      img = `<img src="./dist/img/g30.png">`
      utt = `<div id="rsp_Utenza" class="rspGas"><span>${name}</span><span>${IconGax}</span></div>`
      destro = `<p>Ambito Tariffa:</p><p>${ambito}</p>`
      prelievo = `<p>PCS:</p><p>${consumo}</p>`
      pre = `<p>Classe Contatore:</p><p>G${potenza}</p>`
      consumis = `<p>Progressivo :</p><p>${impegnata[0]} mc</p>`
      pott = `<span><p>Consumo:</p><p>${impegnata[1]} mc</p></span>
      <span><table id="tableGas">
      <tr><th><small>Scaglione</small></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><tr>
      <tr><td><small>Smc</small></td>
      <td>${consumi[1] > 0 ? consumi[1] : ''}</td>
      <td>${consumi[2] > 0 ? consumi[2] : ''}</td>
      <td>${consumi[3] > 0 ? consumi[3] : ''}</td>
      <td>${consumi[4] > 0 ? consumi[4] : ''}</td>
      <td>${consumi[5] > 0 ? consumi[5] : ''}</td>
      <td>${consumi[6] > 0 ? consumi[6] : ''}</td>
      </tr>
      </table></span>`
      if(fatt === 1){
      perte = `<p>Fatturazione:</p><p>Mensile</p>`   
      }else if(fatt === 2){
      perte = `<p>Fatturazione:</p><p>Bimestrale</p>`  
      } 
      anca = `<p>Utenza creata il:</p><p>${dataCreated}</p>`
      imp = ''
   }


   return `<div id="renderStoragePublic">
   ${utt}
   <div id="rsp_Content">
   <span><p>Tipologia d'uso:</p><p>${service === 'casa' ? 'Domestico' : service === 'azienda' ? 'Business' : ''}</p></span>
   <span>${destro}</span>
   <span>${prelievo}</span>
   <span>${pre}</span>
   <span>${consumis}</span>
   ${pott}
   ${imp}
   <span>${perte}</span>
   <span>${anca}</span>
   </div> 
   `
}

