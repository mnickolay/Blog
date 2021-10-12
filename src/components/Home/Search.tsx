import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import css from "./Search.module.scss";

export function Search() {
	const [search, setSearch] = useState("");
	return (
		<div className={css.search}>
			<div className={css.searchHeader}>
				<input
					type="search"
					value={search}
					onChange={(event) => setSearch(event.target.value)}
				/>
				{search === "" ? (
					<div className={css.icon}>
						<FontAwesomeIcon icon={faSearch} />
					</div>
				) : null}
			</div>
			<div className={css.searchBody}>
				{search === "" ? (
					<div>
						<div></div>
					</div>
				) : (
					<div>
						<div></div>
					</div>
				)}
			</div>
		</div>
	);
}
