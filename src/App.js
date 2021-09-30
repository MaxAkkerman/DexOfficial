import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Switch, Route, Redirect, useLocation, useHistory} from 'react-router-dom';
import {changeTheme, hideTip, showPopup} from './store/actions/app';
import {
    setAssetsFromGraphQL,
    setLiquidityList,
    setPairsList,
    setSubscribeReceiveTokens,
    setTokenList,
    setTransactionsList,
    setWallet
} from './store/actions/wallet';
import {
    agregateQueryNFTassets,
    checkClientPairExists,
    checkPubKey,
    checkwalletExists,
    getAllClientWallets,
    getAllPairsWoithoutProvider,
    getAssetsForDeploy,
    getClientBalance,
    subscribe,
} from './extensions/webhook/script';
import {
    setSwapAsyncIsWaiting,
    setSwapFromInputValue,
    setSwapFromInputValueChange,
    setSwapFromToken,
    setSwapToInputValue,
    setSwapToToken
} from './store/actions/swap';
import {
    setPoolAsyncIsWaiting,
    setPoolFromInputValue,
    setPoolFromToken,
    setPoolToInputValue,
    setPoolToToken
} from './store/actions/pool';
import {
    setManageAsyncIsWaiting,
    setManageBalance,
    setManageFromToken,
    setManagePairId,
    setManageRateAB,
    setManageRateBA,
    setManageToToken
} from './store/actions/manage';
import Account from './pages/Account/Account';
import Swap from './pages/Swap/Swap';
import Pool from './pages/Pool/Pool';
import Popup from './components/Popup/Popup';
import Header from './components/Header/Header'
import Manage from './pages/Manage/Manage';
import AddLiquidity from './pages/AddLiquidity/AddLiquidity';
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
    showEnterSeedPhraseUnlock
} from "./store/actions/enterSeedPhrase";
import EnterPassword from "./components/EnterPassword/EnterPassword";
import WalletSettings from "./components/WalletSettings/WalletSettings";
import KeysBlock from "./components/WalletSettings/KeysBlock";
import Stacking from "./pages/Stacking/Stacking";
import RevealSeedPhrase from "./components/RevealSeedPhrase/RevealSeedPhrase";
import {setNFTassets} from "./store/actions/walletSeed";

import AssetsListForDeploy from "./components/AssetsListForDeploy/AssetsListForDeploy";
import { useSnackbar } from 'notistack';
import {getAllPairsAndSetToStore, getAllTokensAndSetToStore} from "./reactUtils/reactUtils";
import LimitOrder from "./pages/LimitOrder/LimitOrder";
import useFetchAppState from './hooks/useFetchAppState';


