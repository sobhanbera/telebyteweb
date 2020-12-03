// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyB7qM0l01_sQoVSSmD40ThPwY3JBQZTbkc",
	authDomain: "telebyte-web.firebaseapp.com",
	databaseURL: "https://telebyte-web.firebaseio.com",
	projectId: "telebyte-web",
	storageBucket: "telebyte-web.appspot.com",
	messagingSenderId: "370499416966",
	appId: "1:370499416966:web:bbe55f9178cb0b0247f207",
	measurementId: "G-M9LF8B7N9S",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
