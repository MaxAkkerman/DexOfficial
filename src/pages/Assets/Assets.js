import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import MainBlock from "../../components/MainBlock/MainBlock";
import "./Assets.scss";
import sendAssetsimg from "../../images/sendAssets.svg";
import receiveAssets from "../../images/receiveAssets.svg";
import goToExchange from "../../images/goToExchange.svg";
import settingsBtn from "../../images/Vector.svg";
import nativeBtn from "../../images/nativeadd.svg";
import AssetsList from "../../components/AssetsList/AssetsList";

import {useDispatch, useSelector} from "react-redux";
import {showTip} from "../../store/actions/app";
import useTokensList from "../../hooks/useAssetList";
import {setTokenList} from "../../store/actions/wallet";
import {unWrapTons, wrapTons} from "../../extensions/sdk/run";
import {decrypt} from "../../extensions/seedPhrase";
import useKeyPair from "../../hooks/useKeyPair";
import client, {queryRoots} from "../../extensions/webhook/script";

import fetchLimitOrders from "../../utils/fetchLimitOrders";

import {setOrderList} from "../../store/actions/limitOrders";
import WrapUnwrap from "../../components/wrapUnwrap/WrapUnwrap";
import TONicon from "../../images/tonCrystalDefault.svg";
import salary from "../../images/salary.svg";
import WithDraw from "../../components/WithDraw/WithDraw";
// import WrapUnwrap from "../../components/wrapUnwrap/wrapUnwrap";

