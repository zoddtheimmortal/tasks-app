import type { Component } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import { A } from "@solidjs/router";

const App: Component = (props) => {
	return (
		<>
			<div class={styles.App}>
				<header class={styles.header}>
					<img src={logo} class={styles.logo} alt="logo" />
					<p>
						<code>t a s k s</code>
					</p>
					<button>
						<A href="/tasks">Get Started</A>
					</button>
					<a
						class={styles.link}
						href="https://github.com/zoddTheImmortal"
						target="_blank"
						rel="noopener noreferrer"
					>
						zoddtheimmortal
					</a>
				</header>
			</div>
		</>
	);
};

export default App;
