import './EnterPassword.scss';

import constant from 'lodash/constant';
import times from 'lodash/times';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { decrypt } from '@/extensions/tonUtils';
import { saveLog } from '@/logging/logging';
import { InitializeClient } from '@/reactUtils/reactUtils';
import { setTips } from '@/store/actions/app';
import {
  hideEnterSeedPhraseUnlock,
  setSeedPassword,
} from '@/store/actions/enterSeedPhrase';
import {
  setClientData,
  setSubscribeReceiveTokens,
  setTransactionsList,
} from '@/store/actions/wallet';

import {
  checkPubKey,
  getClientBalance,
  getClientKeys,
} from '../../extensions/sdk_get/get';
import PinPopup from '../LoginViaPIN/PinPopup';
import WaitingPopup from '../WaitingPopup/WaitingPopup';

function EnterPassword() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loadingUserDataIsWaiting, setloadingUserDataIsWaiting] =
    useState(false);

  const [pin, setPin] = useState(times(4, constant('')));

  function resetPin() {
    setPin(times(4, constant('')));
  }

  async function handleLogIn(pin, complete) {
    if (!complete) {
      dispatch(
        setTips({
          message: 'Please, complete PIN',
          type: 'error',
        }),
      );
      return;
    }

    let seedPhrasePassword = '';
    pin.map((v) => {
      seedPhrasePassword += v;
    });
    let esp = localStorage.getItem('esp');
    let clientDataPreDeploy = JSON.parse(
      localStorage.getItem('clientDataPreDeploy'),
    );

    let decrypted = await decrypt(esp, seedPhrasePassword);
    if (!decrypted.valid) {
      resetPin();
      dispatch(
        setTips({
          message: `Wrong PIN, please try again`,
          type: 'error',
        }),
      );
      return;
    }

    const clientKeys = await getClientKeys(decrypted.phrase);
    let clientStatus = await checkPubKey(clientKeys.public);

    let clientExists =
      clientStatus.status &&
      decrypted.valid &&
      clientStatus.dexclient !==
        '0:0000000000000000000000000000000000000000000000000000000000000000';
    let preDeployedClientExists =
      clientDataPreDeploy &&
      clientDataPreDeploy.address &&
      clientDataPreDeploy.esp;
    if (!clientExists && !preDeployedClientExists) {
      dispatch(
        setTips({
          message: `Wrong PIN, please try again`,
          type: 'error',
        }),
      );
      return;
    }
    if (clientExists) {
      setloadingUserDataIsWaiting(true);
      saveLog(
        {
          clientAddress: clientStatus.dexclient,
          created_at: (Date.now() + 10800000) / 1000,
          deployed: true,
          name: 'login',
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
      setloadingUserDataIsWaiting(false);
      dispatch(hideEnterSeedPhraseUnlock());
      history.push('/swap');
    } else if (!clientExists && preDeployedClientExists) {
      setloadingUserDataIsWaiting(true);
      saveLog(
        {
          clientAddress: clientDataPreDeploy.address,
          created_at: (Date.now() + 10800000) / 1000,
          deployed: false,
          name: 'login',
        },
        'login',
      );
      const dexClientAddress = clientDataPreDeploy.address;
      const dexClientBalance = await getClientBalance(dexClientAddress);
      dispatch(
        setClientData({
          balance: dexClientBalance,
          dexclient: dexClientAddress,
          public: clientKeys.public,
          status: false,
        }),
      );
      dispatch(setTransactionsList([]));

      dispatch(setSeedPassword(seedPhrasePassword));

      setloadingUserDataIsWaiting(false);
      dispatch(hideEnterSeedPhraseUnlock());
      history.push('/swap');
    } else {
      dispatch(
        setTips({
          message: `Something goes wrong, please deploy new client or enter using seed phrase`,
          type: 'error',
        }),
      );
    }
  }

  function handleLogOut() {
    localStorage.removeItem('esp');
    localStorage.removeItem('setSubscribeReceiveTokens');
    window.location.reload();
  }

  return (
    <>
      {loadingUserDataIsWaiting ? (
        <WaitingPopup
          hide={true}
          title={'Connecting to blockchain'}
          text={`Loading user data...`}
        />
      ) : (
        // <div className="select-wrapper">
        <PinPopup
          title={'Enter your PIN'}
          nextStep={'step3'}
          prevStep={'step1'}
          handleLogOut={() => handleLogOut()}
          btnText={'Log in'}
          handleClickBack={null}
          handleClose={null}
          handleClickNext={({ complete, pin }) => handleLogIn(pin, complete)}
          onSetPin={setPin}
          pin={pin}
        />
        // </div>
      )}
    </>
  );
}

export default EnterPassword;
