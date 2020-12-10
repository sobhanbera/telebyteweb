import React from "react";
import styles from "../elements/styles/style";

const AuthText = (props) => {
	return (
		<div className={styles.authTextEnter}>
			<h2 className={styles.authTextHeading}>
				Create your own TeleByte profile now.
			</h2>
			<div className={styles.authTextDesc}>
				<span>
					Sign up for your own profile on TeleByte now, a place to
					talk with other developers out there. Collaborate,
					contribute together with this developer account.
				</span>
			</div>
		</div>
	);
};

export default AuthText;
