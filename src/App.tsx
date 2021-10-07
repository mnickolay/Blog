import React from "react";
import { initializeApp } from "firebase/app";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./components/Home";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Subscribe } from "./components/Subscribe";
import { About } from "./components/About";
import { NotFound } from "./components/NotFound";

initializeApp({
	apiKey: "AIzaSyBhw-LJ7nVCLyq7ofN48_OK3AydrKH8vNg",
	authDomain: "blog-f03d7.firebaseapp.com",
	projectId: "blog-f03d7",
	storageBucket: "blog-f03d7.appspot.com",
	messagingSenderId: "965720024585",
	appId: "1:965720024585:web:9b03575270882016753ad8",
});

function App() {
	return (
		<>
			<BrowserRouter>
				<Nav />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/about" exact component={About} />
					<Route path="/subscribe" exact component={Subscribe} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
			<Footer />
		</>
	);
}

export default App;
