import firebase from "firebase";
import { initializeApp } from "@firebase/firestore";
import "firebase/firestore";

const config = {
	apiKey: "AIzaSyBhw-LJ7nVCLyq7ofN48_OK3AydrKH8vNg",
	authDomain: "blog-f03d7.firebaseapp.com",
	projectId: "blog-f03d7",
	storageBucket: "blog-f03d7.appspot.com",
	messagingSenderId: "965720024585",
	appId: "1:965720024585:web:9b03575270882016753ad8",
};

initializeApp(config);

export default firebase;
