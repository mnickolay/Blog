import React from "react";
import { Link } from "react-router-dom";

export function Nav() {
	return (
		<div className="nav">
			<Link to="/">Home</Link>
			<Link to="/about">About</Link>
			<Link to="/subscribe">Subscribe</Link>
		</div>
	);
}
