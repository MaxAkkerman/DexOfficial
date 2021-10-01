import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setTips, showPopup} from "../../store/actions/app";
import MainBlock from "./../../components/MainBlock/MainBlock";
import Input from "./../../components/Input/Input";
import SwapBtn from "../../components/SwapBtn/SwapBtn";
import SwapConfirmPopup from "../../components/SwapConfirmPopup/SwapConfirmPopup";
import WaitingPopup from "../../components/WaitingPopup/WaitingPopup";
import WaitingPopupConnect from "../../components/WaitingPopupConnect/WaitingPopupConnectConnect";
import "./Swap.scss";
import {
	connectToPair,
	connectToPairStep2DeployWallets,
	getClientForConnect,
} from "../../extensions/sdk/run";

import {
	setSlippageValue,
	setSwapAsyncIsWaiting,
	setSwapFromToken,
	setSwapToToken,
} from "../../store/actions/swap";

import {getClientKeys} from "../../extensions/webhook/script";
// import { setSlippageValue } from "../../store/actions/swap";

import {decrypt} from "../../extensions/seedPhrase";
import settingsBtn from "../../images/Vector.svg";
import SlippagePopper from "../../components/SlippagePopper/SlippagePopper";
import useSlippagePopper from "../../hooks/useSlippagePopper";
import {
	NOT_ENOUGH,
	NOT_ENOUGH as NOT_ENOUGH_MSG,
	NOT_ENOUGH_CAUSE_COMMISSION as NOT_ENOUGH_CAUSE_COMMISSION_MSG,
	NOT_TOUCHED,
} from "../../constants/validationMessages";
import {
	PROVIDE_LIQUIDITY_COMMISSION,
	SWAP_COMMISSION,
} from "../../constants/commissions";
import useAssetList from "../../hooks/useAssetList";
import {FormHelperText} from "@mui/material";

