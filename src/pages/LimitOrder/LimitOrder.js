import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {showPopup} from "../../store/actions/app";
import MainBlock from "./../../components/MainBlock/MainBlock";
import SwapBtn from "../../components/SwapBtn/SwapBtn";
import "./LimitOrder.scss";
import {
	connectToPair,
	connectToPairDeployWallets,
	connectToPairStep2DeployWallets,
	getClientForConnect,
	setCreator,
} from "../../extensions/sdk/run";
import {
	checkClientPairExists,
	getAllClientWallets,
	getClientKeys,
	subscribe,
} from "../../extensions/webhook/script";
import {
	setSlippageValue,
	setSwapAsyncIsWaiting,
} from "../../store/actions/swap";
import {decrypt} from "../../extensions/seedPhrase";
import {Box, Stack, TextField, Typography} from "@material-ui/core";
import OrdersInput from "../../components/OrdersInput/OrdersInput";
import {
	hideOrdersConfirmPopup,
	setOrdersAsyncIsWaiting,
	setOrdersRate,
	showOrdersConfirmPopup,
} from "../../store/actions/limitOrders";
import SwapConfirmPopup from "../../components/SwapConfirmPopup/SwapConfirmPopup";
import OrdersConfirmPopup from "../../components/OrdersConfirmPopup/OrdersConfirmPopup";
import {iconGenerator} from "../../iconGenerator";
import WaitingPopup from "../../components/WaitingPopup/WaitingPopup";
import useLimitOrderValidation from "../../hooks/useLimitOrderValidation";

function LimitOrder() {
	const history = useHistory();
	const dispatch = useDispatch();

	const walletIsConnected = useSelector(
		(state) => state.appReducer.walletIsConnected,
	);

	const tokenList = useSelector((state) => state.walletReducer.tokenList);
	const pairsList = useSelector((state) => state.walletReducer.pairsList);

	const fromToken = useSelector((state) => state.limitOrders.fromToken);
	const toToken = useSelector((state) => state.limitOrders.toToken);
	const fromValue = useSelector((state) => state.limitOrders.fromInputValue);
	const toValue = useSelector((state) => state.limitOrders.toInputValue);
	const rate = useSelector((state) => state.limitOrders.rate);

	const pairId = useSelector((state) => state.limitOrders.pairId);
	const ordersAsyncIsWaiting = useSelector(
		(state) => state.limitOrders.ordersAsyncIsWaiting,
	);

	const encryptedSeedPhrase = useSelector(
		(state) => state.enterSeedPhrase.encryptedSeedPhrase,
	);
	const clientData = useSelector((state) => state.walletReducer.clientData);
	const seedPhrasePassword = useSelector(
		(state) => state.enterSeedPhrase.seedPhrasePassword,
	);
	const ordersConfirmPopupIsVisible = useSelector(
		(state) => state.limitOrders.ordersConfirmPopupVisible,
	);
	const [connectAsyncIsWaiting, setconnectAsyncIsWaiting] = useState(false);
	const [curExist, setExistsPair] = useState(false);
	const [notDeployedWallets, setNotDeployedWallets] = useState([]);
	const [connectPairStatusText, setconnectPairStatusText] = useState("");
	const [incorrectBalance, setincorrectBalance] = useState(false);
	const {invalid} = useLimitOrderValidation();

	useEffect(() => {
		if (!pairsList.length || !pairId) {
			return;
		}
		let curePairData =
			pairsList && pairsList.filter((item) => item.pairAddress === pairId);
		setExistsPair(curePairData[0].exists ? curePairData[0].exists : false);
	}, [pairId]);

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
		if (invalid) return;

		dispatch(showOrdersConfirmPopup());
	}

	async function handleConnectPair() {
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
					return;
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
						invalid ? "btn mainblock-btn btn--disabled" : "btn mainblock-btn"
					}
					onClick={() => handleConfirm()}
				>
					Create limit order
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
						invalid ? "btn mainblock-btn btn--disabled" : "btn mainblock-btn"
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
					invalid ? "btn mainblock-btn btn--disabled" : "btn mainblock-btn"
				}
				onClick={() => handleConfirm()}
			>
				Create limit order
			</button>
		);
	}

	return (
		<div
			className="container"
			onClick={() => console.log("clientadad", clientData)}
		>
			{!ordersAsyncIsWaiting && !connectAsyncIsWaiting && (
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
							<div>
								<OrdersInput
									type={"from"}
									text={"From"}
									token={fromToken}
									incorrectBalance={incorrectBalance}
								/>
								<SwapBtn
									fromToken={fromToken}
									toToken={toToken}
									page={"swap"}
								/>
								<OrdersInput
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
									incorrectBalance={false}
								/>

								<div className={"orders__price_box"}>
									<Stack
										direction={"column"}
										spacing={1}
										sx={{marginBottom: "15px"}}
									>
										<div>Price</div>
										<div className={"orders__icon_box"}>
											<input
												id="enterPrice"
												type="number"
												autoComplete="false"
												className="orders__input"
												onChange={(e) =>
													dispatch(setOrdersRate(Number(e.target.value)))
												}
												value={rate}
											/>
											{toToken && toToken.symbol && (
												<div className="input-select">
													<img
														src={iconGenerator(toToken.symbol)}
														alt={toToken.symbol}
														className="input-token-img"
													/>
													<span>{toToken && toToken.symbol}</span>
												</div>
											)}
										</div>
									</Stack>
									<button
										className="btn orders"
										onClick={() => history.push("/account")}
									>
										Set to market
									</button>
								</div>

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
						</div>
					}
				/>
			)}
			{ordersConfirmPopupIsVisible && <OrdersConfirmPopup />}
			{ordersAsyncIsWaiting && (
				<WaitingPopup
					text={`Creating limit order of ${fromValue} ${fromToken.symbol} for ${toValue} ${toToken.symbol}`}
					handleClose={() => dispatch(setOrdersAsyncIsWaiting(false))}
				/>
			)}
		</div>
	);
}

export default LimitOrder;
