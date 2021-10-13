import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import css from "./Search.module.scss";
import { IPostMinified } from "../common/IPost";
import { useHistory } from "react-router";

export function Search({ posts }: { posts: IPostMinified[] | undefined }) {
	const history = useHistory();
	const [search, setSearch] = useState("");

	const directToPost = (id: number) => history.push(`/post/${id}`);

	return (
		<div className={css.searchContainer}>
			<div className={css.search}>
				<div className={css.searchHeader}>
					<input
						type="search"
						value={search}
						placeholder="Search..."
						onChange={(event) => setSearch(event.target.value)}
					/>
					{search === "" ? (
						<div className={css.icon}>
							<FontAwesomeIcon icon={faSearch} />
						</div>
					) : null}
				</div>
				<div className={css.searchBody}>
					{posts
						?.filter(
							(f) =>
								f.description
									.toLocaleLowerCase()
									.includes(search.toLocaleLowerCase()) ||
								f.date.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
								f.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
								f.keywords.filter((k) =>
									k.toLocaleLowerCase().includes(search.toLocaleLowerCase())
								).length
						)
						.map((p) => (
							<div
								className={css.searchItem}
								onClick={() => directToPost(p.id)}
								key={p.id}
							>
								<div className={css.nameDate}>
									<div className={css.name}>{p.name}</div>
									<div className={css.date}>{p.date}</div>
								</div>
								<div className={css.description}>{p.keywords.join(", ")}</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
