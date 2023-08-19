import { auth } from "./firebase.mjs";
import {signOut} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js"
document.getElementById('logout').addEventListener('click',()=>
{

    signOut(auth).then(() => {
        alert("Sign-out Successful!")
        window.location.href="../HTML pages/signup.html"
    }).catch((error) => {
        alert (error)
    });
})
document.getElementById("updateProfile").addEventListener("click", () => {
  updatePassword();
});

async function updatePassword() {
  const oldPassword = document.querySelector(".form-control[placeholder='Old Password']").value;
  const newPassword = document.querySelector(".form-control[placeholder='New Password']").value;

  try {
    const user = auth.currentUser;

    // Reauthenticate the user with their old password
    const credential = auth.EmailAuthProvider.credential(user.email, oldPassword);
    await user.reauthenticateWithCredential(credential);

    // Update the user's password
    await user.updatePassword(newPassword);
    
    alert("Password updated successfully!");
  } catch (error) {
    console.error("Error updating password:", error.message);
    alert("Error updating password. Please check your input.");
  }
}
