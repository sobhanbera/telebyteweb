import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";

import Auxiliary from "../hoc/Auxiliary";
import ChildErrorBoundary from "../components/ErrorBoundary/ChildErrorBoundary";
import Header from "../components/Header/Header";
import Loader from "../components/loader/Loader";
import Auth from "../components/auth/Authentication";
import Footer from "../components/footer/Footer";
import firebase from "../firebase/Firebase";

class MainApp extends Component {
	constructor() {
		super();
		this.state = {
			lightTheme: true,
			showLoader: false,
			isLoggedIn: false,
			user: "",
		};
		// no need of this below line...
		this.toggleTheme = this.toggleTheme.bind(this);
		this.disableLoader = this.disableLoader.bind(this);
	}

	toggleTheme = () => {
		this.setState((prev) => {
			return {
				lightTheme: !prev.lightTheme,
			};
		});
	};

	disableLoader = () => {
		this.setState({
			showLoader: false,
		});
	};

	reloadFuntion = () => {
		console.log(this.state.user);
		firebase.auth().onAuthStateChanged((userO) => {
			if (userO) {
				this.setState({
					user: userO,
				});
				console.log(this.state.user);
			} else {
			}
		});
	};

	render() {
		const currTheme = this.state.lightTheme ? "light" : "dark";

		return (
			<ChildErrorBoundary>
				<Auxiliary>
					<div
						className={`${currTheme} main-app-start_sbHcTtWwfDOt`}
						onLoad={this.disableLoader}
					>
						<Header theme={currTheme} profileImg={""} />

						{this.state.isLoggedIn ? (
							<Switch>
								<Route path="*" component={""} />
								<Route exact path="/" component={""} />
								<Route exact path="/dashboard" component={""} />
							</Switch>
						) : (
							<Auth reloadFuntion={this.reloadFuntion} />
						)}

						<Footer />

						{/* EXTRAS */}
						{this.state.showLoader ? <Loader /> : null}
					</div>
				</Auxiliary>
			</ChildErrorBoundary>
		);
	}
}

export default MainApp;
