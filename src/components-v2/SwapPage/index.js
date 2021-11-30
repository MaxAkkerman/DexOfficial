import "./index.scss";

import {useFormik} from "formik";
import differenceBy from "lodash/differenceBy";
import React, {useMemo, useState} from "react";
import {useSelector} from "react-redux";

import Button from "@/components-v2/Button";
import Input from "@/components-v2/Input";
import MainBlock from "@/components-v2/MainBlock";
import SelectPopup from "@/components-v2/SelectPopup";
import SettingsButton from "@/components-v2/SettingsButton";
import SwapButton from "@/components-v2/SwapButton";
import truncateNum from "@/utils/truncateNum";

export default function SwapPage() {
	const walletConnected = useSelector(
		(state) => state.appReducer.walletIsConnected,
	);
	const tokenList = useSelector((state) => state.walletReducer.tokenList);
	const pairList = useSelector((state) => state.walletReducer.pairsList);

	const {handleChange, handleSubmit, setFieldValue, values} = useFormik({
		initialValues: {
			fromToken: null,
			fromValue: "",
			slippageTolerance: 0,
			toToken: null,
			toValue: "",
		},
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
	const pair = useMemo(() => {
		const {fromToken, toToken} = values;
		if (!pairList.length || !fromToken || !toToken) return;

		return pairList.find(
			(p) =>
				(p.rootA === fromToken.rootAddress &&
					p.rootB === toToken.rootAddress) ||
				(p.rootA === toToken.rootAddress && p.rootB === fromToken.rootAddress),
		);
	}, [pairList, values.fromToken, values.toToken]);
	const rate = useMemo(() => {
		const {fromToken, toToken} = values;
		if (!pair || !fromToken || !toToken) return;

		return fromToken.rootAddress === pair.rootA ? pair.rateAB : pair.rateBA;
	}, [pair, values.fromToken, values.toToken]);

	const {fromPopup, toPopup} = useHandlePopups({setFieldValue});

	function handleSwap() {
		/**
		 * Handle swap
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
	function invertTokens() {
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
		} else if (values.fromToken && values.toToken && !pair) {
			props.children = "Connect pair";
			props.onClick = handleConnectPair;
		} else {
			props.children = "Swap";
			props.onClick = handleSwap;
		}

		return function CurrentButton({...p}) {
			return <Button {...props} {...p} />;
		};
	}, [walletConnected, pair, values.fromToken, values.toToken]);

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
									onSelectClick={fromPopup.open}
									token={values.fromToken}
								/>
								{/*<>   {incorrectBalance && <div>error</div>}</>*/}
								<SwapButton onClick={invertTokens} className="swap-btn" />
								<Input
									label="To"
									name="toValue"
									value={values.toValue}
									onValueChange={handleChange}
									onSelectClick={toPopup.open}
									token={values.toToken}
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
									{/*<div className="swap-confirm-wrap">*/}
									{/*	<p className="mainblock-footer-value">2.00%</p>*/}
									{/*	<p className="mainblock-footer-subtitle">*/}
									{/*		Price <br /> Impact*/}
									{/*	</p>*/}
									{/*</div>*/}
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
			{fromPopup && (
				<SelectPopup
					tokens={leftTokens}
					open={fromPopup.state}
					onClose={fromPopup.close}
					onSelect={fromPopup.select}
				/>
			)}
			{toPopup && (
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

function useHandlePopups({setFieldValue}) {
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