function Assets() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [assets, setAssets] = useState([]);
	const tokenList = useSelector((state) => state.walletReducer.tokenList);
	const walletIsConnected = useSelector(
		(state) => state.appReducer.walletIsConnected,
	);
	const NFTassets = useSelector((state) => state.walletSeedReducer.NFTassets);
	const orderList = useSelector((state) => state.limitOrders.orderList);
	// const tokenList = useSelector(state => state.walletReducer.tokenList);

	const liquidityList = useSelector(
		(state) => state.walletReducer.liquidityList,
	);
	const clientData = useSelector((state) => state.walletReducer.clientData);

	useEffect(async () => {
		const orders = await fetchLimitOrders();
		dispatch(setOrderList(orders));
	}, []);

	useEffect(() => {
		// const pureNFT = [
		// 	{
		// 		walletAddress:
		// 			"0:e0b0495751895edc29c5e453f122f25fffebd2bf21c0a0c3d8e98a8ae7b87e3a",
		// 		type:"Ordinary",
		// 		balance: 0,
		// 		stakeTotal: 10000000000,
		// 		icon: salary,
		// 		symbol: "DP",
		// 		owner_address: "default",
		// 		details:{
		// 			periodLockStake:10000000,
		// 			apyLockStake:0,
		// 			timeStartLockStake:10,
		// 		}
		//
		//
		//
		// 	},
		// ];
		// setAssets(pureNFT);
		setAssets(NFTassets);
	}, [NFTassets]);

	function handleChangeOnSend() {
		history.push("/wallet/send");
	}

	function handleChangeOnReceive() {
		history.push("/wallet/receive");
	}

	function handlePushToExchange() {
		history.push("/swap");
	}

	function handleGoToSettings() {
		history.push("/wallet/settings");
	}

	function addTokenWallet() {
		history.push("/wallet/deployAssets");
	}

	function handleShowNFTData(curItem) {
		console.log("curItem", curItem, "NFTassets", NFTassets);
		const copyAssets = JSON.parse(JSON.stringify(assets));
		copyAssets.map((item) => {
			console.log("item.id", item.id, "curItem.id", curItem.id);

			if (item.id === curItem.id) {
				console.log("item.showNftData", item.showNftData, !item.showNftData);
				item.showNftData = !item.showNftData;
			}
		});
		setAssets(copyAssets);
	}
	// const [tokensListChanged,settokensListChanged] = useState([])
	function handleClickToken(curItem) {
		if (curItem.type !== "Native Tons") return;
		console.log("curItem", curItem);
		const copyAssets = JSON.parse(JSON.stringify(tokensList));
		copyAssets.map((item) => {
			if ("Native Tons" === item.type) {
				item.showWrapMenu = !item.showWrapMenu;
			}
		});
		dispatch(setTokenList(copyAssets));
	}
	const {keyPair} = useKeyPair();

	const [showWrapMenu, setshowWrapMenu] = useState(false);

	const [currentTokenForWrap, setcurrentTokenForWrap] = useState({});
	const [viewData, setViewData] = useState({});
	async function handleWrapTons() {
		const tonObj = tokensList.filter((item) => item.type === "Native Tons");
		console.log("tonObj", tonObj);
		setcurrentTokenForWrap(tonObj[0]);
		setViewData({
			type: "wrap",
			confirmText: "wrap",
			tokenSetted: true,
			title: "TON Crystal → WTON",
		});
		setshowWrapMenu(true);
		// const wrapRes = await wrapTons(clientData.address,keyPair,1000000000)
		// console.log("wrapRes",wrapRes)
	}
	async function handleUnWrapTons() {
		const tonObj = tokensList.filter((item) => item.symbol === "WTON");
		setcurrentTokenForWrap(tonObj[0]);
		setViewData({
			type: "unwrap",
			confirmText: "unwrap",
			tokenSetted: true,
			title: "WTON → TON Crystal",
		});
		console.log("tonObj", tonObj);
		setshowWrapMenu(true);

		// const unWrapTonsRes = await unWrapTons(clientData.address,keyPair,1000000000)
		// console.log("unWrapTonsRes",unWrapTonsRes)
	}

	const [showWithdrawMenu,setshowWithdrawMenu] = useState(false)
	const [curNFTForWithdraw,setCurNFTForWithdraw] = useState(false)
	function handleWithdraw(item){
		setshowWithdrawMenu(true)
		setshowWrapMenu(false);
		setCurNFTForWithdraw(item)
		console.log("item",item)
	}

	const {assetList: tokensList} = useTokensList();
	return (
		<>
			{showWrapMenu && !showWithdrawMenu &&
			<WrapUnwrap
				currentTokenForWrap={currentTokenForWrap}
				confirmText={viewData.confirmText}
				tokenSetted={viewData.tokenSetted}
				title={viewData.title}
				handleShow={() => setshowWrapMenu(false)}
				transactionType={viewData.type}
				/>
			}
			{!showWrapMenu && showWithdrawMenu &&
			<WithDraw
				curNFTForWithdraw={curNFTForWithdraw}
				confirmText={viewData.confirmText}
				// tokenSetted={viewData.tokenSetted}
				title={viewData.title}
				handleShow={()=>setshowWithdrawMenu(false)}
				transactionType={viewData.type}
				/>
			}

			{!showWrapMenu && !showWithdrawMenu &&
			<div className="container">
				<MainBlock
					smallTitle={false}
					// title={'Assets'}
					content={
						<div>
							<div className="head_wrapper">
								<div className="left_block boldFont">Your assets</div>
								<div className={"settings_btn_container"}>
									<button
										className={
											walletIsConnected
												? "settings_btn"
												: "settings_btn btn--disabled"
										}
										onClick={
											walletIsConnected ? () => addTokenWallet() : null
										}
									>
										<img src={nativeBtn} alt={"native"}/>
									</button>
									<button
										className={
											walletIsConnected
												? "settings_btn"
												: "settings_btn btn--disabled"
										}
										onClick={
											walletIsConnected ? () => handleGoToSettings() : null
										}
									>
										<img src={settingsBtn} alt={"settings"}/>
									</button>
								</div>
							</div>
							<div className="action_btns">
								<div>
									<div
										className={
											walletIsConnected ? "onHover" : "onHover btn--disabled"
										}
										onClick={
											walletIsConnected ? () => handleChangeOnSend() : null
										}
									>
										<img
											className="arrow_icons "
											src={sendAssetsimg}
											alt={"Send"}
										/>
									</div>
									<div className="action_btns_bottom_text">Send</div>
								</div>
								<div>
									<button
										className={
											walletIsConnected ? "onHover" : "onHover btn--disabled"
										}
										onClick={
											walletIsConnected ? () => handleChangeOnReceive() : null
										}
									>
										<img
											className="arrow_icons"
											src={receiveAssets}
											alt={"Receive"}
										/>
									</button>
									<div className="action_btns_bottom_text">Receive</div>
								</div>
								<div>
									<div
										className={
											walletIsConnected ? "onHover" : "onHover btn--disabled"
										}
										onClick={() => handlePushToExchange()}
									>
										<img
											className="arrow_icons"
											src={goToExchange}
											alt={"Exchange"}
										/>
									</div>
									<div className="action_btns_bottom_text">Swap</div>
								</div>
							</div>

							{walletIsConnected ? (
								<>
									{(NFTassets && NFTassets.length) ||
									(tokensList && tokensList.length) ||
									(orderList && orderList.length) ? (
										<AssetsList
											TokenAssetsArray={[...tokensList, ...liquidityList]}
											orderAssetsArray={orderList}
											NFTassetsArray={assets}
											handleClickNFT={(item) => handleShowNFTData(item)}
											// showNFTdata={showNFTdata}
											showItBeShown={true}
											handleClickToken={(item) => handleClickToken(item)}
											wrapTons={() => handleWrapTons()}
											unWrapTons={() => handleUnWrapTons()}
											handleWithdraw={(item) => handleWithdraw(item)}
										/>
									) : (
										<div className="assets_loader_wrapper">
											You have no wallets yet
										</div>
									)}
								</>
							) : (
								<button
									className="btn mainblock-btn"
									onClick={() => history.push("/account")}
								>
									Connect wallet
								</button>
							)}
						</div>
					}
				/>
			</div>
			}
			)}
		</>
	);
}

export default Assets;
