import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import cls from "classnames";
import MainBlock from "../../components/MainBlock/MainBlock";
import "./SendAssets.scss";
import arrowBack from "../../images/arrowBack.png";
import CloseIcon from "@material-ui/icons/Close";
import {useHistory} from "react-router-dom";
import {FormHelperText} from "@material-ui/core";
import {
	setAddressForSend,
	setAmountForSend,
	setCurrentTokenForSend,
	setShowWaitingSendAssetsPopup,
	setTokenSetted,
} from "../../store/actions/walletSeed";
import InputChange from "../AmountBlock/InputChange";
import RightBlockBottom from "../AmountBlock/RightBlockBottom";
import BlockItem from "../AmountBlock/AmountBlock";
import MaxBtn from "../AmountBlock/MAXbtn";
import ShowBalance from "../AmountBlock/ShowBalance";
import SendConfirmPopup from "../SendConfirmPopup/SendConfirmPopup";
import {sendNativeTons, sendNFT, sendToken} from "../../extensions/sdk/run";
import {decrypt} from "../../extensions/seedPhrase";
import useSendAssetsCheckAmount from "../../hooks/useSendAssetsCheckAmount";
import useSendAssetsCheckAddress from "../../hooks/useSendAssetsCheckAddress";

import WaitingPopup from "../WaitingPopup/WaitingPopup";
import {setTips} from "../../store/actions/app";

import useSendAssetsSelectedToken from "../../hooks/useSendAssetsSelectedToken";
import {getExpectedWalletAddressByOwner} from "../../extensions/webhook/script";
import Loader from "../Loader/Loader";
import {
	NOT_ENOUGH_CAUSE_COMMISSION,
	NOT_TOUCHED,
} from "../../constants/validationMessages";
import {SEND_TOKEN} from "../../constants/commissions";

