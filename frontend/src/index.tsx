/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import { Route, Router } from "@solidjs/router";
import App from "./App";
import Tasks from "./pages/Tasks";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		"Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
	);
}

render(
	() => (
		<Router>
			<Route path="/" component={App}></Route>
			<Route path="/tasks" component={Tasks}></Route>
		</Router>
	),
	root!
);
