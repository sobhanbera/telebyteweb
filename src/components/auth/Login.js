import React, { useState } from "react";
import styles from "../elements/styles/style";
import firebase from "../../container/Firebase";

const Login = (props) => {
	const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	const [email, setEmail] = useState("");
	const [password, setPass] = useState("");

	const loginUser = (formState) => {
		formState.preventDefault();
		props.sL();

		if (!email.match(emailValidator)) {
			alert("please enter a valid email address.");
		}

		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((res) => {
				// console.log(res);
				// console.log("user logged in succesfully");
				props.dL();
			})
			.catch((err) => {
				props.dL();
				if (err.code.includes("auth/wrong-password")) {
					alert("Incorrect Password");
				} else {
					alert(
						"some error occurred while creating your account please try again, or contact the developer so this could be fixed"
					);
				}
			});
	};

	return (
		<form
			className={styles.LoginForm}
			onSubmit={(formState) => loginUser(formState)}
		>
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
				type="password"
				value={password}
				className={styles.AuthInput}
				onChange={(e) => setPass(e.target.value)}
			/>
			<div className={styles.loginRightSection}>
				<span className={styles.forgotPassText}>
					Forgot Password! Reset?
				</span>
				<button id="submit" className={styles.SubmitButton}>
					Login
				</button>
			</div>
		</form>
	);
};

export default Login;
