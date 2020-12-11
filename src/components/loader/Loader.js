import React, { useEffect } from "react";
import styles from "../elements/styles/style";

const Loader = () => {
	const [loadingText, setLoading] = "Loading";

	useEffect(() => {
		const timerss = setTimeout(() => {
			if (loadingText === "Loading") {
				setLoading("Loading.");
			} else if (loadingText === "Loading.") {
				setLoading("Loading..");
			} else if (loadingText === "Loading..") {
				setLoading("Loading...");
			} else if (loadingText === "Loading...") {
				setLoading("Loading");
			}
		}, 500);
		return clearInterval(timerss);
	}, [loadingText]);

	return (
		<div className={styles.loaderWrapper}>
			<div className={styles.mainLoaderUp}></div>
			<div className={styles.mainLoader}></div>
			{/* <p>Loading</p> */}
		</div>
	);
};

export default Loader;
