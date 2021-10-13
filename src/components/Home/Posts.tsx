import React from "react";
import { useHistory } from "react-router";
import { IPostMinified } from "../common/IPost";
import css from "./Posts.module.scss";

export function Posts({ posts }: { posts: IPostMinified[] | undefined }) {
	const history = useHistory();
	const directToPost = (id: number) => history.push(`/post/${id}`);

	return (
		<>
			{posts?.length ? (
				<div className={css.postsContainer}>
					{posts?.map((p) => (
						<div onClick={() => directToPost(p.id)} className={css.post} key={p.id}>
							<div className={css.imageContainer}>
								<img
									className={css.image}
									src="https://images.unsplash.com/photo-1633678861611-858fc0041aa3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
								/>
							</div>
							<div className={css.postBody}>
								<div className={css.nameDate}>
									<div className={css.name}>{p.name}</div>
									<div className={css.date}>{p.date}</div>
								</div>
								<div className={css.keywords}>{p.keywords.join(", ")}</div>
							</div>
						</div>
					))}
				</div>
			) : null}
		</>
	);
}