function Swap() {
	const history = useHistory();
	const dispatch = useDispatch();

	const walletIsConnected = useSelector(
		(state) => state.appReducer.walletIsConnected,
	);

	const tokenList = useSelector((state) => state.walletReducer.tokenList);
	const pairsList = useSelector((state) => state.walletReducer.pairsList);

	const fromToken = useSelector((state) => state.swapReducer.fromToken);
	const toToken = useSelector((state) => state.swapReducer.toToken);
	const fromValue = useSelector((state) => state.swapReducer.fromInputValue);
	const toValue = useSelector((state) => state.swapReducer.toInputValue);
	const rate = useSelector((state) => state.swapReducer.rate);
	const pairId = useSelector((state) => state.swapReducer.pairId);
	const swapAsyncIsWaiting = useSelector(
		(state) => state.swapReducer.swapAsyncIsWaiting,
	);

	const encryptedSeedPhrase = useSelector(
		(state) => state.enterSeedPhrase.encryptedSeedPhrase,
	);
	const clientData = useSelector((state) => state.walletReducer.clientData);
	const seedPhrasePassword = useSelector(
		(state) => state.enterSeedPhrase.seedPhrasePassword,
	);

	const [swapConfirmPopupIsVisible, setSwapConfirmPopupIsVisible] =
		useState(false);
	const [connectAsyncIsWaiting, setconnectAsyncIsWaiting] = useState(false);
	const [curExist, setExistsPair] = useState(false);
	const [notDeployedWallets, setNotDeployedWallets] = useState([]);
	const [connectPairStatusText, setconnectPairStatusText] = useState("");

	const tips = useSelector((state) => state.appReducer.tips);

	const [incorrectBalance, setincorrectBalance] = useState(false);

	const {slippageState, popperState} = useSlippagePopper();

	useEffect(() => {
		if (!pairsList.length || !pairId) {
			return;
		}
		let curePairData =
			pairsList && pairsList.filter((item) => item.pairAddress === pairId);
		setExistsPair(curePairData[0].exists ? curePairData[0].exists : false);
	}, [pairId]);

	useEffect(async () => {
		if (!tips || tips.length) return;
		if (tips.name === "tokensReceivedCallback" || tips.name === "sendTokens") {
			if (fromToken.symbol || toToken.Symbol) {
				console.log("I am at chakeee");
				const fromTokenCopy = JSON.parse(JSON.stringify(fromToken));
				const toTokenCopy = JSON.parse(JSON.stringify(toToken));
				const newFromTokenData = tokenList.filter(
					(item) => item.symbol === fromTokenCopy.symbol,
				);
				const newToTokenData = tokenList.filter(
					(item) => item.symbol === toTokenCopy.symbol,
				);

				const fromTokenUpdatedBalance = {
					...fromTokenCopy,
					balance: newFromTokenData[0].balance,
				};

				const toTokenUpdatedBalance = {
					...toTokenCopy,
					balance: newToTokenData[0].balance,
				};
				dispatch(setSwapToToken(toTokenUpdatedBalance));

				dispatch(setSwapFromToken(fromTokenUpdatedBalance));
			}
		}
	}, [tokenList]);

	useEffect(() => {
		if (!pairsList || !pairId) {
			return;
		}
		let curePairData = pairsList.filter((item) => item.pairAddress === pairId);
		if (!curePairData || !curePairData[0]) return;
		if (curePairData[0].walletExists) {
			let walExists = curePairData[0].walletExists.filter(
				(item) => item.status === false,
			);
			setNotDeployedWallets(walExists);
		}
	}, [toToken, tokenList, pairId]);

	function handleConfirm() {
		if (!fromValue && !toValue) return;

		if (fromValue > fromToken.balance) {
			setincorrectBalance(true);
			setTimeout(() => setincorrectBalance(false), 10000);
			return;
		}
		if (fromToken.symbol && toToken.symbol && fromValue) {
			dispatch(setSlippageValue(slippageState.slippage));
			setSwapConfirmPopupIsVisible(true);
		} else {
			dispatch(
				showPopup({type: "error", message: "Fields should not be empty"}),
			);
		}
	}

	const [balanceError, setNotEnoughtBalanceError] = useState(false);
	async function handleConnectPair() {
		if (clientData.balance < 12) {
			dispatch(
				setTips({
					message: `You need at least 12 TONs to connect pair`,
					type: "error",
				}),
			);
			return;
		}

		let decrypted = await decrypt(encryptedSeedPhrase, seedPhrasePassword);
		const keys = await getClientKeys(decrypted.phrase);

		setconnectAsyncIsWaiting(true);
		setconnectPairStatusText("getting data from pair.");

		let connectRes = await connectToPair(pairId, keys);

		if (
			!connectRes ||
			(connectRes &&
				(connectRes.code === 1000 ||
					connectRes.code === 3 ||
					connectRes.code === 2))
		) {
			setconnectAsyncIsWaiting(false);
			dispatch(
				setTips({
					message: `Some error, please try again, ${connectRes.code}`,
					type: "error",
				}),
			);
			return;
		} else {
			setconnectPairStatusText("preparing client data.");
			let getClientForConnectStatus = await getClientForConnect(
				connectRes,
				clientData.address,
			);
			console.log("getClientForConnectStatus", getClientForConnectStatus);
			if (getClientForConnectStatus.code) {
				setconnectAsyncIsWaiting(false);
				dispatch(
					setTips({
						message: `Some error, please try again, ${getClientForConnectStatus.code}`,
						type: "error",
					}),
				);
				return;
			} else {
				setconnectPairStatusText(
					"computing the best shard for your wallets and deploying.",
				);
				let connectToRootsStatus = await connectToPairStep2DeployWallets(
					getClientForConnectStatus,
					keys,
				);
				console.log("connectToRootsStatus", connectToRootsStatus);
				if (connectToRootsStatus.code) {
					setconnectAsyncIsWaiting(false);
					dispatch(
						setTips({
							message: `Some error, please try again, ${connectToRootsStatus.code}`,
							type: "error",
						}),
					);
					return;
				} else {
					setNotDeployedWallets([]);
					// dispatch(setSwapFromInputValue(""));
					// dispatch(setSwapToInputValue(""));
				}
			}
		}

		setconnectPairStatusText("finishing");

		//     let tokenList = await getAllClientWallets(pubKey.address);
		// // tokenList.forEach(async item => await subscribe(item.walletAddress));
		//     let countT = tokenList.length
		//     let y = 0
		//     while (tokenList.length < countT) {
		//
		//         tokenList = await getAllClientWallets(pubKey.address);
		//         y++
		//         if (y > 500) {
		//             dispatch(showPopup({
		//                 type: 'error',
		//                 message: 'Oops, too much time for deploying. Please connect your wallet again.'
		//             }));
		//         }
		//     }
		//
		//     dispatch(setTokenList(tokenList));
		//
		//
		//     let liquidityList = [];
		//
		//     if (tokenList.length) {
		//         tokenList.forEach(async item => await subscribe(item.walletAddress));
		//
		//         liquidityList = tokenList.filter(i => i.symbol.includes('/'));
		//
		//         tokenList = tokenList.filter(i => !i.symbol.includes('/'))
		//         //localStorage.setItem('tokenList', JSON.stringify(tokenList));
		//         //localStorage.setItem('liquidityList', JSON.stringify(liquidityList));
		//         dispatch(setTokenList(tokenList));
		//         dispatch(setLiquidityList(liquidityList));
		//     }
		setconnectAsyncIsWaiting(false);
		setExistsPair(true);
	}

	function getCurBtn() {
		if (
			curExist &&
			fromToken.symbol &&
			toToken.symbol &&
			!notDeployedWallets.length
		) {
			return (
				<button
					className={
						fromToken.symbol &&
						toToken.symbol &&
						fromValue &&
						toValue &&
						!isError
							? "btn mainblock-btn"
							: "btn mainblock-btn btn--disabled"
					}
					onClick={() => handleConfirm()}
				>
					Swap
				</button>
			);
		} else if (
			(!curExist || notDeployedWallets.length) &&
			fromToken.symbol &&
			toToken.symbol
		) {
			return (
				<button
					className={
						fromToken.symbol && toToken.symbol
							? "btn mainblock-btn"
							: "btn mainblock-btn btn--disabled"
					}
					onClick={() => handleConnectPair()}
				>
					Connect pair
				</button>
			);
		}
		return (
			<button
				className={
					fromToken.symbol && toToken.symbol && fromValue && toValue
						? "btn mainblock-btn"
						: "btn mainblock-btn btn--disabled"
				}
				onClick={() => handleConfirm()}
			>
				Swap
			</button>
		);
	}

	function handleClose() {
		dispatch(setSwapAsyncIsWaiting(false));
	}

	const {assetList} = useAssetList();

	const [errors, setErrors] = React.useState({});
	const [isError, setIsError] = React.useState(true);

	useEffect(() => {
		if (Object.keys(errors).length === 0) setIsError(false);
		else setIsError(true);
	}, [errors]);

	function checkDecimals(value) {
		return value.toFixed(4);
	}

	function validate(fromValue, toValue, fromToken, toToken) {
		console.log(fromToken, toToken);
		if (
			fromToken.symbol &&
			toToken.symbol &&
			fromToken.balance &&
			toToken.balance
		) {
			const localErrors = {};

			const fromTokenBalance = Number(fromToken.balance);

			if (fromValue > checkDecimals(fromTokenBalance))
				localErrors.fromTokenAmount = NOT_ENOUGH_MSG;

			if (toValue === 0 || fromValue === 0)
				localErrors.emptyFields = NOT_TOUCHED;

			const tonAsset = assetList.find((t) => t.symbol === "TON Crystal");
			if (tonAsset && tonAsset.balance) {
				const nativeTONBalance = tonAsset.balance;

				if (nativeTONBalance < SWAP_COMMISSION)
					localErrors.commission = `${NOT_ENOUGH_CAUSE_COMMISSION_MSG} (Commission = ${SWAP_COMMISSION} TON Crystal)`;
				console.log(localErrors);
				setErrors(localErrors);
			}
		}
	}

	useEffect(() => {
		if (fromToken && toToken) validate(fromValue, toValue, fromToken, toToken);
	}, [fromValue, toValue, fromToken, toToken]);

	return (
		<div
			className="container"
			onClick={() =>
				console.log(
					"curExist",
					curExist,
					"fromToken",
					fromToken,
					"toToken",
					toToken,
					"notDeployedWallets",
					notDeployedWallets,
				)
			}
		>
			{!swapAsyncIsWaiting && !connectAsyncIsWaiting && (
				<MainBlock
					style={{
						borderColor: errors.commission
							? "var(--error)"
							: "var(--mainblock-border-color)",
					}}
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

								<div className={"settings_btn_container"}>
									<button
										aria-describedby={popperState.id}
										className="settings_btn"
										onClick={popperState.handleClick}
									>
										<img src={settingsBtn} alt={"settings"} />
									</button>
								</div>
							</div>
							<div>
								<Input
									type={"from"}
									text={"From"}
									token={fromToken}
									value={fromValue}
									borderError={errors.fromTokenAmount}
									incorrectBalance={incorrectBalance}
								/>
								{errors.fromTokenAmount && (
									<FormHelperText error sx={{color: "var(--text-color)"}}>
										{NOT_ENOUGH}
									</FormHelperText>
								)}
								{/*<>   {incorrectBalance && <div>error</div>}</>*/}
								<SwapBtn
									fromToken={fromToken}
									toToken={toToken}
									page={"swap"}
								/>
								<Input
									type={"to"}
									text={
										toValue > 0 ? (
											<>
												To <span>(estimated)</span>
											</>
										) : (
											"To"
										)
									}
									token={toToken}
									value={toValue}
									incorrectBalance={false}
								/>
								{walletIsConnected ? (
									getCurBtn()
								) : (
									<button
										className="btn mainblock-btn"
										onClick={() => history.push("/account")}
									>
										Connect wallet
									</button>
								)}
								{!fromValue && !toValue && (
									<FormHelperText sx={{textAlign: "center"}}>
										{NOT_TOUCHED}
									</FormHelperText>
								)}
								<SlippagePopper
									slippageState={slippageState}
									popperState={popperState}
								/>
								{fromToken.symbol && toToken.symbol && (
									<p className="swap-rate">
										Price{" "}
										<span>
											{parseFloat(rate).toFixed(rate > 0.0001 ? 4 : 6)}{" "}
											{toToken.symbol}
										</span>{" "}
										per <span>1 {fromToken.symbol}</span>
									</p>
								)}
							</div>
							{errors.commission && (
								<FormHelperText error sx={{color: "var(--text-color)"}}>
									{errors.commission}
								</FormHelperText>
							)}
						</div>
					}
					footer={
						<div className="mainblock-footer">
							<div className="mainblock-footer-wrap">
								<div className="swap-confirm-wrap">
									<p className="mainblock-footer-value">
										{parseFloat(
											(
												toValue -
												(toValue * slippageState.slippage) / 100
											).toFixed(4),
										)}{" "}
										{toToken.symbol}
									</p>
									<p className="mainblock-footer-subtitle">
										Minimum <br /> received
									</p>
								</div>
								<div className="swap-confirm-wrap">
									<p className="mainblock-footer-value">2.00%</p>
									<p className="mainblock-footer-subtitle">
										Price <br /> Impact
									</p>
								</div>
								<div className="swap-confirm-wrap">
									<p className="mainblock-footer-value">
										{fromValue && fromValue !== 0
											? ((fromValue * 0.3) / 100).toFixed(4)
											: 0.0}{" "}
										{fromToken.symbol}
									</p>
									<p className="mainblock-footer-subtitle">
										Liquidity <br /> Provider Fee
									</p>
								</div>
							</div>
						</div>
					}
				/>
			)}

			{swapConfirmPopupIsVisible && (
				<SwapConfirmPopup
					hideConfirmPopup={setSwapConfirmPopupIsVisible.bind(this, false)}
					slippage={slippageState.slippage}
				/>
			)}
			{connectAsyncIsWaiting && (
				<WaitingPopupConnect
					text={`Connecting to ${fromToken.symbol}/${toToken.symbol} pair, ${connectPairStatusText}`}
				/>
			)}
			{swapAsyncIsWaiting && (
				<WaitingPopup
					text={`Swapping ${fromValue} ${fromToken.symbol} for ${toValue} ${toToken.symbol}`}
					handleClose={() => handleClose()}
				/>
			)}
		</div>
	);
}

export default Swap;
