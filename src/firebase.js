import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyCSc_KGryB-CzcpS4I3QNkOFpeSYbJvcEw",
	authDomain: "clone-53789.firebaseapp.com",
	projectId: "clone-53789",
	storageBucket: "clone-53789.appspot.com",
	messagingSenderId: "99151113960",
	appId: "1:99151113960:web:6f907fdafe8a4f04c4e35d",
};

const app = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app();

const db = app.firestore();
export default db;
