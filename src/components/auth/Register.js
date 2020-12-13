import React, { useState } from "react";
import styles from "../elements/styles/style";

import PasswordStrengthMeter from "./PasswordStrengthMeter";
import zxcvbn from "zxcvbn";
import firebase from "../../container/Firebase";
import { combinationAvatar } from "../elements/arrays/ProfileAvatar";
import fakeemails from "../elements/arrays/FakeMails";

const Register = (props) => {
	const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	const usernameValidator = /^[A-Za-z0-9]+(?:[._-][A-Za-z0-9]+)*$/;

	const [usernamee, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPass] = useState("");
	const [conpass, setConPass] = useState("");
	const [showPass, setShowPass] = useState(false);

	const registerUser = (formState) => {
		formState.preventDefault();
		props.sL();

		const passScore = zxcvbn(password).score;

		if (usernamee.length < 8 || usernamee.length > 15) {
			props.dL();
			alert("username must have characters between 8 - 15");
			return;
		} else if (!usernamee.match(usernameValidator)) {
			props.dL();
			alert("please enter a valid uesrname");
			return;
		} else if (!email.match(emailValidator)) {
			props.dL();
			alert("please enter a valid email address.");
			return;
		} else if (password.length < 8) {
			props.dL();
			alert("password must at least contain 8 characters");
			return;
		} else if (passScore <= 3) {
			props.dL();
			alert("Please enter a strong password.");
			return;
		} else if (password !== conpass) {
			props.dL();
			alert("password doesn't matched");
			return;
		}

		for (let i = 0; i < fakeemails.length; ++i) {
			if (email.includes(fakeemails[i])) {
				props.dL();
				alert(
					"spam email are not allowed. please try using other verified email services."
				);
				return;
			}
		}

		let randomImageNo = 33;
		while (randomImageNo === 33 || randomImageNo === 86) {
			randomImageNo = Math.floor(
				Math.random() * combinationAvatar.length
			);
		}
		let time = new Date();

		firebase
			.database()
			.ref("Telebyte")
			.child("authentication_settings")
			.once("value")
			.then((snap) => {
				if (snap.val()) {
					if (snap.val().regOpen) {
						firebase
							.database()
							.ref("Accounts")
							.child(usernamee)
							.once("value")
							.then((snap) => {
								if (snap.val()) {
									// username already taken
									alert(
										"username is already taken. please choose a different username"
									);
								} else {
									firebase
										.auth()
										.createUserWithEmailAndPassword(
											email,
											password
										)
										.then((res) => {
											firebase
												.database()
												.ref("Users")
												.child(usernamee)
												.set({
													article: {
														noOfArticles: 0,
													},
													follow: {
														following: 0,
														followers: 0,
														followingList: {},
														followerList: {},
													},
													social: {
														github: "",
														linkedin: "",
														dribbble: "",
														instagram: "",
														facebook: "",
														twitter: "",
													},
													joinedOn: {
														year: time.getFullYear(),
														month: time.getMonth(),
														day: time.getDay(),
														hour: time.getHours(),
														min: time.getMinutes(),
														sec: time.getSeconds(),
														millisec: time.getMilliseconds(),
													},
													profileImg:
														combinationAvatar[
															randomImageNo
														],
													education: {},
													ratings: 1,
													about: "",
													expertise: "",
													location: "",
													coverImg: "",
													facolor: "#0f60b6",
													fullname: "",
													phoneNo: "",
													profileType: true,
													publics: true,
													status: "",
													email: email,
													username: usernamee,
												});

											firebase
												.database()
												.ref("Accounts")
												.child(usernamee)
												.set({
													username: usernamee,
												});

											firebase
												.auth()
												.currentUser.updateProfile({
													displayName: usernamee,
													photoURL:
														combinationAvatar[
															Math.floor(
																Math.random() *
																	combinationAvatar.length
															)
														],
													phoneNo: "",
												});
											props.dL();

											setUsername("");
											setEmail("");
											setPass("");
											setConPass("");
											window.location.reload();
										})
										.catch((err) => {
											if (
												err.code.includes(
													"auth/email-already-in-use"
												)
											) {
												props.dL();
												alert(
													"email is already registered. try using other email address."
												);
											} else {
												props.dL();
												alert(
													"some error occurred while creating your account please try again, or contact the developer so this could be fixed"
												);
											}
										});
								}
							});
					} else {
						props.dL();
						alert(
							"New Users Registration in not allowed currently, Since the server load has increased too much. But you can login if you have an other account. For more details please contact the developer."
						);
					}
				}
			})
			.catch((err) => {
				props.dL();
				alert("Cannot make contact with the server.");
			});

		// firebase
		// 	.firestore()
		// 	.collection("Users")
		// 	.where("username", "==", usernamee)
		// 	.get()
		// 	.then((res) => {
		// 		if (res.empty) {
		// 			//no username found..
		// 			firebase
		// 				.auth()
		// 				.createUserWithEmailAndPassword(email, password)
		// 				.then((res) => {
		// 					const db = firebase.firestore();
		// 					db.settings({
		// 						timestampsInSnapshots: true,
		// 					});
		// 					db.collection("Users").add({
		// 						coverImg: "",
		// 						email: email,
		// 						fullname: "",
		// 						info: "",
		// 						phoneNo: "",
		// 						profileImg: "",
		// 						public: "",
		// 						social: {
		// 							facebook: "",
		// 							instagram: "",
		// 							github: "",
		// 							githubUsername: "",
		// 							linkedin: "",
		// 						},
		// 						status: "",
		// 						username: usernamee,
		// 					});

		// 					firebase.auth().currentUser.updateProfile({
		// 						displayName: usernamee,
		// 						photoURL:
		// 							combinationAvatar[
		// 								Math.floor(
		// 									Math.random() *
		// 										combinationAvatar.length
		// 								)
		// 							],
		// 					});

		// 					setUsername("");
		// 					setEmail("");
		// 					setPass("");
		// 					setConPass("");
		// 				})
		// 				.catch((err) => {
		// 					if (
		// 						err.code.includes("auth/email-already-in-use")
		// 					) {
		// 						alert(
		// 							"email is already registered. try using other email address."
		// 						);
		// 					} else {
		// 						alert(
		// 							"some error occurred while creating your account please try again, or contact the developer so this could be fixed"
		// 						);
		// 					}
		// 				});
		// 		} else {
		// 			//username already taken
		// 			alert(
		// 				"username is already taken. please choose a different username"
		// 			);
		// 		}
		// 	});
	};

	return (
		<form
			className={styles.RegisterForm}
			onSubmit={(formState) => registerUser(formState)}
		>
			<input
				autoComplete="on"
				placeholder="Username"
				id="regusername"
				type="text"
				value={usernamee}
				minLength="8"
				maxLength="15"
				className={styles.AuthInput}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				autoComplete="on"
				placeholder="Email"
				id="regemail"
				type="email"
				value={email}
				className={styles.AuthInput}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				autoComplete="on"
				placeholder="Password"
				id="regpassword"
				type={`${showPass ? "text" : "password"}`}
				value={password}
				minLength="8"
				className={styles.AuthInput}
				onChange={(e) => setPass(e.target.value)}
			/>
			<input
				autoComplete="on"
				placeholder="Confirm Password"
				id="regconpassword"
				type={`${showPass ? "text" : "password"}`}
				value={conpass}
				minLength="8"
				className={styles.AuthInput}
				onChange={(e) => setConPass(e.target.value)}
			/>

			<label
				onClick={() => {
					const currValue = showPass;
					setShowPass(!currValue);
				}}
			>
				<input
					type="checkbox"
					checked={showPass}
					onChange={() => {
						const currValue = showPass;
						setShowPass(!currValue);
					}}
				/>
				Show Password
			</label>

			<PasswordStrengthMeter
				password={password}
				extraClass={password === conpass ? true : false}
			/>
			<button id="submit" className={styles.SubmitButton}>
				Sign Up
			</button>
		</form>
	);
};

export default Register;
