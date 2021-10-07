import React from "react";
import { Link } from "react-router-dom";
import css from "./index.module.scss";

export function Nav() {
	return (
		<div className={css.nav}>
			<div>{`Discerning God's Design`}</div>
			<Link to="/">Home</Link>
			<Link to="/about">About</Link>
			<Link to="/subscribe">Subscribe</Link>
		</div>
	);
}
