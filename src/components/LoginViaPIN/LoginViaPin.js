import './PinPopup.scss';

import produce from 'immer';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import client, { getClientBalance } from '../../extensions/sdk_get/get';
import { prepareClientDataForDeploy } from '../../extensions/sdk_run/run';
import { encrypt, encryptPure } from '../../extensions/tonUtils';
import { setTips } from '../../store/actions/app';
import {
  enterSeedPhraseSaveToLocalStorage,
  setSeedPassword,
  showEnterSeedPhrase,
} from '../../store/actions/enterSeedPhrase';
import {
  setClientData,
  setSubscribeReceiveTokens,
  setTransactionsList,
} from '../../store/actions/wallet';
import PinPopup from './PinPopup';
import WelcomePopup from './WelcomePopup';

function LoginViaPin(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [agreementSigned, setAgreementSigned] = useState(false);
  const [tempPin, setTempPin] = useState('');

  const [steps, setStep] = useState([
    { name: 'step1', weAreHere: false },
    { name: 'step2', weAreHere: true },
    { name: 'step3', weAreHere: false },
    { name: 'step4', weAreHere: false },
  ]);

  function handleClose() {
    props.handleCloseLogin();
  }

  function handleSignAgreement() {
    setAgreementSigned(!agreementSigned);
  }

  function handleAgreement() {
    return {
      backward() {},
      forward() {
        if (!agreementSigned) {
          dispatch(
            setTips({
              message: 'Sign agreement, please',
              type: 'error',
            }),
          );
          return;
        }
        setStep(
          produce(steps, (draft) => {
            draft[0].weAreHere = false;
            draft[1].weAreHere = true;
          }),
        );
      },
    };
  }

  function handleSetPin() {
    return {
      // backward() {
      //   setTempPin('');
      //   setAgreementSigned(false);
      //   setStep(
      //     produce(steps, (draft) => {
      //       draft[1].weAreHere = false;
      //       draft[0].weAreHere = true;
      //     }),
      //   );
      // },
      forward({ complete, pin }) {
        if (!complete) {
          dispatch(
            setTips({
              message: 'Please, complete PIN',
              type: 'error',
            }),
          );
          return;
        }

        setTempPin(pin.join(''));
        setStep(
          produce(steps, (draft) => {
            draft[1].weAreHere = false;
            draft[2].weAreHere = true;
          }),
        );
      },
    };
  }

  function handleRepeatPin() {
    return {
      backward() {
        setTempPin('');
        setStep(
          produce(steps, (draft) => {
            draft[2].weAreHere = false;
            draft[1].weAreHere = true;
          }),
        );
      },
      forward({ complete, pin }) {
        if (!complete) {
          dispatch(
            setTips({
              message: 'Please, complete PIN',
              type: 'error',
            }),
          );
          return;
        }

        if (tempPin !== pin.join('')) {
          dispatch(
            setTips({
              message: "PINs doesn't match",
              type: 'error',
            }),
          );
          return;
        }

        setStep(
          produce(steps, (draft) => {
            draft[2].weAreHere = false;
            draft[3].weAreHere = true;
          }),
        );
      },
    };
  }

  function handleFinish() {
    return {
      backward() {
        setTempPin('');
        setStep(
          produce(steps, (draft) => {
            draft[3].weAreHere = false;
            draft[1].weAreHere = true;
          }),
        );
      },
      async forward(reveal = false) {
        dispatch(showEnterSeedPhrase(false));
        props.setloadingUserData(true);
        let pinString = '';
        tempPin.split('').map((v) => {
          pinString += v;
        });
        const pinNum = Number(pinString);
        //TODO check pass
        dispatch(setSeedPassword(tempPin));

        let { phrase } = await client.crypto.mnemonic_from_random({
          word_count: 12,
        });
        const clientPrepData = await prepareClientDataForDeploy(phrase);

        let enc = await encrypt(phrase, pinNum);
        dispatch(enterSeedPhraseSaveToLocalStorage(enc));

        const dexClientAddress = clientPrepData.address;
        const dexClientBalance = await getClientBalance(dexClientAddress);

        const data = {
          balance: dexClientBalance,
          deployed: false,
          dexclient: dexClientAddress,
          status: false,
        };
        dispatch(setClientData(data));

        dispatch(setTransactionsList([]));

        const encClData = await encryptPure(clientPrepData.secret, pinString);
        console.log('pinpin', phrase, pinString);

        const encClDataSeed = await encryptPure(phrase, pinString);

        const encrData = JSON.parse(JSON.stringify(clientPrepData));
        encrData.secret = encClData;
        encrData.esp = encClDataSeed;

        localStorage.setItem('clientDataPreDeploy', JSON.stringify(encrData));
        dispatch(setSubscribeReceiveTokens([]));

        dispatch(
          setTips({
            message: 'All checks passed, welcome onboard!',
            type: 'success',
          }),
        );
        props.setloadingUserData(false);
        if (reveal === false) history.push('/swap');
        else history.push('/wallet/settings');
        return;
      },
    };
  }

  return ReactDOM.createPortal(
    <>
      {/*{steps[0].weAreHere ? (*/}
      {/*  <WelcomePopup*/}
      {/*    nextStep={'step2'}*/}
      {/*    step={'1'}*/}
      {/*    showCloseBtn={true}*/}
      {/*    showTwoBtns={false}*/}
      {/*    btnText={'Next'}*/}
      {/*    handleGetBack={handleAgreement().backward}*/}
      {/*    agreementSigned={agreementSigned}*/}
      {/*    handleSignAgreement={handleSignAgreement}*/}
      {/*    handleClose={() => handleClose()}*/}
      {/*    handleClickNext={handleAgreement().forward}*/}
      {/*  />*/}
      {/*) : null}*/}

      {steps[1].weAreHere ? (
        <PinPopup
          title={'Set PIN for quick login'}
          step={'1'}
          showArrow={false}
          handleLogOut={null}
          showTwoBtns={true}
          nextStep={'step3'}
          prevStep={'step1'}
          btnText={'Next'}
          handleClickBack={null}
          handleClickNext={handleSetPin().forward}
        />
      ) : null}
      {steps[2].weAreHere ? (
        <PinPopup
          title={'Repeat PIN'}
          step={'2'}
          showArrow={true}
          nextStep={'step4'}
          prevStep={'step2'}
          showTwoBtns={true}
          btnText={'Next'}
          handleLogOut={null}
          handleClickBack={handleRepeatPin().backward}
          handleClickNext={handleRepeatPin().forward}
        />
      ) : null}
      {steps[3].weAreHere ? (
        <WelcomePopup
          nextStep={'goInToApp'}
          prevStep={'step3'}
          step={'3'}
          closeBtn={false}
          btnText={'Great!'}
          agreementSigned={true}
          handleGetBack={handleFinish().backward}
          handleSignAgreement={handleSignAgreement}
          handleClose={() => handleClose()}
          handleClickNext={handleFinish().forward}
        />
      ) : null}
    </>,
    document.querySelector('body'),
  );
}

export default LoginViaPin;
