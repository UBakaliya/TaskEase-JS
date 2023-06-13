import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { auth } from '../firebaseConfig.js';

auth.onAuthStateChanged((user) => {
	if (user)
		window.location.href = "tasks";
});

const login = document.getElementById("login");
const errorDisplay = document.getElementById("error-message");

login.addEventListener('submit', (e) => {
	e.preventDefault();
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			errorDisplay.className = "text-success text-center"
			errorDisplay.innerText = "You have successfully LOGGED IN!!!";
			window.location.href = 'tasks';
		}).catch((error) => {
			console.log(error.message);
			errorDisplay.innerText = "Your email or password are incorrect!!!";
		});
});
