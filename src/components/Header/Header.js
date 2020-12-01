import React from "react";
import styles from "../../hoc/Css";

import Logo from "../../assets/logo/telebyteLogo.png";
import LogoBlack from "../../assets/logo/telebyteLogoB.png";

const Header = (props) => {
	return (
		<div className={styles.mainHeader}>
			<div className={styles.header}>
				<div className={styles.headerLogo}>
					<img src={Logo} draggable="false" alt="telebyte logo" />
				</div>
			</div>
		</div>
	);
};

export default Header;
