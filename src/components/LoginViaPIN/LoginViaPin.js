import './PinPopup.scss';

import { numbers } from '@material/checkbox';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  setPin,
  setSubscribeReceiveTokens,
  setTransactionsList,
} from '../../store/actions/wallet';
import PinPopup from './PinPopup';
import WelcomePopup from './WelcomePopup';

function LoginViaPin(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const pin = useSelector((state) => state.walletReducer.pin);

  const [agreementSigned, setAgreementSigned] = useState(false);
  const [pinsConfirmed, setPinsConfirmed] = useState(true);
  // const [pinCorrect,setPinCorrect] = useState(false)

  const [steps, setStep] = useState([
    { name: 'step1', weAreHere: true },
    { name: 'step2', weAreHere: false },
    { name: 'step3', weAreHere: false },
    { name: 'step4', weAreHere: false },
  ]);

  async function handleClickNext(arr, nxtStp, completed) {
    console.log('nxtStp, completed');
    console.log(
      'pinsConfirmed && agreementSigned',
      pinsConfirmed,
      agreementSigned,
    );

    const makeNextStep = JSON.parse(JSON.stringify(steps));
    if (nxtStp === 'step2' && !agreementSigned) {
      dispatch(
        setTips({
          message: 'Sign agreement please',
          type: 'error',
        }),
      );
      return;
    }
    if (nxtStp === 'step3' && !completed) {
      dispatch(
        setTips({
          message: 'Please enter 4 numbers',
          type: 'error',
        }),
      );
      return;
    }
    if (nxtStp === 'step4' && !pinsConfirmed) {
      dispatch(
        setTips({
          message: 'Incorrect password, please retry',
          type: 'error',
        }),
      );
      return;
    } else {
      setPinsConfirmed(true);
    }
    if (nxtStp === 'goInToApp' && pinsConfirmed && agreementSigned) {
      console.log('am i here?');
      dispatch(showEnterSeedPhrase(false));
      props.setloadingUserData(true);
      let pinString = '';
      pin.map((item) => {
        pinString += item.value;
      });
      const pinNum = Number(pinString);
      //TODO check pass
      dispatch(setSeedPassword(pinNum));

      let { phrase } = await client.crypto.mnemonic_from_random({
        word_count: 12,
      });
      const clientPrepData = await prepareClientDataForDeploy(phrase);

      let enc = await encrypt(phrase, pinNum);
      dispatch(enterSeedPhraseSaveToLocalStorage(enc));

      const dexClientAddress = clientPrepData.address;
      const dexClientBalance = await getClientBalance(dexClientAddress);

      const data = {
        status: false,
        dexclient: dexClientAddress,
        balance: dexClientBalance,
        deployed: false,
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
      makeNextStep.map((item) => {
        item.weAreHere = item.name === 'step1';
      });
      dispatch(setSubscribeReceiveTokens([]));

      dispatch(
        setTips({
          message: 'All checks passed, welcome onboard!',
          type: 'success',
        }),
      );
      props.setloadingUserData(false);
      history.push('/swap');
      return;
    }

    makeNextStep.map((item) => {
      item.weAreHere = item.name === nxtStp;
    });

    console.log('makeNextStep', makeNextStep);
    setStep(makeNextStep);
  }

  function handleClickBack(bckStp) {
    const makeNextStep = JSON.parse(JSON.stringify(steps));
    console.log('step3', bckStp);
    if (bckStp === 'step3' || bckStp === 'step2') {
      makeNextStep.map((item) => {
        item.weAreHere = item.name === 'step2';
      });
      dispatch(setPin([]));
      setPinsConfirmed(true);
      setStep(makeNextStep);
      return;
    }
    if (bckStp === 'step1') {
      setAgreementSigned(false);
    }

    makeNextStep.map((item) => {
      item.weAreHere = item.name === bckStp;
    });
    setStep(makeNextStep);
  }

  function handleCheckPin(pinArr, step) {
    if (step === '2') {
      dispatch(setPin(pinArr));
    } else if (step === '3') {
      let pinsConfirm = pinArr.filter((item, i) => item.value !== pin[i].value);
      if (!pinsConfirm.length) {
        setPinsConfirmed(true);
      } else {
        setPinsConfirmed(false);
      }
    }
  }

  function handleClose() {
    props.handleCloseLogin();
  }

  function handleSignAgreement(bl) {
    if (bl) setAgreementSigned(bl);
  }

  return ReactDOM.createPortal(
    <>
      {steps[0].weAreHere ? (
        <WelcomePopup
          nextStep={'step2'}
          step={'1'}
          showCloseBtn={true}
          showTwoBtns={false}
          btnText={'Next'}
          handleGetBack={(bckStp) => handleClickBack(bckStp)}
          agreementSigned={agreementSigned}
          handleSignAgreement={(bl) => handleSignAgreement(bl)}
          handleClose={() => handleClose()}
          handleClickNext={(nxtStp) => handleClickNext(1, nxtStp)}
        />
      ) : null}

      {steps[1].weAreHere ? (
        <PinPopup
          title={'Set PIN for quick login'}
          step={'2'}
          handleLogOut={null}
          showTwoBtns={true}
          nextStep={'step3'}
          prevStep={'step1'}
          btnText={'Next'}
          pinCorrect={pinsConfirmed}
          handleClickBack={(bckStp) => handleClickBack(bckStp)}
          handleClickNext={(nxtStp, a, completed) =>
            handleClickNext(nxtStp, a, completed)
          }
          handleCheckPin={(pin, step) => handleCheckPin(pin, step)}
        />
      ) : null}
      {steps[2].weAreHere ? (
        <PinPopup
          title={'Repeat PIN'}
          step={'3'}
          nextStep={'step4'}
          prevStep={'step2'}
          showTwoBtns={true}
          btnText={'Next'}
          handleLogOut={null}
          pinCorrect={pinsConfirmed}
          handleClickBack={(bckStp) => handleClickBack(bckStp)}
          handleClickNext={(nxtStp, a, completed) =>
            handleClickNext(nxtStp, a, completed)
          }
          handleCheckPin={(pin, step) => handleCheckPin(pin, step)}
        />
      ) : null}
      {steps[3].weAreHere ? (
        <WelcomePopup
          nextStep={'goInToApp'}
          prevStep={'step3'}
          step={'4'}
          closeBtn={false}
          btnText={'Great!'}
          agreementSigned={agreementSigned}
          handleGetBack={(bckStp) => handleClickBack(bckStp)}
          handleSignAgreement={(bl) => handleSignAgreement(bl)}
          handleClose={() => handleClose()}
          handleClickNext={(nxtStp) => handleClickNext(1, nxtStp)}
        />
      ) : null}
    </>,
    document.querySelector('body'),
  );
}

export default LoginViaPin;
