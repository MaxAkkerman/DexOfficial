import './Assets.scss';

import { useLazyQuery } from '@apollo/client';
import { uniqBy } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { LimitOrdersForOwnerQuery } from '@/graphql/queries';
import TONicon from '@/images/tokens/TON.png';
import { setTips } from '@/store/actions/app';

import AssetsList from '../../components/AssetsList/AssetsList';
import MainBlock from '../../components/MainBlock/MainBlock';
import WithDraw from '../../components/WithDraw/WithDraw';
import WrapUnwrap from '../../components/wrapUnwrap/WrapUnwrap';
// import WrapUnwrap from "../../components/wrapUnwrap/wrapUnwrap";
import goToExchange from '../../images/goToExchange.svg';
import nativeBtn from '../../images/nativeadd.svg';
import receiveAssets from '../../images/receiveAssets.svg';
import sendAssetsimg from '../../images/sendAssets.svg';
import settingsBtn from '../../images/Vector.svg';
import { setTokenList } from '../../store/actions/wallet';

function Assets() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [assets, setAssets] = useState([]);
  const NFTassets = useSelector((state) => state.walletSeedReducer.NFTassets);
  const liquidityList = useSelector(
    (state) => state.walletReducer.liquidityList,
  );
  const tokenList = useSelector((state) => state.tonData.tokens);
  const pairList = useSelector((state) => state.tonData.pairs);
  const clientData = useSelector((state) => state.walletReducer.clientData);
  const updatedWallet = useSelector(
    (state) => state.walletReducer.updatedWallet,
  );
  const tonWallet = useMemo(() => {
    // console.log('clientData',clientData)
    if (clientData)
      return {
        balance: updatedWallet === null ? clientData.balance : updatedWallet,
        icon: TONicon,
        owner_address: clientData.address,
        rootAddress: 'none',
        showWrapMenu: true,
        symbol: 'EVER',
        tokenName: 'Everscale',
        type: 'Native evers',
        walletAddress: clientData.address,
      };
  }, [clientData, updatedWallet]);

  const [getLimitOrders, { data: limitOrdersData }] = useLazyQuery(
    LimitOrdersForOwnerQuery,
  );

  const walletIsConnected = useSelector(
    (state) => state.appReducer.walletIsConnected,
  );
  const [showWrapMenu, setshowWrapMenu] = useState(false);
  const [currentTokenForWrap, setcurrentTokenForWrap] = useState({});
  const [viewData, setViewData] = useState({});
  const [showWithdrawMenu, setshowWithdrawMenu] = useState(false);
  const [curNFTForWithdraw, setCurNFTForWithdraw] = useState(false);

  useEffect(() => {
    setAssets(NFTassets);
  }, [NFTassets]);

  useEffect(async () => {
    if (clientData && clientData.address)
      getLimitOrders({ variables: { addrOwner: clientData.address } });
  }, [clientData]);

  function handleChangeOnSend() {
    history.push('/wallet/send');
  }

  function handleChangeOnReceive() {
    history.push('/wallet/receive');
  }

  function handlePushToExchange() {
    history.push('/swap');
  }

  function handleGoToSettings() {
    console.log('clientData', clientData);
    history.push('/wallet/settings');
  }

  function addTokenWallet() {
    history.push('/wallet/deployAssets');
  }

  function handleShowNFTData(curItem) {
    const copyAssets = JSON.parse(JSON.stringify(assets));
    copyAssets.map((item) => {
      if (item.id === curItem.id) {
        item.showNftData = !item.showNftData;
      }
    });
    setAssets(copyAssets);
  }
  function handleClickToken(curItem) {
    if (curItem.type !== 'Native evers') return;
    const copyAssets = JSON.parse(JSON.stringify(tokenList));
    copyAssets.map((item) => {
      if ('Native evers' === item.type) {
        item.showWrapMenu = !item.showWrapMenu;
      }
    });
    dispatch(setTokenList(copyAssets));
  }

  async function handleWrapTons() {
    setcurrentTokenForWrap(tonWallet);
    setViewData({
      confirmText: 'wrap',
      title: 'EVER → wEVER',
      tokenSetted: true,
      type: 'wrap',
    });
    setshowWrapMenu(true);
  }
  async function handleUnWrapTons() {
    const tonObj = tokenList.filter((item) => item.symbol === 'WTON');
    console.log('tonObj', tonObj[0], tonObj.length);
    if (!tonObj.length) {
      dispatch(
        setTips({
          message: `You have not wEVER for unWrap`,
          type: 'error',
        }),
      );
      return;
    }
    setcurrentTokenForWrap(tonObj[0]);
    setViewData({
      confirmText: 'unwrap',
      title: 'wEVER → EVER',
      tokenSetted: true,
      type: 'unwrap',
    });
    setshowWrapMenu(true);
  }

  function handleWithdraw(item) {
    setshowWithdrawMenu(true);
    setshowWrapMenu(false);
    setCurNFTForWithdraw(item);
    console.log('item', item);
  }

  return (
    <>
      {showWrapMenu && !showWithdrawMenu && (
        <WrapUnwrap
          currentTokenForWrap={currentTokenForWrap}
          confirmText={viewData.confirmText}
          tokenSetted={viewData.tokenSetted}
          title={viewData.title}
          handleShow={() => setshowWrapMenu(false)}
          transactionType={viewData.type}
        />
      )}
      {!showWrapMenu && showWithdrawMenu && (
        <WithDraw
          curNFTForWithdraw={curNFTForWithdraw}
          confirmText={viewData.confirmText}
          // tokenSetted={viewData.tokenSetted}
          title={viewData.title}
          handleShow={() => setshowWithdrawMenu(false)}
          transactionType={viewData.type}
        />
      )}
      {!showWrapMenu && !showWithdrawMenu && (
        <div className="container">
          <MainBlock
            smallTitle={false}
            // title={'Assets'}
            content={
              <div>
                <div className="head_wrapper" style={{ fontWeight: 'bold' }}>
                  <div className="left_block boldFont">Your assets</div>
                  <div className={'settings_btn_container'}>
                    <button
                      className={
                        walletIsConnected
                          ? 'settings_btn'
                          : 'settings_btn btn--disabled'
                      }
                      onClick={
                        walletIsConnected ? () => addTokenWallet() : null
                      }
                    >
                      <img src={nativeBtn} alt={'native'} />
                    </button>
                    <button
                      className={
                        clientData.address || walletIsConnected
                          ? 'settings_btn'
                          : 'settings_btn btn--disabled'
                      }
                      onClick={
                        clientData.address || walletIsConnected
                          ? () => handleGoToSettings()
                          : null
                      }
                    >
                      <img src={settingsBtn} alt={'settings'} />
                    </button>
                  </div>
                </div>
                <div className="action_btns">
                  <div className="assets_btn_wrapper">
                    <div
                      className={
                        walletIsConnected ? 'onHover' : 'onHover btn--disabled'
                      }
                      onClick={
                        walletIsConnected ? () => handleChangeOnSend() : null
                      }
                    >
                      <img
                        className="arrow_icons "
                        src={sendAssetsimg}
                        alt={'Send'}
                      />
                    </div>
                    <div className="action_btns_bottom_text">Send</div>
                  </div>
                  <div className="assets_btn_wrapper">
                    <button
                      className={
                        walletIsConnected ? 'onHover' : 'onHover btn--disabled'
                      }
                      onClick={
                        walletIsConnected ? () => handleChangeOnReceive() : null
                      }
                    >
                      <img
                        className="arrow_icons"
                        src={receiveAssets}
                        alt={'Receive'}
                      />
                    </button>
                    <div className="action_btns_bottom_text">Receive</div>
                  </div>
                  <div className="assets_btn_wrapper">
                    <div
                      className={
                        walletIsConnected ? 'onHover' : 'onHover btn--disabled'
                      }
                      onClick={() => handlePushToExchange()}
                    >
                      <img
                        className="arrow_icons"
                        src={goToExchange}
                        alt={'Exchange'}
                      />
                    </div>
                    <div className="action_btns_bottom_text">Swap</div>
                  </div>
                </div>

                {walletIsConnected ? (
                  <>
                    {(NFTassets && NFTassets.length) ||
                    tonWallet ||
                    (tokenList && tokenList.length)(
                      limitOrdersData && limitOrdersData.limitOrders.length,
                    ) ? (
                      <AssetsList
                        TokenAssetsArray={uniqBy(
                          [tonWallet, ...tokenList, ...liquidityList],
                          'walletAddress',
                        )}
                        orderAssetArray={
                          limitOrdersData && limitOrdersData.limitOrders
                        }
                        pairList={pairList}
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
                    onClick={() => history.push('/account')}
                  >
                    {!clientData.status && clientData.address.length === 66
                      ? 'Deploy wallet'
                      : 'Connect wallet'}
                  </button>
                )}
              </div>
            }
          />
        </div>
      )}
    </>
  );
}

export default Assets;
