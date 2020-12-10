import React, { useState } from "react";
import styles from "../elements/styles/style";
import AuthText from "./AuthText";
import Login from "./Login";
import Register from "./Register";

function Auth(props) {
	const [registerEnabled, setRegisteredEnabled] = useState(true);

	return (
		<div className={styles.AuthStart}>
			<AuthText />

			<div className={styles.AuthCard}>
				<div className={styles.AuthToggleSection}>
					<div
						className={`${styles.RegisterBtn} ${
							registerEnabled ? styles.authActiveTab : null
						}`}
						onClick={() => {
							setRegisteredEnabled(true);
						}}
					>
						Sign Up
					</div>
					<div
						className={`${styles.LoginBtn} ${
							!registerEnabled ? styles.authActiveTab : null
						}`}
						onClick={() => {
							setRegisteredEnabled(false);
						}}
					>
						Login
					</div>
				</div>
				<div className={styles.MainAuthSection}>
					{registerEnabled ? (
						<Register sL={props.sL} dL={props.dL} />
					) : (
						<Login sL={props.sL} dL={props.dL} />
					)}
				</div>
			</div>
		</div>
	);
}

export default Auth;
