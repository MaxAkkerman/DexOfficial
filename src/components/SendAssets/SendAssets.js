import './SendAssets.scss';

import { FormHelperText } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import cls from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MainBlock from '../../components/MainBlock/MainBlock';
import { SEND_TOKEN } from '../../constants/commissions';
import {
  NOT_ENOUGH_CAUSE_COMMISSION,
  NOT_TOUCHED,
} from '../../constants/validationMessages';
import {
  getAccType2,
  getExpectedWalletAddressByOwner,
} from '../../extensions/sdk_get/get';
import {
  deployEmptyWallet,
  sendNativeTons,
  sendNFT,
  sendToken,
} from '../../extensions/sdk_run/run';
import { decrypt } from '../../extensions/tonUtils';
import useKeyPair from '../../hooks/useKeyPair';
import useSendAssetsCheckAddress from '../../hooks/useSendAssetsCheckAddress';
import useSendAssetsCheckAmount from '../../hooks/useSendAssetsCheckAmount';
import useSendAssetsSelectedToken from '../../hooks/useSendAssetsSelectedToken';
import arrowBack from '../../images/arrowBack.png';
import { setTips } from '../../store/actions/app';
import {
  setAddressForSend,
  setAmountForSend,
  setCurrentTokenForSend,
  setShowWaitingSendAssetsPopup,
  setTokenSetted,
} from '../../store/actions/walletSeed';
import BlockItem from '../AmountBlock/AmountBlock';
import InputChange from '../AmountBlock/InputChange';
import MaxBtn from '../AmountBlock/MAXbtn';
import RightBlockBottom from '../AmountBlock/RightBlockBottom';
import ShowBalance from '../AmountBlock/ShowBalance';
import SendConfirmPopup from '../SendConfirmPopup/SendConfirmPopup';
import WaitingPopup from '../WaitingPopup/WaitingPopup';