function App() {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const popup = useSelector(state => state.appReducer.popup);
    const appTheme = useSelector(state => state.appReducer.appTheme);
    const pubKey = useSelector(state => state.walletReducer.pubKey);
    const walletIsConnected = useSelector(state => state.appReducer.walletIsConnected);
    const swapAsyncIsWaiting = useSelector(state => state.swapReducer.swapAsyncIsWaiting);
    const transactionsList = useSelector(state => state.walletReducer.transactionsList);
    const poolAsyncIsWaiting = useSelector(state => state.poolReducer.poolAsyncIsWaiting);
    const tokenList = useSelector(state => state.walletReducer.tokenList);
    const liquidityList = useSelector(state => state.walletReducer.liquidityList);
    const revealSeedPhraseIsVisible = useSelector(state => state.enterSeedPhrase.revealSeedPhraseIsVisible);

    const [onloading, setonloading] = useState(false)
    const manageAsyncIsWaiting = useSelector(state => state.manageReducer.manageAsyncIsWaiting);
    const subscribeData = useSelector(state => state.walletReducer.subscribeData);
    const curExt = useSelector(state => state.appReducer.curExt);

    const chrome = localStorage.getItem("chrome");
    if (chrome === null) showChromePopup();
    else if (chrome === "false") showChromePopup();

    function showChromePopup() {
        dispatch(showPopup({type: 'chrome'}));
        localStorage.setItem("chrome", "true");
    }

    useFetchAppState();
    /*
        get pairs from dexroot
    */
    useEffect(async () => {
        const pairs2 = await getAllPairsWoithoutProvider();
        dispatch(setPairsList(pairs2));
        setonloading(false)
    }, [])

    useEffect(async () => {
        setonloading(true)
        const theme = localStorage.getItem('appTheme') === null ? 'light' : localStorage.getItem('appTheme');
        if (appTheme !== theme) dispatch(changeTheme(theme));
        setonloading(false)
        console.log("setonloading", onloading)
    }, []);

    // const transListReceiveTokens = useSelector(state => state.walletReducer.transListReceiveTokens);

    useEffect(() => {
        window.addEventListener('beforeunload', function (e) {
            if (swapAsyncIsWaiting || poolAsyncIsWaiting || manageAsyncIsWaiting) e.returnValue = ''
        })
    }, [swapAsyncIsWaiting, poolAsyncIsWaiting, manageAsyncIsWaiting]);

    // useEffect(async () => {
    //     if (subscribeData.dst) {
    //         const pubKey2 = await checkPubKey(curExt._extLib.pubkey)
    //         const clientBalance = await getClientBalance(pubKey2.dexclient);
    //         console.log("clientBalanceAT WEBHOOK", clientBalance, "pubKey.dexclient", pubKey2.dexclient)
    //         let item = localStorage.getItem("currentElement");
    //         let lastTransactioType = localStorage.getItem("lastType");
    //
    //         if (lastTransactioType === "swap") {
    //             console.log("item", item, "subscribeData swap", subscribeData, typeof subscribeData.amountOfTokens)
    //             if (transactionsList[item]) transactionsList[item].toValue = (Number(subscribeData.amountOfTokens / 1e9));
    //             if (transactionsList.length) dispatch(setTransactionsList(transactionsList));
    //         }
    //         if (lastTransactioType === "processLiquidity") {
    //             console.log("item", item, "subscribeData processLiquidity", subscribeData)
    //             if (transactionsList[item]) transactionsList[item].lpTokens = (Number(subscribeData.amountOfTokens / 1e9)).toFixed(Number(subscribeData.amountOfTokens / 1e9) < 0.0001 ? 6 : 4);
    //             if (transactionsList.length) dispatch(setTransactionsList(transactionsList));
    //         }
    //
    //         if (subscribeData.name === "connectCallback") {
    //             console.log("subscribeData at collback", subscribeData)
    //             const pairs = await getAllPairsWoithoutProvider();
    //
    //             let arrPairs = [];
    //             await pairs.map(async item => {
    //                 item.exists = await checkClientPairExists(pubKey2.dexclient, item.pairAddress)
    //                 item.walletExists = await checkwalletExists(pubKey2.dexclient, item.pairAddress)
    //                 arrPairs.push(item)
    //             })
    //             console.log("pairspairspairs", pairs)
    //             dispatch(setPairsList(arrPairs));
    //
    //             let liquidityList = [];
    //             let tokenList = await getAllClientWallets(pubKey.address);
    //             if (tokenList.length) {
    //                 tokenList.forEach(async item => await subscribe(item.walletAddress));
    //
    //                 liquidityList = tokenList.filter(i => i.symbol.includes('/'));
    //
    //                 tokenList = tokenList.filter(i => !i.symbol.includes('/'))
    //                 dispatch(setTokenList(tokenList));
    //                 dispatch(setLiquidityList(liquidityList));
    //             }
    //         }
    //         if (subscribeData.name === "accept") {
    //             const pairs = await getAllPairsWoithoutProvider();
    //             let arrPairs = [];
    //             await pairs.map(async item => {
    //                 item.exists = await checkClientPairExists(pubKey2.dexclient, item.pairAddress)
    //                 item.walletExists = await checkwalletExists(pubKey2.dexclient, item.pairAddress)
    //                 arrPairs.push(item)
    //             })
    //             console.log("pairspairspairs", pairs)
    //             dispatch(setPairsList(arrPairs));
    //         }
    //
    //         dispatch(setWallet({id: pubKey.address, balance: clientBalance}));
    //         // subscribeClient(pubKey2.dexclient)
    //
    //
    //         // const pairs = await getAllPairsWoithoutProvider();
    //         // let arrPairs = [];
    //         // await pairs.map(async item=>{
    //         //     item.exists = await checkClientPairExists(pubKey.address, item.pairAddress)
    //         //     item.walletExists = await checkwalletExists(pubKey.address, item.pairAddress)
    //         //
    //         //     arrPairs.push(item)
    //         // })
    //         // console.log("pairspairspairs",pairs)
    //         // dispatch(setPairsList(arrPairs));
    //
    //         let tokenList = await getAllClientWallets(pubKey.address);
    //         console.log("tokenList after WEBH", tokenList)
    //         let liquidityList = [];
    //         console.log(9999395394583590, tokenList)
    //         if (tokenList.length) {
    //
    //             tokenList.forEach(async item => await subscribe(item.walletAddress));
    //
    //             liquidityList = tokenList.filter(i => i.symbol.includes('/'));
    //
    //             tokenList = tokenList.filter(i => !i.symbol.includes('/'))
    //             localStorage.setItem('tokenList', JSON.stringify(tokenList));
    //             localStorage.setItem('liquidityList', JSON.stringify(liquidityList));
    //             dispatch(setTokenList(tokenList));
    //             dispatch(setLiquidityList(liquidityList));
    //         }
    //
    //         if (swapAsyncIsWaiting) {
    //             dispatch(showPopup({type: 'success', link: subscribeData.transactionID}));
    //             dispatch(setSwapFromToken({
    //                 walletAddress: '',
    //                 symbol: '',
    //                 balance: 0
    //             }));
    //             dispatch(setSwapToToken({
    //                 walletAddress: '',
    //                 symbol: '',
    //                 balance: 0
    //             }));
    //             dispatch(setSwapFromInputValue(0));
    //             dispatch(setSwapToInputValue(0));
    //             dispatch(setSwapAsyncIsWaiting(false));
    //             dispatch(setSwapFromInputValueChange(0));
    //         } else if (poolAsyncIsWaiting) {
    //             dispatch(showPopup({type: 'success', link: subscribeData.transactionID}));
    //             dispatch(setPoolFromToken({
    //                 walletAddress: '',
    //                 symbol: '',
    //                 balance: 0
    //             }));
    //             dispatch(setPoolToToken({
    //                 walletAddress: '',
    //                 symbol: '',
    //                 balance: 0
    //             }));
    //             dispatch(setPoolFromInputValue(0));
    //             dispatch(setPoolToInputValue(0));
    //             dispatch(setPoolAsyncIsWaiting(false));
    //             history.push("/pool")
    //         } else if (manageAsyncIsWaiting) {
    //             dispatch(showPopup({type: 'success', link: subscribeData.transactionID}));
    //             dispatch(setManageFromToken({
    //                 symbol: '',
    //                 reserve: 0
    //             }));
    //             dispatch(setManageToToken({
    //                 symbol: '',
    //                 reserve: 0
    //             }));
    //             dispatch(setManageBalance(0));
    //             dispatch(setManagePairId(''));
    //             dispatch(setManageRateAB(0));
    //             dispatch(setManageRateBA(0));
    //             dispatch(setManageAsyncIsWaiting(false));
    //             history.push('/pool')
    //         }
    //     }
    //     // setonloading(false)
    // }, [subscribeData]);

    async function checkOnLogin() {
        let esp = localStorage.getItem("esp");
        if (esp === null) dispatch(enterSeedPhraseEmptyStorage(true))
        else if (typeof esp === "string") {
            // const receiveTokensData = JSON.parse(localStorage.getItem("setSubscribeReceiveTokens"))
            // dispatch(setSubscribeReceiveTokens(receiveTokensData))
            dispatch(enterSeedPhraseEmptyStorage(false))
            dispatch(setEncryptedSeedPhrase(esp))
            dispatch(showEnterSeedPhraseUnlock());
        } else dispatch(enterSeedPhraseEmptyStorage(true))
    }

    useMount(async () => {
        await checkOnLogin();
    })
    const visibleEnterSeedPhraseUnlock = useSelector(state => state.enterSeedPhrase.enterSeedPhraseUnlockIsVisible);
    const emptyStorage = useSelector(state => state.enterSeedPhrase.emptyStorage);


    const clientData = useSelector(state => state.walletReducer.clientData);
    useEffect(async () => {
        console.log("clientData", clientData)
        const NFTassets = await agregateQueryNFTassets(clientData.address);
        // setAssets(NFTassets)
        dispatch(setNFTassets(NFTassets))

    }, [clientData.address])

    // const tipOpened = useSelector(state => state.appReducer.tipOpened);
    // const tipSeverity = useSelector(state => state.appReducer.tipSeverity);
    // const tipDuration = useSelector(state => state.appReducer.tipDuration);
    // const tipMessage = useSelector(state => state.appReducer.tipMessage);
    const tips = useSelector(state => state.appReducer.tips);
    const transListReceiveTokens = useSelector(state => state.walletReducer.transListReceiveTokens);

    useEffect(async () => {
        console.log("tips22222",tips)
        if(!tips) return
        if(tips.type === "error" || tips.message === "Sended message to blockchain" || tips.message === "Copied") {
            enqueueSnackbar({ type: tips.type, message: tips.message})
            return
        }

        const newTransList = JSON.parse(JSON.stringify(transListReceiveTokens))
        console.log("newTransList",newTransList)
        if(tips.name === "deployLockStakeSafeCallback" || "transferOwnershipCallback"){
            const NFTassets = await agregateQueryNFTassets(clientData.address);
            dispatch(setNFTassets(NFTassets))
        }
        if(tips.name === "connectRoot"){
            await getAllPairsAndSetToStore(clientData.address)
            await getAllTokensAndSetToStore(clientData.address)
        }
        if(tips.name === "acceptedPairTokens"){
            console.log("i at acceptedPairTokens")
            setTimeout(async()=>await getAllTokensAndSetToStore(clientData.address),10000)

        }

        if(tips.name === "tokensReceivedCallback" || tips.name === "processLiquidityCallback" || tips.name === "sendTokens" || tips.name === "connectRoot" || tips.name === "UpdateBalanceTONs"){
            console.log("i was here",tips)
            await getAllTokensAndSetToStore(clientData.address)
        }
        enqueueSnackbar({ type: tips.type, message: tips.message})
        newTransList.push(tips)
        dispatch(setSubscribeReceiveTokens(newTransList))
    }, [tips])


    function onTipClosed() {
        dispatch(hideTip())
    }

    useEffect(async () => {
        // setLoadingRoots(true)
        const addrArray = await getAssetsForDeploy()
        console.log("addrArray", addrArray)
        dispatch(setAssetsFromGraphQL(addrArray))
        // setLoadingRoots(true)
    }, [])

    return (
        <>
            {/*{onloading && <div className="blockDiv"><Loader/></div>}*/}
            {(visibleEnterSeedPhraseUnlock === true && emptyStorage === false && !onloading) && <EnterPassword/>}
            <div className="beta" onClick={onTipClosed}>Beta version. Use desktop Google Chrome</div>
            <Header/>
            <Switch location={location}>

                <Route exact path="/native-login" component={NativeLogin}/>
                <Route exact path="/pool-explorer" component={PoolExplorer}/>
                <Route exact path="/pool" component={Pool}/>
                <Route exact path="/account" component={Account}/>
                <Route exact path="/swap" component={Swap}/>
                <Route exact path="/manage" component={Manage}/>
                <Route exact path="/add-liquidity" component={AddLiquidity}/>

                <Route exact path="/staking" component={Stacking}/>
                <Route exact path="/wallet" component={Assets}/>
                <Route exact path="/orders" component={LimitOrder} />
                <Route exact path="/">
                    <Redirect from="/" to="/wallet" />
                </Route>

                {walletIsConnected ?
                    <>
                    {/*<Route exact path="/native-login" component={NativeLogin}/>*/}
                    {/*<Route exact path="/pool-explorer" component={PoolExplorer}/>*/}
                    {/*<Route exact path="/pool" component={Pool}/>*/}
                    {/*<Route exact path="/account" component={Account}/>*/}
                    {/*<Route exact path="/swap" component={Swap}/>*/}
                    {/*<Route exact path="/manage" component={Manage}/>*/}
                    {/*<Route exact path="/add-liquidity" component={AddLiquidity}/>*/}

                    {/*<Route exact path="/staking" component={Stacking}/>*/}
                    {/*<Route exact path="/wallet" component={Assets}/>*/}
                    {/*<Route exact path="/orders" component={LimitOrder} />*/}

                    <Route exact path="/wallet/settings/keys" component={KeysBlock}/>
                    <Route exact path="/wallet/send" component={SendAssets}/>
                    <Route exact path="/wallet/receive" component={ReceiveAssets}/>
                    <Route exact path="/wallet/settings" component={WalletSettings}/>
                    <Route exact path="/wallet/deployAssets" component={AssetsListForDeploy}/>
                    <Route exact path="/wallet/receive/receive-modal" component={AssetsModalReceive}/>
                    <Route exact path="/wallet/send/send-modal" component={AssetsModal}/>


                    </>
                    : null
                }
            </Switch>
            {popup.isVisible ? <Popup type={popup.type} message={popup.message} link={popup.link}/> : null}
            {revealSeedPhraseIsVisible ? <RevealSeedPhrase/> : null}
        </>
    );
}

export default App;
