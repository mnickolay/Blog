import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, DocumentData, query, where } from "firebase/firestore";
import { useParams } from "react-router";

export function Post() {
	const postId: { id: string } = useParams();
	const [post, setPost] = useState<{}[]>();
	const db = getFirestore();

	const queryPost = async (): Promise<DocumentData[]> => {
		const arr: DocumentData[] = [];
		const resQuery = query(collection(db, "posts"), where("id", "==", parseInt(postId.id)));
		await getDocs(resQuery).then((snapshot) => {
			snapshot.docs.map((doc) => arr.push(doc.data()));
		});
		return arr;
	};

	useEffect(() => {
		queryPost().then((res) => setPost(res));
	}, []);

	console.log(post);
	return <>Post</>;
}
