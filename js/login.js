import{auth}from "../js/firebase.mjs";
import{signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js"
function signIn(){
  let email=document.getElementById('inputEmail4').value;
  let password=document.getElementById('inputPassword4').value;
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    alert('signed in!')
    window.location.href='../HTML pages/dashboard.html';
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}
window.signIn=signIn;