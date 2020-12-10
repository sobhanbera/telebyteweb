import React from "react";
import styles from "../elements/styles/style";

function Footer(props) {
	return (
		<div className={styles.FooterStart}>
			<div className={styles.MainFooter}>
				<div className={styles.FooterHeading}>
					<h2>TeleByte</h2>
					<p>
						TeleByte provides a developer account to you. Talk with
						other developer out there, invite others. Collaborate
						together, contribute together.
					</p>
				</div>
				<div className={styles.FooterSection}>
					<h4>Developer's Social Media</h4>
					<ul>
						<li>
							<a href="https://www.linkedin.com/in/sobhanbera">
								Linkedin
							</a>
						</li>
						<li>
							<a href="https://www.facebook.com/sobhan.b.90/">
								Facebook
							</a>
						</li>
						<li>
							<a href="https://www.instagram.com/sobhanbera_/">
								Instagram
							</a>
						</li>
					</ul>
				</div>
				<div className={styles.FooterSection}>
					<h4>More</h4>
					<ul>
						<li>
							<a href="https://github.com/SobhanBera">GitHub</a>
						</li>
						<li>
							<a href="https://dribbble.com/sobhanbera">
								Dribble
							</a>
						</li>
						<li>
							<a href="https://sobhanbera.github.io/portfolio">
								Portfolio
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className={styles.FooterContribute}>
				<p>
					<a href="https://github.com/SobhanBera/telebyteweb">
						GitHub Repository
					</a>
				</p>
			</div>
		</div>
	);
}

export default Footer;
