import {useFormik} from "formik";
import differenceBy from "lodash/differenceBy";
import find from "lodash/find";
import React, {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import Button from "@/components-v2/Button";
import Input from "@/components-v2/Input";
import MainBlock from "@/components-v2/MainBlock";
import SelectPopup from "@/components-v2/SelectPopup";
import SmallInput from "@/components-v2/SmallInput";
import SwapButton from "@/components-v2/SwapButton";
import {AB_DIRECTION, BA_DIRECTION} from "@/constants/runtimeVariables";
import useSelectPopup from "@/hooks/useSelectPopup";
import truncateNum from "@/utils/truncateNum";

import classes from "./index.module.scss";

export default function LimitOrderPage() {
	const history = useHistory();

	const dispatch = useDispatch();
	const walletConnected = useSelector(
		(state) => state.appReducer.walletIsConnected,
	);
	const tokens = useSelector((state) => state.tonData.tokens);
	const pairs = useSelector((state) => state.tonData.pairs);

	const {
		errors,
		handleBlur,
		handleChange,
		handleSubmit,
		setFieldError,
		setFieldValue,
		touched,
		values,
	} = useFormik({
		initialValues: {
			fromToken: null,
			fromValue: "",
			pair: null,
			toPrice: "",
			toToken: null,
			toValue: "",
		},
		validate,
	});

	const leftTokens = useMemo(
		() =>
			differenceBy(
				tokens,
				[values.fromToken, values.toToken],
				(t) => t && t.rootAddress,
			),
		[tokens, values.fromToken, values.toToken],
	);

	// Find the pair
	useEffect(() => {
		const {fromToken, toToken} = values;
		if (!pairs.length || !fromToken || !toToken) return;

		setFieldValue(
			"pair",
			find(pairs, {
				rootA: fromToken.rootAddress,
				rootB: toToken.rootAddress,
			}) ||
				find(pairs, {
					rootA: toToken.rootAddress,
					rootB: fromToken.rootAddress,
				}),
		);
	}, [pairs, values.fromToken, values.toToken]);

	const directionPair = useMemo(() => {
		const {fromToken, pair} = values;
		if (fromToken && pair)
			return fromToken.rootAddress === pair.rootA ? AB_DIRECTION : BA_DIRECTION;
	}, [values.fromToken, values.pair]);

	const rate = useMemo(() => {
		const {pair} = values;
		if (directionPair)
			return directionPair === AB_DIRECTION ? pair.rateAB : pair.rateBA;
	}, [directionPair, values.pair]);

	// Calculate "To" value
	useEffect(() => {
		setFieldValue("toValue", values.fromValue * values.toPrice);
	}, [values.fromValue, values.toPrice]);

	function handleCreateLimitOrder() {
		/**
		 * Handle create limit order
		 */
	}

	function handleConnectPair() {
		/**
		 * Handle pair connect
		 */
	}

	function handleMaxClick() {
		setFieldValue("fromValue", values.fromToken.balance);
	}

	function handleConnectWallet() {
		history.push("/account");
	}

	function handleTokensInvert() {
		setFieldValue("fromToken", values.toToken);
		setFieldValue("toToken", values.fromToken);
	}

	function handleSetToMarket() {
		if (!rate) setFieldError("toPrice", "First select tokens");
		else setFieldValue("toPrice", rate);
	}

	const CurrentButton = useMemo(() => {
		const props = {
			className: "mainblock-btn",
		};

		if (!walletConnected) {
			props.children = "Connect wallet";
			props.onClick = handleConnectWallet;
			props.type = "button";
		} else if (values.fromToken && values.toToken && !values.pair) {
			props.children = "Connect pair";
			props.onClick = handleConnectPair;
			props.type = "button";
		} else {
			props.children = "Create limit order";
			props.type = "submit";
		}

		return function CurrentButton(p) {
			return <Button {...props} {...p} />;
		};
	}, [walletConnected, values.pair, values.fromToken, values.toToken]);
	console.log(errors);

	const selectFromPopup = useSelectPopup((t) => setFieldValue("fromToken", t));
	const selectToPopup = useSelectPopup((t) => setFieldValue("toToken", t));

	return (
		<>
			<div className="container">
				<MainBlock
					smallTitle={false}
					content={
						<div>
							<div className="head_wrapper" style={{marginBottom: "40px"}}>
								<div
									className="left_block"
									style={{color: "var(--mainblock-title-color)"}}
								>
									Limit order
								</div>
							</div>
							<form onSubmit={handleSubmit}>
								<Input
									label="From"
									name="fromValue"
									value={values.fromValue}
									onValueBlur={handleBlur}
									onValueChange={handleChange}
									onSelectClick={selectFromPopup.handleOpen}
									onMaxClick={handleMaxClick}
									token={values.fromToken}
									error={
										touched.fromValue && (errors.fromValue || errors.fromToken)
									}
									helperText={
										touched.fromValue && (errors.fromValue || errors.fromToken)
									}
								/>
								<SwapButton
									onClick={handleTokensInvert}
									className="swap-btn"
									type="button"
								/>
								<Input
									label="To"
									name="toValue"
									notExact
									value={values.toValue}
									onValueBlur={handleBlur}
									onValueChange={handleChange}
									onSelectClick={selectToPopup.handleOpen}
									token={values.toToken}
									error={touched.toToken && errors.toToken}
									helperText={
										(touched.toToken && errors.toToken) ||
										"Field is automatically calculated"
									}
									readOnly
								/>
								{walletConnected && (
									<div className={classes.orders__price_box}>
										<SmallInput
											name="toPrice"
											label="Limit order price"
											onBlur={handleBlur}
											onChange={handleChange}
											onSetToMarket={handleSetToMarket}
											token={values.toToken}
											touched={touched.toPrice}
											value={values.toPrice}
											error={touched.toPrice && errors.toPrice}
											helperText={touched.toPrice && errors.toPrice}
										/>
									</div>
								)}
								<CurrentButton />
								{values.pair && (
									<p className="swap-rate">
										Price{" "}
										<span>
											{truncateNum(rate)} {values.toToken.symbol}
										</span>{" "}
										per <span>1 {values.fromToken.symbol}</span>
									</p>
								)}
							</form>
						</div>
					}
				/>
			</div>
			{selectFromPopup.open && (
				<SelectPopup
					tokens={leftTokens}
					onClose={selectFromPopup.handleClose}
					onSelect={selectFromPopup.handleSelect}
				/>
			)}
			{selectToPopup.open && (
				<SelectPopup
					tokens={leftTokens}
					onClose={selectToPopup.handleClose}
					onSelect={selectToPopup.handleSelect}
				/>
			)}
		</>
	);
}

function validate(values) {
	const errors = {};

	const MUST_BE_NUMBER = "Input value must be a number";
	const POSITIVE_NUMBER = "Use positive number";
	const SELECT_TOKEN = "You must select token";
	const BALANCE_EXCEEDS = "Input value exceeds balance";
	const NO_PAIR = "Selected pair doesn't exist";

	if (isNaN(+values.fromValue)) errors.fromValue = MUST_BE_NUMBER;
	else if (values.fromValue <= 0) errors.fromValue = POSITIVE_NUMBER;

	if (isNaN(+values.toPrice)) errors.toPrice = MUST_BE_NUMBER;
	else if (values.toPrice <= 0) errors.toPrice = POSITIVE_NUMBER;

	if (!values.fromToken) errors.fromToken = SELECT_TOKEN;
	else if (values.fromValue > values.fromToken.balance)
		errors.fromToken = BALANCE_EXCEEDS;

	if (!values.toToken) errors.toToken = SELECT_TOKEN;

	if (values.fromToken && values.toToken && !values.pair) errors.pair = NO_PAIR;

	console.log(errors);

	return errors;
}
