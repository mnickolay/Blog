import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Nav } from "./components/Nav";
import { Subscribe } from "./components/Subscribe";
import { About } from "./components/About";
import { NotFound } from "./components/NotFound";
import css from "./App.module.scss";
import { Post } from "./components/Post";
import { Footer } from "./components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

initializeApp({
	apiKey: "AIzaSyBhw-LJ7nVCLyq7ofN48_OK3AydrKH8vNg",
	authDomain: "blog-f03d7.firebaseapp.com",
	projectId: "blog-f03d7",
	storageBucket: "blog-f03d7.appspot.com",
	messagingSenderId: "965720024585",
	appId: "1:965720024585:web:9b03575270882016753ad8",
});

function App() {
	const theme = localStorage.getItem("theme");
	const html = document.querySelector("html");
	html!.dataset.theme = theme ?? "light";

	useEffect(() => {
		window.onscroll = () => {
			const scroll = document.getElementById("scrollToTop");
			if (scroll) {
				if (window.scrollY > 20) {
					scroll.style.opacity = "1";
				} else {
					scroll.style.opacity = "0";
				}
			}
		};
	}, []);

	return (
		<div className={css.body}>
			<div className={css.inner}>
				<BrowserRouter>
					<Nav />
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/about" exact component={About} />
						<Route path="/subscribe" exact component={Subscribe} />
						<Route path="/post/:id" exact component={Post} />
						<Route component={NotFound} />
					</Switch>
				</BrowserRouter>
			</div>
			<div>
				<div
					className={css.scrollToTop}
					id="scrollToTop"
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
				>
					<FontAwesomeIcon icon={faChevronUp} />
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default App;
