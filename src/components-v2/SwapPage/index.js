import "./index.scss";

import {useFormik} from "formik";
import differenceBy from "lodash/differenceBy";
import find from "lodash/find";
import React, {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";

import Button from "@/components-v2/Button";
import Input from "@/components-v2/Input";
import MainBlock from "@/components-v2/MainBlock";
import SelectPopup from "@/components-v2/SelectPopup";
import SettingsButton from "@/components-v2/SettingsButton";
import SwapButton from "@/components-v2/SwapButton";
import {AB_DIRECTION, BA_DIRECTION} from "@/constants/runtimeVariables";
import {setSwapValues} from "@/store/actions/swap";
import truncateNum from "@/utils/truncateNum";

export default function SwapPage() {
	const dispatch = useDispatch();

	const walletConnected = useSelector(
		(state) => state.appReducer.walletIsConnected,
	);
	const tokenList = useSelector((state) => state.walletReducer.tokenList);
	const pairList = useSelector((state) => state.walletReducer.pairsList);

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
			slippage: 0,
			toToken: null,
			toValue: "",
		},
		validate,
	});

	const leftTokens = useMemo(
		() =>
			differenceBy(
				tokenList,
				[values.fromToken, values.toToken],
				(t) => t && t.rootAddress,
			),
		[tokenList, values.fromToken, values.toToken],
	);

	// Calculate pair
	useEffect(() => {
		const {fromToken, toToken} = values;
		if (!pairList.length || !fromToken || !toToken) return;

		setFieldValue(
			"pair",
			find(pairList, {
				rootA: fromToken.rootAddress,
				rootB: toToken.rootAddress,
			}) ||
				find(pairList, {
					rootA: toToken.rootAddress,
					rootB: fromToken.rootAddress,
				}),
		);
	}, [pairList, values.fromToken, values.toToken]);

	const directionPair = useMemo(() => {
		const {fromToken, pair} = values;
		if (fromToken && pair)
			return fromToken.rootAddress === pair.rootA ? AB_DIRECTION : BA_DIRECTION;
	}, [values.fromToken, values.pair]);

	const rate = useMemo(() => {
		const {pair} = values;
		if (!directionPair || !pair) return;
		return directionPair === AB_DIRECTION ? pair.rateAB : pair.rateBA;
	}, [directionPair, values.pair]);

	// Calculate "to" value
	useEffect(() => {
		const {fromValue} = values;
		if (!fromValue || !rate) return;
		setFieldValue("toValue", values.fromValue * rate);
	}, [values.fromValue, rate]);

	const {fromSelectPopup, toSelectPopup} = useSelectPopups(setFieldValue);

	function handleSwap(values) {
		dispatch(setSwapValues(values));
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
	}

	const CurrentButton = useMemo(() => {
		const props = {
			className: "mainblock-btn",
		};

		if (!walletConnected) {
			props.children = "Connect wallet";
			props.onClick = handleConnectWallet;
		} else if (values.fromToken && values.toToken && !values.pair) {
			props.children = "Connect pair";
			props.onClick = handleConnectPair;
		} else {
			props.children = "Swap";
			props.onClick = handleSwap;
		}

		return function CurrentButton(p) {
			return <Button {...props} {...p} />;
		};
	}, [walletConnected, values.pair, values.fromToken, values.toToken]);

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
										aria-describedby={"popperState.id"}
										onClick={"popperState.handleClick"}
									/>
								</div>
							</div>
							<form onSubmit={handleSubmit}>
								<Input
									label="From"
									name="fromValue"
									value={values.fromValue}
									onValueChange={handleChange}
									onValueBlur={handleBlur}
									onSelectClick={fromSelectPopup.open}
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
									onSelectClick={toSelectPopup.open}
									token={values.toToken}
									error={touched.toToken && errors.toToken}
									helperText={
										(touched.toToken && errors.toToken) ||
										"Field is automatically calculated"
									}
									readOnly
								/>
								<CurrentButton type="submit" />
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
											{parseFloat(
												(
													values.toValue -
													(values.toValue * values.slippageTolerance) / 100
												).toFixed(4),
											)}{" "}
											{values.toToken.symbol}
										</p>
										<p className="mainblock-footer-subtitle">
											Minimum <br /> received
										</p>
									</div>
									<div className="swap-confirm-wrap">
										<p className="mainblock-footer-value">
											{values.fromValue && values.fromValue !== 0
												? ((values.fromValue * 0.3) / 100).toFixed(4)
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
			{fromSelectPopup && (
				<SelectPopup
					tokens={leftTokens}
					open={fromSelectPopup.state}
					onClose={fromSelectPopup.close}
					onSelect={fromSelectPopup.select}
				/>
			)}
			{toSelectPopup && (
				<SelectPopup
					tokens={leftTokens}
					open={toSelectPopup.state}
					onClose={toSelectPopup.close}
					onSelect={toSelectPopup.select}
				/>
			)}
		</>
	);
}

function useSelectPopups(setFieldValue) {
	const [fromPopupOpen, setFromPopupOpen] = useState(false);
	const [toPopupOpen, setToPopupOpen] = useState(false);

	function selectFromToken(e, t) {
		setFieldValue("fromToken", t);
		setFromPopupOpen(false);
	}
	function openFromTokenPopup() {
		setFromPopupOpen(true);
	}
	function closeFromTokenPopup() {
		setFromPopupOpen(false);
	}

	function selectToToken(e, t) {
		setFieldValue("toToken", t);
		setToPopupOpen(false);
	}
	function openToTokenPopup() {
		setToPopupOpen(true);
	}
	function closeToTokenPopup() {
		setToPopupOpen(false);
	}

	return {
		fromSelectPopup: {
			close: closeFromTokenPopup,
			open: openFromTokenPopup,
			select: selectFromToken,
			state: fromPopupOpen,
		},
		toSelectPopup: {
			close: closeToTokenPopup,
			open: openToTokenPopup,
			select: selectToToken,
			state: toPopupOpen,
		},
	};
}

function validate(values) {
	const errors = {};

	const MUST_BE_NUMBER = "Input value must be a number";
	errors.fromValue = isNaN(+values.fromValue) && MUST_BE_NUMBER;
	errors.toValue = isNaN(+values.toValue) && MUST_BE_NUMBER;

	const POSITIVE_NUMBER = "Use positive number";
	errors.fromValue =
		errors.fromValue || (values.fromValue <= 0 && POSITIVE_NUMBER);
	errors.toValue = errors.toValue || (values.toValue <= 0 && POSITIVE_NUMBER);

	const SELECT_TOKEN = "You must select token";
	errors.fromToken = !values.fromToken && SELECT_TOKEN;
	errors.toToken = !values.toToken && SELECT_TOKEN;

	const NO_PAIR = "Selected pair doesn't exist";
	errors.pair = values.fromToken && values.toToken && !values.pair && NO_PAIR;

	return errors;
}
