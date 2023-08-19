import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { db } from "./firebase.mjs";

async function a() {
    try {
        const colRef = collection(db, "uss");
        const snapshot = await getDocs(colRef);
        const data = [];

        snapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        });

        console.log(data);

        // Display data in an HTML element with ID 'f'
        const fElement = document.getElementById('f');
        fElement.innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

a();
