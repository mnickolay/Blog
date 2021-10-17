import React, { useEffect, useState } from "react";
import {
	getFirestore,
	collection,
	getDocs,
	DocumentData,
	query,
	where,
	Timestamp,
} from "firebase/firestore";
import { useParams } from "react-router";
import css from "./index.module.scss";
import { IPost } from "../common/IPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";

export function Post() {
	const postId: { id: string } = useParams();
	const [post, setPost] = useState<IPost>();
	let textCount = 0;
	let quotesCount = 0;
	const db = getFirestore();

	const queryPost = async (): Promise<DocumentData[]> => {
		const arr: DocumentData[] = [];
		const resQuery = query(collection(db, "posts"), where("id", "==", parseInt(postId.id)));
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
		queryPost().then((res) => setPost(res[0] as unknown as IPost));
	}, []);

	console.log(post);
	return (
		<div className={css.postContainer}>
			{post ? (
				<div className={css.post}>
					<div className={css.imageContainer}>
						<div className={css.image}>
							<img
								className={css.image}
								src="https://images.unsplash.com/photo-1633678861611-858fc0041aa3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
							/>
						</div>
					</div>
					<div className={css.body}>
						<div className={css.name}>{post.name}</div>
						<div className={css.description}>{post.description}</div>
						<div className={css.date}>{post.date}</div>
						<div className={css.text}>
							{post.body.map((t, i) => {
								switch (t.toLocaleUpperCase()) {
									case "P":
										textCount++;
										return (
											<div key={`${t}${i}`} className={css.indent}>
												{post?.bodyText[textCount - 1]}
											</div>
										);
									case "Q":
										quotesCount++;
										return (
											<div key={`${t}${i}`} className={css.quote}>
												<div className={css.quoteLeft}>
													<FontAwesomeIcon icon={faQuoteLeft} />
												</div>
												{post?.bodyQuotes[quotesCount - 1]}
												<div className={css.quoteRight}>
													<FontAwesomeIcon icon={faQuoteRight} />
												</div>
											</div>
										);
									case "C":
										textCount++;
										return (
											<div key={`${t}${i}`}>
												{post?.bodyText[textCount - 1]}
											</div>
										);
									default:
										return <></>;
								}
							})}
						</div>
					</div>
				</div>
			) : (
				<div className={css.loading}>
					<FontAwesomeIcon icon={faCircleNotch} />
				</div>
			)}
		</div>
	);
}
