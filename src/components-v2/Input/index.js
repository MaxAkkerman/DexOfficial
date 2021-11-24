import "./index.scss";

import PropTypes from "prop-types";
import React, {useState} from "react";

import {iconGenerator} from "@/iconGenerator";
import truncateNum from "@/utils/truncateNum";

export default function Input(props) {
	const [value, setValue] = useState(props.value);

	const [incorrectValue, setIncorrect] = useState(false);

	function handleKeyPress(event) {
		if (event.key === "-" || event.key === "+") {
			event.preventDefault();
		}
	}

	return (
		<>
			<div
				className="input"
				style={{
					borderColor: props.error
						? "var(--error)"
						: "var(--input-border-color)",
				}}
			>
				<div className="input-wrapper">
					<span className="input-title">{props.label}</span>
					<span
						className={
							incorrectValue ? "input-balance incorBalance " : "input-balance"
						}
					>
						{props.token && `Balance: ${truncateNum(props.token.balance)}`}
					</span>
				</div>
				<div className="input-wrapper">
					<input
						type="number"
						className={
							props.value > 0 ? "input-field" : "input-field input-field--zero"
						}
						value={value}
						onChange={(event) => {
							const newValue = event.target.value;
							setValue(newValue);
							props.onValueChange(newValue);
						}}
						onKeyPress={(event) => handleKeyPress(event)}
						min={0}
						autoFocus={props.autoFocus}
						placeholder="0"
						readOnly={props.readOnly}
					/>

					{!props.token ? (
						<button className="btn input-btn" onClick={props.onSelectToken}>
							Select a token
							<svg
								width="16"
								height="10"
								viewBox="0 0 16 10"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M3.06066 0.93934C2.47487 0.353553 1.52513 0.353553 0.93934 0.93934C0.353553 1.52513 0.353553 2.47487 0.93934 3.06066L3.06066 0.93934ZM8 8L6.93934 9.06066C7.52513 9.64645 8.47487 9.64645 9.06066 9.06066L8 8ZM15.0607 3.06066C15.6464 2.47487 15.6464 1.52513 15.0607 0.93934C14.4749 0.353553 13.5251 0.353553 12.9393 0.93934L15.0607 3.06066ZM0.93934 3.06066L6.93934 9.06066L9.06066 6.93934L3.06066 0.93934L0.93934 3.06066ZM9.06066 9.06066L15.0607 3.06066L12.9393 0.93934L6.93934 6.93934L9.06066 9.06066Z"
									fill="white"
								/>
							</svg>
						</button>
					) : (
						<>
							<button
								className="input-max"
								onClick={() =>
									setValue(parseFloat(props.token.balance).toFixed(4))
								}
							>
								MAX
							</button>
							<button className="input-select" onClick={props.onSelectToken}>
								<img
									src={iconGenerator(props.token.symbol)}
									alt={props.token.symbol}
									className="input-token-img"
								/>
								<span>{props.token && props.token.symbol}</span>
								<svg
									width="16"
									height="10"
									viewBox="0 0 16 10"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M3.06066 0.93934C2.47487 0.353553 1.52513 0.353553 0.93934 0.93934C0.353553 1.52513 0.353553 2.47487 0.93934 3.06066L3.06066 0.93934ZM8 8L6.93934 9.06066C7.52513 9.64645 8.47487 9.64645 9.06066 9.06066L8 8ZM15.0607 3.06066C15.6464 2.47487 15.6464 1.52513 15.0607 0.93934C14.4749 0.353553 13.5251 0.353553 12.9393 0.93934L15.0607 3.06066ZM0.93934 3.06066L6.93934 9.06066L9.06066 6.93934L3.06066 0.93934L0.93934 3.06066ZM9.06066 9.06066L15.0607 3.06066L12.9393 0.93934L6.93934 6.93934L9.06066 9.06066Z"
										fill="white"
									/>
								</svg>
							</button>
						</>
					)}
				</div>
			</div>
		</>
	);
}

Input.propTypes = {
	label: PropTypes.string.isRequired,
	readOnly: PropTypes.bool,
	autoFocus: PropTypes.bool,
	value: PropTypes.number.isRequired,
	onValueChange: PropTypes.func.isRequired,
	token: PropTypes.exact({
		symbol: PropTypes.string.isRequired,
		balance: PropTypes.number.isRequired,
	}),
	onSelectToken: PropTypes.func.isRequired,
	error: PropTypes.bool,
	helperText: PropTypes.string,
};

Input.defaultProps = {
	readOnly: false,
	autoFocus: false,
	token: null,
	error: false,
	helperText: "",
};
