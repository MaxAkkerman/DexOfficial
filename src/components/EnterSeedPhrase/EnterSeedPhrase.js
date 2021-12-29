import './EnterSeedPhrase.scss';

import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMount, useUnmount } from 'react-use';

import { InitialSeedState, onlyNums } from '../../constants/defaultData';
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
import {
  setClientData,
  setPin,
  setTransactionsList,
} from '../../store/actions/wallet';
import CloseBtn from '../CloseBtn/CloseBtn';
import { NextBtn } from '../LoginViaPIN/NextBtn';
import PinPopup from '../LoginViaPIN/PinPopup';
import MainBlock from '../MainBlock/MainBlock';
import WaitingPopup from '../WaitingPopup/WaitingPopup';
import SeedItem from './SeedItem';
import Alerter from './SignInAlertItem';

const mnemonicWords = getMnemonics();

const InitialValidationState = {
  onError: true,
  msg: `Enter seed phrase or just paste it`,
};

function EnterSeedPhrase(props) {
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

  useMount(async () => {
    // if (enterSeedPhraseSide === "login") {
    window.addEventListener('paste', checkClipboardSeedPhrase);
    // }
  });
  useUnmount(() => {
    window.removeEventListener('paste', checkClipboardSeedPhrase);
    // clearState()
  });
  const pin = useSelector((state) => state.walletReducer.pin);

  const [seedPhraseString, setSeedPhraseString] = useState(``);
  const [validSeedPhrase, setValidSeedPhrase] = useState(
    InitialValidationState,
  );
  const [seedGlobValid, setseedGlobValid] = useState(false);
  const [seedPhrasePassword, setSeedPhrasePassword] = useState(``);
  const [seedPhrase, setSeedPhrase] = useState(InitialSeedState);
  const [loadingUserDataIsWaiting, setLoadingUserDataIsWaiting] =
    useState(false);
  // const [openedPopups, setopenedPopups] = useState(false);
  const [onPin, setOnPin] = useState(false);
  const [pinsConfirmed, setPinsConfirmed] = useState(true);
  const [completedPass, setCompletedPass] = useState(false);
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
    setCompletedPass(false);
    setPreInitData({});
    setOnPin(false);
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
        onError: true,
        msg: 'Pasted words count should be equal to 12, please check it',
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
        onError: true,
        msg: `For seed phrase we use mnemonic words library, ${onErr} seeds are not of them, please check it`,
      });
      setseedGlobValid(false);
    } else {
      setValidSeedPhrase({
        onError: false,
        msg: `It remains to enter the Encryption password to complete the wallet setup.`,
      });
      setseedGlobValid(true);
    }
    setSeedPhrase(newSeedArr);
  }

  async function handleSetEncription(seedPhraseString2, seedPhrasePassword2) {
    let encrypted = await encrypt(seedPhraseString2, seedPhrasePassword2);
    dispatch(setSeedPassword(seedPhrasePassword2));
    dispatch(enterSeedPhraseSaveToLocalStorage(encrypted));
    // localStorage.setItem("seedPhraseString2", seedPhraseString2);
    // localStorage.setItem("seedPhrasePassword2", seedPhrasePassword2);
  }

  // function enterClick(e) {
  //     if (e.code === "NumpadEnter" || e.code === "Enter") {
  //         login();
  //     }
  // }

  // function passwordChange(event) {
  //     let password = event.target.value;
  //
  //     if (event.target.value === '' || onlyNums.test(password)) {
  //         setValidPassword(password.length > 0)
  //         setSeedPhrasePassword(password);
  //
  //     } else {
  //         setValidPassword(false)
  //     }
  // }

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

  async function handleClickGoToPIN(ev) {
    if (ev) {
      let clientDataPreDeployLS = JSON.parse(
        localStorage.getItem('clientDataPreDeploy'),
      );
      let seedPhraseString = getSeedsString();
      if (!seedPhraseString) {
        disSetTips('Some error, seed phrase not valid, please retry', 'error');
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
        notDeployedClientExists: notDeployedClientExists,
        existsClientOnRoot: { ...existsClientOnRoot },
      });
      setOnPin(ev);
    } else {
      clearState();
      setOnPin(ev);
    }
  }
  // linear-gradient(92.91deg, #FFF -1%, #FFF 100%)
  async function handleLogIn(pin) {
    let seedPhrasePassword = '';
    pin.map((item) => {
      seedPhrasePassword += item.value.toString();
    });
    if (seedPhrasePassword.length < 4) {
      disSetTips('Please complete PIN', 'error');
      return;
    }

    if (
      seedGlobValid &&
      completedPass &&
      preInitData.existsClientOnRoot.status
    ) {
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
      completedPass &&
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
          status: false,
          dexclient: dexClientAddress,
          balance: dexClientBalance,
          deployed: false,
        }),
      );
      saveLog(
        {
          name: 'login',
          clientAddress: dexClientAddress,
          deployed: false,
          created_at: (Date.now() + 10800000) / 1000,
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
  }

  function handleCheckPin(pinArr, step, completed) {
    const curEmptyPin = pinArr.filter((item) => !item.value.length);
    if (!curEmptyPin.length) {
      setCompletedPass(true);
      let password = '';
      pin.map((item) => {
        password += item.value.toString();
      });
      setSeedPhrasePassword(password);
    } else {
      setCompletedPass(false);
    }
    dispatch(setPin(pinArr));
  }

  return (
    <div
      className="select-wrapper"
      onClick={() => console.log('completedPass', completedPass)}
    >
      {loadingUserDataIsWaiting ? (
        <WaitingPopup
          hide={true}
          title={'Connecting to blockchain'}
          text={`Loading user data...`}
        />
      ) : (
        <>
          {!onPin ? (
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
                  {/*{noClientError ? (*/}
                  {/*    <Box*/}
                  {/*        sx={{*/}
                  {/*            display: "flex",*/}
                  {/*            justifyContent: "center",*/}
                  {/*            marginTop: "24px",*/}
                  {/*        }}*/}
                  {/*    >*/}
                  {/*        <Alert severity={"warning"} sx={{width: "100%"}}>*/}
                  {/*            <AlertTitle>{"Client not exists"}</AlertTitle>*/}
                  {/*            {*/}
                  {/*                "There is no DEX client smart contract with such pubkey registered on DEX, please check your seed phrase or create new client."*/}
                  {/*            }*/}
                  {/*        </Alert>*/}
                  {/*    </Box>*/}
                  {/*) : null}*/}

                  <NextBtn
                    curBtnStyles={'curBtnStyles'}
                    btnsClass={'enterSPRegBox'}
                    marginBottom={''}
                    errColor={null}
                    btnText={'Next'}
                    handleClickNext={() => handleClickGoToPIN(true)}
                  />
                </>
              }
            />
          ) : (
            <div className="select-wrapper">
              <PinPopup
                title={'Enter your PIN'}
                showTwoBtns={true}
                nextStep={'step3'}
                prevStep={'step1'}
                handleLogOut={null}
                btnText={'Log in'}
                pinCorrect={pinsConfirmed}
                handleClickBack={() => handleClickGoToPIN(false)}
                handleClose={null}
                handleClickNext={(pin) => handleLogIn(pin)}
                handleCheckPin={handleCheckPin}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default EnterSeedPhrase;