function SendAssets() {
  const dispatch = useDispatch();
  const history = useHistory();
  const amountToSend = useSelector(
    (state) => state.walletSeedReducer.amountToSend,
  );
  const addressToSend = useSelector(
    (state) => state.walletSeedReducer.addressToSend,
  );
  const tokenSetted = useSelector(
    (state) => state.walletSeedReducer.tokenSetted,
  );
  const showWaitingSendAssetPopup = useSelector(
    (state) => state.walletSeedReducer.showWaitingSendAssetPopup,
  );
  let curExt = useSelector((state) => state.appReducer.curExt);
  const clientData = useSelector((state) => state.walletReducer.clientData);

  const encryptedSeedPhrase = useSelector(
    (state) => state.enterSeedPhrase.encryptedSeedPhrase,
  );
  const seedPhrasePassword = useSelector(
    (state) => state.enterSeedPhrase.seedPhrasePassword,
  );

  const [sendConfirmPopupIsVisible, setsendConfirmPopupIsVisible] =
    useState(false);
  const [addressToSendView, setaddressToSendView] = useState('');

  const { invalid: isInvalidAmount, validationMsg: validationMsgForAmount } =
    useSendAssetsCheckAmount();
  const {
    invalid: isInvalidAddress,
    loading: isLoading,
    validationMsg: validationMsgForAddress,
  } = useSendAssetsCheckAddress();
  const { selectedToken } = useSendAssetsSelectedToken();
  const { keyPair } = useKeyPair();

  function handleSetSendPopupVisibility() {
    if (
      isInvalidAddress ||
      isInvalidAmount ||
      (!addressToSend && !amountToSend)
    )
      return;

    //todo handle errors set block border red case error
    if (!tokenSetted) {
      console.log('please set token for send');
    } else if (!addressToSend) {
      console.log('please set address for send');
    } else if (!amountToSend) {
      console.log(
        'amountToSend',
        typeof amountToSend,
        amountToSend,
        'currentTokenForSend.balance',
        typeof selectedToken.balance,
        selectedToken.balance,
      );
      if (!selectedToken.tokenName) {
        console.log('currentTokenForSend.CHECK', selectedToken.tokenName);
      }
      console.log('error: amount should be set or you have not enough balance');
    } else setsendConfirmPopupIsVisible(true);
  }

  function handleHideConfirmPopup() {
    //todo set block border red case error
    setsendConfirmPopupIsVisible(false);
  }
  function handleChangeAddress(e) {
    setaddressToSendView(e.currentTarget.value);
    dispatch(setAddressForSend(e.currentTarget.value));
  }
  useEffect(() => {
    if (!addressToSend) return;
    handleSetView();
    console.log('addressToSendView', addressToSendView);
  }, [addressToSend]);
  function handleSetView() {
    if (addressToSend.length === 66) {
      let spliced = addressToSend.slice(0, 7);
      let splicedpart2 = addressToSend.slice(59);
      let view = spliced + '...' + splicedpart2;
      console.log('addressTo', addressToSend);
      setaddressToSendView(view);
    } else {
      setaddressToSendView(addressToSend);
    }
  }

  async function handleSendAsset() {
    if (!addressToSend) {
      return;
    }

    setsendConfirmPopupIsVisible(false);
    dispatch(setShowWaitingSendAssetsPopup(true));

    if (selectedToken.symbol === 'DP') {
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
            type: 'info',
          }),
        );
      } else {
        dispatch(
          setTips({
            message: `Something goes wrong - error code ${res.code}`,
            type: 'error',
          }),
        );
      }
    } else if (selectedToken.symbol === 'TON Crystal') {
      if (!amountToSend) {
        return;
      }
      let decrypted = await decrypt(encryptedSeedPhrase, seedPhrasePassword);
      const res = await sendNativeTons(
        clientData,
        addressToSend,
        amountToSend,
        decrypted.phrase,
      );
      if (!res.code) {
        dispatch(
          setTips({
            message: `Sended message to blockchain`,
            type: 'info',
          }),
        );
      } else {
        dispatch(
          setTips({
            message: `Something goes wrong - error code ${res.code}`,
            type: 'error',
          }),
        );
      }
    } else {
      if (!amountToSend) {
        return;
      }
      const walletAddrByOwner = await getExpectedWalletAddressByOwner(
        selectedToken.rootAddress,
        addressToSend,
      );
      const { acc_type } = await getAccType2(walletAddrByOwner.name);
      let sendTres;
      if (acc_type === 1) {
        const sendRes = await sendToken(
          clientData.address,
          curExt,
          selectedToken.rootAddress,
          walletAddrByOwner.name,
          amountToSend,
          keyPair,
          selectedToken,
        );
      } else {
        const deployRes = await deployEmptyWallet(
          clientData.address,
          keyPair,
          selectedToken.rootAddress,
          addressToSend,
        );
        if (!deployRes.code) {
          sendTres = await sendToken(
            clientData.address,
            curExt,
            selectedToken.rootAddress,
            walletAddrByOwner.name,
            amountToSend,
            keyPair,
            selectedToken,
          );
        }
      }

      dispatch(setShowWaitingSendAssetsPopup(false));
      if (sendTres && !sendTres.code) {
        dispatch(
          setTips({
            message: `Sended message to blockchain`,
            type: 'info',
          }),
        );
      } else {
        dispatch(
          setTips({
            message: `Something goes wrong - error code ${sendTres.code}`,
            type: 'error',
          }),
        );
      }
    }
    setaddressToSendView('');
    dispatch(setCurrentTokenForSend({}));
    dispatch(setTokenSetted(false));
    dispatch(setAmountForSend(''));
    dispatch(setAddressForSend(''));
    dispatch(setShowWaitingSendAssetsPopup(false));
  }

  function handleClearInput() {
    setaddressToSendView('');
    dispatch(setAddressForSend(''));
  }

  function handleBack() {
    dispatch(setAmountForSend(''));
    dispatch(setAddressForSend(''));
    history.push('/wallet');
  }
  function handleClose() {
    dispatch(setShowWaitingSendAssetsPopup(false));
  }

  return (
    <div className="container" style={{ flexDirection: 'column' }}>
      {!showWaitingSendAssetPopup && (
        <MainBlock
          style={{
            borderColor:
              validationMsgForAmount === NOT_ENOUGH_CAUSE_COMMISSION
                ? 'var(--error)'
                : 'var(--mainblock-border-color)',
          }}
          smallTitle={false}
          content={
            <div>
              <div className="head_wrapper">
                <button
                  className="arrow_back"
                  onClick={() => handleBack(false)}
                >
                  <img src={arrowBack} alt={'arrow'} />
                </button>
                <div className="left_block boldFont">Send asset</div>
              </div>
              <div
                className={cls('recipient_wrapper', {
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
                      placeholder={'0:...'}
                    />
                    <CloseIcon
                      fontSize="medium"
                      onClick={() => handleClearInput('address')}
                    />
                  </div>
                </div>
              </div>
              {addressToSend ? (
                <FormHelperText
                  style={{ marginLeft: '27px', marginTop: '4px' }}
                  error={isInvalidAddress ? `error` : null}
                  id="component-error-text"
                >
                  {validationMsgForAddress}
                </FormHelperText>
              ) : (
                <div style={{ height: '23px' }} />
              )}
              <BlockItem
                leftTitle={'Amount'}
                // currentToken={currentToken}
                rightTopBlock={
                  <ShowBalance
                    classWrapper={'send_balance center'}
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
              validationMsgForAmount !== NOT_ENOUGH_CAUSE_COMMISSION ? (
                <FormHelperText
                  style={{ marginLeft: '27px', marginTop: '4px' }}
                  error
                  id="component-error-text"
                >
                  {validationMsgForAmount}
                </FormHelperText>
              ) : (
                <div style={{ height: '23px' }} />
              )}

              <div className="btn_wrapper" style={{ marginTop: '25px' }}>
                <button
                  onClick={() => handleSetSendPopupVisibility()}
                  className={cls('btn mainblock-btn', {
                    'btn--disabled':
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
                <FormHelperText sx={{ textAlign: 'center' }}>
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
          style={{ marginLeft: '27px', marginTop: '4px' }}
          error
        >{`${NOT_ENOUGH_CAUSE_COMMISSION} (Commission = ${SEND_TOKEN} TON)`}</FormHelperText>
      )}
    </div>
  );
}

export default SendAssets;
