import './EnterSeedPhrase.scss';

import { Grid } from '@material-ui/core';
import produce from 'immer';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMount, useUnmount } from 'react-use';

import { InitialSeedState } from '../../constants/defaultData';
import {
  checkPubKey,
  getClientBalance,
  getClientKeys,
} from '../../extensions/sdk_get/get';
import { decryptPure, encrypt, verifySeed } from '../../extensions/tonUtils';
import { saveLog } from '../../logging/logging';
import { getMnemonics, InitializeClient } from '../../reactUtils/reactUtils';
import {
  handleOpenEnterSeed,
  setTips,
  setWalletIsConnected,
} from '../../store/actions/app';
import {
  enterSeedPhraseSaveToLocalStorage,
  setSeedPassword,
} from '../../store/actions/enterSeedPhrase';
import { setClientData, setTransactionsList } from '../../store/actions/wallet';
import CloseBtn from '../CloseBtn/CloseBtn';
import { NextBtn } from '../LoginViaPIN/NextBtn';
import PinPopup from '../LoginViaPIN/PinPopup';
import MainBlock from '../MainBlock/MainBlock';
import WaitingPopup from '../WaitingPopup/WaitingPopup';
import SeedItem from './SeedItem';
import Alerter from './SignInAlertItem';

const mnemonicWords = getMnemonics();

const InitialValidationState = {
  msg: `Enter seed phrase or just paste it`,
  onError: true,
};

