import { useLazyQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { useMount } from 'react-use';

import LimitOrderConfirmPopup from '@/components-v2/LimitOrderConfirmPopup';
import LimitOrderPage from '@/components-v2/LimitOrderPage';
import SwapConfirmPopup from '@/components-v2/SwapConfirmPopup';
import SwapPage from '@/components-v2/SwapPage';
import WaitingPopup from '@/components-v2/WaitingPopup';
import {
  requestPairsFetch,
  requestTokensFetch,
  updateTonContext,
} from '@/store/actions/ton';

import AssetsListForDeploy from './components/AssetsListForDeploy/AssetsListForDeploy';
import EnterPassword from './components/EnterPassword/EnterPassword';
import EnterSeedPhrase from './components/EnterSeedPhrase/EnterSeedPhrase';
import Header from './components/Header/Header';
import NativeLogin from './components/NativeLogin/NativeLogin';
import PoolExplorer from './components/PoolExplorer/PoolExplorer';
import Popup from './components/Popup/Popup';
import AssetsModalReceive from './components/ReceiveAssets/AssetsModalReceive';
import ReceiveAssets from './components/ReceiveAssets/ReceiveAssets';
import RevealSeedPhrase from './components/RevealSeedPhrase/RevealSeedPhrase';
import AssetsModal from './components/SendAssets/AssetsModal';
import SendAssets from './components/SendAssets/SendAssets';
import KeysBlock from './components/WalletSettings/KeysBlock';
import WalletSettings from './components/WalletSettings/WalletSettings';
import { LIMIT_ORDER_STATUS_UNKNOWN } from './constants/runtimeErrors';
import {
  APPLY_ORDER,
  APPLY_ORDER_FAIL,
  BA_DIRECTION,
  CANCEL_ORDER,
  CHANGE_OWNER,
  CHANGE_PRICE,
  CLOSE_ORDER,
  DEPLOY_ORDER,
  GIFT_ORDER,
  PART_CLOSE_ORDER,
} from './constants/runtimeVariables';
import {
  agregateQueryNFTassets,
  getAllPairsWoithoutProvider,
  getAssetsForDeploy,
} from './extensions/sdk_get/get';
import { LimitOrdersForOwnerQuery } from './graphql/queries';
import { LimitOrderUpdateSubscription } from './graphql/subscriptions';
import Account from './pages/Account/Account';
import AddLiquidity from './pages/AddLiquidity/AddLiquidity';
import Assets from './pages/Assets/Assets';
import Bridge from './pages/Bridge/Bridge';
import CreatePair from './pages/CreatePair/CreatePair';
import Manage from './pages/Manage/Manage';
import Pool from './pages/Pool/Pool';
import Stacking from './pages/Stacking/Stacking';
import {
  getAllPairsAndSetToStore,
  getAllTokensAndSetToStore,
} from './reactUtils/reactUtils';
import {
  changeTheme,
  handleOpenEnterSeed,
  hideTip,
  showPopup,
} from './store/actions/app';
import {
  enterSeedPhraseEmptyStorage,
  setEncryptedSeedPhrase,
  showEnterSeedPhraseUnlock,
} from './store/actions/enterSeedPhrase';
import {
  setAssetsFromGraphQL,
  setPairsList,
  setSubscribeReceiveTokens,
} from './store/actions/wallet';
import { setNFTassets } from './store/actions/walletSeed';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const openEnterSeed = useSelector((state) => state.appReducer.openEnterSeed);

  const popup = useSelector((state) => state.appReducer.popup);
  const appTheme = useSelector((state) => state.appReducer.appTheme);
  const walletIsConnected = useSelector(
    (state) => state.appReducer.walletIsConnected,
  );
  const swapAsyncIsWaiting = useSelector(
    (state) => state.swapReducer.swapAsyncIsWaiting,
  );
  const poolAsyncIsWaiting = useSelector(
    (state) => state.poolReducer.poolAsyncIsWaiting,
  );
  const manageAsyncIsWaiting = useSelector(
    (state) => state.manageReducer.manageAsyncIsWaiting,
  );
  const revealSeedPhraseIsVisible = useSelector(
    (state) => state.enterSeedPhrase.revealSeedPhraseIsVisible,
  );

  const visibleEnterSeedPhraseUnlock = useSelector(
    (state) => state.enterSeedPhrase.enterSeedPhraseUnlockIsVisible,
  );
  const emptyStorage = useSelector(
    (state) => state.enterSeedPhrase.emptyStorage,
  );
  const clientData = useSelector((state) => state.walletReducer.clientData);

  const tips = useSelector((state) => state.appReducer.tips);
  const transListReceiveTokens = useSelector(
    (state) => state.walletReducer.transListReceiveTokens,
  );

  const { enqueueSnackbar } = useSnackbar();

  const [onloading, setonloading] = useState(false);

  const chrome = localStorage.getItem('chrome');
  if (chrome === null) showChromePopup();
  else if (chrome === 'false') showChromePopup();

  function showChromePopup() {
    dispatch(showPopup({ type: 'chrome' }));
    localStorage.setItem('chrome', 'true');
  }

  useEffect(async () => {
    // await getAllPairsAndSetToStore()
    const pairs2 = await getAllPairsWoithoutProvider();
    dispatch(setPairsList(pairs2));
    setonloading(false);
  }, []);

  useEffect(async () => {
    setonloading(true);
    const theme =
      localStorage.getItem('appTheme') === null
        ? 'light'
        : localStorage.getItem('appTheme');
    if (appTheme !== theme) dispatch(changeTheme(theme));
    setonloading(false);
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', function (e) {
      if (swapAsyncIsWaiting || poolAsyncIsWaiting || manageAsyncIsWaiting)
        e.returnValue = '';
    });
  }, [swapAsyncIsWaiting, poolAsyncIsWaiting, manageAsyncIsWaiting]);

  async function checkOnLogin() {
    let esp = localStorage.getItem('esp');
    if (esp === null) dispatch(enterSeedPhraseEmptyStorage(true));
    else if (typeof esp === 'string') {
      // const receiveTokensData = JSON.parse(localStorage.getItem("setSubscribeReceiveTokens"))
      // dispatch(setSubscribeReceiveTokens(receiveTokensData))
      dispatch(enterSeedPhraseEmptyStorage(false));
      dispatch(setEncryptedSeedPhrase(esp));
      dispatch(showEnterSeedPhraseUnlock());
    } else dispatch(enterSeedPhraseEmptyStorage(true));
  }

  useMount(async () => {
    await checkOnLogin();
  });

  useEffect(async () => {
    console.log(' useeffect agregateQueryNFTassets');
    const NFTassets = await agregateQueryNFTassets(clientData.address);
    // setAssets(NFTassets)
    dispatch(setNFTassets(NFTassets));
  }, [clientData.address]);

  useEffect(async () => {
    if (!tips) return;
    if (
      tips.type === 'error' ||
      tips.message === 'Sent message to blockchain' ||
      tips.message === 'Copied'
    ) {
      enqueueSnackbar({ type: tips.type, message: tips.message });
      return;
    }

    const newTransList = JSON.parse(JSON.stringify(transListReceiveTokens));
    const NFTassets = await agregateQueryNFTassets(clientData.address);
    dispatch(setNFTassets(NFTassets));
    if (tips.name === 'connectRoot') {
      await getAllPairsAndSetToStore(clientData.address);
      await getAllTokensAndSetToStore(clientData.address);
    }
    if (tips.name === 'acceptedPairTokens') {
      console.log('i at acceptedPairTokens');
      setTimeout(
        async () => await getAllTokensAndSetToStore(clientData.address),
        10000,
      );
    }

    if (
      tips.name === 'tokensReceivedCallback' ||
      tips.name === 'processLiquidityCallback' ||
      tips.name === 'sendTokens' ||
      tips.name === 'connectRoot' ||
      tips.name === 'UpdateBalanceTONs'
    ) {
      console.log('i was here', tips);
      await getAllTokensAndSetToStore(clientData.address);
      dispatch(requestPairsFetch());
      dispatch(requestTokensFetch());
    }
    enqueueSnackbar({ type: tips.type, message: tips.message });
    newTransList.push(tips);
    dispatch(setSubscribeReceiveTokens(newTransList));
  }, [tips]);

  function onTipClosed() {
    dispatch(hideTip());
  }

  useEffect(async () => {
    const addrArray = await getAssetsForDeploy();
    dispatch(setAssetsFromGraphQL(addrArray));
  }, []);

  const [getLimitOrders, { called, subscribeToMore }] = useLazyQuery(
    LimitOrdersForOwnerQuery,
  );

  useEffect(async () => {
    console.log(' useeffect getLimitOrders');
    if (clientData && clientData.address && !called)
      getLimitOrders({ variables: { addrOwner: clientData.address } });
  }, [clientData]);

  useEffect(() => {
    if (subscribeToMore)
      subscribeToMore({
        document: LimitOrderUpdateSubscription,
        variables: { addrOwner: clientData.address },
        updateQuery(prev, { subscriptionData }) {
          if (!subscriptionData.data) return prev;

          const { limitOrder, status } = subscriptionData.data.updateLimitOrder;

          let { aSymbol, bSymbol } = limitOrder.pair;
          if (limitOrder.directionPair === BA_DIRECTION)
            [aSymbol, bSymbol] = [bSymbol, aSymbol];

          switch (status) {
            case DEPLOY_ORDER:
              enqueueSnackbar({
                type: 'success',
                message: `Created limit order ${aSymbol} - ${bSymbol}`,
              });
              return {
                limitOrders: prev.limitOrders.concat(limitOrder),
              };
            case CANCEL_ORDER:
              enqueueSnackbar({
                type: 'success',
                message: `Canceled limit order ${aSymbol} - ${bSymbol}`,
              });
              return {
                limitOrders: prev.limitOrders.filter(
                  (lo) => lo.addrOrder !== limitOrder.addrOrder,
                ),
              };
            case CHANGE_PRICE:
              enqueueSnackbar({
                type: 'success',
                message: `Updated price of limit order ${aSymbol} - ${bSymbol}`,
              });
              return {
                limitOrders: prev.limitOrders.map((lo) =>
                  lo.addrOrder === limitOrder.addrOrder ? limitOrder : lo,
                ),
              };
            case CHANGE_OWNER:
              enqueueSnackbar({
                type: 'success',
                message: `Transferred limit order ${aSymbol} - ${bSymbol}`,
              });
              return {
                limitOrders: prev.limitOrders.filter(
                  (lo) => lo.addrOrder !== limitOrder.addrOrder,
                ),
              };
            case APPLY_ORDER:
              enqueueSnackbar({
                type: 'success',
                message: `Applied limit order ${aSymbol} - ${bSymbol}`,
              });
              return {
                limitOrders: prev.limitOrders.map((lo) =>
                  lo.addrOrder === limitOrder.addrOrder ? limitOrder : lo,
                ),
              };
            case APPLY_ORDER_FAIL:
              enqueueSnackbar({
                type: 'error',
                message: `Failed limit order application process ${aSymbol} - ${bSymbol}`,
              });
              return prev;
            case CLOSE_ORDER:
              enqueueSnackbar({
                type: 'success',
                message: `Fully taken limit order ${aSymbol} - ${bSymbol}`,
              });
              return {
                limitOrders: prev.limitOrders.filter(
                  (lo) => lo.addrOrder !== limitOrder.addrOrder,
                ),
              };
            case PART_CLOSE_ORDER:
              enqueueSnackbar({
                type: 'success',
                message: `Partially taken limit order ${aSymbol} - ${bSymbol}`,
              });
              return {
                limitOrders: prev.limitOrders.map((lo) =>
                  lo.addrOrder === limitOrder.addrOrder ? limitOrder : lo,
                ),
              };
            case GIFT_ORDER:
              enqueueSnackbar({
                type: 'success',
                message: `Received limit order ${aSymbol} - ${bSymbol}`,
              });
              return {
                limitOrders: prev.limitOrders.concat(limitOrder),
              };
            default:
              throw new Error(LIMIT_ORDER_STATUS_UNKNOWN);
          }
        },
      });
  }, [subscribeToMore]);

  useEffect(() => {
    dispatch(requestPairsFetch());
    dispatch(requestTokensFetch());
  }, []);

  useEffect(() => {
    if (clientData.status) {
      dispatch(updateTonContext('dexClientAddress', clientData.address));
      dispatch(requestPairsFetch());
      dispatch(requestTokensFetch());
    }
  }, [clientData]);

  return (
    <>
      {openEnterSeed && (
        <EnterSeedPhrase
          // setloadingUserData={(bl) => setloadingUserData(bl)}
          handleCLoseEntSeed={() => dispatch(handleOpenEnterSeed(false))}
        />
      )}
      {visibleEnterSeedPhraseUnlock === true &&
        emptyStorage === false &&
        !onloading && <EnterPassword />}
      <div className="beta" onClick={onTipClosed}>
        Beta version. Use desktop Google Chrome
      </div>
      <Header />
      <Switch location={location}>
        <Route exact path="/native-login" component={NativeLogin} />
        <Route exact path="/pool-explorer" component={PoolExplorer} />
        <Route exact path="/pool" component={Pool} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/swap" component={SwapPage} />
        <Route exact path="/manage" component={Manage} />
        <Route exact path="/add-liquidity" component={AddLiquidity} />
        <Route exact path="/create-pair" component={CreatePair} />
        <Route exact path="/staking" component={Stacking} />

        {/** TODO: Temporary commented, please remove after enabling bridge*/}
        <Route exact path="/bridge" component={Bridge} />
        <Route exact path="/wallet" component={Assets} />
        <Route exact path="/orders" component={LimitOrderPage} />
        <Route exact path="/">
          <Redirect from="/" to="/wallet" />
        </Route>

        {walletIsConnected ? (
          <>
            <Route exact path="/wallet/settings/keys" component={KeysBlock} />
            <Route exact path="/wallet/send" component={SendAssets} />
            <Route exact path="/wallet/receive" component={ReceiveAssets} />
            <Route exact path="/wallet/settings" component={WalletSettings} />
            <Route
              exact
              path="/wallet/deployAssets"
              component={AssetsListForDeploy}
            />
            <Route
              exact
              path="/wallet/receive/receive-modal"
              component={AssetsModalReceive}
            />
            <Route
              exact
              path="/wallet/send/send-modal"
              component={AssetsModal}
            />
          </>
        ) : null}
        {!walletIsConnected && clientData.address && !clientData.status ? (
          <>
            <Route exact path="/wallet/settings/keys" component={KeysBlock} />
            <Route exact path="/wallet/settings" component={WalletSettings} />
          </>
        ) : null}
      </Switch>
      {popup.isVisible ? (
        <Popup type={popup.type} message={popup.message} link={popup.link} />
      ) : null}
      {revealSeedPhraseIsVisible ? <RevealSeedPhrase /> : null}
      <SwapConfirmPopup />
      <LimitOrderConfirmPopup />
      <WaitingPopup />
    </>
  );
}

export default App;
