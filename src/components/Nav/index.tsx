import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faInfo,
	faAt,
	faSun,
	faMoon,
	faTree,
	faRobot,
	faCloud,
	faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import css from "./index.module.scss";
import PropTypes from "prop-types";

export function Nav() {
	const [theme, setTheme] = useState(document.querySelector("html")?.dataset.theme ?? "light");
	const [openThemes, setOpenThemes] = useState(false);
	const navLocation = useLocation().pathname.replace("/", "").toLocaleLowerCase();

	function useOutsideClick(ref: any) {
		useEffect(() => {
			function handleClickOutside(event: any) {
				if (ref.current && !ref.current.contains(event.target)) {
					setOpenThemes(false);
				}
			}

			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}

	function OutsideClick(props: any) {
		const wrapperRef = useRef(null);
		useOutsideClick(wrapperRef);

		return <div ref={wrapperRef}>{props.children}</div>;
	}

	OutsideClick.propTypes = {
		children: PropTypes.element.isRequired,
	};

	const determineThemeIcon = () => {
		switch (theme) {
			case "light":
				return faSun;
			case "dark":
				return faMoon;
			case "gray":
				return faCloud;
			case "green":
				return faTree;
			case "blue":
				return faRobot;
			default:
				return faSun;
		}
	};

	const themeClick = (theme: string) => {
		const html = document.querySelector("html");
		html!.dataset.theme = theme ?? "light";
		localStorage.setItem("theme", theme ?? "light");
		setTheme(theme);
	};

	return (
		<div className={css.nav}>
			<div className={css.navName}>Discerning God&apos;s Design</div>
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
				<OutsideClick>
					<div className={css.theme} onClick={() => setOpenThemes(!openThemes)}>
						<FontAwesomeIcon icon={determineThemeIcon()} />
						{openThemes && (
							<div className={css.themes}>
								<div className={css.themesItem} onClick={() => themeClick("light")}>
									<FontAwesomeIcon icon={faSun} />
								</div>
								<div className={css.themesItem} onClick={() => themeClick("dark")}>
									<FontAwesomeIcon icon={faMoon} />
								</div>
								<div className={css.themesItem} onClick={() => themeClick("gray")}>
									<FontAwesomeIcon icon={faCloud} />
								</div>
								<div className={css.themesItem} onClick={() => themeClick("green")}>
									<FontAwesomeIcon icon={faTree} />
								</div>
								<div className={css.themesItem} onClick={() => themeClick("blue")}>
									<FontAwesomeIcon icon={faRobot} />
								</div>
							</div>
						)}
					</div>
				</OutsideClick>
			</div>
		</div>
	);
}