export default function EnterSeedPhrase(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  function disSetTips(msg, type) {
    dispatch(
      setTips({
        message: msg,
        type: type,
      }),
    );
  }

  const [tempPin, setTempPin] = useState('');
  const [steps, setStep] = useState([
    { name: 'step1', weAreHere: true },
    { name: 'step2', weAreHere: false },
    { name: 'step3', weAreHere: false },
  ]);

  useMount(async () => {
    // if (enterSeedPhraseSide === "login") {
    window.addEventListener('paste', checkClipboardSeedPhrase);
    // }
  });
  useUnmount(() => {
    window.removeEventListener('paste', checkClipboardSeedPhrase);
    // clearState()
  });

  const [seedPhraseString, setSeedPhraseString] = useState(``);
  const [validSeedPhrase, setValidSeedPhrase] = useState(
    InitialValidationState,
  );
  const [seedGlobValid, setseedGlobValid] = useState(false);
  const [seedPhrasePassword, setSeedPhrasePassword] = useState(``);
  const [seedPhrase, setSeedPhrase] = useState(InitialSeedState);
  const [loadingUserDataIsWaiting, setLoadingUserDataIsWaiting] =
    useState(false);
  const [preInitData, setPreInitData] = useState({});

  //Here i get seed string from seeds array to use it further
  function getSeedsString() {
    if (seedGlobValid) {
      let seedString = '';
      let arr = [];
      seedPhrase.map((item) => arr.push(item.seed));
      seedString = arr.join(' ');
      setSeedPhraseString(seedString);
      return seedString;
    } else {
      return null;
    }
  }

  function clearState() {
    setSeedPhrase(InitialSeedState);
    setSeedPhraseString('');
    setSeedPhrasePassword('');
    setseedGlobValid(false);
    setValidSeedPhrase(InitialValidationState);
    setPreInitData({});
  }

  function handleClose() {
    clearState();
    props.handleCLoseEntSeed();
    // dispatch(showEnterSeedPhrase(false));
  }

  async function checkClipboardSeedPhrase(e) {
    e.preventDefault();
    let sp = e.clipboardData.getData('text');
    let arr = sp.split(' ').filter((it) => it !== '');
    if (arr.length !== 12) {
      setValidSeedPhrase({
        msg: 'Pasted words count should be equal to 12, please check it',
        onError: true,
      });
      setseedGlobValid(false);
      return;
    }
    const newSeedArr = JSON.parse(JSON.stringify(seedPhrase));

    let onErr = 0;
    newSeedArr.map((item, i) => {
      if (mnemonicWords.indexOf(arr[i]) !== -1) {
        item.seed = arr[i];
        item.onSeedError = false;
      } else {
        item.seed = arr[i];
        item.onSeedError = true;
        onErr++;
      }
    });
    if (onErr !== 0) {
      setValidSeedPhrase({
        msg: `For seed phrase we use mnemonic words library, ${onErr} seeds are not of them, please check it`,
        onError: true,
      });
      setseedGlobValid(false);
    } else {
      setValidSeedPhrase({
        msg: `It remains to enter the Encryption password to complete the wallet setup.`,
        onError: false,
      });
      setseedGlobValid(true);
    }
    setSeedPhrase(newSeedArr);
  }

  async function handleSetEncription(seedPhraseString2, seedPhrasePassword2) {
    let encrypted = await encrypt(seedPhraseString2, seedPhrasePassword2);
    dispatch(setSeedPassword(seedPhrasePassword2));
    dispatch(enterSeedPhraseSaveToLocalStorage(encrypted));
  }

  function handleChangeSeed(e, val) {
    const curId = Number(e.currentTarget.id[0]);
    const newSeedArr = JSON.parse(JSON.stringify(seedPhrase));
    let k = 0;
    newSeedArr.map((item) => {
      if (item.id === curId) {
        if (mnemonicWords.indexOf(val) !== -1) {
          item.seed = val;
          item.onSeedError = false;
        } else {
          item.seed = val;
          item.onSeedError = true;
          k++;
        }
      }
    });
    setseedGlobValid(k === 0);
    setSeedPhrase(newSeedArr);
  }

  function handleSeedPhrase() {
    return {
      async forward() {
        let seedPhraseString = getSeedsString();
        if (!seedPhraseString) {
          disSetTips(
            'Some error, seed phrase not valid, please retry',
            'error',
          );
          return;
        }

        const verStatus = await verifySeed(seedPhraseString);
        if (!verStatus) {
          disSetTips(
            'Some error, seed phrase or password not valid, please retry',
            'error',
          );
          return;
        }

        let clientDataPreDeployLS = JSON.parse(
          localStorage.getItem('clientDataPreDeploy'),
        );
        const clientKeys = await getClientKeys(seedPhraseString);
        console.log('clientKeys.public', clientKeys.public);
        const existsClientOnRoot = await checkPubKey(clientKeys.public);
        console.log('existsClientOnRoot', existsClientOnRoot);

        let verifSeedFromLS;
        let notDeployedClientExists;

        if (clientDataPreDeployLS) {
          verifSeedFromLS = await decryptPure(
            clientDataPreDeployLS.esp,
            seedPhrasePassword,
          );
          notDeployedClientExists = verifSeedFromLS === seedPhraseString;
        }

        if (!notDeployedClientExists && !existsClientOnRoot.status) {
          disSetTips(
            'Some error, no such client on root, please use another seed or create new client',
            'error',
          );
          return;
        }
        setPreInitData({
          clientDataPreDeployLS: { ...clientDataPreDeployLS },
          clientKeys: { ...clientKeys },
          existsClientOnRoot: { ...existsClientOnRoot },
          notDeployedClientExists: notDeployedClientExists,
        });

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
      backward() {
        clearState();
        setTempPin('');
        setStep(
          produce(steps, (draft) => {
            draft[1].weAreHere = false;
            draft[0].weAreHere = true;
          }),
        );
      },
      forward({ complete, pin }) {
        if (!complete) {
          disSetTips('Please, complete PIN', 'error');
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
      async forward({ complete, pin }) {
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

        let seedPhrasePassword = '';
        pin.map((v) => {
          seedPhrasePassword += v;
        });

        if (seedGlobValid && preInitData.existsClientOnRoot.status) {
          setLoadingUserDataIsWaiting(true);

          console.log('step 111');
          // saveLog({
          //     name: "login",
          //     clientAddress: preInitData.existsClientOnRoot.dexclient,
          //     deployed:true,
          //     created_at: (Date.now()+10800000)/1000,
          // },"login")
          // dispatch(showEnterSeedPhrase(false));
          // props.handleCLoseEntSeed(false)
          // props.setloadingUserData(true);

          await handleSetEncription(seedPhraseString, seedPhrasePassword);

          await InitializeClient(preInitData.clientKeys.public);
          setLoadingUserDataIsWaiting(false);

          dispatch(handleOpenEnterSeed(false));
          history.push('/swap');
          disSetTips('Success, welcome onboard!', 'success');

          // props.setloadingUserData(false);
          clearState();
        } else if (
          seedGlobValid &&
          !preInitData.existsClientOnRoot.status &&
          preInitData.notDeployedClientExists
        ) {
          // setLoadingUserDataIsWaiting(true)

          // dispatch(showEnterSeedPhrase(false));
          props.handleCLoseEntSeed(false);
          // props.setloadingUserData(true);

          const dexClientAddress = preInitData.clientDataPreDeployLS.address;
          const dexClientBalance = await getClientBalance(dexClientAddress);
          dispatch(
            setClientData({
              balance: dexClientBalance,
              deployed: false,
              dexclient: dexClientAddress,
              status: false,
            }),
          );
          saveLog(
            {
              clientAddress: dexClientAddress,
              created_at: (Date.now() + 10800000) / 1000,
              deployed: false,
              name: 'login',
            },
            'login',
          );
          dispatch(setTransactionsList([]));
          await handleSetEncription(seedPhraseString, seedPhrasePassword);

          // props.setloadingUserData(false);
          dispatch(setWalletIsConnected(false));

          setLoadingUserDataIsWaiting(false);
          dispatch(handleOpenEnterSeed(false));
          history.push('/swap');
          disSetTips('Success, welcome onboard!', 'success');

          clearState();
        } else {
          disSetTips(
            'Some error, no such client on root, please use another seed or create new client',
            'error',
          );
        }
      },
    };
  }

  return (
    <div className="select-wrapper">
      {loadingUserDataIsWaiting ? (
        <WaitingPopup
          hide={true}
          title={'Connecting to blockchain'}
          text={`Loading user data...`}
        />
      ) : (
        <>
          {steps[0].weAreHere ? (
            <MainBlock
              title={`Log in with seed phrase`}
              classHeader={'fixFontSize'}
              classTitle={'fixFontSize'}
              class={'fixheight big'}
              button={
                <CloseBtn
                  width={'16px'}
                  height={'16px'}
                  func={() => handleClose()}
                />
              }
              content={
                <>
                  <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                    <SeedItem
                      handleChangeSeed={(event, newValue) =>
                        handleChangeSeed(event, newValue)
                      }
                      seedPhrase={seedPhrase}
                      // openedPopups={openedPopups}
                    />
                  </Grid>

                  <Alerter validSeedPhrase={validSeedPhrase} />

                  <NextBtn
                    curBtnStyles={'curBtnStyles'}
                    btnsClass={'enterSPRegBox'}
                    marginBottom={''}
                    errColor={null}
                    btnText={'Next'}
                    handleClickNext={handleSeedPhrase().forward}
                  />
                </>
              }
            />
          ) : null}
          {steps[1].weAreHere ? (
            <div className="select-wrapper">
              <PinPopup
                title={'Set PIN for quick login'}
                step={'2'}
                lastStep={'3'}
                handleLogOut={null}
                showTwoBtns={true}
                nextStep={'step3'}
                prevStep={'step1'}
                btnText={'Next'}
                handleClickBack={handleSetPin().backward}
                handleClickNext={handleSetPin().forward}
              />
            </div>
          ) : null}
          {steps[2].weAreHere ? (
            <div className="select-wrapper">
              <PinPopup
                title={'Repeat PIN'}
                step={'3'}
                lastStep={'3'}
                nextStep={'goInToApp'}
                prevStep={'step2'}
                showTwoBtns={true}
                btnText={'Log in'}
                handleLogOut={null}
                handleClickBack={handleRepeatPin().backward}
                handleClickNext={handleRepeatPin().forward}
              />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
