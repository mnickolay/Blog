import React from "react";
import { Link, useLocation } from "react-router-dom";
import css from "./index.module.scss";

export function Nav() {
	const navLocation = useLocation().pathname.replace("/", "").toLocaleLowerCase();

	return (
		<div className={css.nav}>
			<div className={css.navName}>
				<span>{`Discerning God's Design`}</span>
			</div>
			<div className={css.navLinks}>
				<Link
					to="/"
					className={`${navLocation === "" ? css.navLinkSelected : ""} ${css.navLink}`}
				>
					Home
				</Link>
				<Link
					to="/about"
					className={`${navLocation === "about" ? css.navLinkSelected : ""} ${
						css.navLink
					}`}
				>
					About
				</Link>
				<Link
					to="/subscribe"
					className={`${navLocation === "subscribe" ? css.navLinkSelected : ""} ${
						css.navLink
					}`}
				>
					Subscribe
				</Link>
			</div>
		</div>
	);
}
