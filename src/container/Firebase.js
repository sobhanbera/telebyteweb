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

var firebaseConfig = {
	apiKey: "AIzaSyDHvn6M0Q2m0qGmfnJXIdZKA4CCH9XzPB8",
	authDomain: "telebyte-new.firebaseapp.com",
	databaseURL: "https://telebyte-new-default-rtdb.firebaseio.com",
	projectId: "telebyte-new",
	storageBucket: "telebyte-new.appspot.com",
	messagingSenderId: "994660272696",
	appId: "1:994660272696:web:dfc9e8ad3b17686b3ab4cd",
	measurementId: "G-G6VM6116PM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;
