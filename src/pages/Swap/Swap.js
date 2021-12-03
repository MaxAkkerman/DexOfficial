import './Swap.scss';

import { FormHelperText } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SlippagePopper from '../../components/SlippagePopper/SlippagePopper';
import SwapBtn from '../../components/SwapBtn/SwapBtn';
import SwapConfirmPopup from '../../components/SwapConfirmPopup/SwapConfirmPopup';
import WaitingPopup from '../../components/WaitingPopup/WaitingPopup';
import WaitingPopupConnect from '../../components/WaitingPopupConnect/WaitingPopupConnectConnect';
import { SWAP_COMMISSION } from '../../constants/commissions';
import {
  NOT_ENOUGH,
  NOT_ENOUGH as NOT_ENOUGH_MSG,
  NOT_ENOUGH_CAUSE_COMMISSION as NOT_ENOUGH_CAUSE_COMMISSION_MSG,
  NOT_TOUCHED,
} from '../../constants/validationMessages';
import {
  connectToPair,
  connectToPairStep2DeployWallets,
  getClientForConnect,
} from '../../extensions/sdk_run/run';
import useAssetList from '../../hooks/useAssetList';
import useKeyPair from '../../hooks/useKeyPair';
import useSlippagePopper from '../../hooks/useSlippagePopper';
import settingsBtn from '../../images/Vector.svg';
import { checkDecimals } from '../../reactUtils/reactUtils';
import { setTips, showPopup } from '../../store/actions/app';
import {
  setSlippageValue,
  setSwapAsyncIsWaiting,
  setSwapFromToken,
  setSwapToToken,
} from '../../store/actions/swap';
import Input from './../../components/Input/Input';
import MainBlock from './../../components/MainBlock/MainBlock';

