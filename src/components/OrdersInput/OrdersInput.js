import "./OrdersInput.scss";

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

import {iconGenerator} from "../../iconGenerator";
import {showPopup} from "../../store/actions/app";
import {
	setOrdersFromInputValue,
	setOrdersToInputValue,
	showOrdersFromSelect,
	showOrdersToSelect,
} from "../../store/actions/limitOrder";
import {setPoolRate} from "../../store/actions/pool";
import {setSwapRate} from "../../store/actions/swap";
import truncateNum from "../../utils/truncateNum";
import Select from "../Select/Select";

function OrdersInput(props) {
	const dispatch = useDispatch();
	const location = useLocation();

	const walletIsConnected = useSelector(
		(state) => state.appReducer.walletIsConnected,
	);

	const swapFromSelectIsVisible = useSelector(
		(state) => state.limitOrders.ordersFromSelectIsVisible,
	);
	const swapToSelectIsVisible = useSelector(
		(state) => state.limitOrders.ordersToSelectIsVisible,
	);
	const revertValue = useSelector((state) => state.limitOrders.revertValue);

	const poolFromSelectIsVisible = useSelector(
		(state) => state.poolReducer.poolFromSelectIsVisible,
	);
	const poolToSelectIsVisible = useSelector(
		(state) => state.poolReducer.poolToSelectIsVisible,
	);

	const swapFromToken = useSelector((state) => state.limitOrders.fromToken);
	const swapToToken = useSelector((state) => state.limitOrders.toToken);

	const poolFromToken = useSelector((state) => state.poolReducer.fromToken);
	const poolToToken = useSelector((state) => state.poolReducer.toToken);

	const pairsList = useSelector((state) => state.walletReducer.pairsList);

	const swapRate = useSelector((state) => state.limitOrders.rate);
	//console.log(pairsList, swapRate, poolRate, poolFromToken, poolToToken, poolFromValue, swapFromValue, swapFromToken, poolToValue, swapToValue);

	const fromInputValue = useSelector(
		(state) => state.limitOrders.fromInputValue,
	);
	const toInputValue = useSelector((state) => state.limitOrders.toInputValue);

	const [value, setValue] = useState(
		props.type === "from" ? fromInputValue : toInputValue,
	);

	useEffect(async () => {
		if (
			location.pathname.includes("orders") &&
			swapFromToken.symbol &&
			swapToToken.symbol
		) {
			pairsList.forEach((i) => {
				if (
					i.symbolA === swapFromToken.symbol &&
					i.symbolB === swapToToken.symbol
				) {
					dispatch(setSwapRate(i.rateAB));
				} else if (
					i.symbolB === swapFromToken.symbol &&
					i.symbolA === swapToToken.symbol
				) {
					dispatch(setSwapRate(i.rateBA));
				}
			});
		}
		if (
			location.pathname.includes("add-liquidity") &&
			poolFromToken.symbol &&
			poolToToken.symbol
		) {
			pairsList.forEach((i) => {
				if (
					i.symbolA === poolFromToken.symbol &&
					i.symbolB === poolToToken.symbol
				) {
					dispatch(setPoolRate(i.rateAB));
				} else if (
					i.symbolB === poolFromToken.symbol &&
					i.symbolA === poolToToken.symbol
				) {
					dispatch(setPoolRate(i.rateBA));
				}
			});
		}
	}, [swapFromToken, swapToToken, poolFromToken, poolToToken, pairsList]);

	useEffect(() => {
		if (props.type === "from")
			// props.type === "from" just to make sure it was called only once
			dispatch(setOrdersToInputValue(truncateNum(fromInputValue * swapRate)));
	}, [swapRate]);

	useEffect(() => {
		if (props.type === "from")
			// props.type === "from" just to make sure it was called only once
			dispatch(setOrdersToInputValue(truncateNum(fromInputValue * swapRate)));

		if (props.type === "from") setValue(fromInputValue);
	}, [fromInputValue]);

	useEffect(() => {
		if (props.type === "to") setValue(toInputValue);
	}, [toInputValue]);

	async function handleClick() {
		try {
			if (props.type === "to" && !swapFromToken.symbol) {
				dispatch(
					showPopup({
						type: "error",
						message: "Please, choose from token first.",
					}),
				);
			} else {
				dispatch(
					props.type === "from" ? showOrdersFromSelect() : showOrdersToSelect(),
				);
			}
		} catch (e) {
			dispatch(
				showPopup({
					type: "error",
					message: "Oops, something went wrong. Please try again.",
				}),
			);
		}
	}

	function handleChange(event) {
		const numValue = Number(event.target.value);

		if (props.type === "from" && props.type !== "to") {
			setValue(numValue);
			dispatch(setOrdersFromInputValue(numValue));
		} else {
			throw new Error('OrdersInput type can only be "from" or "to"');
		}
	}

	function handleKeyPress(event) {
		console.log(event, "evern");
		if (event.key === "-" || event.key === "+") {
			event.preventDefault();
		}
	}

	const [changer] = useState(0);
	useEffect(() => {
		console.log(changer, "changer");
		if (
			location.pathname.includes("orders") &&
			swapFromToken.symbol &&
			swapToToken.symbol
		) {
			// if()
			setValue(changer);
		}
		if (
			location.pathname.includes("add-liquidity") &&
			poolFromToken.symbol &&
			poolToToken.symbol
		) {
			setValue(changer);
		}
	}, [changer]);
	useEffect(() => {
		setValue(revertValue);
	}, [revertValue]);

	const [incorrectValue, setIncorrect] = useState(false);
	useEffect(() => {
		if (props.type === "to") {
			console.log(
				"props.incorrectBalanceToValue",
				props.incorrectBalanceToValue,
			);
			setIncorrect(props.incorrectBalanceToValue);
		} else {
			console.log("props.incorrectBalance", props.incorrectBalance);
			setIncorrect(props.incorrectBalance);
		}
	}, [props.incorrectBalanceToValue, props.incorrectBalance]);

	return (
		<>
			<div className="input">
				<div className="input-wrapper">
					<span className="input-title">{props.text}</span>
					<span
						className={
							incorrectValue ? "input-balance incorBalance " : "input-balance"
						}
					>
						{walletIsConnected &&
							props.token.symbol &&
							`Balance: ${
								props.token.balance < 0.0001
									? parseFloat(props.token.balance.toFixed(8))
									: parseFloat(props.token.balance.toFixed(4))
							}
							`}
					</span>
				</div>
				<div className="input-wrapper">
					<input
						type="number"
						className={
							props.value > 0 ? "input-field" : "input-field input-field--zero"
						}
						value={value}
						onChange={handleChange}
						onKeyPress={handleKeyPress}
						min="0"
						autoFocus={props.autoFocus || false}
						placeholder="0"
						readOnly={props.readOnly}
					/>

					{!props.token.symbol ? (
						<button className="btn input-btn" onClick={() => handleClick()}>
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
							{walletIsConnected && props.type === "from" && (
								<button
									className="input-max"
									onClick={() =>
										setValue(parseFloat(props.token.balance).toFixed(4))
									}
								>
									MAX
								</button>
							)}
							<button className="input-select" onClick={() => handleClick()}>
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

			{swapFromSelectIsVisible && props.type === "from" && (
				<Select type={props.type} />
			)}
			{swapToSelectIsVisible && props.type === "to" && (
				<Select type={props.type} />
			)}

			{poolFromSelectIsVisible && props.type === "from" && (
				<Select type={props.type} />
			)}
			{poolToSelectIsVisible && props.type === "to" && (
				<Select type={props.type} />
			)}
		</>
	);
}

export default OrdersInput;
