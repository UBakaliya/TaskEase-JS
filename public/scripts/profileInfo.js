import { auth, db } from "../firebaseConfig.js"
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const username = document.getElementById("username");
const email = document.getElementById("email");
const editBtn = document.getElementById("display-name-edit-btn");
const displayNameInput = document.getElementById("display-name-input");

auth.onAuthStateChanged(async (user) => {
    if (!user) window.location.href = "login";
    const docRef = doc(db, user.uid, "info");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        displayNameInput.value = docSnap.data().displayName;
        username.textContent = docSnap.data().username;
        email.textContent = user.email;
    }
    else
        console.log("Can't update user name");
})

const updateDisplayNameInDB = async (uid) => {
    const docRef = doc(db, uid, "info");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists())
        updateDoc(docRef, { displayName: displayNameInput.value })
}

editBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (editBtn.textContent === "SAVE") {
        let inputText = displayNameInput.value;
        inputText = inputText.replaceAll(" ", "");
        if (inputText === "") {
            return;
        }

        auth.onAuthStateChanged((user) => {
            updateDisplayNameInDB(user.uid);
        })

        displayNameInput.disabled = true;
        editBtn.className = "btn btn-info float-lg-right"
        editBtn.textContent = "EDIT"
        displayNameInput.className = "d-inline font-weight-normal border-0  mb-2";
    }
    else {
        editBtn.textContent = "SAVE"
        displayNameInput.className = "d-inline font-weight-normal border-1  mb-2";
        editBtn.className = "btn btn-secondary float-lg-right"
        displayNameInput.disabled = false;
    }
})

document.getElementById("return-to-main-page").addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "tasks";
})