function Swap() {
  const history = useHistory();
  const dispatch = useDispatch();

  const walletIsConnected = useSelector(
    (state) => state.appReducer.walletIsConnected,
  );

  const tokenList = useSelector((state) => state.walletReducer.tokenList);
  const pairsList = useSelector((state) => state.walletReducer.pairsList);
  const slippageValue = useSelector((state) => state.swapReducer.slippageValue);

  const fromToken = useSelector((state) => state.swapReducer.fromToken);
  const toToken = useSelector((state) => state.swapReducer.toToken);
  const fromValue = useSelector((state) => state.swapReducer.fromInputValue);
  const toValue = useSelector((state) => state.swapReducer.toInputValue);
  const rate = useSelector((state) => state.swapReducer.rate);
  const pairId = useSelector((state) => state.swapReducer.pairId);
  const swapAsyncIsWaiting = useSelector(
    (state) => state.swapReducer.swapAsyncIsWaiting,
  );
  const clientData = useSelector((state) => state.walletReducer.clientData);
  const tips = useSelector((state) => state.appReducer.tips);

  const [swapConfirmPopupIsVisible, setSwapConfirmPopupIsVisible] =
    useState(false);
  const [connectAsyncIsWaiting, setconnectAsyncIsWaiting] = useState(false);
  const [curExist, setExistsPair] = useState(false);
  const [notDeployedWallets, setNotDeployedWallets] = useState([]);
  const [connectPairStatusText, setconnectPairStatusText] = useState('');
  const [incorrectBalance, setincorrectBalance] = useState(false);
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState(true);

  // const {slippageState, popperState} = useSlippagePopper();
  const { keyPair } = useKeyPair();
  const { assetList } = useAssetList();

  useEffect(() => {
    if (!pairsList.length || !pairId) {
      return;
    }
    let curePairData =
      pairsList && pairsList.filter((item) => item.pairAddress === pairId);
    setExistsPair(curePairData[0].exists ? curePairData[0].exists : false);
  }, [pairId]);

  useEffect(async () => {
    if (!tips || tips.length) return;
    if (tips.name === 'tokensReceivedCallback' || tips.name === 'sendTokens') {
      if (fromToken.symbol || toToken.Symbol) {
        const fromTokenCopy = JSON.parse(JSON.stringify(fromToken));
        const toTokenCopy = JSON.parse(JSON.stringify(toToken));
        const newFromTokenData = tokenList.filter(
          (item) => item.symbol === fromTokenCopy.symbol,
        );
        const newToTokenData = tokenList.filter(
          (item) => item.symbol === toTokenCopy.symbol,
        );

        const fromTokenUpdatedBalance = {
          ...fromTokenCopy,
          balance: newFromTokenData[0].balance,
        };

        const toTokenUpdatedBalance = {
          ...toTokenCopy,
          balance: newToTokenData[0].balance,
        };
        dispatch(setSwapToToken(toTokenUpdatedBalance));

        dispatch(setSwapFromToken(fromTokenUpdatedBalance));
      }
    }
  }, [tokenList]);

  useEffect(() => {
    if (!pairsList || !pairId) {
      return;
    }
    let curePairData = pairsList.filter((item) => item.pairAddress === pairId);
    if (!curePairData || !curePairData[0]) return;
    if (curePairData[0].walletExists) {
      let walExists = curePairData[0].walletExists.filter(
        (item) => item.status === false,
      );
      setNotDeployedWallets(walExists);
    }
  }, [toToken, tokenList, pairId]);

  function handleConfirm() {
    if (!fromValue && !toValue) return;

    if (fromValue > fromToken.balance) {
      setincorrectBalance(true);
      setTimeout(() => setincorrectBalance(false), 10000);
      return;
    }
    if (fromToken.symbol && toToken.symbol && fromValue) {
      // dispatch(setSlippageValue(slippageState.slippage));
      setSwapConfirmPopupIsVisible(true);
    } else {
      dispatch(
        showPopup({ type: 'error', message: 'Fields should not be empty' }),
      );
    }
  }

  async function handleConnectPair() {
    if (clientData.balance < 12) {
      dispatch(
        setTips({
          message: `You need at least 12 TONs to connect pair`,
          type: 'error',
        }),
      );
      return;
    }

    setconnectAsyncIsWaiting(true);
    setconnectPairStatusText('getting data from pair.');

    let connectRes = await connectToPair(pairId, keyPair);

    if (
      !connectRes ||
      (connectRes &&
        (connectRes.code === 1000 ||
          connectRes.code === 3 ||
          connectRes.code === 2))
    ) {
      setconnectAsyncIsWaiting(false);
      dispatch(
        setTips({
          message: `Some error, please try again, ${connectRes.code}`,
          type: 'error',
        }),
      );
      return;
    } else {
      setconnectPairStatusText('preparing client data.');
      let getClientForConnectStatus = await getClientForConnect(
        connectRes,
        clientData.address,
      );
      console.log('getClientForConnectStatus', getClientForConnectStatus);
      if (getClientForConnectStatus.code) {
        setconnectAsyncIsWaiting(false);
        dispatch(
          setTips({
            message: `Some error, please try again, ${getClientForConnectStatus.code}`,
            type: 'error',
          }),
        );
        return;
      } else {
        setconnectPairStatusText(
          'computing the best shard for your wallets and deploying.',
        );
        let connectToRootsStatus = await connectToPairStep2DeployWallets(
          getClientForConnectStatus,
          keyPair,
        );
        console.log('connectToRootsStatus', connectToRootsStatus);
        if (connectToRootsStatus.code) {
          setconnectAsyncIsWaiting(false);
          dispatch(
            setTips({
              message: `Some error, please try again, ${connectToRootsStatus.code}`,
              type: 'error',
            }),
          );
          return;
        } else {
          setNotDeployedWallets([]);
          // dispatch(setSwapFromInputValue(""));
          // dispatch(setSwapToInputValue(""));
        }
      }
    }

    setconnectPairStatusText('finishing');
    setconnectAsyncIsWaiting(false);
    setExistsPair(true);
  }

  function getCurBtn() {
    if (
      curExist &&
      fromToken.symbol &&
      toToken.symbol &&
      !notDeployedWallets.length
    ) {
      return (
        <button
          className={
            fromToken.symbol &&
            toToken.symbol &&
            fromValue &&
            toValue &&
            !isError
              ? 'btn mainblock-btn'
              : 'btn mainblock-btn btn--disabled'
          }
          onClick={() => handleConfirm()}
        >
          Swap
        </button>
      );
    } else if (
      (!curExist || notDeployedWallets.length) &&
      fromToken.symbol &&
      toToken.symbol
    ) {
      return (
        <button
          className={
            fromToken.symbol && toToken.symbol
              ? 'btn mainblock-btn'
              : 'btn mainblock-btn btn--disabled'
          }
          onClick={() => handleConnectPair()}
        >
          Connect pair
        </button>
      );
    }
    return (
      <button
        className={
          fromToken.symbol && toToken.symbol && fromValue && toValue
            ? 'btn mainblock-btn'
            : 'btn mainblock-btn btn--disabled'
        }
        onClick={() => handleConfirm()}
      >
        Swap
      </button>
    );
  }

  function handleClose() {
    dispatch(setSwapAsyncIsWaiting(false));
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0) setIsError(false);
    else setIsError(true);
  }, [errors]);

  function validate(fromValue, toValue, fromToken, toToken) {
    console.log(fromToken, toToken);
    if (
      fromToken.symbol &&
      toToken.symbol &&
      fromToken.balance &&
      toToken.balance
    ) {
      const localErrors = {};

      const fromTokenBalance = Number(fromToken.balance);

      if (fromValue > checkDecimals(fromTokenBalance))
        localErrors.fromTokenAmount = NOT_ENOUGH_MSG;

      if (toValue === 0 || fromValue === 0)
        localErrors.emptyFields = NOT_TOUCHED;

      const tonAsset = assetList.find((t) => t.symbol === 'TON Crystal');
      if (tonAsset && tonAsset.balance) {
        const nativeTONBalance = tonAsset.balance;

        if (nativeTONBalance < SWAP_COMMISSION)
          localErrors.commission = `${NOT_ENOUGH_CAUSE_COMMISSION_MSG} (Commission = ${SWAP_COMMISSION} TON Crystal)`;
        setErrors(localErrors);
      }
    }
  }
  const [op, setop] = useState(false);

  // const [slippage, setSlippage] = useState("2");

  const [anchorEl, setAnchorEl] = useState(null);

  function handleClickOpenPop(ev) {
    // console.log("popper",ev.currentTarget.id)
    // console.log("popper2",ev.target.id)
    ev.stopPropagation();

    if (ev.currentTarget.id !== 'popBtn') {
      console.log('popper', ev.currentTarget.id);
      setop(false);
    } else {
      console.log('popper', ev.currentTarget.id, 'op', op);

      setop(!op);
    }
  }
  const popper = useRef(null);

  // const open = Boolean(anchorEl);
  useEffect(() => {
    if (op) {
      // setOpenPop(true)
      setAnchorEl(popper.current);
      setIdPop('simple-popper');
    } else {
      // setOpenPop(false)
      setAnchorEl(null);
      setIdPop(undefined);
    }
  }, [op]);

  // const [openPop,setOpenPop] = useState(false)
  const [idPop, setIdPop] = useState(undefined);

  // function handler(){
  // 	console.log("ya")
  // 	setop(!op)
  // }
  useEffect(() => {
    if (fromToken && toToken) validate(fromValue, toValue, fromToken, toToken);
  }, [fromValue, toValue, fromToken, toToken]);

  return (
    <div
      className="container"
      id={'cont'}
      onClick={(e) => handleClickOpenPop(e)}
    >
      {!swapAsyncIsWaiting && !connectAsyncIsWaiting && (
        <MainBlock
          style={{
            borderColor: errors.commission
              ? 'var(--error)'
              : 'var(--mainblock-border-color)',
          }}
          smallTitle={false}
          content={
            <div style={{ display: 'contents' }}>
              <div className="head_wrapper" style={{ marginBottom: '40px' }}>
                <div
                  className="left_block"
                  style={{ color: 'var(--mainblock-title-color)' }}
                >
                  Swap
                </div>

                <div className={'settings_btn_container'}>
                  <button
                    id={'popBtn'}
                    aria-describedby={idPop}
                    ref={popper}
                    className="settings_btn"
                    onClick={(e) => handleClickOpenPop(e)}
                  >
                    <img src={settingsBtn} alt={'settings'} />
                  </button>
                </div>
              </div>
              <div>
                <Input
                  type={'from'}
                  text={'From'}
                  token={fromToken}
                  value={fromValue}
                  borderError={errors.fromTokenAmount}
                  incorrectBalance={incorrectBalance}
                />
                {errors.fromTokenAmount ? (
                  <FormHelperText
                    error
                    sx={{ marginLeft: '27px', color: 'var(--text-color)' }}
                  >
                    {NOT_ENOUGH}
                  </FormHelperText>
                ) : (
                  <div style={{ height: '22px' }} />
                )}
                {/*<>   {incorrectBalance && <div>error</div>}</>*/}
                <SwapBtn
                  fromToken={fromToken}
                  toToken={toToken}
                  page={'swap'}
                />
                <Input
                  type={'to'}
                  text={
                    toValue > 0 ? (
                      <>
                        To <span>(estimated)</span>
                      </>
                    ) : (
                      'To'
                    )
                  }
                  token={toToken}
                  value={toValue}
                  incorrectBalance={false}
                />
                {walletIsConnected ? (
                  getCurBtn()
                ) : (
                  <button
                    className="btn mainblock-btn"
                    onClick={() => history.push('/account')}
                  >
                    Connect wallet
                  </button>
                )}
                {!fromValue && !toValue && (
                  <FormHelperText sx={{ textAlign: 'center' }}>
                    {NOT_TOUCHED}
                  </FormHelperText>
                )}
                <SlippagePopper
                  // slippageState={slippageState}
                  // popperState={popperState}
                  id={idPop}
                  open={op}
                  anchorEl={anchorEl}
                  // op={op}
                />
                {fromToken.symbol && toToken.symbol && (
                  <p className="swap-rate">
                    Price{' '}
                    <span>
                      {parseFloat(rate).toFixed(rate > 0.0001 ? 4 : 6)}{' '}
                      {toToken.symbol}
                    </span>{' '}
                    per <span>1 {fromToken.symbol}</span>
                  </p>
                )}
              </div>
              {errors.commission && (
                <FormHelperText error sx={{ color: 'var(--text-color)' }}>
                  {errors.commission}
                </FormHelperText>
              )}
            </div>
          }
          footer={
            <div className="mainblock-footer">
              <div
                className="mainblock-footer-wrap"
                style={{ justifyContent: 'space-around' }}
              >
                <div className="swap-confirm-wrap">
                  <p className="mainblock-footer-value">
                    {parseFloat(
                      (toValue - (toValue * slippageValue) / 100).toFixed(4),
                    )}{' '}
                    {toToken.symbol}
                  </p>
                  <p className="mainblock-footer-subtitle">
                    Minimum <br /> received
                  </p>
                </div>
                {/*<div className="swap-confirm-wrap">*/}
                {/*	<p className="mainblock-footer-value">2.00%</p>*/}
                {/*	<p className="mainblock-footer-subtitle">*/}
                {/*		Price <br /> Impact*/}
                {/*	</p>*/}
                {/*</div>*/}
                <div className="swap-confirm-wrap">
                  <p className="mainblock-footer-value">
                    {fromValue && fromValue !== 0
                      ? ((fromValue * 0.3) / 100).toFixed(4)
                      : 0.0}{' '}
                    {fromToken.symbol}
                  </p>
                  <p className="mainblock-footer-subtitle">
                    Liquidity <br /> Provider Fee
                  </p>
                </div>
              </div>
            </div>
          }
        />
      )}

      {swapConfirmPopupIsVisible && (
        <SwapConfirmPopup
          hideConfirmPopup={setSwapConfirmPopupIsVisible.bind(this, false)}
          // slippage={slippageState.slippage}
        />
      )}
      {connectAsyncIsWaiting && (
        <WaitingPopupConnect
          text={`Connecting to ${fromToken.symbol}/${toToken.symbol} pair, ${connectPairStatusText}`}
        />
      )}
      {swapAsyncIsWaiting && (
        <WaitingPopup
          text={`Swapping ${fromValue} ${fromToken.symbol} for ${toValue} ${toToken.symbol}`}
          handleClose={() => handleClose()}
        />
      )}
    </div>
  );
}

export default Swap;
