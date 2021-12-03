import './EnterSeedPhrase.scss';

import styled from '@emotion/styled';
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Box,
  Grid,
  Snackbar,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { batch, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMount, useUnmount } from 'react-use';

import { InitialSeedState, onlyNums } from '../../constants/defaultData';
import { getWalletExt } from '../../extensions/extensions/checkExtensions';
import client, {
  checkPubKey,
  getClientBalance,
  getClientKeys,
  subscribeClient,
  subscribeClientBalance,
} from '../../extensions/sdk_get/get';
import {
  deployClient,
  prepareClientDataForDeploy,
} from '../../extensions/sdk_run/run';
import {
  decrypt,
  decryptPure,
  encrypt,
  encryptPure,
  verifySeed,
} from '../../extensions/tonUtils';
import { saveLog } from '../../logging/logging';
import {
  copyToClipboard,
  getAllPairsAndSetToStore,
  getAllTokensAndSetToStore,
  getMnemonics,
  handleCutAddress,
  hex2a,
  InitializeClient,
} from '../../reactUtils/reactUtils';
import {
  setCurExt,
  setTips,
  setWalletIsConnected,
} from '../../store/actions/app';
import {
  enterSeedPhraseSaveToLocalStorage,
  hideEnterSeedPhraseUnlock,
  setAfterEnterSeedLoading,
  setNewSide,
  setSeedPassword,
  showEnterSeedPhrase,
  wordEightEnterSeedPhrase,
  wordElevenEnterSeedPhrase,
  wordFiveEnterSeedPhrase,
  wordFourEnterSeedPhrase,
  wordNineEnterSeedPhrase,
  wordOneEnterSeedPhrase,
  wordSevenEnterSeedPhrase,
  wordSixEnterSeedPhrase,
  wordTenEnterSeedPhrase,
  wordThreeEnterSeedPhrase,
  wordTwelveEnterSeedPhrase,
  wordTwoEnterSeedPhrase,
} from '../../store/actions/enterSeedPhrase';
import {
  setClientData,
  setSubscribeReceiveTokens,
  setTransactionsList,
} from '../../store/actions/wallet';
import CloseBtn from '../CloseBtn/CloseBtn';
import Loader from '../Loader/Loader';
import MainBlock from '../MainBlock/MainBlock';
import PasswordEnterPopup from '../PasswordEnterPopup/PasswordEnterPopup';
import WaitingPopup from '../WaitingPopup/WaitingPopup';
import HintItem from './securTextItem';
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

  const [seedPhraseString, setSeedPhraseString] = useState(``);
  const [validSeedPhrase, setValidSeedPhrase] = useState(
    InitialValidationState,
  );
  const [seedGlobValid, setseedGlobValid] = useState(false);
  const [seedPhrasePassword, setSeedPhrasePassword] = useState(``);
  const [validPassword, setValidPassword] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState(InitialSeedState);
  const [noClientError, setNoClientError] = useState(false);
  const [loadingUserDataIsWaitingSeed, setloadingUserDataIsWaitingSeed] =
    useState(false);

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
    setValidPassword(false);
    setSeedPhrasePassword('');
    setseedGlobValid(false);
    setValidSeedPhrase(InitialValidationState);
  }

  function handleClose() {
    clearState();
    props.handleCLoseEntSeed();
    // dispatch(showEnterSeedPhrase(false));
  }

  async function checkClipboardSeedPhrase(e) {
    let sp = e.clipboardData.getData('text');
    let arr = sp.split(' ');
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
    console.log('onErr', onErr);
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

  async function login() {
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
    const existsClientOnRoot = await checkPubKey(clientKeys.public);

    let verifSeedFromLS;
    let notDeployedClientExists;
    if (clientDataPreDeployLS) {
      console.log(
        'verifSeedFromLS',
        verifSeedFromLS,
        'clientDataPreDeployLS.esp',
        clientDataPreDeployLS.esp,
        'seedPhrasePassword',
        seedPhrasePassword,
        'seedPhraseString',
        seedPhraseString,
      );
      verifSeedFromLS = await decryptPure(
        clientDataPreDeployLS.esp,
        seedPhrasePassword,
      );
      notDeployedClientExists = verifSeedFromLS === seedPhraseString;
    }
    console.log(
      'seedGlobValid',
      seedGlobValid,
      'validPassword',
      validPassword,
      'existsClientOnRoot.status',
      existsClientOnRoot.status,
      'notDeployedClientExists',
      notDeployedClientExists,
    );
    if (seedGlobValid && validPassword && existsClientOnRoot.status) {
      console.log('existsClientOnRoot', existsClientOnRoot);
      saveLog(
        {
          name: 'login',
          clientAddress: existsClientOnRoot.dexclient,
          deployed: true,
          created_at: (Date.now() + 10800000) / 1000,
        },
        'login',
      );
      // dispatch(showEnterSeedPhrase(false));
      props.handleCLoseEntSeed(false);
      props.setloadingUserData(true);
      history.push('/swap');
      await handleSetEncription(seedPhraseString, seedPhrasePassword);
      disSetTips('All checks passed, welcome onboard!', 'success');

      await InitializeClient(clientKeys.public);
      props.setloadingUserData(false);
      clearState();
    } else if (
      seedGlobValid &&
      validPassword &&
      !existsClientOnRoot.status &&
      notDeployedClientExists
    ) {
      // dispatch(showEnterSeedPhrase(false));
      props.handleCLoseEntSeed(false);
      props.setloadingUserData(true);

      const dexClientAddress = clientDataPreDeployLS.address;
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
      disSetTips('All checks passed, welcome onboard!', 'success');

      props.setloadingUserData(false);
      dispatch(setWalletIsConnected(false));

      clearState();

      history.push('/swap');
    } else {
      disSetTips(
        'Some error, no such client on root, please use another seed or create new client',
        'error',
      );
    }
  }

  async function handleSetEncription(seedPhraseString2, seedPhrasePassword2) {
    let encrypted = await encrypt(seedPhraseString2, seedPhrasePassword2);
    dispatch(setSeedPassword(seedPhrasePassword2));
    dispatch(enterSeedPhraseSaveToLocalStorage(encrypted));
    localStorage.setItem('seedPhraseString2', seedPhraseString2);
    localStorage.setItem('seedPhrasePassword2', seedPhrasePassword2);
  }

  function enterClick(e) {
    if (e.code === 'NumpadEnter' || e.code === 'Enter') {
      login();
    }
  }

  function passwordChange(event) {
    let password = event.target.value;

    if (event.target.value === '' || onlyNums.test(password)) {
      setValidPassword(password.length > 0);
      setSeedPhrasePassword(password);
    } else {
      setValidPassword(false);
    }
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

  return (
    <div className="select-wrapper">
      <MainBlock
        title={`Enter seed phrase`}
        classHeader={'fixFontSize'}
        classTitle={'fixFontSize'}
        class={'fixheight big'}
        button={
          <CloseBtn width={'16px'} height={'16px'} func={() => handleClose()} />
        }
        content={
          <>
            <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
              <SeedItem
                handleChangeSeed={(event, newValue) =>
                  handleChangeSeed(event, newValue)
                }
                seedPhrase={seedPhrase}
              />
            </Grid>
            <Alerter validSeedPhrase={validSeedPhrase} />
            {noClientError ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '24px',
                }}
              >
                <Alert severity={'warning'} sx={{ width: '100%' }}>
                  <AlertTitle>{'Client not exists'}</AlertTitle>
                  {
                    'There is no DEX client smart contract with such pubkey registered on DEX, please check your seed phrase or create new client.'
                  }
                </Alert>
              </Box>
            ) : null}

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '24px',
              }}
            >
              <TextField
                label="Encryption password"
                error={!validPassword}
                sx={{ width: '100%' }}
                placeholder={'Your password'}
                type="password"
                onChange={(e) => passwordChange(e)}
                value={seedPhrasePassword}
              />
            </Box>

            <HintItem />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '24px',
              }}
            >
              <button
                style={{ fontSize: '24px' }}
                onClick={login}
                className="btn wallet-btn"
              >
                Log in
              </button>
            </Box>
          </>
        }
      />
    </div>
  );
}

export default EnterSeedPhrase;
