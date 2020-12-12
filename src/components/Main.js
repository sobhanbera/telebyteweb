import React from "react";
import styles from "./elements/styles/style";

import Header from "./header/Header";
import MainSection from "./MainSection/MainSection";
import Footer from "./footer/Footer";
import Loader from "./loader/Loader";
import Auth from "./auth/Auth";
import firebase from "../container/Firebase";
import ExtraTopPopup from "./extraTopPopup/ExtraTopPopup";

class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			lightMode: true,
			showLoading: true,
			loggedIn: false,
			currentUser: {
				displayName: "",
				photoURL: "",
				emailVerified: null,
			},
			userData: {
				displayName: "",
				photoURL: "",
				emailVerified: null,
			},
		};
		// not recommended...
		this.showLoading = this.showLoading.bind(this);
		this.disableLoading = this.disableLoading.bind(this);
		this.reloadUserAuthFuntion = this.reloadUserAuthFuntion.bind(this);
		this.signOutUser = this.signOutUser.bind(this);
	}

	showLoading = () => {
		this.setState({
			showLoading: true,
		});
	};

	disableLoading = () => {
		this.setState({
			showLoading: false,
		});
	};

	reloadUserAuthFuntion = () => {
		this.setState({ showLoading: true });
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					loggedIn: true,
					currentUser: firebase.auth().currentUser,
				});
				firebase
					.database()
					.ref("Users")
					.child(this.state.currentUser.displayName)
					.once("value")
					.then((snapshot) => {
						if (snapshot.val()) {
							//load data...
							const data = snapshot.val();
							this.setState({
								userData: data,
								showLoading: false,
							});
							// console.log(this.state);
						} else {
							//user data could not be loaded please refresh the page.
							alert(
								"user data could not be loaded at this moment."
							);
						}

						// if (isLogout === "logout") {
						// 	window.location.reload();
						// }
					})
					.catch((err) => {
						this.setState({
							showLoading: false,
						});
						//user data could not be loaded please refresh the page.
						// if (isLogout === "logout") {
						// 	window.location.reload();
						// } else {
						alert(
							"error occurred while loading user data please refresh the page."
						);
						// }
					});
				// console.log(this.state);
			} else {
				// not registered
				console.log(
					"You are not logged in please log in or sign up to continue."
				);
				this.setState({ showLoading: false });
				// if (isLogout === "logout") {
				// 	window.location.reload();
				// }
			}
		});

		firebase
			.auth()
			.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
			.then(() => {
				// console.log("YOU ARE PERSISTENCE");
			})
			.catch((err) => {
				//not persistence
				// console.log("Error Code", err.code);
				// console.log("Message", err.message);
			});
	};

	componentDidMount() {
		console.log("process.env.NODE_ENV", process.env.NODE_ENV); // expected 'staging' to be printed here when running `npm run staging`
		console.log("process.env.BUILD_VERSION", process.env.BUILD_VERSION); // '1.0.0'
		this.setState({
			showLoading: false,
		});

		this.reloadUserAuthFuntion();
	}

	signOutUser = () => {
		if (window.confirm("Are you sure you want to Log Out!")) {
			firebase
				.auth()
				.signOut()
				.then((res) => {
					window.location.reload();
				})
				.catch((err) => {
					alert("cannot log out currently. please try again.");
				});
			// this.reloadUserAuthFuntion("logout");
			// console.log("USER LOGGED OUT");
		}
	};

	render() {
		return (
			<div className={styles.MainAppStarting}>
				{!this.state.currentUser.emailVerified &&
				!this.state.showLoading &&
				this.state.loggedIn ? (
					<ExtraTopPopup
						heading="Unverified Email"
						detail="Please verify you email at profile section so that you could able to set everything up."
					/>
				) : null}
				<Header
					signOutUser={this.signOutUser}
					loggedIn={this.state.loggedIn}
				/>

				{this.state.loggedIn ? (
					<MainSection
						currentUser={this.state.currentUser}
						userdata={this.state.userData}
					/>
				) : (
					<Auth sL={this.showLoading} dL={this.disableLoading} />
				)}

				<Footer />

				{/* EXTRA COMPONENTS */}
				{this.state.showLoading ? <Loader /> : null}
			</div>
		);
	}
}

export default Main;

// above mentioned (sL and dL) refers to (this.showLoading and this.disableLoading) function respectively