function SendAssets() {
	const dispatch = useDispatch();
	const history = useHistory();
	const amountToSend = useSelector(
		(state) => state.walletSeedReducer.amountToSend,
	);
	const addressToSend = useSelector(
		(state) => state.walletSeedReducer.addressToSend,
	);
	const showAssetsForSend = useSelector(
		(state) => state.walletSeedReducer.showAssetsForSend,
	);
	const tokenSetted = useSelector(
		(state) => state.walletSeedReducer.tokenSetted,
	);
	const showWaitingSendAssetPopup = useSelector(
		(state) => state.walletSeedReducer.showWaitingSendAssetPopup,
	);
	const [sendConfirmPopupIsVisible, setsendConfirmPopupIsVisible] =
		useState(false);

	const clientData = useSelector((state) => state.walletReducer.clientData);

	const encryptedSeedPhrase = useSelector(
		(state) => state.enterSeedPhrase.encryptedSeedPhrase,
	);
	const seedPhrasePassword = useSelector(
		(state) => state.enterSeedPhrase.seedPhrasePassword,
	);

	let curExt = useSelector((state) => state.appReducer.curExt);
	const {invalid: isInvalidAmount, validationMsg: validationMsgForAmount} =
		useSendAssetsCheckAmount();
	const {
		invalid: isInvalidAddress,
		loading: isLoading,
		validationMsg: validationMsgForAddress,
	} = useSendAssetsCheckAddress();
	const {selectedToken} = useSendAssetsSelectedToken();
	// const [currentAsset, setcurrentAsset] = useState([])
	function handleSetSendPopupVisibility() {
		if (
			isInvalidAddress ||
			isInvalidAmount ||
			(!addressToSend && !amountToSend)
		)
			return;

		//todo handle errors set block border red case error
		if (!tokenSetted) {
			console.log("please set token for send");
		} else if (!addressToSend) {
			console.log("please set address for send");
		} else if (!amountToSend) {
			console.log(
				"amountToSend",
				typeof amountToSend,
				amountToSend,
				"currentTokenForSend.balance",
				typeof selectedToken.balance,
				selectedToken.balance,
			);
			if (!selectedToken.tokenName) {
				console.log("currentTokenForSend.CHECK", selectedToken.tokenName);
			}
			console.log(
				"error: amount should be set or you have not enought balance",
			);
		} else setsendConfirmPopupIsVisible(true);
	}

	function handleHideConfirmPopup() {
		//todo set block border red case error
		setsendConfirmPopupIsVisible(false);
	}

	function handleChangeAddress(e) {
		setaddressToSendView(e.currentTarget.value);
		// console.log()
		dispatch(setAddressForSend(e.currentTarget.value));
	}

	const [addressToSendView, setaddressToSendView] = useState("");

	function handleSetView() {
		//todo add validation
		//         if(!addressToSend.length){return}
		let spliced = addressToSend.slice(0, 7);
		let splicedpart2 = addressToSend.slice(59);
		let view = spliced + "..." + splicedpart2;
		console.log("addressTo", addressToSend);
		setaddressToSendView(view);
	}

	async function handleSendAsset() {
		console.log(
			"addrto, nftLockStakeAddress",
			addressToSend,
			selectedToken.addrData,
		);
		if (!addressToSend) {
			return;
		}
		//todo refactor this

		setsendConfirmPopupIsVisible(false);
		dispatch(setShowWaitingSendAssetsPopup(true));

		// <<<<<<< HEAD
		//         if (currentTokenForSend.symbol === "DP") {
		//             setaddressToSendView("")
		//             dispatch(setCurrentTokenForSend({}))
		//             dispatch(setTokenSetted(false))
		//             dispatch(setAmountForSend(""))
		//             dispatch(setAddressForSend(""))
		// =======
		if (selectedToken.symbol === "DP") {
			// >>>>>>> origin/liketurbo
			let decrypted = await decrypt(encryptedSeedPhrase, seedPhrasePassword);
			const res = await sendNFT(
				curExt,
				addressToSend,
				selectedToken.addrData,
				decrypted.phrase,
			);

			if (!res.code) {
				dispatch(
					setTips({
						message: `Sended message to blockchain`,
						type: "info",
					}),
				);
			} else {
				dispatch(
					setTips({
						message: `Something goes wrong - error code ${res.code}`,
						type: "error",
					}),
				);
			}
			// <<<<<<< HEAD
			//             dispatch(setShowWaitingSendAssetsPopup(false))
			//             return
			//         } else if (currentTokenForSend.symbol === "TON Crystal") {
			// =======
			console.log("sendTokens", res);
		} else if (selectedToken.symbol === "TON Crystal") {
			if (!amountToSend) {
				return;
			}
			// setsendConfirmPopupIsVisible(false)
			// dispatch(setShowWaitingSendAssetsPopup(true))

			let decrypted = await decrypt(encryptedSeedPhrase, seedPhrasePassword);
			const res = await sendNativeTons(
				clientData,
				addressToSend,
				amountToSend,
				decrypted.phrase,
			);
			// dispatch(setShowWaitingSendAssetsPopup(false))
			if (!res.code) {
				dispatch(
					setTips({
						message: `Sended message to blockchain`,
						type: "info",
					}),
				);
			} else {
				dispatch(
					setTips({
						message: `Something goes wrong - error code ${res.code}`,
						type: "error",
					}),
				);
			}
			console.log("sendNFT", res);
		} else {
			if (!amountToSend) {
				return;
			}
			// setsendConfirmPopupIsVisible(false)
			// dispatch(setShowWaitingSendAssetsPopup(true))

			let decrypted = await decrypt(encryptedSeedPhrase, seedPhrasePassword);
			console.log(
				"sendtokens",
				selectedToken.rootAddress,
				addressToSend,
				amountToSend,
				decrypted.phrase,
			);

			const walletAddrByOwner = await getExpectedWalletAddressByOwner(
				selectedToken.rootAddress,
				addressToSend,
			);
			console.log("walletAddrByOwner222", walletAddrByOwner);

			const res = await sendToken(
				curExt,
				selectedToken.rootAddress,
				walletAddrByOwner.name,
				amountToSend,
				decrypted.phrase,
				selectedToken,
			);
			dispatch(setShowWaitingSendAssetsPopup(false));
			if (res && !res.code) {
				dispatch(
					setTips({
						message: `Sended message to blockchain`,
						type: "info",
					}),
				);
			} else {
				dispatch(
					setTips({
						message: `Something goes wrong - error code ${res.code}`,
						type: "error",
					}),
				);
			}

			console.log("sendToken", res);
		}
		setaddressToSendView("");
		dispatch(setCurrentTokenForSend({}));
		dispatch(setTokenSetted(false));
		dispatch(setAmountForSend(""));
		dispatch(setAddressForSend(""));
		dispatch(setShowWaitingSendAssetsPopup(false));
	}

	function handleClearInput() {
		setaddressToSendView("");
		dispatch(setAddressForSend(""));
	}

	function handleBack() {
		dispatch(setAddressForSend(""));
		history.push("/wallet");
	}
	function handleClose() {
		dispatch(setShowWaitingSendAssetsPopup(false));
	}

	return (
		<div className="container" style={{flexDirection: "column"}}>
			{!showWaitingSendAssetPopup && (
				<MainBlock
					style={{
						borderColor:
							validationMsgForAmount === NOT_ENOUGH_CAUSE_COMMISSION
								? "var(--error)"
								: "var(--mainblock-border-color)",
					}}
					smallTitle={false}
					content={
						<div>
							<div className="head_wrapper">
								{/*//TODO*/}
								<button
									className="arrow_back"
									onClick={() => handleBack(false)}
								>
									<img src={arrowBack} alt={"arrow"} />
								</button>
								<div className="left_block boldFont">Send asset</div>
							</div>
							<div
								className={cls("recipient_wrapper", {
									amount_wrapper_error: isInvalidAddress && addressToSend,
									amount_wrapper_success:
										!isInvalidAddress && !isLoading && addressToSend,
								})}
							>
								<div className="send_text_headers">Recipient address</div>
								<div onBlur={() => handleSetView()}>
									<div className="send_inputs">
										<input
											onChange={(e) => handleChangeAddress(e)}
											value={addressToSendView}
											className="recipient_input"
											placeholder={"0:..."}
										/>

										<CloseIcon
											// style=
											fontSize="medium"
											onClick={() => handleClearInput("address")}
										/>
									</div>
									<div></div>
								</div>
							</div>
							{isInvalidAddress && addressToSend && (
								<FormHelperText
									style={{marginLeft: "27px", marginTop: "4px"}}
									error
									id="component-error-text"
								>
									{validationMsgForAddress}
								</FormHelperText>
							)}
							{console.log(isInvalidAddress, validationMsgForAddress)}
							<BlockItem
								leftTitle={"Amount"}
								// currentToken={currentToken}
								rightTopBlock={
									<ShowBalance
										classWrapper={"send_balance center"}
										balance={selectedToken.balance}
										label={true}
										showBal={tokenSetted}
									/>
								}
								rightBottomBlock={<RightBlockBottom enableMax={<MaxBtn />} />}
								leftBlockBottom={<InputChange />}
								className={cls({
									amount_wrapper_error:
										isInvalidAmount &&
										validationMsgForAmount !== NOT_ENOUGH_CAUSE_COMMISSION,
									amount_wrapper_success:
										tokenSetted &&
										amountToSend &&
										!(
											isInvalidAmount &&
											validationMsgForAmount !== NOT_ENOUGH_CAUSE_COMMISSION
										),
								})}
							/>
							{isInvalidAmount &&
								validationMsgForAmount !== NOT_ENOUGH_CAUSE_COMMISSION && (
									<FormHelperText
										style={{marginLeft: "27px", marginTop: "4px"}}
										error
										id="component-error-text"
									>
										{validationMsgForAmount}
									</FormHelperText>
								)}

							<div className="btn_wrapper ">
								<button
									onClick={() => handleSetSendPopupVisibility()}
									className={cls("btn mainblock-btn", {
										"btn--disabled":
											isLoading ||
											(!addressToSend && !amountToSend) ||
											isInvalidAmount ||
											isInvalidAddress,
									})}
								>
									Send
								</button>
							</div>
							{!addressToSend && !amountToSend && (
								<FormHelperText sx={{textAlign: "center"}}>
									{NOT_TOUCHED}
								</FormHelperText>
							)}
						</div>
					}
				/>
			)}
			{sendConfirmPopupIsVisible && (
				<SendConfirmPopup
					// showConfirmPopup={()=>handleSetSendPopupVisibility(false)}
					hideConfirmPopup={() => handleHideConfirmPopup(false)}
					addressToSend={addressToSendView}
					currentAsset={selectedToken}
					amountToSend={amountToSend}
					handleSend={() => handleSendAsset()}
				/>
			)}

			{showWaitingSendAssetPopup && (
				<WaitingPopup
					text={`Sending ${amountToSend} ${selectedToken.symbol}`}
					handleClose={() => handleClose()}
				/>
			)}

			{validationMsgForAmount === NOT_ENOUGH_CAUSE_COMMISSION && (
				<FormHelperText
					error
				>{`${NOT_ENOUGH_CAUSE_COMMISSION} (Commission = ${SEND_TOKEN} TON)`}</FormHelperText>
			)}
		</div>
	);
}

export default SendAssets;
