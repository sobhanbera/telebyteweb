import React from "react";
import styles from "../styles/style";

function TextInput(props) {
	return (
		<span {...props} className={styles.textInput}>
			{props.children}
		</span>
	);
}

export default TextInput;
