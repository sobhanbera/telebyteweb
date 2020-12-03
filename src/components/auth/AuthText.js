import React from "react";
import styles from "../../hoc/Css";

const AuthText = (props) => {
	return (
		<div className={styles.authTextEnter}>
			<h2 className={styles.authTextHeading}>
				Create your own TeleByte profile now.
			</h2>
			<div className={styles.authTextDesc}></div>
			<span>
				Sign up for your own profile on TeleByte now, a place to talk
				with other developers out there. Collaborate, contribute
				together with this developer account.
			</span>
		</div>
	);
};

export default AuthText;
