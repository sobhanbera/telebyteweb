import React from "react";
import zxcvbn from "zxcvbn";
import styles from "../elements/styles/style";

function PasswordStrengthMeter(props) {
	const { password } = props;
	const passScore = zxcvbn(password).score;

	return (
		<div className={styles.passwordStrengthMeter}>
			<div className={styles.passwordStrengthMeterProgress}>
				<div
					className={`${
						passScore === 1
							? styles.weakPass
							: passScore === 2
							? styles.fairPass
							: passScore === 3
							? styles.goodPass
							: passScore > 3
							? styles.strongPass
							: null
					} ${styles.passStrength} ${
						passScore > 3 && props.extraClass
							? styles.completePass
							: ""
					}`}
					value={passScore}
					min="0"
					max="4"
				></div>
			</div>

			<label className={styles.passwordStrengthMeterLabel}>
				Password Strength:{" "}
				{passScore <= 1
					? "weak"
					: passScore === 2
					? "fair"
					: passScore === 3
					? "good"
					: passScore > 3
					? "strong"
					: null}
			</label>
		</div>
	);
}

export default PasswordStrengthMeter;
