import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, DocumentData, query } from "firebase/firestore";

export function Post() {
	const [data, setData] = useState<{}[]>();
	const db = getFirestore();
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
	return <>Post</>;
}
