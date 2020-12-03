import React, { useState } from "react";
import styles from "../../hoc/Css";
import firebase from "../../firebase/Firebase";
import zxcvbn from "zxcvbn";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { boyAvatar } from "../../components/profileavatar/ProfileAvatar";

const Register = (props) => {
	const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	const [email, setEmail] = useState("");
	const [usernamee, setUsername] = useState("");
	const [password, setPass] = useState("");
	const [conPass, setConPass] = useState("");

	const registerUser = () => {
		if (
			email === "" ||
			usernamee === "" ||
			password === "" ||
			conPass === ""
		) {
			alert("All Fields Are Required!");
			return;
		}

		if (usernamee.length > 15) {
			alert("username cannot be greater than 15 characters.");
			return;
		}

		let username = usernamee;
		for (let i = 0; i < username; ++i) {
			if (
				(username.charAt(i) >= 48 && username.charAt(i) <= 57) ||
				(username.charAt(i) >= 65 && username.charAt(i) <= 90) ||
				(username.charAt(i) >= 97 && username.charAt(i) <= 122) ||
				username.charAt(i) === "_" ||
				username.charAt(i) === "."
			) {
				continue;
			} else {
				alert(
					"username should only contain ['.', '_', a-z, A-Z, 0-9]."
				);
				return;
			}
		}

		if (!email.match(emailValidator)) {
			alert("Please enter a valid email address.");
			return;
		}

		if (password !== conPass) {
			alert("Password doesn't matched");
		}

		const testedResult = zxcvbn(password);
		if (testedResult.score <= 3) {
			alert("Please enter a strong password.");
			return;
		}

		//Register User...
		//checking if user is already present in database...
		firebase
			.firestore()
			.collection("Users")
			.where("email", "==", email)
			.get()
			.then((response) => {
				if (response.empty) {
					//no such email found...
					firebase
						.firestore()
						.collection("Users")
						.where("username", "==", username)
						.get()
						.then((response) => {
							if (response.empty) {
								//register the user finally...
								console.log("User Registered Successfully");
								firebase
									.auth()
									.createUserWithEmailAndPassword(
										email,
										password
									)
									.then((response) => {
										//collect user data...
										//and also adding data here...
										const db = firebase.firestore();
										db.settings({
											timestampsInSnapshots: true,
										});
										db.collection("Users").add({
											email: email,
											fullname: "",
											username: usernamee,
											profileImg: "",
											coverImg: "",
											phoneNo: "",
											status: "",
											public: "",
											info: "",
											social: {
												github: "",
												linkedin: "",
												facebook: "",
												instagram: "",
											},
										});

										firebase
											.auth()
											.currentUser.updateProfile({
												displayName: username,
												photoURL:
													boyAvatar[
														Math.floor(
															Math.random() *
																boyAvatar.length
														)
													],
											});

										setEmail("");
										setUsername("");
										setPass("");
										setConPass("");
									})
									.catch((error) => {
										var errorCode = error.code;
										var errorMsg = error.message;
										console.log(errorCode, errorMsg);
									});
							} else {
								//same username found...
								alert(
									"Username not available! Username is already taken."
								);
							}
						});
				} else {
					alert(
						"Another user with this email is found! Please try again."
					);
				}
			});
	};

	return (
		<form className={styles.registerForm} onSubmit={registerUser}>
			<input
				id="emailregister"
				className={styles.authInput}
				type="email"
				name="email"
				placeholder="Email"
				value={email}
				autoComplete="on"
				onChange={(event) => {
					setEmail(event.target.value);
				}}
			/>
			<input
				id="usernameregister"
				className={styles.authInput}
				name="username"
				type="text"
				placeholder="Username"
				value={usernamee}
				autoComplete="on"
				onChange={(event) => {
					setUsername(event.target.value);
				}}
			/>
			<input
				id="passregister"
				className={styles.authInput}
				type="password"
				name="pass"
				placeholder="Password"
				value={password}
				autoComplete="on"
				onChange={(event) => {
					setPass(event.target.value);
				}}
			/>
			<input
				id="conpassregister"
				className={styles.authInput}
				name="conpass"
				type="password"
				placeholder="Confirm Password"
				value={conPass}
				autoComplete="on"
				onChange={(event) => {
					setConPass(event.target.value);
				}}
			/>

			<PasswordStrengthMeter password={password} />

			<button
				id="submit"
				// onClick={registerUser}
				className={styles.submitButton}
			>
				Sign Up
			</button>
		</form>
	);
};

export default Register;
