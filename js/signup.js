import {auth,db} from './firebase.mjs'
import { createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { addDoc,collection} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

let btn=document.getElementById('sign__Up')
btn.addEventListener('click',()=>{
  let email=document.getElementById('inputEmail4').value;
  let password=document.getElementById('inputPassword4').value;
  let firstName = document.getElementById("fname").value;
  let lastName = document.getElementById("lname").value;
  localStorage.setItem('Name:',firstName)
  // let pic=document.getElementById('file').files[0];

  createUserWithEmailAndPassword(auth, email, password) 
  .then(async(userCredential) => {
    // Signed in 
    const user = userCredential.user;
    try {
      const docRef = await addDoc(collection(db, "blogUsers"), {
       fname:firstName,
       lName:lastName,
       email:email
      });
      console.log("Document written with ID: ", docRef.id);
      let repeatPassword = document.getElementById('repeatPassword').value;

      // Add validation checks
      if (!isEmailValid(email)) {
        alert('Please enter a valid email address.');
        return;
      }
    
      if (!isPasswordValid(password)) {
        alert('Password must be at least 8 characters long and include both uppercase and lowercase letters.');
        return;
      }
    
      if (password !== repeatPassword) {
        alert('Passwords do not match.');
        return;
      }
    } 
      catch (e) {
      console.error("Error adding document: ", e);
    }
    window.location.href='../HTML pages/login.html'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // console.log(errorCode, errorMessage);
    switch (errorCode) {
      case 'auth/weak-password':
        alert('Password is too weak. Choose a stronger password.');
        break;
      case 'auth/email-already-in-use':
        alert('The email address is already in use by another account.');
        break;
      default:
        alert(errorMessage);
    }
  });
});

// Helper function to validate email format
function isEmailValid(email) {
return /\S+@\S+\.\S+/.test(email);
}

// Helper function to validate password format
function isPasswordValid(password) {
return /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
}

 