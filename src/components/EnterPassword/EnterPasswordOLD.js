import './EnterPassword.scss';

import styled from '@emotion/styled';
import { Alert, AlertTitle, Box, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import client, {
  getClientBalance,
  getClientKeys,
} from '../../extensions/sdk_get/get';
import { decrypt } from '../../extensions/tonUtils';
import { saveLog } from '../../logging/logging';
import { InitializeClient } from '../../reactUtils/reactUtils';
import { setTips } from '../../store/actions/app';
import {
  hideEnterSeedPhraseUnlock,
  setSeedPassword,
} from '../../store/actions/enterSeedPhrase';
import {
  setClientData,
  setSubscribeReceiveTokens,
  setTransactionsList,
} from '../../store/actions/wallet';
import MainBlock from '../MainBlock/MainBlock';
import WaitingPopup from '../WaitingPopup/WaitingPopup';

function EnterPassword(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [seedPhrasePassword, setSeedPhrasePassword] = useState(``);
  const [validPassword, setValidPassword] = useState(false);

  const [decryptResult, setDecryptResult] = React.useState(null);
  const [loadingUserDataIsWaiting, setloadingUserDataIsWaiting] =
    useState(false);

  function enterClick(e) {
    if (e.code === 'NumpadEnter' || e.code === 'Enter') {
      login();
    }
  }

  async function login(e) {
    let esp = localStorage.getItem('esp');
    let clientDataLS = JSON.parse(localStorage.getItem('clientData'));
    let clientDataPreDeploy = JSON.parse(
      localStorage.getItem('clientDataPreDeploy'),
    );

    let decrypted = await decrypt(esp, seedPhrasePassword);
    const clientKeys = await getClientKeys(decrypted.phrase);
    if (decrypted.valid === false) {
      setDecryptResult(false);
      dispatch(
        setTips({
          message: `Something goes wrong - invalid password`,
          type: 'error',
        }),
      );
    }
    if (decrypted.valid === true) {
      setloadingUserDataIsWaiting(true);
      setDecryptResult(true);
      console.log(
        'clientDataLS',
        clientDataLS,
        'clientDataLS.address',
        clientDataLS.address,
        'clientDataLS.status',
        clientDataLS.status,
      );
      if (
        !clientDataLS.status &&
        clientDataPreDeploy &&
        clientDataPreDeploy.address
      ) {
        saveLog(
          {
            name: 'login',
            clientAddress: clientDataPreDeploy.address,
            deployed: false,
            created_at: (Date.now() + 10800000) / 1000,
          },
          'login',
        );
        const dexClientAddress = clientDataPreDeploy.address;
        const dexClientBalance = await getClientBalance(dexClientAddress);

        dispatch(
          setClientData({
            status: false,
            dexclient: dexClientAddress,
            balance: dexClientBalance,
            public: clientKeys.public,
          }),
        );
        dispatch(setTransactionsList([]));

        dispatch(setSeedPassword(seedPhrasePassword));

        setloadingUserDataIsWaiting(false);
        dispatch(hideEnterSeedPhraseUnlock());
        history.push('/swap');
        return;
      }
      saveLog(
        {
          name: 'login',
          clientAddress: clientDataLS.dexclient,
          deployed: true,
          created_at: (Date.now() + 10800000) / 1000,
        },
        'login',
      );
      await InitializeClient(clientKeys.public);
      dispatch(setSeedPassword(seedPhrasePassword));

      const receiveTokensData = JSON.parse(
        localStorage.getItem('setSubscribeReceiveTokens'),
      );
      if (receiveTokensData) {
        dispatch(setSubscribeReceiveTokens(receiveTokensData));
      }

      // setSeedPhraseString("");
    }
    setloadingUserDataIsWaiting(false);
    dispatch(hideEnterSeedPhraseUnlock());
    history.push('/swap');
  }

  function passwordChange(event) {
    let password = event.target.value;
    if (password.length > 0) setValidPassword(true);
    else setDecryptResult(null);
    setSeedPhrasePassword(password);
  }

  function clear() {
    localStorage.removeItem('esp');
    localStorage.removeItem('setSubscribeReceiveTokens');
    window.location.reload();
  }

  const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-input': {
      '&.Mui-disabled': {
        color: 'var(--text-color)',
        '-webkit-text-fill-color': 'unset',
      },
      color: 'var(--text-color)',
    },
    '& .Mui-disabled': {
      color: 'var(--text-color)',
    },
  });

  return (
    <div className="select-wrapper">
      {loadingUserDataIsWaiting ? (
        <WaitingPopup
          hide={true}
          title={'Connecting to blockchain'}
          text={`Loading user data...`}
        />
      ) : (
        <MainBlock
          title={'Unlock your wallet'}
          content={
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '24px',
                }}
              >
                <CssTextField
                  label="Decryption password"
                  error={!validPassword}
                  placeholder={
                    'Your seed phrase will be decrypted with this password'
                  }
                  type="password"
                  onChange={passwordChange}
                  inputRef={(input) => {
                    if (input != null) {
                      input.focus();
                    }
                  }}
                  value={seedPhrasePassword}
                  onKeyDown={enterClick}
                  autoFocus
                  sx={{
                    width: '100%',
                    '&:focus': {
                      color: 'var(--text-color) !important',
                      outlineColor: 'var(--text-color) !important',
                      borderColor: 'var(--text-color) !important',
                    },
                    '::placeholder': {
                      color: 'var(--text-color) !important',
                    },
                    color: 'var(--text-color) !important',
                    outlineColor: 'var(--text-color) !important',
                    borderColor: 'var(--text-color) !important',
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '24px',
                }}
              >
                <Alert severity="info">
                  <AlertTitle>Security policy</AlertTitle>
                  <strong>DefiSpace does not store your password.</strong>
                  <br />
                  It is used exclusively for local decryption of the seed phrase
                  stored in the browser storage.
                </Alert>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '24px',
                }}
              >
                <Alert
                  style={{ width: '100%' }}
                  severity={
                    (decryptResult === null && 'info') ||
                    (decryptResult === false && 'error') ||
                    (decryptResult === true && 'success')
                  }
                >
                  <AlertTitle>
                    {(decryptResult === null && 'Wait to unlock') ||
                      (decryptResult === false && 'Incorrect password') ||
                      (decryptResult === true && 'All right')}
                  </AlertTitle>
                  {(decryptResult === null &&
                    'Please, enter your password and click the button below.') ||
                    (decryptResult === false &&
                      "Oh! You're enter incorrect password! Try enter again or Clear your saved account.") ||
                    (decryptResult === true &&
                      'Yeah! Your wallet have been unlocked! Please wait, we check additional information. Be patient.')}
                </Alert>
              </Box>
              <div className={'EnterPassword_buttons_container'}>
                <div className={'EnterPassword_buttons'}>
                  <div className={'EnterPassword_full_width margint'}>
                    <button
                      style={{ fontSize: '24px' }}
                      onClick={clear}
                      className="btn-error wallet-btn unlock"
                    >
                      Log out and Delete
                    </button>
                  </div>

                  <div className={'EnterPassword_full_width'}>
                    <button
                      style={{ fontSize: '24px' }}
                      onClick={login}
                      className="btn wallet-btn unlock"
                    >
                      Unlock
                    </button>
                  </div>
                </div>
              </div>
            </>
          }
        />
      )}
    </div>
  );
  //     document.querySelector('body')
  // );
}

export default EnterPassword;
