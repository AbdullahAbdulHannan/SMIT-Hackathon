import {db,auth} from "../js/firebase.mjs"
import {signOut} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js"
import { collection, addDoc,getDocs,updateDoc,deleteDoc,doc ,serverTimestamp} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js"; 
let btn=document.getElementById('publish');
// document.getElementById('userName').innerHTML=localStorage.getItem('Name');
document.getElementById('logout').addEventListener('click',()=>
{

    signOut(auth).then(() => {
        alert("Sign-out Successful!")
        window.location.href="../HTML pages/signup.html"
    }).catch((error) => {
        alert (error)
    });
})
btn.addEventListener('click',async()=>{
    let title=document.getElementById('titleInp');
    let post=document.getElementById('blogPost');
try {
    const docRef = await addDoc(collection(db, "uss"), {
    Title:title.value,
    Post:post.value,
    timestamp: serverTimestamp(),
  });
  console.log("Document written with ID: ", docRef.id);
  window.location.reload();
}
catch (e) {
  
  console.error("Error adding document: ", e);
}
});
async function del(id){
    await deleteDoc(doc(db, "uss", id));
    alert("Post Deleted!")
    window.location.reload;
}
window.del=del;
const querySnapshot = await getDocs(collection(db, "uss"));
const sortedDocs = querySnapshot.docs.sort((a, b) => {
    const timestampA = a.data().timestamp?.toDate();
    const timestampB = b.data().timestamp?.toDate();
    return timestampB - timestampA;
  });
  
  sortedDocs.forEach((doc) => {
    const timestamp = doc.data().timestamp;
    const jsDate = timestamp ? timestamp.toDate() : null;
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const dateString = jsDate ? dateFormatter.format(jsDate) : "Unknown Date";
    
    document.getElementById('blogDisp').innerHTML += `
      <div id="blogs">
        <div id="header">
          <img src="../Screenshot 2023-06-25 235028.png"  id="pic" alt="">
          <h5 class="title" style="padding-top:3%;">${doc.data().Title}</h5>
        </div>
        <p style="margin-left: 18%; color: rgb(186, 186, 186);">Abdullah ${dateString} </p>
        <div>
          <p style="padding-left:3%; padding-right:3%;" class="content">${doc.data().Post}</p>
        </div>
        <a class='links' onClick='del("${doc.id}")'>Delete</a><a class='links' onClick='updateBlog("${doc.id}")'>Edit</a>
      </div>
    `;
    console.log(doc.id, " => ", doc.data());
  });