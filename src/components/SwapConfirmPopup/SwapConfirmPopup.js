import "./SwapConfirmPopup.scss";

import {gql, request} from "graphql-request";
import {useSnackbar} from "notistack";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {PAIR_NULL, TOKEN_NULL} from "../../constants/runtimeErrors";
import {swapA, swapB} from "../../extensions/sdk_run/run";
import {decrypt} from "../../extensions/tonUtils";
import useKeyPair from "../../hooks/useKeyPair";
import {iconGenerator} from "../../iconGenerator";
import miniSwap from "../../images/icons/mini-swap.png";
import {setTips, showPopup} from "../../store/actions/app";
import {setSwapAsyncIsWaiting} from "../../store/actions/swap";
import takeLimitOrder from "../../utils/takeLimitOrder";
import truncateNum from "../../utils/truncateNum";
import MainBlock from "../MainBlock/MainBlock";

function SwapConfirmPopup(props) {
	const dispatch = useDispatch();

	const appTheme = useSelector((state) => state.appReducer.appTheme);
	const curExt = useSelector((state) => state.appReducer.curExt);

	const fromToken = useSelector((state) => state.swapReducer.fromToken);
	const toToken = useSelector((state) => state.swapReducer.toToken);
	const rate = useSelector((state) => state.swapReducer.rate);
	const fromValue = useSelector((state) => state.swapReducer.fromInputValue);
	const toValue = useSelector((state) => state.swapReducer.toInputValue);

	const tokenList = useSelector((state) => state.walletReducer.tokenList);
	const pairList = useSelector((state) => state.walletReducer.pairsList);
	const pairId = useSelector((state) => state.swapReducer.pairId);

	const encryptedSeedPhrase = useSelector(
		(state) => state.enterSeedPhrase.encryptedSeedPhrase,
	);
	const seedPhrasePassword = useSelector(
		(state) => state.enterSeedPhrase.seedPhrasePassword,
	);
	const slippageValue = useSelector((state) => state.swapReducer.slippageValue);

	const {enqueueSnackbar} = useSnackbar();

	const clientData = useSelector((state) => state.walletReducer.clientData);
	const {keyPair} = useKeyPair();

	async function handleSwap() {
		dispatch(setSwapAsyncIsWaiting(true));
		props.hideConfirmPopup();

		let decrypted = await decrypt(encryptedSeedPhrase, seedPhrasePassword);

		const pairAB = pairList.find(
			(p) => fromToken.symbol === p.symbolA && toToken.symbol === p.symbolB,
		);
		const pairBA = pairList.find(
			(p) => fromToken.symbol === p.symbolB && toToken.symbol === p.symbolA,
		);

		if (!pairAB && !pairBA) throw new Error(PAIR_NULL);

		const directionPair = pairAB ? "4" : "5";

		const query = gql`
			query (
				$addrPair: String!
				$directionPair: String!
				$amount: Float!
				$slippage: Float!
			) {
				limitOrdersForSwap(
					addrPair: $addrPair
					directionPair: $directionPair
					amount: $amount
					slippage: $slippage
				) {
					leftoverSwap
					limitOrders {
						addrOrder
						amount
						price
						priceRaw
						amountRaw
					}
				}
			}
		`;
		const data = await request(process.env.LIMIT_ORDER_GRAPHQL_URL, query, {
			addrPair: pairId,
			directionPair,
			amount: fromValue,
			slippage: slippageValue || 0,
		});
		console.log("request->data", data);

		const processing = [];
		data.limitOrdersForSwap.limitOrders.forEach((limitOrder) => {
			const promise = takeLimitOrder(
				{
					pairAddr: pairId,
					orderAddr: limitOrder.addrOrder,
					price: limitOrder.priceRaw,
					qty: limitOrder.amountRaw,
					directionPair,
				},
				{
					clientAddress: clientData.address,
					clientKeyPair: keyPair,
				},
			).then(() => {
				enqueueSnackbar({
					type: "info",
					message: `Taking limit order ${truncateNum(limitOrder.amount, 2)} ${
						fromToken.symbol
					} - ${truncateNum(limitOrder.amount * limitOrder.price)} ${
						toToken.symbol
					} ⏳`,
				});
			});
			processing.push(promise);
		});
		await Promise.all(processing);

		const fromTokenData = tokenList.find(
			(item) => item.symbol === fromToken.symbol,
		);
		const toTokenData = tokenList.find(
			(item) => item.symbol === toToken.symbol,
		);
		if (!fromTokenData || !toTokenData) throw new Error(TOKEN_NULL);

		if (data.limitOrdersForSwap.leftoverSwap !== 0)
			try {
				let res = null;
				if (directionPair === "4") {
					res = await swapA(
						curExt,
						pairId,
						data.limitOrdersForSwap.leftoverSwap,
						slippageValue,
						decrypted.phrase,
						data.limitOrdersForSwap.leftoverSwap * rate,
						fromTokenData,
						toTokenData,
					);
				} else {
					res = await swapB(
						curExt,
						pairId,
						data.limitOrdersForSwap.leftoverSwap,
						slippageValue,
						decrypted.phrase,
						data.limitOrdersForSwap.leftoverSwap * rate,
						fromTokenData,
						toTokenData,
					);
				}
				console.log("swap(A|B)->res", res);

				if (!res.code)
					dispatch(
						setTips({
							message: `Sended message to blockchain`,
							type: "info",
						}),
					);
				else
					dispatch(
						setTips({
							message: `Something goes wrong - error code ${res.code}`,
							type: "error",
						}),
					);
			} catch (e) {
				switch (e.text) {
					case "Canceled by user.":
						dispatch(
							showPopup({type: "error", message: "Operation canceled."}),
						);
						break;
					case "Rejected by user":
						dispatch(
							showPopup({type: "error", message: "Operation canceled."}),
						);
						break;
					default:
						dispatch(
							showPopup({
								type: "error",
								message: "Oops, something went wrong. Please try again.",
							}),
						);
						break;
				}
			}

		dispatch(setSwapAsyncIsWaiting(false));
	}

	function getAmountOut(amountIn) {
		if (!amountIn) {
			return 0;
		}
		let reserves = pairList.filter((item) => item.pairAddress === pairId);
		let rootIn = 0;
		let rootOut = 0;
		pairList.forEach(async (i) => {
			if (fromToken.symbol === i.symbolA && toToken.symbol === i.symbolB) {
				rootIn = reserves[0].reserveA;
				rootOut = reserves[0].reservetB;
			} else {
				rootIn = reserves[0].reservetB;
				rootOut = reserves[0].reserveA;
			}
		});
		let amountInWithFee = amountIn * 997;
		let numerator = amountInWithFee * rootOut;
		let denominator = amountInWithFee + rootIn * 1000;
		return numerator / denominator;
		// return 1;
	}

	return (
		<div className="popup-wrapper">
			<MainBlock
				button={
					<svg
						onClick={() => props.hideConfirmPopup()}
						className="close"
						width="26"
						height="26"
						viewBox="0 0 26 26"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							opacity="0.6"
							d="M21.7676 25.272L13 16.507L4.23239 25.272C4.00265 25.5027 3.7296 25.6858 3.42891 25.8108C3.12822 25.9357 2.80582 26 2.48021 26C2.15459 26 1.83219 25.9357 1.5315 25.8108C1.23081 25.6858 0.957759 25.5027 0.728021 25.272C0.497277 25.0422 0.314182 24.7692 0.189248 24.4685C0.0643133 24.1678 0 23.8454 0 23.5198C0 23.1942 0.0643133 22.8718 0.189248 22.5711C0.314182 22.2704 0.497277 21.9973 0.728021 21.7676L9.49296 13L0.728021 4.23239C0.497277 4.00265 0.314182 3.7296 0.189248 3.42891C0.0643133 3.12822 0 2.80582 0 2.48021C0 2.15459 0.0643133 1.83219 0.189248 1.5315C0.314182 1.23081 0.497277 0.957759 0.728021 0.728021C0.957759 0.497277 1.23081 0.314182 1.5315 0.189248C1.83219 0.0643133 2.15459 0 2.48021 0C2.80582 0 3.12822 0.0643133 3.42891 0.189248C3.7296 0.314182 4.00265 0.497277 4.23239 0.728021L13 9.49296L21.7676 0.728021C21.9973 0.497277 22.2704 0.314182 22.5711 0.189248C22.8718 0.0643133 23.1942 0 23.5198 0C23.8454 0 24.1678 0.0643133 24.4685 0.189248C24.7692 0.314182 25.0422 0.497277 25.272 0.728021C25.5027 0.957759 25.6858 1.23081 25.8108 1.5315C25.9357 1.83219 26 2.15459 26 2.48021C26 2.80582 25.9357 3.12822 25.8108 3.42891C25.6858 3.7296 25.5027 4.00265 25.272 4.23239L16.507 13L25.272 21.7676C25.5027 21.9973 25.6858 22.2704 25.8108 22.5711C25.9357 22.8718 26 23.1942 26 23.5198C26 23.8454 25.9357 24.1678 25.8108 24.4685C25.6858 24.7692 25.5027 25.0422 25.272 25.272C25.0422 25.5027 24.7692 25.6858 24.4685 25.8108C24.1678 25.9357 23.8454 26 23.5198 26C23.1942 26 22.8718 25.9357 22.5711 25.8108C22.2704 25.6858 21.9973 25.5027 21.7676 25.272Z"
							fill="white"
						/>
					</svg>
				}
				content={
					<>
						<p className="confirm-subtitle">Confirm Swap</p>
						<div className="confirm-block swap-confirm-block">
							<span className="confirm-token">
								<img
									className="confirm-icon"
									src={iconGenerator(fromToken.symbol)}
									alt={fromToken.symbol}
								/>
								{fromValue}
							</span>
							{appTheme === "light" ? (
								<svg
									width="68"
									height="19"
									viewBox="0 0 68 19"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										opacity="0.4"
										d="M0.897098 10.5H64.9499L58.8496 17.3C58.4908 17.7 58.4908 18.3 58.8496 18.7C59.029 18.9 59.2982 19 59.4776 19C59.657 19 59.9261 18.9 60.1055 18.7L67.7309 10.2C68.0897 9.8 68.0897 9.2 67.7309 8.8L60.1055 0.3C59.7467 -0.1 59.2084 -0.1 58.8496 0.3C58.4908 0.7 58.4908 1.3 58.8496 1.7L64.9499 8.5H0.897098C0.358839 8.5 0 8.9 0 9.5C0 10.1 0.358839 10.5 0.897098 10.5Z"
										fill="url(#paint0_linear)"
									/>
									<defs>
										<linearGradient
											id="paint0_linear"
											x1="68.0035"
											y1="9.49999"
											x2="-13.031"
											y2="-17.3695"
											gradientUnits="userSpaceOnUse"
										>
											<stop stopColor="#41444E" />
											<stop offset="1" stopOpacity="0" />
										</linearGradient>
									</defs>
								</svg>
							) : (
								<svg
									className="swap-confirm-arrow"
									width="68"
									height="20"
									viewBox="0 0 68 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										opacity="0.4"
										d="M0.897098 11H64.9499L58.8496 17.8C58.4908 18.2 58.4908 18.8 58.8496 19.2C59.029 19.4 59.2982 19.5 59.4776 19.5C59.657 19.5 59.9261 19.4 60.1055 19.2L67.7309 10.7C68.0897 10.3 68.0897 9.7 67.7309 9.3L60.1055 0.8C59.7467 0.4 59.2084 0.4 58.8496 0.8C58.4908 1.2 58.4908 1.8 58.8496 2.2L64.9499 9H0.897098C0.358839 9 0 9.4 0 10C0 10.6 0.358839 11 0.897098 11Z"
										fill="url(#paint0_linear)"
									/>
									<defs>
										<linearGradient
											id="paint0_linear"
											x1="68.0035"
											y1="9.99999"
											x2="-13.031"
											y2="-16.8695"
											gradientUnits="userSpaceOnUse"
										>
											<stop stopColor="white" />
											<stop offset="1" stopColor="white" stopOpacity="0" />
										</linearGradient>
									</defs>
								</svg>
							)}
							<span className="confirm-value">
								<img
									className="confirm-icon"
									src={iconGenerator(toToken.symbol)}
									alt={toToken.symbol}
								/>
								{toValue < 0.0001
									? parseFloat(toValue.toFixed(8))
									: parseFloat(toValue.toFixed(4))}
							</span>
						</div>
						<p className="confirm-text" style={{marginLeft: "12px"}}>
							Output is estimated. You will receive at
							{/*least <span>{toValue < 0.0001 ? parseFloat(getAmountOut(fromValue).toFixed(8)) : parseFloat(getAmountOut(fromValue).toFixed(4))} {fromToken.symbol}</span> or*/}
							least{" "}
							<span>
								{parseFloat(
									(toValue - (toValue * props.slippage) / 100).toFixed(4),
								)}{" "}
								{toToken.symbol}
							</span>{" "}
							or the transaction will revert
						</p>
						<button className="btn popup-btn" onClick={() => handleSwap()}>
							Confirm Swap
						</button>
					</>
				}
				footer={
					<div className="mainblock-footer">
						<div className="mainblock-footer-wrap">
							{/*<div>*/}
							<div className="swap-confirm-wrap">
								<p className="mainblock-footer-value">
									<img src={miniSwap} alt="" />{" "}
									{rate < 0.0001
										? parseFloat(rate.toFixed(8))
										: parseFloat(rate.toFixed(4))}{" "}
									{toToken.symbol}/{fromToken.symbol}
								</p>
								<p className="mainblock-footer-subtitle">Price</p>
							</div>
							<div className="swap-confirm-wrap">
								<p className="mainblock-footer-value">
									{((fromValue * 0.3) / 100).toFixed(
										fromValue > 0.0001 ? 4 : 6,
									)}{" "}
									{fromToken.symbol}
								</p>
								<p className="mainblock-footer-subtitle">
									Liquidity Provider Fee
								</p>
							</div>
							{/*<div>*/}
							{/*  <p className="mainblock-footer-value">{parseFloat(toValue.toFixed(4))} {toToken.symbol}</p>*/}
							{/*  <p className="mainblock-footer-subtitle">Minimum received</p>*/}
							{/*</div>*/}
							{/*</div>*/}
							{/*<div>*/}
							{/*  /!*<div className="swap-confirm-wrap">*!/*/}
							{/*  /!*  <p className="mainblock-footer-value">0.03%</p>*!/*/}
							{/*  /!*  <p className="mainblock-footer-subtitle">Price Impact</p>*!/*/}
							{/*  /!*</div>*!/*/}
							{/*  <div>*/}
							{/*    <p className="mainblock-footer-value">0.003 {toToken.symbol}</p>*/}
							{/*    <p className="mainblock-footer-subtitle">Liquidity Provider Fee</p>*/}
							{/*  </div>*/}
							{/*</div>*/}
						</div>
					</div>
				}
			/>
		</div>
	);
}

export default SwapConfirmPopup;
