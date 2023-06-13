import { signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { auth } from "../firebaseConfig.js"

document.getElementById("logout").addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('Sign-out successful');
    }).catch((error) => {
        // An error happened.
        console.log("Can't logout!!!");
    });
})
