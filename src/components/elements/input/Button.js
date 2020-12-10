import React from "react";
import styles from "../styles/style";

function Button(props) {
	return (
		<button {...props} className={styles.primaryButton}>
			{props.children}
		</button>
	);
}

export default Button;
