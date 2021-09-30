import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MainBlock from "../../components/MainBlock/MainBlock";
// import './SendAssets.scss';
import arrowBack from "../../images/arrowBack.png";
import {useHistory} from "react-router-dom";
import {
	setAddressForSend,
	setAmountForSend,
	setShowWaitingSendAssetsPopup,
} from "../../store/actions/walletSeed";
import InputChange from "../AmountBlock/InputChange";
import BlockItem from "../AmountBlock/AmountBlock";
import MaxBtn from "../AmountBlock/MAXbtn";
import ShowBalance from "../AmountBlock/ShowBalance";
import {
	connectToPairStep2DeployWallets,
	sendNativeTons,
	sendNFT,
	sendToken,
	unWrapTons,
	wrapTons,
} from "../../extensions/sdk/run";
import WaitingPopup from "../WaitingPopup/WaitingPopup";
import {setTips} from "../../store/actions/app";
import SetTokenBlock from "../AmountBlock/SetTokenBlock";
import useKeyPair from "../../hooks/useKeyPair";
import {setTokenList} from "../../store/actions/wallet";
import {decrypt} from "../../extensions/seedPhrase";
import {getClientKeys} from "../../extensions/webhook/script";

function WrapUnwrap(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const amountToSend = useSelector(
		(state) => state.walletSeedReducer.amountToSend,
	);
	const clientData = useSelector((state) => state.walletReducer.clientData);
	const tokenList = useSelector((state) => state.walletReducer.tokenList);

	const [wrapConfirmIsVisible, setWrapConfirmIsVisible] = useState(false);

	const [noWtonWallet, setNoWtonWallet] = useState(true);

	const encryptedSeedPhrase = useSelector(
		(state) => state.enterSeedPhrase.encryptedSeedPhrase,
	);
	const seedPhrasePassword = useSelector(
		(state) => state.enterSeedPhrase.seedPhrasePassword,
	);

	useEffect(() => {
		const wtonWallet = tokenList.filter(
			(item) =>
				item.rootAddress ===
				"0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37",
		);
		console.log("wtonWallet", wtonWallet.length);
		if (wtonWallet.length === 1) {
			setNoWtonWallet(false);
		} else {
			setNoWtonWallet(true);
		}
	}, []);
	useEffect(() => {
		const wtonWallet = tokenList.filter(
			(item) =>
				item.rootAddress ===
				"0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37",
		);
		if (wtonWallet.length === 1) {
			setNoWtonWallet(false);
		} else {
			setNoWtonWallet(true);
		}
	}, [tokenList]);

	const [mainIsVisible, setmainIsVisible] = useState(true);
	async function handleDeployWtonWallet() {
		if (clientData.balance < 4) {
			dispatch(
				setTips({
					message: `You need at least 4 TONs on balance to deploy WTON wallet`,
					type: "error",
				}),
			);
		} else {
			setdeployWTONisVisible(true);
			setmainIsVisible(false);
			let decrypted = await decrypt(encryptedSeedPhrase, seedPhrasePassword);
			const keys = await getClientKeys(decrypted.phrase);
			const curPair = {rootA: "0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37"}

			const deployData = {
			    curPair,
			    clientAdr: clientData.address,
			    clientRoots: ""
			}
			const deployRes = await connectToPairStep2DeployWallets(deployData, keys)
			console.log("deployRes", deployRes)
			setdeployWTONisVisible(false);
			setmainIsVisible(true);
		}
	}
	const [deployWTONisVisible, setdeployWTONisVisible] = useState(false);
	function handleCloseWTON() {
		setmainIsVisible(true);
		setdeployWTONisVisible(false);
	}
	const {keyPair} = useKeyPair();

	async function handleConfirm() {
		if (!amountToSend) {
			dispatch(
				setTips({
					message: `Please set amount for ${props.confirmText}`,
					type: "error",
				}),
			);
		} else if (
			props.currentTokenForWrap.type === "Native Tons" &&
			amountToSend > props.currentTokenForWrap.balance - 1.2
		) {
			dispatch(
				setTips({
					message: `Insufficient balance, transaction fee 1.2 TONs`,
					type: "error",
				}),
			);
		} else if (
			props.currentTokenForWrap.type === "PureToken" &&
			amountToSend > props.currentTokenForWrap.balance
		) {
			dispatch(
				setTips({
					message: `Insufficient balance, please check balance`,
					type: "error",
				}),
			);
		} else {
			setWrapConfirmIsVisible(true);
			setmainIsVisible(false);
			let res;
			if (props.transactionType === "wrap") {
				res = await wrapTons(clientData.address, keyPair, amountToSend);
			} else {
				res = await unWrapTons(clientData.address, keyPair, amountToSend);
			}

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
			setmainIsVisible(false);
			setWrapConfirmIsVisible(false);
			dispatch(setAmountForSend(0));
			dispatch(setShowWaitingSendAssetsPopup(false));
			props.handleShow(false);
			console.log("sendToken", res);
		}
	}

	function handleBack() {
		props.handleShow(false);
		dispatch(setAmountForSend(0));
	}
	function handleClose() {
		props.handleShow(false);
		dispatch(setAmountForSend(0));
		setWrapConfirmIsVisible(false);
	}

	return (
		<div className="container">
			{((!wrapConfirmIsVisible && !deployWTONisVisible) || mainIsVisible) && (
				<MainBlock
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
								<div className="left_block">{props.title}</div>
							</div>

							<BlockItem
								leftTitle={"Amount"}
								// currentToken={currentToken}
								rightTopBlock={
									<ShowBalance
										classWrapper={"send_balance center"}
										balance={props.currentTokenForWrap.balance}
										label={true}
										showBal={props.tokenSetted}
									/>
								}
								rightBottomBlock={
									<div className="send_set_token_wrap column">
										{/*<MaxBtn/>*/}
										<div style={{width: "52px"}} />
										<SetTokenBlock
											handleTouchTokenModal={null}
											// img={TON}
											disableArrow={true}
											currentToken={props.currentTokenForWrap}
										/>
									</div>
								}
								leftBlockBottom={<InputChange />}
								// className={isInvalidAmount && "amount_wrapper_error"}
							/>
							{/*{isInvalidAmount &&*/}
							{/*<FormHelperText style={{marginLeft: "27px", marginTop: "4px"}} error id="component-error-text">{validationMsgForAmount}</FormHelperText>}*/}

							<div className="btn_wrapper ">
								{!noWtonWallet ? (
									<button
										onClick={() => handleConfirm()}
										className="btn mainblock-btn"
									>
										Confirm {props.confirmText}
									</button>
								) : (
									<button
										onClick={() => handleDeployWtonWallet()}
										className="btn mainblock-btn"
									>
										Deploy WTON wallet
									</button>
								)}
							</div>
						</div>
					}
				/>
			)}
			{wrapConfirmIsVisible && (
				<WaitingPopup
					text={`${props.title} ${amountToSend}`}
					handleClose={() => handleClose()}
				/>
			)}
			{deployWTONisVisible && (
				<WaitingPopup
					text={`Deploying WTON wallet`}
					handleClose={() => handleCloseWTON()}
				/>
			)}
		</div>
	);
}

export default WrapUnwrap;
