import React from "react";
import styles from "../elements/styles/style";

const Loader = () => {
	return (
		<div className={styles.loaderWrapper}>
			<div className={styles.mainLoader}></div>
		</div>
	);
};

export default Loader;
