import React, {useEffect, useRef, useState} from "react";
import {Grid} from "@material-ui/core";
import "./Bridge.scss";
import MainBlock from "../../components/MainBlock/MainBlock";
import BridgeNetworksList from "./BridgeNetworksList";
import AssetsList from "../../components/AssetsList/AssetsList";
import {NextBtn} from "../../components/LoginViaPIN/NextBtn";
import {useSelector} from "react-redux";
import sendAssetsimg from "../../images/sendAssets.svg";
import ShowBalance from "../../components/AmountBlock/ShowBalance";
import RightBlockBottom from "../../components/AmountBlock/RightBlockBottom";
import MaxBtn from "../../components/AmountBlock/MAXbtn";
import InputChange from "../../components/AmountBlock/InputChange";
import cls from "classnames";
import {NOT_ENOUGH_CAUSE_COMMISSION} from "../../constants/validationMessages";
import BlockItem from "../../components/AmountBlock/AmountBlock";
import AssetsListBridge from "./AssetsListBridge";
import bnb from "../../images/bridgeNets/bnb.png";
import arrowDown from "../../images/icons/arrowBotThin.svg";
import AddressPopup from "./AddressPopup";
import BridgeAssets from "@/pages/Bridge/test";
// import BridgeAssets from "@/pages/Bridge/test";

const assetsBridge = [
	{
		name: "DAI Stablecoin",
		symbol: "DAI",
		balance: 4,
		icon: bnb,
	},
	{
		name: "Bitcoin",
		symbol: "BTC",
		balance: 4,
		icon: bnb,
	},
	{
		name: "Ethereum",
		symbol: "ETH",
		balance: 4,
		icon: bnb,
	},
];
// function Bridge() {
//
//     return (
//         <Grid className="container">
//
//             <Grid className="netContainer">
//                 <Grid className="mainblock addToMain">
//
//
//                     <Grid className="bridge_title_wrapper">
//                         Network bridge
//                     </Grid>
//                 </Grid>
//
//             </Grid>
//
//         </Grid>
//     );
// }
//
// export default Bridge;

