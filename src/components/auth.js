import App from '../components/App';
import firebase from 'firebase/app'
import { NewUT, RenderNewUT, startNewUT } from './vendors/newUT';
import { RenderContent, startConfigurator } from './vendors/configurator';


export const isAuth = (user) => {
 const CB = document.querySelector('.CB')   
 if(user){
    let utenze = JSON.parse(localStorage.getItem('utenze'))
    if(utenze){
      CB.innerHTML = App() 
    }else{
      CB.innerHTML = App()
      let newUt = new NewUT()
      newUt.contentBox(RenderContent())
      newUt.open()
      startConfigurator()
    }
  }
  else{
    let utenza = JSON.parse(localStorage.getItem('utenza'))
    if(utenza){
        CB.innerHTML = App()
          if(!navigator.onLine){
           console.log('off line')   
          } 
    }else{
        CB.innerHTML = App() 
        let newUt = new NewUT()
        newUt.contentBox(RenderContent())
        newUt.open()
        startConfigurator()               
        }
    }
  const logout = document.getElementById('logout')
  logout.addEventListener('click', ()=> {
      signOut()
  })
}//fine const

export const signIn = () => { 
  return `
    <form id="formLogin" >
    <div class="header-logo">KILOWATT</div>
    <label><span>email</span><input type="email" id="txtEmail"></label>
    <label><span>pass</span><input type="password" id="txtPassword"></label>
    <button id="btnLogin" class="Sign-button Access-btn">Accedi</button>
    </form>
    `
  }

export const registerUser = () => { 
  return `
    <form id="formLogin" >
    <div class="header-logo">KILOWATT</div>
    <label><span>Nome</span><input type="text" id="txtDisplayName" autocomplete="off"></label>
    <label><span>email</span><input type="email" id="txtEmail" autocomplete="off"></label>
    <label><span>pass</span><input type="password" id="txtPassword" ></label>
    <button id="btnLogin" class="Sign-button Access-btn">Registra</button>
    </form>
    `}

export const signOut = () =>{
    firebase.auth().signOut()
    .then(function(){
      //localStorage.removeItem('utenze')
      //localStorage.removeItem('utenzaPro')
      location.reload()
    })
    .catch(function(error){
      console.log(error)})
}  

