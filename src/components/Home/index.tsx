import React, { useEffect, useState } from "react";
import {
	getFirestore,
	collection,
	getDocs,
	DocumentData,
	query,
	limit,
	orderBy,
	Timestamp,
} from "firebase/firestore";
import css from "./index.module.scss";

interface IPost {
	id: number;
	name: string;
	date: string;
	keywords: string[];
	body: string[];
	bodyQuotes: string[];
	image?: string;
	description: string;
}

export function Home() {
	const [data, setData] = useState<IPost[]>();
	const db = getFirestore();

	const queryHome = async (): Promise<DocumentData[]> => {
		const arr: DocumentData[] = [];
		const resQuery = query(collection(db, "posts"), orderBy("date", "desc"), limit(1));
		await getDocs(resQuery).then((snapshot) => {
			snapshot.docs.map((doc) => {
				const obj = doc.data();
				const date = new Timestamp(obj.date.seconds, obj.date.nanoseconds).toDate();
				const newObj = {
					...obj,
					date: new Date(date).toLocaleDateString(),
				};
				return arr.push(newObj);
			});
		});
		return arr;
	};

	useEffect(() => {
		queryHome().then((res) => setData(res as unknown as IPost[]));
	}, []);

	console.log(data);

	return (
		<div className={css.home}>
			<div className={css.mostRecent}>
				<div className={css.imageContainer}>
					<img
						className={css.image}
						src="https://images.unsplash.com/photo-1633678861611-858fc0041aa3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
					/>
				</div>
				<div className={css.bodyContainer}>
					{data?.length ? (
						<div className={css.bodyPadding}>
							<div className={css.name}>{data![0].name}</div>
							<div className={css.date}>{data![0].date}</div>
							<div className={css.keywords}>{data![0].keywords}</div>
							<div className={css.description}>{data![0].description}</div>
						</div>
					) : null}
				</div>
			</div>
			<div className={css.nav}></div>
		</div>
	);
}
