import React from "react";
import styles from "../../../elements/styles/style";

const websiteOrigin = window.location.origin;
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const StandardProfile = (props) => {
	let followers,
		followings,
		github,
		dribbble,
		facebook,
		insta,
		linkedin,
		twitter,
		month,
		year;
	// article, phoneNo, publics,field is also available...
	let {
		profileImg,
		fullname,
		username,
		follow,
		joinedOn,
		status,
		location,
		social,
		email,

		facolor,

		education,
		expertise,
		about,

		profileType,
	} = props.userdata;
	if (follow) {
		followers = follow.followers;
		followings = follow.following;
	}
	if (social) {
		github = social.github;
		linkedin = social.linkedin;
		dribbble = social.dribbble;
		facebook = social.facebook;
		insta = social.instagram;
		twitter = social.twitter;
	}
	if (joinedOn) {
		month = joinedOn.month;
		year = joinedOn.year;
	}

	const colorIsLight = (color) => {
		let r, g, b, hsp;
		if (color.match(/^rgb/)) {
			color = color.match(
				/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
			);
			r = color[1];
			g = color[2];
			b = color[3];
		} else {
			color = +(
				"0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&")
			);
			r = color >> 16;
			g = (color >> 8) & 255;
			b = color & 255;
		}

		hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
		//return true if the givne colro in the argument is light...
		// console.log(hsp, hsp > 127.5);
		return hsp > 127.5;
	};

	return (
		<div className={styles.MainStandardProfileStart}>
			<div className={styles.StandardProfileArea}>
				<div className={styles.LeftOrTopPart}>
					<GeneralProfileCard
						profileImg={profileImg}
						fullname={fullname}
						username={username}
						followers={followers}
						followings={followings}
						month={month}
						year={year}
						status={status}
						location={location}
						email={email}
						github={github}
						dribbble={dribbble}
						facebook={facebook}
						insta={insta}
						linkedin={linkedin}
						twitter={twitter}
						facolor={facolor}
					/>
				</div>
				<div className={styles.RightOrBottomPart}>
					<AboutSection
						education={education}
						expertise={expertise}
						about={about}
						username={username}
						facolor={facolor}
						textColor={
							colorIsLight(facolor) ? "#000000" : "#ffffff"
						}
					/>
				</div>
			</div>
		</div>
	);
};

const GeneralProfileCard = (props) => {
	return (
		<div className={styles.GeneralCard}>
			<div className={styles.ProfileImageContainer}>
				<img src={websiteOrigin + props.profileImg} alt="tavatar" />
			</div>
			<div className={styles.TextSection}>
				{props.fullname ? (
					<p className={styles.FullName}>{props.fullname}</p>
				) : null}
				<p style={{ color: props.facolor }}>{props.username}</p>
			</div>

			<div className={styles.FollowStarts}>
				<div className={styles.FollowersDiv}>
					<h4>Followers</h4>
					<p>{props.followers}</p>
				</div>
				<div className={styles.FollowingsDiv}>
					<h4>Followings</h4>
					<p>{props.followings}</p>
				</div>
			</div>
			<div className={styles.JoinedONDiv}>
				<h4>Joined On</h4>
				<p>{months[props.month - 1] + " " + props.year}</p>
			</div>
			{props.status ? (
				<div className={styles.Status}>
					<h4>Status</h4>
					<p>{props.status}</p>
				</div>
			) : null}
			<div className={styles.SocialButtons}>
				{props.github ? (
					<a className={styles.GithubBTN} href={props.github}>
						Github
					</a>
				) : null}
				{props.dribbble ? (
					<a className={styles.DribbleBTN} href={props.dribbble}>
						Dribbble
					</a>
				) : null}
				{props.linkedin ? (
					<a className={styles.LinkedinBTN} href={props.linkedin}>
						Linkedin
					</a>
				) : null}
				{props.insta ? (
					<a className={styles.InstaBTN} href={props.insta}>
						Instagram
					</a>
				) : null}
				{props.facebook ? (
					<a className={styles.FacebookBTN} href={props.facebook}>
						Facebook
					</a>
				) : null}
				{props.twitter ? (
					<a className={styles.TwitterBTN} href={props.twitter}>
						Twitter
					</a>
				) : null}
				{props.email ? (
					<a
						className={styles.MailBTN}
						href={"mailto:" + props.email}
					>
						Mail ID
					</a>
				) : null}
			</div>
		</div>
	);
};

const AboutSection = (props) => {
	let mainAboutText;
	if (props.about) {
		let id = 0;
		mainAboutText = props.about
			.split("\\n")
			.map((str) => <p key={id++}>{str}</p>);
	}

	return (
		<div>
			{props.about || props.expertise || props.education ? (
				<div className={styles.AboutSectionCard}>
					{props.about ? (
						<div className={styles.AboutText}>
							<h4>About</h4>
							{mainAboutText}
							{/* <p>{props.about}</p> */}
						</div>
					) : null}
					{props.education || props.expertise ? (
						<div className={styles.EducationText}>
							{props.education ? (
								<EducationSection
									educationList={props.education}
									username={props.username}
								/>
							) : null}

							{props.expertise ? (
								<Expertise
									expertise={props.expertise}
									textColor={props.textColor}
									facolor={props.facolor}
								/>
							) : null}
						</div>
					) : null}
				</div>
			) : null}
		</div>
	);
};

const EducationCard = (props) => {
	return (
		<div className={styles.ProfileEducationCard}>
			<h5>{props.school}</h5>
			<p>{props.degree}</p>
			<span>{props.yearFrom}</span>
			{" - "}
			<span>{props.yearTo}</span>
		</div>
	);
};

const EducationSection = (props) => {
	let autoKey = 0;
	let educationArray = [];

	if (props.educationList) {
		educationArray = Object.keys(props.educationList).map((edu) => {
			return [...Array(props.educationList[edu])];
		});
	}

	return (
		<div className={styles.ProfileEducationSection}>
			<h4>Education</h4>
			{props.educationList ? (
				educationArray.map((currEducation) => {
					return (
						<EducationCard
							key={autoKey++}
							degree={currEducation[0].degree}
							school={currEducation[0].school}
							yearFrom={currEducation[0].yearFrom}
							yearTo={currEducation[0].yearTo}
						/>
					);
				})
			) : (
				<span>
					Education not provided by{" "}
					{props.username ? props.username : "user"}
				</span>
			)}
		</div>
	);
};

const Expertise = (props) => {
	let id = 0;
	let list = [];
	let componentList = null;

	if (props.expertise) {
		list = props.expertise.split(",");
		componentList = list.map((single) => {
			return (
				<span
					className={
						single
							? styles.ProfileCardRightExpertiseSpan
							: styles.DisplayNone
					}
					key={id++}
					style={{
						backgroundColor: props.facolor,
						color: props.textColor,
					}}
				>
					{single}
				</span>
			);
		});
	}

	return (
		<div className={styles.ProfileCardRightExpertise}>
			<h4>Expertise</h4>
			<div className={styles.ExpertiseContainer}>
				{componentList ? componentList : "no expertise provide"}
			</div>
		</div>
	);
};

export default StandardProfile;
