import styles from "../../hoc/Css";

const Footer = (props) => {
	return (
		<div className={styles.mainFooterEntry}>
			<div className={styles.footer}>
				<div className={styles.footerHeader}>
					<h3>
						<a href="https://telebyteweb.herokuapp.com">TeleByte</a>
					</h3>
					<span>
						TeleByte provides a developer account to you. Talk with
						other developer out there, invite others. Collaborate
						together, contribute together.
					</span>
				</div>

				<div className={styles.footerSections}>
					<div className={styles.footerSection}>
						<h4>Developer's Social Media</h4>
						<ul>
							<li>
								<a href="https://www.linkedin.com/in/sobhanbera">
									{" "}
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
					<div className={styles.footerSection}>
						<h4>More</h4>
						<ul>
							<li>
								<a href="https://github.com/SobhanBera">
									GitHub
								</a>
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
			</div>
		</div>
	);
};

export default Footer;
