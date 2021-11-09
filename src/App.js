import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
	Switch,
	Route,
	Redirect,
	useLocation,
} from "react-router-dom";
import {changeTheme, hideTip, showPopup} from "./store/actions/app";
import {
	setAssetsFromGraphQL,
	setPairsList,
	setSubscribeReceiveTokens,
} from "./store/actions/wallet";
import {
	agregateQueryNFTassets,
	getAllPairsWoithoutProvider,
	getAssetsForDeploy,
} from "./extensions/sdk_get/get";
import Account from "./pages/Account/Account";
import Swap from "./pages/Swap/Swap";
import Pool from "./pages/Pool/Pool";
import Popup from "./components/Popup/Popup";
import Header from "./components/Header/Header";
import Manage from "./pages/Manage/Manage";
import AddLiquidity from "./pages/AddLiquidity/AddLiquidity";
import PoolExplorer from "./components/PoolExplorer/PoolExplorer";
import NativeLogin from "./components/NativeLogin/NativeLogin";
import Assets from "./pages/Assets/Assets";
import SendAssets from "./components/SendAssets/SendAssets";
import ReceiveAssets from "./components/ReceiveAssets/ReceiveAssets";
import AssetsModal from "./components/SendAssets/AssetsModal";
import AssetsModalReceive from "./components/ReceiveAssets/AssetsModalReceive";
import {useMount} from "react-use";
import {
	enterSeedPhraseEmptyStorage,
	setEncryptedSeedPhrase,
	showEnterSeedPhraseUnlock,
} from "./store/actions/enterSeedPhrase";
import EnterPassword from "./components/EnterPassword/EnterPassword";
import WalletSettings from "./components/WalletSettings/WalletSettings";
import KeysBlock from "./components/WalletSettings/KeysBlock";
import Stacking from "./pages/Stacking/Stacking";
import RevealSeedPhrase from "./components/RevealSeedPhrase/RevealSeedPhrase";
import {setNFTassets} from "./store/actions/walletSeed";

import AssetsListForDeploy from "./components/AssetsListForDeploy/AssetsListForDeploy";
import {useSnackbar} from "notistack";
import {
	getAllPairsAndSetToStore,
	getAllTokensAndSetToStore,
} from "./reactUtils/reactUtils";
import LimitOrder from "./pages/LimitOrder/LimitOrder";
import useFetchLimitOrders from "./hooks/useFetchLimitOrders";
import useSubLimitOrders from "./hooks/useSubLimitOrders";
import CreatePair from "./pages/CreatePair/CreatePair";
import PinPopup from "./components/LoginViaPIN/PinPopup";
import LoginViaPin from "./components/LoginViaPIN/LoginViaPin";

