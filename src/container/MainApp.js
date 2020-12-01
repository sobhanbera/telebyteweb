import React, { Component } from "react";
import styles, { extraStyles } from "../hoc/Css";

import { Route, Switch } from "react-router-dom";

import Auxiliary from "../hoc/Auxiliary";
import ChildErrorBoundary from "../components/ErrorBoundary/ChildErrorBoundary";
import Header from "../components/Header/Header";

class MainApp extends Component {
	constructor() {
		super();
		this.state = {
			lightTheme: true,
		};
	}

	toggleTheme() {
		this.setState((prev) => {
			return {
				lightTheme: !prev.lightTheme,
			};
		});
	}

	render() {
		const currTheme = this.state.lightTheme ? "light" : "dark";

		return (
			<ChildErrorBoundary>
				<Auxiliary>
					<div className={`${currTheme} main-app-start_sbHcTtWwfDOt`}>
						<Header theme={currTheme} />
						<Switch></Switch>
					</div>
				</Auxiliary>
			</ChildErrorBoundary>
		);
	}
}

export default MainApp;
