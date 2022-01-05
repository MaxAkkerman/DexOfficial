import { TonClient } from '@tonclient/core';
import { libWeb } from '@tonclient/lib-web';
import isEmpty from 'lodash/isEmpty';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import Radiance from '@/extensions/Radiance.json';
import { initTonContext, updateTonContext } from '@/store/actions/ton';
import rootReducer from '@/store/reducers';
import rootSaga from '@/store/sagas';
import cancelLimitOrder from '@/utils/cancelLimitOrder';
import checkClientPairExists from '@/utils/checkClientPairExists';
import checkWalletExists from '@/utils/checkWalletExists';
import getAllClientWallets from '@/utils/getAllClientWallets';
import getAllPairsWithoutProvider from '@/utils/getAllPairsWithoutProvider';
import getClientKeys from '@/utils/getClientKeys';
import getClientWallet from '@/utils/getClientWallet';
import getPair from '@/utils/getPair';
import getPairsTotalSupply from '@/utils/getPairsTotalSupply';
import getRootFromWallet from '@/utils/getRootFromWallet';
import getRouterAddress from '@/utils/getRouterAddress';
import getShardLimit from '@/utils/getShardLimit';
import getTokenRouterAddress from '@/utils/getTokenRouterAddress';
import getWalletFromRoot from '@/utils/getWalletFromRoot';
import makeLimitOrder from '@/utils/makeLimitOrder';
import swap from '@/utils/swap';
import takeLimitOrder from '@/utils/takeLimitOrder';
import updateLimitOrderPrice from '@/utils/updateLimitOrderPrice';
import transferLimitOrder from '@/utils/updateLimitOrderPrice';

TonClient.useBinaryLibrary(libWeb);

const sagaMiddleware = createSagaMiddleware();

export const reduxStore = createStore(
  rootReducer,
  {
    chromePopup: {
      visible: localStorage.getItem('chrome') ? false : true,
    },
    tonContext: {
      context: {
        dexClientAddress:
          localStorage.getItem('clientData') &&
          JSON.parse(localStorage.getItem('clientData')).dexclient,
        dexRootAddress: Radiance.networks['2'].dexroot,
        limitRootAddress: Radiance.networks['2'].limitRootAddress,
        tonClient: new TonClient({
          network: { endpoints: [Radiance.networks['2'].DappServer] },
        }),
      },
      functions: {
        cancelLimitOrder,
        getAllClientWallets,
        getAllPairsWithoutProvider,
        makeLimitOrder,
        swap,
        takeLimitOrder,
        transferLimitOrder,
        updateLimitOrderPrice,
      },
      helperFunctions: {
        checkClientPairExists,
        checkWalletExists,
        getClientKeys,
        getClientWallet,
        getPair,
        getPairsTotalSupply,
        getRootFromWallet,
        getRouterAddress,
        getShardLimit,
        getTokenRouterAddress,
        getWalletFromRoot,
      },
    },
    tutorialReducer: {
      finished:
        localStorage.getItem('tutorialFinished') === null
          ? isEmpty(JSON.parse(localStorage.getItem('clientData'))) &&
            isEmpty(JSON.parse(localStorage.getItem('esp')))
            ? false
            : true
          : localStorage.getItem('tutorialFinished'),
    },
  },
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
reduxStore.dispatch(initTonContext());
reduxStore.dispatch(updateTonContext('reduxStore', reduxStore));
