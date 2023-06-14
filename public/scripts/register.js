import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { auth, db } from '../firebaseConfig.js';

const addUserInfo = (userId, username, email) => {
	setDoc(doc(db, userId, "info"), {
		username: username,
		email: email,
		displayName: "My",
		// default tasks for every user that creates an account
		tasks: [
			"Write a thank-you letter to a friend or family member expressing your gratitude",
			"Plan a one-day itinerary for a visit to a historical site in your area",
			"Create a workout routine consisting of five exercises for strength training",
			"Research and write a brief summary of the benefits of meditation"
		]

	}).then(() => {
		window.location.href = "login";
	}).catch((error) => {
		console.error("Error writing document: ", error);
	});
}

document.querySelector("form").addEventListener("submit", (e) => {
	e.preventDefault();

	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const confirmPassword = document.getElementById("confirm-password").value;
	const username = document.getElementById("username").value;
	const error = document.getElementById("error-message");

	if (password !== confirmPassword) {
		error.innerText = "Make sure your passwords are entered correctly!!!";
		return;
	}

	let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/;

	if (pattern.test(password.value)) {
		error.innerText = "You entered invalid password. Try again!!!";
		return;
	}

	createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
		const user = userCredential.user;
		error.className = "text-success text-center"
		error.innerText = "You have successfully SIGNED UP!!!";
		addUserInfo(user.uid, username, email);

	}).catch((e) => {
		error.innerText = "You already have an account!!!";
		console.log(e.message);
	});
})
