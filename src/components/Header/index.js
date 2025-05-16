
const Header = (a) => {
 
    //const AccountCircle = `<svg height="24" viewBox="0 0 24 24" width="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="gray"/></svg>` 
    const LogoutIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>`
    return `<header class="Header">
    <img class="logo" src="./dist/img/people.jpg"/>
    <span class="header-logo">People</span>
    <span id="settingsHeader"></span>
    <span id="Utente"><small>${a ? a.displayName : '' }</small></span>
    <span id="logout">${LogoutIcon}</span>
    </header>`
}

export default Header

