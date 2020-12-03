import React, { useState, useEffect } from "react";
import styles from "../../hoc/Css";
import AuthText from "./AuthText";
import Login from "./Login";
import Register from "./Register";

const Auth = (props) => {
	const [registerEnabled, setRegisteredEnabled] = useState(true);

	return (
		<div className={styles.auth}>
			<AuthText />
			<div className={styles.authCard}>
				<div className={styles.authToggleSection}>
					<div
						className={`${styles.authToggle} ${
							styles.authToggle1
						} ${registerEnabled ? styles.authActiveTab : null}`}
						onClick={() => {
							setRegisteredEnabled(true);
						}}
					>
						Sign Up
					</div>
					<div
						className={`${styles.authToggle} ${
							styles.authToggle2
						} ${!registerEnabled ? styles.authActiveTab : null}`}
						onClick={() => {
							setRegisteredEnabled(false);
						}}
					>
						Login
					</div>
				</div>

				<div className={styles.mainAuthSectionForm}>
					{registerEnabled ? (
						<Register reloadFuntion={props.reloadFuntion} />
					) : (
						<Login reloadFuntion={props.reloadFuntion} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Auth;
