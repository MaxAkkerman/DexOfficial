import {combineReducers} from "redux";

import appReducer from "./app";
import clientWallets from "./clientWallets";
import enterSeedPhrase from "./enterSeedPhrase";
import limitOrders from "./limitOrders";
import manageReducer from "./manage";
import poolReducer from "./pool";
import poolExplorer from "./poolExplorer";
import stakingReducer from "./stake";
import swapReducer from "./swap";
import tonData from "./tonData";
import tonFunctions from "./tonFunctions";
import walletReducer from "./wallet";
import walletSeedReducer from "./walletSeed";

export default combineReducers({
	appReducer,
	clientWallets,
	enterSeedPhrase,
	limitOrders,
	manageReducer,
	poolExplorer,
	poolReducer,
	stakingReducer,
	swapReducer,
	tonData,
	tonFunctions,
	walletReducer,
	walletSeedReducer,
});
