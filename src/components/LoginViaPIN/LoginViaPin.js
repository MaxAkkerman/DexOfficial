import './PinPopup.scss';

import { numbers } from '@material/checkbox';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import client, { getClientBalance } from '../../extensions/sdk_get/get';
import { prepareClientDataForDeploy } from '../../extensions/sdk_run/run';
import { encrypt, encryptPure } from '../../extensions/tonUtils';
import { setTips } from '../../store/actions/app';
import {
  enterSeedPhraseSaveToLocalStorage,
  showEnterSeedPhrase,
} from '../../store/actions/enterSeedPhrase';
import {
  setClientData,
  setPin,
  setTransactionsList,
} from '../../store/actions/wallet';
import PinPopup from './PinPopup';
import WelcomePopup from './WelcomePopup';

function LoginViaPin(props) {
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

  async function handleClickNext(nxtStp, completed) {
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
      dispatch(showEnterSeedPhrase(false));
      props.setloadingUserData(true);
      let pinString = '';
      pin.map((item) => {
        pinString += item.value;
      });
      const pinNum = Number(pinString);

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

      const encClData = await encryptPure(clientPrepData.secret, pin);
      const encClDataSeed = await encryptPure(phrase, pin);

      const encrData = JSON.parse(JSON.stringify(clientPrepData));
      encrData.secret = encClData;
      encrData.esp = encClDataSeed;

      localStorage.setItem('clientDataPreDeploy', JSON.stringify(encrData));
      makeNextStep.map((item) => {
        item.weAreHere = item.name === 'step1';
      });
      setStep(makeNextStep);

      props.setloadingUserData(true);
      return;
    }

    makeNextStep.map((item) => {
      item.weAreHere = item.name === nxtStp;
    });
    setStep(makeNextStep);
  }

  function handleClickBack(bckStp) {
    const makeNextStep = JSON.parse(JSON.stringify(steps));
    if (bckStp === 'step3') {
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
    dispatch(showEnterSeedPhrase(false));
  }

  function handleSignAgreement(bl) {
    if (bl) setAgreementSigned(bl);
  }

  return (
    <>
      {steps[0].weAreHere ? (
        <WelcomePopup
          nextStep={'step2'}
          step={'1'}
          showCloseBtn={true}
          btnText={'Next'}
          handleGetBack={(bckStp) => handleClickBack(bckStp)}
          agreementSigned={agreementSigned}
          handleSignAgreement={(bl) => handleSignAgreement(bl)}
          handleClose={() => handleClose()}
          handleClickNext={(nxtStp) => handleClickNext(nxtStp)}
        />
      ) : null}

      {steps[1].weAreHere ? (
        <PinPopup
          title={'Set PIN for quick login'}
          step={'2'}
          nextStep={'step3'}
          prevStep={'step1'}
          btnText={'Next'}
          pinCorrect={pinsConfirmed}
          handleClickBack={(bckStp) => handleClickBack(bckStp)}
          handleClickNext={(nxtStp, completed) =>
            handleClickNext(nxtStp, completed)
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
          btnText={'Next'}
          pinCorrect={pinsConfirmed}
          handleClickBack={(bckStp) => handleClickBack(bckStp)}
          handleClickNext={(nxtStp, completed) =>
            handleClickNext(nxtStp, completed)
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
          btnText={'Greate!'}
          agreementSigned={agreementSigned}
          handleGetBack={(bckStp) => handleClickBack(bckStp)}
          handleSignAgreement={(bl) => handleSignAgreement(bl)}
          handleClose={() => handleClose()}
          handleClickNext={(nxtStp) => handleClickNext(nxtStp)}
        />
      ) : null}
    </>
  );
}

export default LoginViaPin;
