import Header from '../Header'
import readStorage from '../Storage/readStorage'
import firebase from 'firebase/app'


const App = () => { 
const user = firebase.auth().currentUser 
return `${user ? Header(user) : Header()}
<section class="app-content">
${readStorage()}
</section>`
}

export default App
