import React, { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";
import styles from "../../hoc/Css";

function PasswordStrengthMeter(props) {
	const { password } = props;
	const testedResult = zxcvbn(password);
	const [scoreLable, setScoreLable] = useState("");

	const createPasswordLabel = () => {
		switch (testedResult.score) {
			case 0:
				setScoreLable("");
				break;
			case 1:
				setScoreLable("Weak");
				break;
			case 2:
				setScoreLable("Fair");
				break;
			case 3:
				setScoreLable("Good");
				break;
			case 4:
				setScoreLable("Strong");
				break;
			default:
				setScoreLable("Weak");
		}
	};

	useEffect(() => {
		createPasswordLabel();
	}, [password]);

	return (
		<div className={styles.passwordStrengthMeter}>
			<div className={styles.passwordStrengthMeterProgress}>
				<div
					className={`${
						scoreLable === "Weak"
							? styles.weakPass
							: scoreLable === "Fair"
							? styles.fairPass
							: scoreLable === "Good"
							? styles.goodPass
							: scoreLable === "Strong"
							? styles.strongPass
							: null
					} ${styles.passStrength}`}
					value={testedResult.score}
					min="0"
					max="4"
				></div>
			</div>

			<label className={styles.passwordStrengthMeterLabel}>
				Password Strength: {scoreLable}
			</label>
		</div>
	);
}

export default PasswordStrengthMeter;
