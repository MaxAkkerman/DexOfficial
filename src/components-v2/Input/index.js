import "./index.scss";

import {FormHelperText} from "@mui/material";
import cls from "classnames";
import PropTypes from "prop-types";
import React, {useRef} from "react";

import {iconGenerator} from "@/iconGenerator";
import truncateNum from "@/utils/truncateNum";

export default function Input({
	autoFocus,
	error,
	helperText,
	label,
	name,
	onSelectClick,
	onValueBlur,
	onValueChange,
	readOnly,
	token,
	value,
}) {
	const inputRef = useRef(null);

	return (
		<>
			<div
				className="input"
				style={{
					borderColor: error ? "var(--error)" : "var(--input-border-color)",
				}}
			>
				<div className="input-wrapper">
					<span className="input-title">{label}</span>
					<span className={cls("input-balance", {incorBalance: error})}>
						{token && `Balance: ${truncateNum(token.balance)}`}
					</span>
				</div>
				<div className="input-wrapper">
					<input
						type="number"
						className="input-field"
						name={name}
						value={value}
						onChange={onValueChange}
						onBlur={onValueBlur}
						autoFocus={autoFocus}
						placeholder="0"
						readOnly={readOnly}
						ref={inputRef}
					/>

					{!token ? (
						<button
							className="btn input-btn"
							onClick={onSelectClick}
							type="button"
						>
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
								onClick={() => {
									inputRef.current.value = token.balance.toFixed(4);
									const event = new Event("input", {bubbles: true});
									inputRef.current.dispatchEvent(event);
								}}
							>
								MAX
							</button>
							<button
								className="input-select"
								onClick={onSelectClick}
								type="button"
							>
								<img
									src={iconGenerator(token.symbol)}
									alt={token.symbol}
									className="input-token-img"
								/>
								<span>{token && token.symbol}</span>
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
			{helperText && (
				<FormHelperText error={error} sx={{marginLeft: "27px"}}>
					{helperText}
				</FormHelperText>
			)}
		</>
	);
}

Input.propTypes = {
	autoFocus: PropTypes.bool,
	error: PropTypes.bool,
	helperText: PropTypes.string,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onSelectClick: PropTypes.func.isRequired,
	onValueBlur: PropTypes.func.isRequired,
	onValueChange: PropTypes.func.isRequired,
	readOnly: PropTypes.bool,
	token: PropTypes.exact({
		balance: PropTypes.number.isRequired,
		decimals: PropTypes.string.isRequired,
		icon: PropTypes.string.isRequired,
		owner_address: PropTypes.string.isRequired,
		rootAddress: PropTypes.string.isRequired,
		symbol: PropTypes.string.isRequired,
		tokenName: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		walletAddress: PropTypes.string.isRequired,
	}),
	value: PropTypes.number.isRequired,
};

Input.defaultProps = {
	autoFocus: false,
	error: false,
	helperText: "Type numeric value",
	readOnly: false,
	token: null,
	walletAddress: null,
};
