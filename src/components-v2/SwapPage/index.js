import "./index.scss";

import {useFormik} from "formik";
import differenceBy from "lodash/differenceBy";
import find from "lodash/find";
import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Button from "@/components-v2/Button";
import Input from "@/components-v2/Input";
import MainBlock from "@/components-v2/MainBlock";
import SelectPopup from "@/components-v2/SelectPopup";
import SettingsButton from "@/components-v2/SettingsButton";
import SlippagePopup from "@/components-v2/SlippagePopup";
import SwapButton from "@/components-v2/SwapButton";
import {AB_DIRECTION, BA_DIRECTION} from "@/constants/runtimeVariables";
import {setSlippageValue, setSwapPopupValues} from "@/store/actions/swap";
import truncateNum from "@/utils/truncateNum";

export default function SwapPage() {
	const dispatch = useDispatch();

	const walletConnected = useSelector(
		(state) => state.appReducer.walletIsConnected,
	);
	const tokens = useSelector((state) => state.tonData.tokens);
	const pairs = useSelector((state) => state.tonData.pairs);
	const slippage = useSelector((state) => state.swapReducer.slippage);

	const {
		errors,
		handleBlur,
		handleChange,
		handleSubmit,
		setFieldValue,
		touched,
		values,
	} = useFormik({
		initialValues: {
			fromToken: null,
			fromValue: "",
			pair: null,
			slippage,
			toToken: null,
			toValue: "",
		},
		onSubmit: handleSwap,
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

	// Calculate pair
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
		if (!rate) return;
		setFieldValue("toValue", values.fromValue * rate);
	}, [values.fromValue, rate]);

	function handleSwap(values) {
		dispatch(setSwapPopupValues(values));
	}

	function handleConnectPair() {
		/**
		 * Handle connect pair
		 */
	}

	function handleConnectWallet() {
		history.push("/account");
	}

	function handleTokensInvert() {
		setFieldValue("fromToken", values.toToken);
		setFieldValue("toToken", values.fromToken);
		setFieldValue("fromValue", values.toValue);
		setFieldValue("toValue", values.fromValue);
	}

	function handleMaxClick() {
		setFieldValue("fromValue", values.fromToken.balance);
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
			props.type = "submit";
		} else {
			props.children = "Swap";
			props.type = "submit";
		}

		return function CurrentButton(p) {
			return <Button {...props} {...p} />;
		};
	}, [walletConnected, values.pair, values.fromToken, values.toToken]);

	// Store slippage globally
	useEffect(() => {
		if (values.slippage !== slippage)
			dispatch(setSlippageValue(values.slippage));
	}, [values.slippage]);

	// Update selected token data on callback
	useEffect(() => {
		if (values.fromToken)
			setFieldValue(
				"fromToken",
				find(tokens, {rootAddress: values.fromToken.rootAddress}),
			);
		if (values.toToken)
			setFieldValue(
				"toToken",
				find(tokens, {rootAddress: values.toToken.rootAddress}),
			);
	}, [tokens]);

	// Update selected pair on callback
	useEffect(() => {
		if (values.pair)
			setFieldValue(
				"pair",
				find(pairs, {pairAddress: values.pair.pairAddress}),
			);
	}, [pairs]);

	const slippagePopup = useSlippagePopup((v) => setFieldValue("slippage", v));
	const selectFromPopup = useSelectPopup((t) => setFieldValue("fromToken", t));
	const selectToPopup = useSelectPopup((t) => setFieldValue("toToken", t));

	return (
		<>
			<div className="container">
				<MainBlock
					smallTitle={false}
					content={
						<div style={{display: "contents"}}>
							<div className="head_wrapper" style={{marginBottom: "40px"}}>
								<div
									className="left_block"
									style={{color: "var(--mainblock-title-color)"}}
								>
									Swap
								</div>
								<div className="settings_btn_container">
									<SettingsButton
										aria-describedby={slippagePopup.id}
										onClick={slippagePopup.handleClick}
									/>
								</div>
							</div>
							<form onSubmit={handleSubmit}>
								<Input
									label="From"
									name="fromValue"
									value={values.fromValue}
									onMaxClick={handleMaxClick}
									onValueChange={handleChange}
									onValueBlur={handleBlur}
									onSelectClick={selectFromPopup.handleOpen}
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
									value={values.toValue}
									onValueChange={handleChange}
									onValueBlur={handleBlur}
									onSelectClick={selectToPopup.handleOpen}
									token={values.toToken}
									error={touched.toToken && errors.toToken}
									helperText={
										(touched.toToken && errors.toToken) ||
										"Field is automatically calculated"
									}
									readOnly
								/>
								<CurrentButton />
								{rate && (
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
					footer={
						values.fromToken &&
						values.toToken && (
							<div className="mainblock-footer">
								<div
									className="mainblock-footer-wrap"
									style={{justifyContent: "space-around"}}
								>
									<div className="swap-confirm-wrap">
										<p className="mainblock-footer-value">
											{truncateNum(
												values.toValue -
													(values.toValue * values.slippage) / 100,
											)}{" "}
											{values.toToken.symbol}
										</p>
										<p className="mainblock-footer-subtitle">
											Minimum <br /> received
										</p>
									</div>
									<div className="swap-confirm-wrap">
										<p className="mainblock-footer-value">
											{values.pair
												? truncateNum((values.fromValue * 0.3) / 100)
												: 0.0}{" "}
											{values.fromToken.symbol}
										</p>
										<p className="mainblock-footer-subtitle">
											Liquidity <br /> Provider Fee
										</p>
									</div>
								</div>
							</div>
						)
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
			{slippagePopup.open && (
				<SlippagePopup
					id={slippagePopup.id}
					open={slippagePopup.open}
					anchorEl={slippagePopup.anchorEl}
					onClose={slippagePopup.handleClick}
					value={values.slippage}
					onChange={slippagePopup.handleChange}
				/>
			)}
		</>
	);
}

function useSlippagePopup(setValue) {
	const [anchorEl, setAnchorEl] = useState(null);

	function handleClick(event) {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	}

	function handleChange(values) {
		setValue(values.floatValue);
	}

	const open = Boolean(anchorEl);
	const id = open ? "simple-popper" : undefined;

	return {
		anchorEl,
		handleChange,
		handleClick,
		id,
		open,
	};
}

function useSelectPopup(setToken) {
	const [open, setOpen] = useState(false);

	function handleSelect(e, t) {
		setToken(t);
		setOpen(false);
	}

	function handleOpen() {
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
	}

	return {
		handleClose,
		handleOpen,
		handleSelect,
		open,
	};
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

	if (isNaN(+values.toValue)) errors.toValue = MUST_BE_NUMBER;
	else if (values.toValue <= 0) errors.toValue = POSITIVE_NUMBER;

	if (!values.fromToken) errors.fromToken = SELECT_TOKEN;
	else if (values.fromValue > values.fromToken.balance)
		errors.fromToken = BALANCE_EXCEEDS;

	if (!values.toToken) errors.toToken = SELECT_TOKEN;

	if (values.fromToken && values.toToken && !values.pair) errors.pair = NO_PAIR;

	return errors;
}
