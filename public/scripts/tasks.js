import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { auth, db } from "../firebaseConfig.js"

auth.onAuthStateChanged(async (user) => {
	if (!user) {
		console.log("CAN'T ACCESS THE PAGE");
		window.location.href = "login";
	} else {
		const username = document.getElementById("user-name");
		const docRef = doc(db, user.uid, "info");
		const docSnap = await getDoc(docRef);

		if (docSnap.exists())
			username.textContent = docSnap.data().displayName;

		getTasks(user.uid);
	}
})

// read
const getTasks = async (userID) => {
	const docRef = doc(db, userID, "info");
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		for (let i = 0; i < docSnap.data().tasks.length; i++)
			displayTask(docSnap.data().tasks[i], i)
	} else
		console.log("No such document!");
}

// create
const addTask = async (uid) => {
	const taskInput = document.getElementById("taskName");
	const docRef = doc(db, uid, "info");
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		displayTask(taskInput.value, docSnap.data().tasks.length);

		const tempTasks = docSnap.data().tasks;
		tempTasks.push(taskInput.value);

		updateDoc(docRef, {
			tasks: tempTasks
		}).then(() => {
			taskInput.value = "";
		}).catch((e) => {
			console.log(e.message);
		});

	} else
		console.log("No such document!");
}

// delete
const deleteTask = async (userId, taskId) => {
	const docRef = doc(db, userId, "info");
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		const array = docSnap.data().tasks;

		if (docSnap.data().tasks.length === 1)
			updateDoc(docRef, { tasks: [] })

		else {
			array.splice(taskId, 1);
			updateDoc(docRef, { tasks: array })
		}

	} else
		console.log("No such document!");
}

// update 
const updateTask = async (userId, taskId, updateTaskValue) => {
	const docRef = doc(db, userId, "info");
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		let array = docSnap.data().tasks;
		array[taskId] = updateTaskValue;
		updateDoc(docRef, { tasks: array })
	} else {
		console.log("No such document!");
	}
}

// display user task on the page
const displayTask = (taskValue, tasksId) => {
	// Create the container element with class "container mt-5" and id "tasks"
	let textSpan = document.createElement("span");
	let buttonsDiv = document.createElement("div");
	let editButton = document.createElement("button");
	let container = document.createElement("div");
	let saveBtn = document.createElement("button");
	let deleteButton = document.createElement("button");
	container.id = tasksId;
	container.className = "task-box container mt-3";

	saveBtn.type = "button";
	saveBtn.className = "btn btn-secondary mb-2";
	saveBtn.textContent = "Save"
	saveBtn.style.display = 'none';
	buttonsDiv.appendChild(saveBtn);

	editButton.addEventListener('click', (e) => {
		e.preventDefault();
		textSpan.contentEditable = true;
		editButton.style.display = 'none';
		saveBtn.style.display = 'inline';
	})

	saveBtn.addEventListener('click', (e) => {
		e.preventDefault();
		auth.onAuthStateChanged((user) => {
			updateTask(user.uid, +container.id, textSpan.textContent)
		})
		textSpan.contentEditable = false;
		saveBtn.style.display = 'none';
		editButton.style.display = 'inline';
	})

	deleteButton.addEventListener('click', (e) => {
		e.preventDefault();
		let idx = +container.id;
		container.remove();
		auth.onAuthStateChanged((user) => deleteTask(user.uid, idx));
		for (let i = 0; i < document.querySelectorAll('.task-box').length; i++) {
			document.querySelectorAll('.task-box')[i].id = i.toString();
		}
	})

	// Create the inner elements and append them to the container
	let row = document.createElement("div");
	row.className = "row justify-content-center";
	container.appendChild(row);

	let col = document.createElement("div");
	col.className = "col-lg-6";
	row.appendChild(col);

	let listGroup = document.createElement("div");
	listGroup.className = "list-group";
	col.appendChild(listGroup);

	let listGroupItem = document.createElement("div");
	listGroupItem.className = "list-group-item";
	listGroup.appendChild(listGroupItem);

	let innerRow = document.createElement("div");
	innerRow.className = "row";
	listGroupItem.appendChild(innerRow);

	let colMd9 = document.createElement("div");
	colMd9.className = "col-md-9";
	innerRow.appendChild(colMd9);

	textSpan.textContent = taskValue;

	colMd9.appendChild(textSpan);

	let dMdNone = document.createElement("div");
	dMdNone.className = "d-md-none";
	colMd9.appendChild(dMdNone);

	let hr = document.createElement("hr");
	dMdNone.appendChild(hr);

	let colMd3 = document.createElement("div");
	colMd3.className = "col-md-3";
	innerRow.appendChild(colMd3);

	let dFlexCol = document.createElement("div");
	dFlexCol.className = "d-flex flex-column";
	colMd3.appendChild(dFlexCol);

	buttonsDiv.className = "d-flex flex-column";
	dFlexCol.appendChild(buttonsDiv);

	editButton.type = "button";
	editButton.className = "btn btn-info mb-2";
	editButton.innerHTML = "&#9998;";
	buttonsDiv.appendChild(editButton);

	deleteButton.type = "button";
	deleteButton.className = "btn btn-danger";
	let deleteIcon = document.createElement("i");
	deleteIcon.className = "fa fa-trash-o";
	deleteButton.appendChild(deleteIcon);
	buttonsDiv.appendChild(deleteButton);

	// Append the container to the document body or any desired parent element
	document.body.appendChild(container);
}

const taskForm = document.getElementById("task-form");

taskForm.addEventListener('submit', (e) => {
	e.preventDefault();
	auth.onAuthStateChanged((user) => addTask(user.uid))
})
