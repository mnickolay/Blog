import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, DocumentData, query } from "firebase/firestore";

initializeApp({
	apiKey: "AIzaSyBhw-LJ7nVCLyq7ofN48_OK3AydrKH8vNg",
	authDomain: "blog-f03d7.firebaseapp.com",
	projectId: "blog-f03d7",
	storageBucket: "blog-f03d7.appspot.com",
	messagingSenderId: "965720024585",
	appId: "1:965720024585:web:9b03575270882016753ad8",
});

const db = getFirestore();

function App() {
	const [data, setData] = useState<{}[]>();
	const queryStuff = async (): Promise<DocumentData[]> => {
		const arr: DocumentData[] = [];
		const resQuery = query(collection(db, "posts"));
		await getDocs(resQuery).then((snapshot) => {
			snapshot.docs.map((doc) => arr.push(doc.data()));
		});
		return arr;
	};

	useEffect(() => {
		queryStuff().then((res) => setData(res));
	}, []);

	console.log(data);

	return <div></div>;
}

export default App;
