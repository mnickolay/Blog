import React, { useEffect, useState } from "react";
import {
	getFirestore,
	collection,
	getDocs,
	DocumentData,
	query,
	orderBy,
	Timestamp,
} from "firebase/firestore";
import css from "./index.module.scss";
import { Search } from "./Search";
import { IPostMinified } from "../common/IPost";
import { useHistory } from "react-router";

export function Home() {
	const history = useHistory();
	const [posts, setPosts] = useState<IPostMinified[]>();
	const [mostRecent, setMostRecent] = useState<IPostMinified>();
	const db = getFirestore();

	const queryHome = async (): Promise<DocumentData[]> => {
		const arr: DocumentData[] = [];
		const resQuery = query(collection(db, "postsMinified"), orderBy("date", "asc"));
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
		queryHome().then((res) => setPosts(res as unknown as IPostMinified[]));
	}, []);

	useEffect(() => {
		setMostRecent(posts?.length ? posts[0] : undefined);
	}, [posts]);

	const directToPost = (id: number) => history.push(`/post/${id}`);

	return (
		<div className={css.home}>
			<div className={css.mostRecentContainer}>
				{mostRecent ? (
					<div onClick={() => directToPost(mostRecent.id)} className={css.mostRecentBody}>
						<div className={css.imageContainer}>
							<img
								className={css.image}
								src="https://images.unsplash.com/photo-1633678861611-858fc0041aa3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
							/>
						</div>
						<div className={css.bodyContainer}>
							<div className={css.mostRecentText}>Most recent</div>
							<div className={css.nameDate}>
								<div className={css.name}>{mostRecent.name}</div>
								<div className={css.date}>{mostRecent.date}</div>
							</div>
							<div className={css.keywords}>{mostRecent.keywords.join(", ")}</div>
						</div>
					</div>
				) : (
					<div className={css.loading}>Loading...</div>
				)}
			</div>
			<div className={css.searchContainer}>
				<Search posts={posts} />
			</div>
		</div>
	);
}
