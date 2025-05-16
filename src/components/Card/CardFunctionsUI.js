const ReportUI = require("./ReportUI");
const UtenzaUI = require("./UtenzaUI");

class CardFunctions extends HTMLElement {
    constructor(data){
        super()

        this.classList.add('cards-functions-container');
        this.response = data.data.data[0]
        this.iconButton  = `<svg class="file-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 9L12 14L17 9" stroke="#ed6c05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 13L12 18L17 13" stroke="#ed6c05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
        
        this.buttonCloseMenu = document.createElement('button')
        this.buttonCloseMenu.innerHTML = this.iconButton

        this.buttonCloseMenu.addEventListener('click', (event) => {
            const button = event.currentTarget
            if(button.getAttribute('data-click') === 'report'){
                this.functionUtenzaUI.style.display = 'flex'
                this.buttonListenerReport.hidden = false
               
            }
            if(button.getAttribute('data-click') === 'utenza'){
                this.functionReportUI.style.display = 'flex'
                this.buttonListenerUtenza.hidden = false
            }
            if(button.getAttribute('data-click') === 'bid'){

            }
            document.querySelector('.cards-functions-container-content').innerHTML = ''

        })
        
        this.reverseMenu = document.createElement('div')
        this.reverseMenu.classList.add('cards-functions-container-menu')
        this.reverseMenu.innerHTML = `<span></span>`
        this.reverseMenu.appendChild(this.buttonCloseMenu)
        
        this.buttonListenerReport = document.createElement('button')
        this.buttonListenerReport.innerHTML = this.iconButton
        this.buttonListenerReport.addEventListener('click', () => {
            this.functionUtenzaUI.style.display = 'none'
            this.functionBidUI.hidden = true
            this.buttonListenerReport.hidden = true
            let report = new ReportUI()
            this.buttonCloseMenu.dataset.click = 'report'
            document.querySelector('.cards-functions-container-content').innerHTML = report.renderUI(this.response.result)
            document.querySelector('.cards-functions-container').appendChild(this.reverseMenu)
        })

        this.buttonListenerUtenza = document.createElement('button')
        this.buttonListenerUtenza.innerHTML = this.iconButton
        this.buttonListenerUtenza.addEventListener('click', () => {
            this.functionReportUI.style.display = 'none'
            this.buttonCloseMenu.dataset.click = 'utenza'
            this.buttonListenerUtenza.hidden = true
            let utenza = new UtenzaUI()
            document.querySelector('.cards-functions-container-content').innerHTML = utenza.render()
            document.querySelector('.cards-functions-container').appendChild(this.reverseMenu)
        })

        this.buttonListenerBid = document.createElement('button')
        this.buttonListenerBid.innerHTML = this.iconButton
        this.buttonListenerBid.addEventListener('click', () => {
            //console.log(event.target.id)
             this.innerHTML = `<div class="cards-functions-container-content">sei qui in offerta</div>`
             document.querySelector('.cards-functions-container').appendChild(this.reverseMenu)
        })

        // construct items 
        this.functionReportUI = document.createElement('div')
        this.functionReportUI.classList.add('cards-functions-container-item')
        this.functionReportIcon = `<svg class="file-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 2C5.44772 2 5 2.44772 5 3V21C5 21.5523 5.44772 22 6 22H18C18.5523 22 19 21.5523 19 21V8.82843C19 8.29799 18.7893 7.78929 18.4142 7.41421L13.5858 2.58579C13.2107 2.21071 12.702 2 12.1716 2H6Z" fill="#E0E0E0"/>
                                    <path d="M13 3.5V8C13 8.55228 13.4477 9 14 9H18.5L13 3.5Z" fill="#BDBDBD"/>
                                    <rect x="7" y="11" width="10" height="1.5" rx="0.75" fill="#A0A0A0"/>
                                    <rect x="7" y="14" width="8" height="1.5" rx="0.75" fill="#A0A0A0"/>
                                    <rect x="7" y="17" width="5" height="1.5" rx="0.75" fill="#A0A0A0"/>
                                </svg>`

        this.functionReportUI.innerHTML = `<span>${this.functionReportIcon}</span><span>Riepilogo dei costi</span>`
        this.functionReportUI.appendChild(this.buttonListenerReport)

        this.functionUtenzaUI = document.createElement('div')
        this.functionUtenzaUI.classList.add('cards-functions-container-item')
        this.functionUtenzaIcon = `<svg class="file-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="3" width="18" height="18" rx="3" fill="#fff" stroke="#E0E0E0" stroke-width="1"/>
                                    <rect x="6.5" y="6.5" width="11" height="5" rx="1" fill="#E0E0E0" stroke="#A0A0A0" stroke-width="1"/>
                                    <text x="12" y="10" text-anchor="middle" font-size="4.5" font-family="Arial" fill="#A0A0A0">000</text>
                                    </svg>`
        this.functionUtenzaUI.innerHTML = `<span>${this.functionUtenzaIcon}</span><span>Dettagli Utenza</span>`
        this.functionUtenzaUI.appendChild(this.buttonListenerUtenza)


        this.functionBidUI = document.createElement('div')
        this.functionBidUI.classList.add('cards-functions-container-item')
        this.functionBidIcon = `<svg class="file-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 2C5.44772 2 5 2.44772 5 3V21C5 21.5523 5.44772 22 6 22H18C18.5523 22 19 21.5523 19 21V8.82843C19 8.29799 18.7893 7.78929 18.4142 7.41421L13.5858 2.58579C13.2107 2.21071 12.702 2 12.1716 2H6Z" fill="#E0E0E0"/>
                                    <path d="M13 3.5V8C13 8.55228 13.4477 9 14 9H18.5L13 3.5Z" fill="#BDBDBD"/>
                                     <circle cx="9" cy="10" r="2.5" fill="none" stroke="#A0A0A0" />
                                    <rect x="7" y="15" width="10" height="1.5" rx="0.75" fill="#A0A0A0"/>
                                    <rect x="7" y="18" width="8" height="1.5" rx="0.75" fill="#A0A0A0"/>
                                   
                                </svg>`
        this.functionBidUI.innerHTML = `<span>${this.functionBidIcon}</span><span>Dettagli Offerta</span>`
        this.functionBidUI.appendChild(this.buttonListenerBid)
    }


    
    connectedCallback(){
        const content = document.createElement('div')
        content.classList.add('cards-functions-container-content')
        const fragment = document.createDocumentFragment();
        fragment.appendChild(this.functionReportUI)
        fragment.appendChild(this.functionUtenzaUI)
        // fragment.appendChild(this.functionBidUI)
        fragment.appendChild(content)
        this.appendChild(fragment)
       
    }
}
customElements.define('cards-functions-ui', CardFunctions);

module.exports = CardFunctions