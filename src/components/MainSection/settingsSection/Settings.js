// https://telebyte-new.firebaseapp.com/__/auth/action

import React, { useEffect, useState } from "react";
import styles from "../../elements/styles/style";
import SettingCard, {
	ColorPicker,
	Education,
	EmailNotVeified,
	ImagePicker,
	PasswordReset,
	PhoneNumberCard,
	SocialLinks,
	SignOutSettingCard,
	DeleteAccount,
	ProfileTypeCard,
} from "./settingCards/SettingCard";
import {
	boyAvatar,
	combinationAvatar,
	girlAvatar,
} from "../../elements/arrays/ProfileAvatar";
import firebase from "../../../container/Firebase";

const Setting = (props) => {
	const colorIsLight = (color) => {
		let r,
			g,
			b,
			hsp = 0.0;
		if (color) {
			if (color.match(/^rgb/)) {
				color = color.match(
					/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
				);
				r = color[1];
				g = color[2];
				b = color[3];
			} else {
				color = +(
					"0x" +
					color.slice(1).replace(color.length < 5 && /./g, "$&$&")
				);
				r = color >> 16;
				g = (color >> 8) & 255;
				b = color & 255;
			}

			hsp = Math.sqrt(
				0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b)
			);
		}
		return hsp.toFixed(4);
	};

	// publics, is also available.
	let {
		about,
		education,
		email,
		expertise,
		facolor,
		fullname,
		location,
		phoneNo,
		profileImg,
		profileType,
		social,
		status,
		username,
	} = props.userdata;
	let finalexpertise = "";
	if (expertise) {
		expertise.split("|").map((item) => {
			finalexpertise += item + ",";
			return item;
		});
	}
	let facebook, instagram, github, linkedin, dribbble, twitter;
	if (social) {
		github = social.github;
		linkedin = social.linkedin;
		dribbble = social.dribbble;
		facebook = social.facebook;
		instagram = social.instagram;
		twitter = social.twitter;
	}

	const [tusername, setUsername] = useState(username);
	const [tfullname, setFullname] = useState(fullname);
	const [temail, setEmail] = useState(email);
	const [tphoneNo, setPhone] = useState(phoneNo);
	const [tstatus, setStatus] = useState(status);
	const [tabout, setAbout] = useState(about);
	const [teducation, setEducation] = useState(education);
	const [texpertise, setExpertise] = useState(finalexpertise);
	const [tlocation, setLocation] = useState(location);
	const [tprofileType, setProfileType] = useState(profileType);
	const [tprofileImg, setProfileImg] = useState(profileImg);
	const [tfacolor, setFacolor] = useState(facolor);

	const [tgithub, setGithub] = useState(github);
	const [tlinkedin, setLinkedin] = useState(linkedin);
	const [tdribbble, setDribble] = useState(dribbble);
	const [tfacebook, setFacebook] = useState(facebook);
	const [tinstagram, setInstagram] = useState(instagram);
	const [ttwitter, setTwitter] = useState(twitter);

	const [verified, setVerified] = useState(true);
	useEffect(() => {
		const timer = setInterval(() => {
			if (props.currentUser) {
				setVerified(props.currentUser.emailVerified);
				clearInterval(timer);
			}
		}, 1000);
	}, [props.currentUser]);

	useEffect(() => {
		const timers = setInterval(() => {
			if (expertise) {
				let array = expertise.split(",");
				let expertises = "";
				for (let i = 0; i < array.length; ++i) {
					if (array[i] !== "") {
						if (i !== array.length - 1)
							expertises += array[i] + ",";
						else expertises += array[i];
					}
				}
				setExpertise(expertises);
				clearInterval(timers);
			}
		}, 1000);
	}, [expertise]);

	// const [tpublics, setPublics] = useState(publics);
	// email: temail,
	// publics: tpublics,

	const sendEmailVerificationEmail = () => {
		firebase
			.auth()
			.currentUser.sendEmailVerification()
			.then(() => {
				if (temail) {
					console.log(
						`Verification email sent to your email ${temail}.`
					);
					alert(`Verification email sent to your email ${temail}`);
				} else {
					console.log("Verification email sent to your email id.");
					alert("Verification email sent to your email id.");
				}
			})
			.catch((err) => {
				if (err.code === "auth/too-many-requests") {
					alert(
						"Too many requests at a time. We have blocked all requests from this device due to unusual activity. You can try again later!"
					);
				}
			});
	};

	const sendPasswordResetEmail = () => {
		if (temail) {
			firebase
				.auth()
				.sendPasswordResetEmail(temail)
				.then((res) => {
					console.log(`Password reset email sent to ${temail}`);
					alert(`Password reset email sent to ${temail}`);
				})
				.catch((err) => {
					console.log(
						"Cannot send passoword reset email. Service unavailable. Please try again later."
					);
					alert(
						"Cannot send passoword reset email. Service unavailable. Please try again later."
					);
				});
		} else {
			alert(
				"Cannot load user email please refresh the page. Or try again later."
			);
			console.log(
				"Cannot load user email please refresh the page. Or try again later."
			);
		}
	};

	const updatePhoneNumber = () => {
		if (tphoneNo.length === 10) {
			firebase
				.database()
				.ref("Users")
				.child(tusername)
				.update({ phoneNo: tphoneNo })
				.then((res) => {
					alert("phone number updated successfully.");
				})
				.catch((err) => {
					alert(
						"cannot update phone number currently. kindly try again later."
					);
				});
		} else {
			alert("Please provide a valid 10 digit indian phone number.");
		}
	};

	const updateUserDetails = () => {
		const colorScore = colorIsLight(tfacolor);
		if (colorScore < 85 && colorScore > 170) {
			alert(
				"Provide a color between #555555 and #aaaaaa values. Or color score of 85 to 170"
			);
			return;
		}

		if (tstatus.length > 0 && tstatus.length < 10) {
			alert("Status must contain 11 characters.");
			return;
		}

		if (tabout.length > 0 && tabout.length < 100) {
			alert("(About You) must contain 100 characters minimum.");
			return;
		}

		let finalAbout = tabout.trim();
		let finalStatus = tstatus.trim();

		let finalExpertise = "";
		let array = texpertise.split(",");
		for (let i = 0; i < array.length; ++i) {
			if (array[i] !== "") {
				if (i !== array.length - 1) finalExpertise += array[i] + ",";
				else finalExpertise += array[i];
			}
		}

		firebase
			.database()
			.ref("Users")
			.child(tusername)
			.update({
				fullname: tfullname,
				status: finalStatus,
				about: finalAbout,
				education: teducation ? teducation : {},
				expertise: finalExpertise,
				location: tlocation,
				profileImg: tprofileImg,
				profileType: tprofileType,
				facolor: tfacolor,
				social: {
					github: tgithub,
					linkedin: tlinkedin,
					dribbble: tdribbble,
					facebook: tfacebook,
					instagram: tinstagram,
					twitter: ttwitter,
				},
			})
			.then((response) => {
				firebase
					.auth()
					.currentUser.updateProfile({
						photoURL: tprofileImg,
					})
					.then((response) => {
						alert("Profile Updated");
						window.location.reload();
					})
					.catch((err) => {
						alert(
							"Cannot update some fields please try again later."
						);
					});
			})
			.catch((err) => {
				alert(
					"Cannot update your profile currently. Please try again later."
				);
			});
	};

	function chooseRandomImg(cat) {
		let ranNo = 33;
		if (cat === "m") {
			while (ranNo === 33)
				ranNo = Math.floor(Math.random() * boyAvatar.length);
			setProfileImg(boyAvatar[ranNo]);
		} else if (cat === "f") {
			while (ranNo === 33)
				ranNo = Math.floor(Math.random() * girlAvatar.length);
			setProfileImg(girlAvatar[ranNo]);
		} else {
			while (ranNo === 33 || ranNo === 86)
				ranNo = Math.floor(Math.random() * combinationAvatar.length);
			setProfileImg(combinationAvatar[ranNo]);
		}
	}

	function addIntoList(what) {
		if (what.yearFrom.length > 4 || what.yearFrom.length <= 0) {
			alert("Please enter a valid year.");
			return false;
		} else if (what.yearTo.length > 0 && what.yearTo.length < 4) {
			alert(
				"If you are not studying here, then provide a valid ending year."
			);
			return false;
		} else if (parseInt(what.yearFrom) > parseInt(what.yearTo)) {
			alert("Start year must be less than End Year");
			return false;
		} else if (what.degree.length < 2) {
			alert("Please provide a valid degree");
			return false;
		} else if (what.school.length < 10 || what.school.length >= 71) {
			alert(
				"Provided institute name must contain 10 - 70 characters. Short forms not allowed"
			);
			return false;
		}

		let currEducationList = {};
		if (teducation) {
			currEducationList = teducation;
		} else {
			currEducationList = {};
		}
		const date = new Date().getTime();
		const hash = "edu" + date;
		currEducationList[hash] = what;

		setEducation(currEducationList);

		// console.log(what);
		// console.log(currEducationList);
		console.log(teducation);
		console.log(true);

		return true;
	}

	const deleteUserAccount = () => {
		const date = new Date();
		const perfectTime =
			date.getHours() +
			":" +
			date.getMinutes() +
			":" +
			date.getSeconds() +
			":" +
			date.getMilliseconds();
		if (
			window.confirm("Are you sure to delete your account permanently.")
		) {
			firebase
				.database()
				.ref("DeleteAccount")
				.child(username)
				.child(perfectTime)
				.update({
					email: temail,
				});
			alert(
				"you will recieve a confirmation email follow that to delete the account. Thanks for using TeleByte."
			);
		}
	};

	if (username) {
		document.title = username + " Settings";
	} else {
		document.title = "Settings";
	}

	return (
		<div className={styles.SettingSectionStart}>
			<div className={styles.SettingArea}>
				<div className={styles.SettingNavigation}>
					<h4>
						<a href="#username">Username</a>
					</h4>
					<h4>
						<a href="#fullname">Fullname</a>
					</h4>
					<h4>
						<a href="#phone">Phone</a>
					</h4>
					<h4>
						<a href="#status">Status</a>
					</h4>
					<h4>
						<a href="#about">About</a>
					</h4>
					<h4>
						<a href="#location">Location</a>
					</h4>
					<h4>
						<a href="#education">Education</a>
					</h4>
					<h4>
						<a href="#expertise">Expertise</a>
					</h4>
					<h4>
						<a href="#profiletype">Profile Type</a>
					</h4>
					<h4>
						<a href="#profiletavatar">Profile Avatar</a>
					</h4>
					<h4>
						<a href="#color">Color</a>
					</h4>
					<h4>
						<a href="#sociallinks">Social Links</a>
					</h4>

					{verified ? null : (
						<h4>
							<a href="#verifyemail">Verify Email</a>
						</h4>
					)}

					<h4>
						<a href="#resetpassword">Reset Password</a>
					</h4>
				</div>
				<div className={styles.SettingMainWorkingArea}>
					<SettingCard
						heading="Your Username"
						what="This is your URL namespace within TeleByte."
						value={tusername}
						onChange={(event) => setUsername(event.target.value)}
						placeholder="Username"
						id="username"
						disabled={true}
						min="8"
						max="15"
						type="text"
						required="Cannot Update Username."
					/>
					<SettingCard
						heading="Your Fullname"
						what="This is your Fullname shown above in profile."
						value={tfullname}
						onChange={(event) => setFullname(event.target.value)}
						placeholder="Fullname"
						id="fullname"
						disabled={false}
						min="8"
						max="16"
						type="text"
						required="Please use 8 - 16 characters at max."
					/>
					<SettingCard
						heading="Your Email"
						what="This is your profile's Email."
						value={temail}
						onChange={(event) => setEmail(event.target.value)}
						placeholder="Email"
						id="email"
						disabled={true}
						min="8"
						max="20"
						type="email"
						required="Cannot Update Email."
					/>
					<PhoneNumberCard
						heading="Your Phone Number"
						what="This is private and not be shown in your profile."
						value={tphoneNo}
						onChange={(event) => setPhone(event.target.value)}
						placeholder="Phone"
						id="phone"
						disabled={false}
						// min="10"
						// max="10"
						type="number"
						required="Totally Optional."
						updatePhoneNumber={updatePhoneNumber}
					/>
					<SettingCard
						heading="Your Status"
						what="This is your current status."
						value={tstatus}
						onChange={(event) =>
							setStatus(event.target.value.replace(/\s+/g, " "))
						}
						placeholder="Status"
						id="status"
						disabled={false}
						min="0"
						max="100"
						length={tstatus ? tstatus.length : "0"}
						type="text"
						required="Please use 100 characters at max."
					/>
					<SettingCard
						heading="About You"
						what="Write someting about yourself to show in public."
						value={tabout}
						onChange={(event) =>
							setAbout(event.target.value.replace(/\s+/g, " "))
						}
						placeholder="About You"
						id="about"
						disabled={false}
						min="100"
						max="1000"
						length={tabout ? tabout.length : "0"}
						type="text"
						required="Please use 100 - 500 characters at max."
					/>

					<Education
						heading="Your Educations"
						what="Tell about your education history to other users."
						required="Provide your institute, year, degree. Keep (ToYear) field blank if you are currently here"
						addIntoList={addIntoList}
						educationList={teducation}
					/>

					<SettingCard
						heading="Your Expertises"
						what="Provide skills and talents of yours."
						value={texpertise}
						onChange={(event) =>
							setExpertise(
								event.target.value.replace(/\s+/g, "").trim()
							)
						}
						placeholder="Expertise"
						id="expertise"
						disable={false}
						min="0"
						max="100"
						type="text"
						required="Please provide different skills separated by commas without spaces."
					/>
					<SettingCard
						heading="Your Address"
						what="This detail will be public to all."
						value={tlocation}
						onChange={(event) => setLocation(event.target.value)}
						placeholder="Location"
						id="location"
						disabled={false}
						min="0"
						max="50"
						type="text"
						required="Please use 50 characters at max."
					/>

					<ProfileTypeCard
						heading="Choose Profile Type"
						what="There are 2 types of profile Standard and Decor."
						label={
							tprofileType
								? "Selected default profile type"
								: "Selected non-standard profile type"
						}
						value={tprofileType}
						required="Check the above checkbox to get Standard profile type."
						onChange={() => {
							const curr = tprofileType;
							setProfileType(!curr);
						}}
					/>

					{/* RANDOM IMAGE (AVATAR) PICKER */}
					<ImagePicker
						heading="Your Tavatar"
						what="This will be shown as your profile avatar."
						img={window.location.origin + tprofileImg}
						chooseRandomImg={chooseRandomImg}
						required="Choose randomly among the 106 available avatars."
					/>

					{/* PROFILE BACKGROUND COLOR PICKER */}
					<ColorPicker
						heading="Choose A Colour"
						what="Choosen colour will appear as your profile background."
						value={tfacolor}
						prevValue={facolor}
						onChange={(event) => setFacolor(event.target.value)}
						id="color"
						score={colorIsLight(tfacolor)}
						required="Provide a color between #555555 and #aaaaaa values. Or color score of 85 to 170"
					/>

					<SocialLinks
						heading="Your Social Media"
						what="This will help other users who want to contact you via social media."
						required="Please provide the full link to your social media profiles."
						gvalue={tgithub}
						onChangeG={(event) =>
							setGithub(event.target.value.replace(/\s+/g, ""))
						}
						lvalue={tlinkedin}
						onChangeL={(event) =>
							setLinkedin(event.target.value.replace(/\s+/g, ""))
						}
						dvalue={tdribbble}
						onChangeD={(event) =>
							setDribble(event.target.value.replace(/\s+/g, ""))
						}
						fvalue={tfacebook}
						onChangeF={(event) =>
							setFacebook(event.target.value.replace(/\s+/g, ""))
						}
						ivalue={tinstagram}
						onChangeI={(event) =>
							setInstagram(event.target.value.replace(/\s+/g, ""))
						}
						tvalue={ttwitter}
						onChangeT={(event) =>
							setTwitter(event.target.value.replace(/\s+/g, ""))
						}
					/>

					{verified ? null : (
						<EmailNotVeified
							heading="Unverified Email"
							what="Your email is not verified, please verify it."
							required="Tap the above button to send verification email."
							sendEmailVerificationEmail={
								sendEmailVerificationEmail
							}
						/>
					)}

					<PasswordReset
						heading="Reset Password?"
						what="Reset your account password."
						required="Tap the above button to send password reset email."
						sendPasswordResetEmail={sendPasswordResetEmail}
					/>

					<SignOutSettingCard
						heading="Sign Out!"
						what="If you want not to use TeleByte for sometime."
						required="Press the above button for temporary out of service."
						signOutUser={() => {
							if (
								window.confirm(
									"Are you sure. You want to sign out?"
								)
							) {
								firebase
									.auth()
									.signOut()
									.then(() => {
										window.location.href =
											window.location.origin;
									})
									.catch((err) => {
										alert(
											"Cannot sign out currently please try again."
										);
									});
							}
						}}
					/>

					<DeleteAccount
						heading="Delete Account!"
						what="Delete your account permanently. Your data will be lost."
						required="Advice: If not sure go away from the above button."
						deleteUserAccount={deleteUserAccount}
					/>
				</div>
			</div>
			<div className={styles.SettingSubmitSection}>
				<button onClick={updateUserDetails}>Save</button>
			</div>
		</div>
	);
};

export default Setting;

// props.heading;
// props.what;
// props.value;
// props.onChange;
// props.placeholder;
// props.id;
// props.required;
// 9932958436
