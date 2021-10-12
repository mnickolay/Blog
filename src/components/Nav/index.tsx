import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faInfo, faAt, faPalette } from "@fortawesome/free-solid-svg-icons";
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
					<FontAwesomeIcon icon={faHome} />
				</Link>
				<Link
					to="/about"
					className={`${navLocation === "about" ? css.navLinkSelected : ""} ${
						css.navLink
					}`}
				>
					<FontAwesomeIcon icon={faInfo} />
				</Link>
				<Link
					to="/subscribe"
					className={`${navLocation === "subscribe" ? css.navLinkSelected : ""} ${
						css.navLink
					}`}
				>
					<FontAwesomeIcon icon={faAt} />
				</Link>
				<div className={css.navLink}>
					<FontAwesomeIcon icon={faPalette} />
				</div>
			</div>
		</div>
	);
}
