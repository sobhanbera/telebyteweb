import React, { Component } from "react";
import styles from "../../elements/styles/style";
import KeymapsSection from "./aboutHelpers/AboutKeymapSection";

class About extends Component {
	render() {
		return (
			<div className={styles.AboutSectionStart}>
				<div className={styles.MainAboutSection}>
					<KeymapsSection />
				</div>
			</div>
		);
	}
}

export default About;
