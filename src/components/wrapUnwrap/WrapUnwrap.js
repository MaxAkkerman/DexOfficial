import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MainBlock from "../../components/MainBlock/MainBlock";
import arrowBack from "../../images/arrowBack.png";
import {
	setAmountForSend,
	setShowWaitingSendAssetsPopup,
} from "../../store/actions/walletSeed";
import InputChangeLocal from "../AmountBlock/InputChangeLocal";
import BlockItem from "../AmountBlock/AmountBlock";
import ShowBalance from "../AmountBlock/ShowBalance";
import {
	connectToPairStep2DeployWallets,
	sendToken,
	unWrapTons,
	wrapTons,
} from "../../extensions/sdk_run/run";
import WaitingPopup from "../WaitingPopup/WaitingPopup";
import {setTips} from "../../store/actions/app";
import SetTokenBlock from "../AmountBlock/SetTokenBlock";
import useKeyPair from "../../hooks/useKeyPair";
import {decrypt} from "../../extensions/tonUtils";
import {getClientKeys} from "../../extensions/sdk_get/get";
import {useFormik} from "formik";
import cls from "classnames";
import {FormHelperText} from "@mui/material";
import {
	NOT_ENOUGH as NOT_ENOUGH_MSG,
	NOT_ENOUGH_CAUSE_COMMISSION as NOT_ENOUGH_CAUSE_COMMISSION_MSG,
	NOT_TOUCHED as NOT_TOUCHED_MSG,
} from "../../constants/validationMessages";
import useAssetList from "../../hooks/useAssetList";
import {WRAP_UNWRAP as WRAP_UNWRAP_COMMISSION} from "../../constants/commissions";

function WrapUnwrap(props) {
	const dispatch = useDispatch();

	const clientData = useSelector((state) => state.walletReducer.clientData);
	const tokenList = useSelector((state) => state.walletReducer.tokenList);

	const encryptedSeedPhrase = useSelector(
		(state) => state.enterSeedPhrase.encryptedSeedPhrase,
	);
	const seedPhrasePassword = useSelector(
		(state) => state.enterSeedPhrase.seedPhrasePassword,
	);

	const [wrapConfirmIsVisible, setWrapConfirmIsVisible] = useState(false);
	const [noWtonWallet, setNoWtonWallet] = useState(true);
	const [mainIsVisible, setmainIsVisible] = useState(true);
	const [deployWTONisVisible, setdeployWTONisVisible] = useState(false);

	const {keyPair} = useKeyPair();
	const {assetList} = useAssetList();

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

	async function handleDeployWtonWallet() {
		if (clientData.balance < 4) {
			dispatch(
				setTips({
					message: `You need at least 4 EVERs on balance to deploy WTON wallet`,
					type: "error",
				}),
			);
		} else {
			setdeployWTONisVisible(true);
			setmainIsVisible(false);
			let decrypted = await decrypt(encryptedSeedPhrase, seedPhrasePassword);
			const keys = await getClientKeys(decrypted.phrase);
			const curPair = {
				rootA:
					"0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37",
			};

			const deployData = {
				curPair,
				clientAdr: clientData.address,
				clientRoots: "",
			};
			const deployRes = await connectToPairStep2DeployWallets(deployData, keys);
			console.log("deployRes", deployRes);
			setdeployWTONisVisible(false);
			setmainIsVisible(true);
		}
	}

	function handleCloseWTON() {
		setmainIsVisible(true);
		setdeployWTONisVisible(false);
	}

	const {
		values,
		handleChange,
		handleBlur,
		dirty,
		errors,
		isValid: valid,
	} = useFormik({
		initialValues: {
			amount: "",
		},
		validate({amount}) {
			const errors = {};

			if (amount > props.currentTokenForWrap.balance)
				errors.amount = NOT_ENOUGH_MSG;

			const tonAsset = assetList.find((t) => t.symbol === "EVER");

			if (tonAsset && tonAsset.symbol === props.currentTokenForWrap.symbol) {
				if (tonAsset.balance - amount - WRAP_UNWRAP_COMMISSION <= 0)
					errors.commission = `${NOT_ENOUGH_CAUSE_COMMISSION_MSG} (Commission = ${WRAP_UNWRAP_COMMISSION} TON)`;
			} else if (tonAsset) {
				if (tonAsset.balance - WRAP_UNWRAP_COMMISSION <= 0)
					errors.commission = `${NOT_ENOUGH_CAUSE_COMMISSION_MSG} (Commission = ${WRAP_UNWRAP_COMMISSION} TON)`;
			}

			return errors;
		},
	});

	async function handleConfirm() {
		if (!valid || !dirty) return;

		if (!values.amount) {
			dispatch(
				setTips({
					message: `Please set amount for ${props.confirmText}`,
					type: "error",
				}),
			);
		} else if (
			props.currentTokenForWrap.type === "Native evers" &&
			values.amount > props.currentTokenForWrap.balance - 1.2
		) {
			dispatch(
				setTips({
					message: `Insufficient balance, transaction fee 1.2 EVERs`,
					type: "error",
				}),
			);
		} else if (
			props.currentTokenForWrap.type === "PureToken" &&
			values.amount > props.currentTokenForWrap.balance
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
				res = await wrapTons(clientData.address, keyPair, values.amount);
			} else {
				res = await unWrapTons(clientData.address, keyPair, values.amount);
			}

			if (!res.code) {
				dispatch(
					setTips({
						message: `Sent message to blockchain`,
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
		<div className="container" style={{flexDirection: "column"}}>
			{((!wrapConfirmIsVisible && !deployWTONisVisible) || mainIsVisible) && (
				<div style={{display: "contents"}}>
					<MainBlock
						style={{
							borderColor: errors.commission
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
									<div className="left_block boldFont">{props.title}</div>
								</div>

								<BlockItem
									leftTitle={"Amount"}
									style={{
										borderColor: errors.amount
											? "var(--error)"
											: "var(--input-border-color)",
									}}
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
									leftBlockBottom={
										<InputChangeLocal
											name="amount"
											value={values.amount}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									}
									// className={isInvalidAmount && "amount_wrapper_error"}
								/>
								{errors.amount && (
									<FormHelperText error>{errors.amount}</FormHelperText>
								)}
								{/*{isInvalidAmount &&*/}
								{/*<FormHelperText style={{marginLeft: "27px", marginTop: "4px"}} error id="component-error-text">{validationMsgForAmount}</FormHelperText>}*/}

								<div className="btn_wrapper ">
									{!noWtonWallet ? (
										<button
											onClick={() => handleConfirm()}
											className={cls(
												"btn mainblock-btn",
												(!dirty || !valid) && "btn--disabled",
											)}
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
								{!dirty && (
									<FormHelperText sx={{textAlign: "center"}}>
										{NOT_TOUCHED_MSG}
									</FormHelperText>
								)}
							</div>
						}
					/>
					{errors.commission && (
						<FormHelperText error sx={{textAlign: "center"}}>
							{errors.commission}
						</FormHelperText>
					)}
				</div>
			)}

			{wrapConfirmIsVisible && (
				<WaitingPopup
					text={`${props.title} ${values.amount}`}
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
