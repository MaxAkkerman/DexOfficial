import { combineReducers } from 'redux';

import appReducer from './app';
import clientWallets from './clientWallets';
import enterSeedPhrase from './enterSeedPhrase';
import limitOrders from './limitOrders';
import manageReducer from './manage';
import poolReducer from './pool';
import poolExplorer from './poolExplorer';
import stakingReducer from './stake';
import swapReducer from './swap';
import walletReducer from './wallet';
import walletSeedReducer from './walletSeed';

export default combineReducers({
  appReducer,
  walletReducer,
  swapReducer,
  poolReducer,
  manageReducer,
  clientWallets,
  poolExplorer,
  walletSeedReducer,
  enterSeedPhrase,
  stakingReducer,
  limitOrders,
});
