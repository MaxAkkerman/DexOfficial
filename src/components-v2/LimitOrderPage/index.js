import "./index.scss";

import {Stack} from "@mui/material";
import {FormHelperText} from "@mui/material";
import {useFormik} from "formik";
import differenceBy from "lodash/differenceBy";
import find from "lodash/find";
import React, {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";

import Button from "@/components-v2/Button";
import Input from "@/components-v2/Input";
import MainBlock from "@/components-v2/MainBlock";
import SelectPopup from "@/components-v2/SelectPopup";
import SwapBtn from "@/components-v2/SwapButton";
import {iconGenerator} from "@/iconGenerator";
import truncateNum from "@/utils/truncateNum";

export default function LimitOrder() {
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
			fromPrice: "",
			fromToken: null,
			fromValue: "",
			pair: null,
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

	// Find the pair
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

	const rate = useMemo(() => {
		const {fromToken, pair, toToken} = values;
		if (!pair || !fromToken || !toToken) return;

		return fromToken.rootAddress === pair.rootA ? pair.rateAB : pair.rateBA;
	}, [values.pair, values.fromToken, values.toToken]);

	// Update "to" value
	useEffect(() => {
		if (rate) setFieldValue("toValue", rate);
	}, [rate]);

	const {fromPopup, toPopup} = useHandlePopups(setFieldValue);

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

	function handleConnectWallet() {
		/**
		 * Handle wallet connect
		 */
	}

	function handleTokensInvert() {
		setFieldValue("fromToken", values.toToken);
		setFieldValue("toToken", values.fromToken);
	}

	function handleSetToMarket() {
		/**
		 * Handle set to market
		 */
	}

	function validate(values) {
		const errors = {};

		const MUST_BE_NUMBER = "Input value must be a number";
		errors.fromValue = isNaN(+values.fromValue) && MUST_BE_NUMBER;
		errors.fromPrice = isNaN(+values.fromPrice) && MUST_BE_NUMBER;

		const POSITIVE_NUMBER = "Use positive number";
		errors.fromValue =
			errors.fromValue || (values.fromValue <= 0 && POSITIVE_NUMBER);
		errors.fromPrice =
			errors.fromPrice || (values.fromPrice <= 0 && POSITIVE_NUMBER);

		const SELECT_TOKEN = "You must select token";
		errors.fromToken = !values.fromToken && SELECT_TOKEN;
		errors.toToken = !values.toToken && SELECT_TOKEN;

		const NO_PAIR = "Selected pair doesn't exist";
		errors.pair = values.fromToken && values.toToken && !values.pair && NO_PAIR;

		return errors;
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
			props.children = "Create limit order";
			props.onClick = handleCreateLimitOrder;
		}

		return function CurrentButton(p) {
			return <Button {...props} {...p} />;
		};
	}, [walletConnected, values.pair, values.fromToken, values.toToken]);
	console.log(errors);

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
									onSelectClick={fromPopup.open}
									token={values.fromToken}
									error={
										touched.fromValue && (errors.fromValue || errors.fromToken)
									}
									helperText={
										touched.fromValue && (errors.fromValue || errors.fromToken)
									}
								/>
								<SwapBtn onClick={handleTokensInvert} className="swap-btn" />
								<Input
									label="To"
									name="toValue"
									value={values.toValue}
									onValueBlur={handleBlur}
									onValueChange={handleChange}
									onSelectClick={toPopup.open}
									token={values.toToken}
									error={touched.toToken && errors.toToken}
									helperText={
										(touched.toToken && errors.toToken) ||
										"Field is automatically calculated"
									}
									readOnly
								/>
								{walletConnected && (
									<div className={"orders__price_box"}>
										<Stack
											direction={"column"}
											spacing={1}
											sx={{marginBottom: "3%"}}
										>
											<div>Limit order price</div>
											<div className={"orders__icon_box"}>
												<input
													name="fromPrice"
													type="number"
													autoComplete="false"
													className="orders__input"
													placeholder="0"
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.fromPrice}
													style={{
														borderColor:
															touched.fromPrice && errors.fromPrice
																? "var(--error)"
																: "var(--input-border-color)",
													}}
												/>
												{values.toToken && (
													<div className="input-select">
														<img
															src={iconGenerator(values.toToken.symbol)}
															alt={values.toToken.symbol}
															className="input-token-img"
														/>
														<span>{values.toToken.symbol}</span>
													</div>
												)}
											</div>
											<FormHelperText
												error={touched.fromPrice && errors.fromPrice}
											>
												{(touched.fromPrice && errors.fromPrice) ||
													(!touched.fromPrice && "Type numeric value")}
											</FormHelperText>
										</Stack>
										<button
											className="btn orders btn--disabled"
											disabled
											onClick={handleSetToMarket}
										>
											Set to market
										</button>
									</div>
								)}
								<CurrentButton type="submit" />
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
			{fromPopup.state && (
				<SelectPopup
					tokens={leftTokens}
					open={fromPopup.state}
					onClose={fromPopup.close}
					onSelect={fromPopup.select}
				/>
			)}
			{toPopup.state && (
				<SelectPopup
					tokens={leftTokens}
					open={toPopup.state}
					onClose={toPopup.close}
					onSelect={toPopup.select}
				/>
			)}
		</>
	);
}

function useHandlePopups(setFieldValue) {
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
		fromPopup: {
			close: closeFromTokenPopup,
			open: openFromTokenPopup,
			select: selectFromToken,
			state: fromPopupOpen,
		},
		toPopup: {
			close: closeToTokenPopup,
			open: openToTokenPopup,
			select: selectToToken,
			state: toPopupOpen,
		},
	};
}