function App() {
	// const dispatch = useDispatch();
	// const location = useLocation();
	//
	// const popup = useSelector((state) => state.appReducer.popup);
	// const appTheme = useSelector((state) => state.appReducer.appTheme);
	// const walletIsConnected = useSelector((state) => state.appReducer.walletIsConnected);
	// const swapAsyncIsWaiting = useSelector((state) => state.swapReducer.swapAsyncIsWaiting);
	// const poolAsyncIsWaiting = useSelector((state) => state.poolReducer.poolAsyncIsWaiting);
	// const manageAsyncIsWaiting = useSelector((state) => state.manageReducer.manageAsyncIsWaiting);
	// const revealSeedPhraseIsVisible = useSelector((state) => state.enterSeedPhrase.revealSeedPhraseIsVisible);
	//
	// const visibleEnterSeedPhraseUnlock = useSelector((state) => state.enterSeedPhrase.enterSeedPhraseUnlockIsVisible);
	// const emptyStorage = useSelector((state) => state.enterSeedPhrase.emptyStorage);
	// const clientData = useSelector((state) => state.walletReducer.clientData);
	//
	// const tips = useSelector((state) => state.appReducer.tips);
	// const transListReceiveTokens = useSelector((state) => state.walletReducer.transListReceiveTokens);
	//
	// const {enqueueSnackbar} = useSnackbar();
	//
	// const [onloading, setonloading] = useState(false);
	//
	// useFetchLimitOrders();
	// useSubLimitOrders();
	//
	// const chrome = localStorage.getItem("chrome");
	// if (chrome === null) showChromePopup();
	// else if (chrome === "false") showChromePopup();
	//
	// function showChromePopup() {
	// 	dispatch(showPopup({type: "chrome"}));
	// 	localStorage.setItem("chrome", "true");
	// }
	//
	// useEffect(async () => {
	// 	const pairs2 = await getAllPairsWoithoutProvider();
	// 	dispatch(setPairsList(pairs2));
	// 	setonloading(false);
	// }, []);
	//
	// useEffect(async () => {
	// 	setonloading(true);
	// 	const theme =
	// 		localStorage.getItem("appTheme") === null
	// 			? "light"
	// 			: localStorage.getItem("appTheme");
	// 	if (appTheme !== theme) dispatch(changeTheme(theme));
	// 	setonloading(false);
	// }, []);
	//
	// useEffect(() => {
	// 	window.addEventListener("beforeunload", function (e) {
	// 		if (swapAsyncIsWaiting || poolAsyncIsWaiting || manageAsyncIsWaiting)
	// 			e.returnValue = "";
	// 	});
	// }, [swapAsyncIsWaiting, poolAsyncIsWaiting, manageAsyncIsWaiting]);
	//
	// async function checkOnLogin() {
	// 	let esp = localStorage.getItem("esp");
	// 	if (esp === null) dispatch(enterSeedPhraseEmptyStorage(true));
	// 	else if (typeof esp === "string") {
	// 		// const receiveTokensData = JSON.parse(localStorage.getItem("setSubscribeReceiveTokens"))
	// 		// dispatch(setSubscribeReceiveTokens(receiveTokensData))
	// 		dispatch(enterSeedPhraseEmptyStorage(false));
	// 		dispatch(setEncryptedSeedPhrase(esp));
	// 		dispatch(showEnterSeedPhraseUnlock());
	// 	} else dispatch(enterSeedPhraseEmptyStorage(true));
	// }
	//
	// useMount(async () => {
	// 	await checkOnLogin();
	// });
	//
	// useEffect(async () => {
	// 	console.log("clientData", clientData);
	// 	const NFTassets = await agregateQueryNFTassets(clientData.address);
	// 	// setAssets(NFTassets)
	// 	dispatch(setNFTassets(NFTassets));
	// }, [clientData.address]);
	//
	//
	//
	// useEffect(async () => {
	// 	if (!tips) return;
	// 	if (
	// 		tips.type === "error" ||
	// 		tips.message === "Sended message to blockchain" ||
	// 		tips.message === "Copied"
	// 	) {
	// 		enqueueSnackbar({type: tips.type, message: tips.message});
	// 		return;
	// 	}
	//
	// 	const newTransList = JSON.parse(JSON.stringify(transListReceiveTokens));
	// 	if (tips.name === "deployLockStakeSafeCallback" ||	"transferOwnershipCallback") {
	// 		const NFTassets = await agregateQueryNFTassets(clientData.address);
	// 		dispatch(setNFTassets(NFTassets));
	// 	}
	// 	if (tips.name === "connectRoot") {
	// 		await getAllPairsAndSetToStore(clientData.address);
	// 		await getAllTokensAndSetToStore(clientData.address);
	// 	}
	// 	if (tips.name === "acceptedPairTokens") {
	// 		console.log("i at acceptedPairTokens");
	// 		setTimeout(
	// 			async () => await getAllTokensAndSetToStore(clientData.address),
	// 			10000,
	// 		);
	// 	}
	//
	// 	if (
	// 		tips.name === "tokensReceivedCallback" ||
	// 		tips.name === "processLiquidityCallback" ||
	// 		tips.name === "sendTokens" ||
	// 		tips.name === "connectRoot" ||
	// 		tips.name === "UpdateBalanceTONs"
	// 	) {
	// 		console.log("i was here", tips);
	// 		await getAllTokensAndSetToStore(clientData.address);
	// 	}
	// 	enqueueSnackbar({type: tips.type, message: tips.message});
	// 	newTransList.push(tips);
	// 	dispatch(setSubscribeReceiveTokens(newTransList));
	// }, [tips]);
	//
	// function onTipClosed() {
	// 	dispatch(hideTip());
	// }
	//
	// useEffect(async () => {
	// 	const addrArray = await getAssetsForDeploy();
	// 	dispatch(setAssetsFromGraphQL(addrArray));
	// }, []);

	return (
		<>
			<LoginViaPin/>
			{/*	{visibleEnterSeedPhraseUnlock === true &&*/}
			{/*		emptyStorage === false &&*/}
			{/*		!onloading && <EnterPassword />}*/}
			{/*	<div className="beta" onClick={onTipClosed}>*/}
			{/*		Beta version. Use desktop Google Chrome*/}
			{/*	</div>*/}
			{/*	<Header />*/}
			{/*	<Switch location={location}>*/}
			{/*		<Route exact path="/native-login" component={NativeLogin} />*/}
			{/*		<Route exact path="/pool-explorer" component={PoolExplorer} />*/}
			{/*		<Route exact path="/pool" component={Pool} />*/}
			{/*		<Route exact path="/account" component={Account} />*/}
			{/*		<Route exact path="/swap" component={Swap} />*/}
			{/*		<Route exact path="/manage" component={Manage} />*/}
			{/*		<Route exact path="/add-liquidity" component={AddLiquidity} />*/}
			{/*		<Route exact path="/create-pair" component={CreatePair} />*/}
			{/*		<Route exact path="/staking" component={Stacking} />*/}
			{/*		<Route exact path="/wallet" component={Assets} />*/}
			{/*		<Route exact path="/orders" component={LimitOrder} />*/}
			{/*		<Route exact path="/">*/}
			{/*			<Redirect from="/" to="/wallet" />*/}
			{/*		</Route>*/}

			{/*		{walletIsConnected ? (*/}
			{/*			<>*/}
			{/*				<Route exact path="/wallet/settings/keys" component={KeysBlock} />*/}
			{/*				<Route exact path="/wallet/send" component={SendAssets} />*/}
			{/*				<Route exact path="/wallet/receive" component={ReceiveAssets} />*/}
			{/*				<Route exact path="/wallet/settings" component={WalletSettings} />*/}
			{/*				<Route exact path="/wallet/deployAssets" component={AssetsListForDeploy} />*/}
			{/*				<Route exact path="/wallet/receive/receive-modal" component={AssetsModalReceive} />*/}
			{/*				<Route exact path="/wallet/send/send-modal" component={AssetsModal} />*/}
			{/*			</>*/}
			{/*		) : null}*/}
			{/*	</Switch>*/}
			{/*	{popup.isVisible ? (*/}
			{/*		<Popup type={popup.type} message={popup.message} link={popup.link} />*/}
			{/*	) : null}*/}
			{/*	{revealSeedPhraseIsVisible ? <RevealSeedPhrase /> : null}*/}
		</>
	);
}

export default App;
