import React, { useState } from "react";
import styles from "../elements/styles/style";

const ExtraTopPopup = (props) => {
	const [showThisRender, setShowThis] = useState(true);
	return (
		<div
			className={`${styles.MainPopupStart} ${
				!showThisRender ? styles.PopupGone : styles.Nothing
			}`}
		>
			<div className={styles.PopupFlex}>
				<div className={styles.RightSection}>
					<h3 className={styles.PopupHeading}>{props.heading}</h3>
					<p className={styles.PopupDetail}>{props.detail}</p>
				</div>
				<div
					onClick={() => setShowThis(false)}
					className={styles.LeftSection}
				>
					<svg
						version="1.1"
						x="16px"
						y="16px"
						viewBox="0 0 512.001 512.001"
					>
						<g>
							<g>
								<path
									d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
			L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
			c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
			l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
			L284.286,256.002z"
								/>
							</g>
						</g>
						<g></g>
						<g></g>
						<g></g>
						<g></g>
						<g></g>
						<g></g>
						<g></g>
						<g></g>
						<g></g>
						<g></g>
						<g></g>
						<g></g>
						<g></g>
						<g></g>
						<g></g>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default ExtraTopPopup;
