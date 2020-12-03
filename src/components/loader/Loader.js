import React from "react";
import styles from "../../hoc/Css";

const Loader = () => {
	return (
		<div className={styles.loaderWrapper}>
			<div className={styles.mainLoader}></div>
		</div>
	);
};

export default Loader;