function Bridge() {
	const walletIsConnected = useSelector(
		(state) => state.appReducer.walletIsConnected,
	);
	const [amountTo, setAmountTo] = useState(null);
	const [amountFrom, setAmountFrom] = useState(null);

	const [toTokenSetted, setToTokenSetted] = useState(false);
	const [onAssetsList, setOnAssetsList] = useState(false);

	const [fromTokenSetted, setFromTokenSetted] = useState(false);
	const [toCurAsset, setToCurAsset] = useState({});
	const [fromCurAsset, setFromCurAsset] = useState({});
	const [type, setType] = useState("from");

	function handleOnAssetsListOpen(type) {
		setType(type);
		setOnAssetsList(true);
	}
	function changeAmountToSend(am, type) {
		if (type === "from") {
			setAmountFrom(am);
		} else {
			setAmountTo(am);
		}
	}

	function handleShowBridgeAssets() {
		console.log("handleShowBridgeAssets");
		setOnAssetsList(true);
	}

	function handleSetBridgeAsset(e) {
		if (type === "from") {
			setFromTokenSetted(true);
			setFromCurAsset(e);
		} else {
			setToTokenSetted(true);
			setToCurAsset(e);
		}
		setOnAssetsList(false);
	}
	function handleCloseAseetsList() {
		setOnAssetsList(false);
	}
	return (
		<>
			{onAssetsList ? (
				// <div>
				//     hello
				// </div>
				<BridgeAssets />
			) : (
				// <AssetsListBridge
				//     handleSetToken={(e) => handleSetBridgeAsset(e)}
				//     assets={assetsBridge}
				//     typr={type}
				//     handleClose={() => setOnAssetsList(false)}
				// />
				<div className="container" onClick={() => handleShowBridgeAssets()}>
					<MainBlock
						smallTitle={false}
						// title={'Assets'}
						content={
							<div>
								<div className="head_wrapper">
									<div className="left_block boldFont">Bridge</div>
								</div>

								<Grid className="bridge_netSelector_wrapper">
									<Grid>Binance > Ethereum</Grid>
									<button
										className="btn input-btn"
										style={{fontSize: "12px", borderRadius: "13px"}}
									>
										Network
										<svg
											width="12"
											height="8"
											viewBox="0 0 16 10"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M3.06066 0.93934C2.47487 0.353553 1.52513 0.353553 0.93934 0.93934C0.353553 1.52513 0.353553 2.47487 0.93934 3.06066L3.06066 0.93934ZM8 8L6.93934 9.06066C7.52513 9.64645 8.47487 9.64645 9.06066 9.06066L8 8ZM15.0607 3.06066C15.6464 2.47487 15.6464 1.52513 15.0607 0.93934C14.4749 0.353553 13.5251 0.353553 12.9393 0.93934L15.0607 3.06066ZM0.93934 3.06066L6.93934 9.06066L9.06066 6.93934L3.06066 0.93934L0.93934 3.06066ZM9.06066 9.06066L15.0607 3.06066L12.9393 0.93934L6.93934 6.93934L9.06066 9.06066Z"
												fill="white"
											/>
										</svg>
									</button>
								</Grid>

								<BlockItem
									leftTitle={"You send"}
									// currentToken={currentToken}
									rightTopBlock={
										<>
											<ShowBalance
												classWrapper={"send_balance center"}
												balance={5}
												label={true}
												showBal={true}
											/>
											<AddressPopup
												netIcon={toCurAsset.icon}
												classWrapper={""}
												address={
													"0:575ae3f0babf72903f51af69a4d4f0d010f232b405a687d1ef81cd731869cb07"
												}
											/>
										</>
									}
									rightBottomBlock={
										<RightBlockBottom
											tokenSetted={fromTokenSetted}
											curAsset={fromCurAsset}
											showAssetsList={() => handleOnAssetsListOpen("from")}
											enableMax={null}
										/>
									}
									leftBlockBottom={
										<InputChange
											changeAmout={(am) => changeAmountToSend(am, "from")}
											amount={amountFrom}
										/>
									}
									// className={cls({
									//     amount_wrapper_error:
									//         isInvalidAmount &&
									//         validationMsgForAmount !== NOT_ENOUGH_CAUSE_COMMISSION,
									//     amount_wrapper_success:
									//         tokenSetted &&
									//         amountToSend &&
									//         !(
									//             isInvalidAmount &&
									//             validationMsgForAmount !== NOT_ENOUGH_CAUSE_COMMISSION
									//         ),
									// })}
								/>
								<Grid
									style={{
										display: "flex",
										justifyContent: "center",
										marginTop: "40px",
									}}
								>
									<img
										style={{transform: "rotate(90deg)"}}
										src={arrowDown}
										alt={"arrow_down"}
									/>
								</Grid>

								<BlockItem
									leftTitle={"You will receive"}
									// currentToken={currentToken}
									rightTopBlock={
										<>
											<ShowBalance
												classWrapper={"send_balance center"}
												balance={5}
												label={true}
												showBal={true}
											/>
											<AddressPopup
												netIcon={fromCurAsset.icon}
												classWrapper={""}
												address={
													"0:575ae3f0babf72903f51af69a4d4f0d010f232b405a687d1ef81cd731869cb07"
												}
											/>
										</>
									}
									rightBottomBlock={
										<RightBlockBottom
											tokenSetted={toTokenSetted}
											curAsset={toCurAsset}
											showAssetsList={() => handleOnAssetsListOpen("to")}
											enableMax={null}
										/>
									}
									leftBlockBottom={
										<InputChange
											changeAmout={(am) => changeAmountToSend(am, "to")}
											amount={amountTo}
										/>
									}
									// className={cls({
									//     amount_wrapper_error:
									//         isInvalidAmount &&
									//         validationMsgForAmount !== NOT_ENOUGH_CAUSE_COMMISSION,
									//     amount_wrapper_success:
									//         tokenSetted &&
									//         amountToSend &&
									//         !(
									//             isInvalidAmount &&
									//             validationMsgForAmount !== NOT_ENOUGH_CAUSE_COMMISSION
									//         ),
									// })}
								/>

								{/*<BridgeNetworksList/>*/}

								<NextBtn
									curBtnStyles={"curBtnStyles"}
									btnsClass={"enterSPRegBox"}
									btnText={"Next"}
									errColor={null}
									handleClickNext={null}
								/>
							</div>
						}
					/>
				</div>
			)}
		</>
	);
}

export default Bridge;
