import React, { useState } from "react";
import styles from "../../hoc/Css";
import firebase from "../../firebase/Firebase";

const Login = (props) => {
	const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	const [email, setEmail] = useState("");
	const [password, setPass] = useState("");

	const loginUser = () => {
		if (email === "") {
			alert("Email is required. Please Provide All Fields.");
			return;
		} else if (password === "") {
			alert("Password is required. Please Provide All Fields.");
			return;
		}

		if (!email.match(emailValidator)) {
			alert("Please enter a valid email address.");
			return;
		}

		firebase
			.firestore()
			.collection("Users")
			.where("email", "==", email)
			.then((response) => {
				if (!response.empty) {
					//login user since credentials founded successfully...
					firebase
						.auth()
						.signInWithEmailAndPassword(email, password)
						.then((response) => {
							//HERE WE GOT THE RESPONSE
							props.reloadFunction();
						})
						.catch((err) => {
							if (err.code === "auth/wrong-password") {
								alert(
									"Wrong Password! Please enter the correct password."
								);
							}
						});
				} else {
					alert(
						"User not found in the database. Please create account or try again"
					);
				}
			});
	};

	return (
		<form className={styles.loginForm} onSubmit={loginUser}>
			<input
				id="loginemail"
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
				id="loginpass"
				className={styles.authInput}
				name="pass"
				type="password"
				placeholder="Password"
				value={password}
				autoComplete="on"
				onChange={(event) => {
					setPass(event.target.value);
				}}
			/>
			<div className={styles.loginRightSection}>
				<span className={styles.forgotPassText}>
					Forgot Password! Reset?
				</span>
				<button id="submit" className={styles.submitButton}>
					Login
				</button>
			</div>
		</form>
	);
};

export default Login;
