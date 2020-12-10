import React from "react";
import styles from "../styles/style";

function EditText(props) {
	return (
		<input
			{...props}
			className={`${styles.editText} ${props.extraClassName}`}
		/>
	);
}

export default EditText;
