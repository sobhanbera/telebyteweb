import React, { useState } from "react";
import styles from "../../../elements/styles/style";

const SettingCard = (props) => {
	return (
		<div className={styles.SettingCard} id={props.id}>
			<div className={styles.CardTop}>
				<h4>{props.heading}</h4>
				<p>{props.what}</p>
				{props.id === "about" || props.id === "status" ? (
					<>
						<textarea
							className={
								props.id === "status"
									? styles.ShortHeightTextarea
									: ""
							}
							disabled={props.disabled}
							type={props.type}
							value={props.value}
							onChange={(event) => props.onChange(event)}
							placeholder={props.placeholder}
							autoComplete="off"
							minLength={props.min}
							maxLength={props.max}
						/>
						<span>
							{props.length}
							{` / ${props.max} characters.`}
						</span>
					</>
				) : (
					<input
						disabled={props.disabled}
						type={props.type}
						value={props.value}
						onChange={(event) => props.onChange(event)}
						placeholder={props.placeholder}
						autoComplete="on"
						minLength={props.min}
						maxLength={props.max}
					/>
				)}
			</div>

			<div className={styles.CardBottom}>
				<span>{props.required}</span>
			</div>
		</div>
	);
};

const PhoneNumberCard = (props) => {
	return (
		<div className={styles.SettingCard} id={props.id}>
			<div className={styles.CardTop}>
				<h4>{props.heading}</h4>
				<p>{props.what}</p>
				<input
					disabled={props.disabled}
					type={props.type}
					value={props.value}
					onChange={(event) => props.onChange(event)}
					placeholder={props.placeholder}
					autoComplete="on"
					minLength={props.min}
					maxLength={props.max}
				/>
				<button
					className={`${styles.LightDarkButton} ${styles.topbottom} `}
					onClick={props.updatePhoneNumber}
				>
					Verify
				</button>
			</div>

			<div className={styles.CardBottom}>
				<span>{props.required}</span>
			</div>
		</div>
	);
};

const EmailNotVeified = (props) => {
	return (
		<div className={styles.SettingCard}>
			<div className={styles.CardTop} id="verifyemail">
				<h4>{props.heading}</h4>
				<p>{props.what}</p>
				<button
					className={`${styles.LightDarkButton} ${styles.topbottom} `}
					onClick={props.sendEmailVerificationEmail}
				>
					Send Email
				</button>
			</div>

			<div className={styles.CardBottom}>
				<span>{props.required}</span>
			</div>
		</div>
	);
};

const PasswordReset = (props) => {
	return (
		<div className={styles.SettingCard} id="resetpassword">
			<div className={styles.CardTop}>
				<h4>{props.heading}</h4>
				<p>{props.what}</p>
				<button
					className={`${styles.LightDarkButton} ${styles.topbottom} `}
					onClick={props.sendPasswordResetEmail}
				>
					Send Email
				</button>
			</div>

			<div className={styles.CardBottom}>
				<span>{props.required}</span>
			</div>
		</div>
	);
};

const ColorPicker = (props) => {
	return (
		<div className={styles.SettingCard} id={props.id}>
			<div className={styles.CardTop}>
				<h4>{props.heading}</h4>
				<p>{props.what}</p>
				<p>Current Value: {props.value}</p>
				<p>Previous Value: {props.prevValue}</p>
				<input
					name="color"
					type="color"
					value={props.value}
					onChange={(event) => props.onChange(event)}
				/>
				<p>Color Score: {props.score}</p>
			</div>

			<div className={styles.CardBottom}>
				<span>{props.required}</span>
			</div>
		</div>
	);
};

const EducationCard = (props) => {
	return (
		<div className={styles.ProfileEducationCard}>
			<div className={styles.CardEduLeft}>
				<h4>{props.degree}</h4>
				<h4>{props.school}</h4>
				<span>{props.yearFrom}</span>
				{" - "}
				<span>{props.yearTo}</span>
			</div>

			{/* <div className={styles.CardEduRight}>
				<svg
					onClick={props.removeThisItem()}
					width="16px"
					height="16px"
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
			</div> */}
		</div>
	);
};

