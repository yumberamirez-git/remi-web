//       registerPage.addEventListener('click', e => {
//         let caption = document.querySelector('.captionSection')
//         let sig = document.querySelector('.Sign')
//         caption.style.backgroundImage = 'none'
//         sig.style.display = 'none'
//         caption.innerHTML = registerUser()
//         btnLogin.addEventListener('click', e => {
//             e.preventDefault()
//             let email = txtEmail.value
//             let password = txtPassword.value
//             let displayNames = txtDisplayName.value
//             let utente = firebase.auth().currentUser

//             firebase.auth().createUserWithEmailAndPassword(email, password)
//             .then(function(user){
//                 user.user.updateProfile({
//                     displayName: displayNames,
//                     emailVerified: false
//                 })
//                user.user.sendEmailVerification()
//                 .then(function(){
//                 firebase.auth().signOut()
//                 let heo = document.createElement('div')  
//                 heo.classList.add('modal')  
//                 heo.innerHTML = `<div class="introStart"><span><h4>Abbiamo inviato una email di verifica</h4><img src="./dist/img/emailverified.png"></span></div>`
//                 document.body.appendChild(heo)

//                 setTimeout( function(){
//                     window.location.href = 'index.html'
//                     heo.remove()
//                     },2000)   
//             })

//             })
//             .catch(function(error){
//                 password = ''
//                 let not = new Notifica()
//                 let errCode = error.code
//                 not.errorContent(codesError(errCode))
//             })        
//         })//fine del event btnlogin
//       })//fine del event registerUTENTE
//     }
//     if(e.target.innerText === 'ESCI'){ 
//     signOut()
//     } 