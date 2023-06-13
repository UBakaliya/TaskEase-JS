import { updatePassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { auth } from "../firebaseConfig.js"

auth.onAuthStateChanged((user) => {
  if (!user) window.location.href = "login";
})

const resetPassInput = document.getElementById("reset-password-input");
const resetPassBtn = document.getElementById("reset-password-btn");
const savePass = document.getElementById("save-pass");
const errOrSucc = document.getElementById("error-succ-display")
const cancel = document.getElementById("cancel");

resetPassBtn.addEventListener('click', (e) => {
  e.preventDefault();
  resetPassBtn.style.display = 'none';
  savePass.style.display = 'inline';
  cancel.style.display = 'inline';
  resetPassInput.disabled = false;
  resetPassInput.placeholder = "Enter a new password";
});

cancel.addEventListener('click', (e) => {
  e.preventDefault();
  savePass.style.display = 'none';
  cancel.style.display = 'none';
  resetPassBtn.style.display = 'inline';
  resetPassInput.placeholder = "••••••••••••••••";
});

savePass.addEventListener('click', (e) => {
  e.preventDefault();
  let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/;
  if (!pattern.test(resetPassInput.value)) {
    errOrSucc.innerText = "Please enter an appropriate password!!!";
    return;
  }

  auth.onAuthStateChanged((user) => {
    console.log(user.uid)
    updatePassword(user, resetPassInput.value)
      .then(() => {
        console.log("Update successful")
        errOrSucc.innerText = "Password Updated Successfully";
        errOrSucc.className = "text-center mt-3 text-success"
        resetPassBtn.style.display = 'inline';
        savePass.style.display = 'none';
        resetPassInput.disabled = true;
        cancel.style.display = 'none';
        resetPassInput.placeholder = "••••••••••••••••";
      }).catch((error) => {
        console.log(error.message);
        errOrSucc.innerText = "Please enter an appropriate password!!!";
        console.log("An error ocurred")
      });
  });

});