const Education = (props) => {
	let autoKey = 0;
	let educationArray = [];
	let len = 0;

	if (props.educationList) {
		educationArray = Object.keys(props.educationList).map((edu) => {
			return [...Array(props.educationList[edu])];
		});

		if (educationArray) {
			len = educationArray.length;
		}
	}

	const [degree, setDegree] = useState("");
	const [school, setSchool] = useState("");
	const [fromy, setFrom] = useState("");
	const [toy, setTo] = useState("");
	// console.log(degree, school, fromy, toy);

	const addIntoEduList = () => {
		// if (fromy.length > 4 || fromy.length <= 0) {
		// 	alert("Please enter a valid year.");
		// 	return;
		// } else if (toy.length > 0 && toy.length < 4) {
		// 	alert("If you are not studying here, then provide a valid year.");
		// 	return;
		// } else if (degree.length < 2) {
		// 	alert("Please provide a valid degree");
		// 	return;
		// } else if (school.length < 10 || school.length >= 71) {
		// 	alert(
		// 		"Provided institute name must contain 10 - 70 characters. Short forms not allowed"
		// 	);
		// 	return;
		// }

		let data = {
			degree: degree,
			school: school,
			yearFrom: fromy,
			yearTo: toy ? toy : "Moment",
		};

		if (props.addIntoList(data)) {
			setFrom("");
			setTo("");
			setDegree("");
			setSchool("");
		}
	};

	return (
		<div className={styles.SettingCard} id="education">
			<div className={styles.CardTop}>
				<h4>{props.heading}</h4>
			</div>

			<div className={styles.ProfileEducationSection}>
				{props.educationList && len > 0 ? (
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
					<span>Education not provided by user</span>
				)}
			</div>

			<div className={styles.CardTop}>
				<h4>Add New Education:</h4>
				<p>{props.what}</p>

				<input
					type="text"
					value={degree}
					minLength="1"
					maxLength="25"
					placeholder="Degree"
					onChange={(e) => setDegree(e.target.value)}
				/>
				<input
					type="text"
					value={school}
					minLength="10"
					maxLength="70"
					placeholder="School"
					onChange={(e) => setSchool(e.target.value)}
				/>
				<input
					type="number"
					value={fromy}
					placeholder="From Year"
					minLength="4"
					maxLength="4"
					onChange={(e) => {
						setFrom(e.target.value.substr(0, 4));
					}}
				/>
				<input
					type="number"
					value={toy}
					placeholder="To Year"
					minLength="4"
					maxLength="4"
					onChange={(e) => {
						setTo(e.target.value.substr(0, 4));
					}}
				/>
			</div>

			<div className={styles.RandomButton}>
				<button
					className={styles.LightDarkButton}
					onClick={addIntoEduList}
				>
					Add
				</button>
			</div>

			<div className={styles.CardBottom}>
				<span>{props.required}</span>
			</div>
		</div>
	);
};

const ImagePicker = (props) => {
	return (
		<div className={styles.SettingCard}>
			<div className={styles.CardTop}>
				<h4>{props.heading}</h4>
				<p>{props.what}</p>
				<img draggable="false" src={props.img} alt="update tavatar" />
			</div>

			<div className={styles.RandomButton}>
				<button
					className={styles.LightDarkButton}
					onClick={() => props.chooseRandomImg("")}
				>
					Suffle
				</button>
				<button
					className={styles.LightDarkButton}
					onClick={() => props.chooseRandomImg("m")}
				>
					Male
				</button>
				<button
					className={styles.LightDarkButton}
					onClick={() => props.chooseRandomImg("f")}
				>
					Female
				</button>
			</div>

			<div className={styles.CardBottom}>
				<span>{props.required}</span>
			</div>
		</div>
	);
};

const SocialLinks = (props) => {
	return (
		<div className={styles.SettingCard} id="sociallinks">
			<div className={styles.CardTop}>
				<h4>{props.heading}</h4>
				<p>{props.what}</p>
				<div className={styles.InputArea}>
					<span>Github</span>
					<input
						type="url"
						value={props.gvalue}
						onChange={(event) => props.onChangeG(event)}
						placeholder="https://github.com/{username}"
					/>
				</div>
				<div className={styles.InputArea}>
					<span>Linkedin</span>

					<input
						type="url"
						value={props.lvalue}
						onChange={(event) => props.onChangeL(event)}
						placeholder="https://www.linkedin.com/in/{username}"
					/>
				</div>
				<div className={styles.InputArea}>
					<span>Facebook</span>

					<input
						type="url"
						value={props.fvalue}
						onChange={(event) => props.onChangeF(event)}
						placeholder="https://www.facebook.com/{username}"
					/>
				</div>
				<div className={styles.InputArea}>
					<span>Instagram</span>

					<input
						type="url"
						value={props.ivalue}
						onChange={(event) => props.onChangeI(event)}
						placeholder="https://www.instagram.com/{username}"
					/>
				</div>
				<div className={styles.InputArea}>
					<span>Twitter</span>

					<input
						type="url"
						value={props.tvalue}
						onChange={(event) => props.onChangeT(event)}
						placeholder="https://twitter.com/{username}"
					/>
				</div>
			</div>

			<div className={styles.CardBottom}>
				<span>{props.required}</span>
			</div>
		</div>
	);
};

const DeleteAccount = (props) => {
	return (
		<div className={styles.SettingCard} id="deleteaccount">
			<div className={styles.CardTop}>
				<h4>{props.heading}</h4>
				<p>{props.what}</p>
				<button
					className={`${styles.LightDarkButton} ${styles.topbottom} ${styles.DangerButton}`}
					onClick={props.deleteUserAccount}
				>
					Delete Account
				</button>
			</div>

			<div className={styles.CardBottom}>
				<span>{props.required}</span>
			</div>
		</div>
	);
};

export default SettingCard;
export {
	PhoneNumberCard,
	EmailNotVeified,
	PasswordReset,
	ColorPicker,
	ImagePicker,
	SocialLinks,
	Education,
	DeleteAccount,
};
