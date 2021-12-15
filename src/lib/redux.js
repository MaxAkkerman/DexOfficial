import {TonClient} from "@tonclient/core";
import {libWeb} from "@tonclient/lib-web";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import Radiance from "@/extensions/Radiance.json";
import {initTonContext, updateTonContext} from "@/store/actions/ton";
import rootReducer from "@/store/reducers";
import rootSaga from "@/store/sagas";
import getAllClientWallets from "@/utils/getAllClientWallets";
import getAllPairsWithoutProvider from "@/utils/getAllPairsWithoutProvider";
import getClientKeys from "@/utils/getClientKeys";
import getClientWallet from "@/utils/getClientWallet";
import getPair from "@/utils/getPair";
import getPairsTotalSupply from "@/utils/getPairsTotalSupply";
import getTokenRouter from "@/utils/getTokenRouter";
import swap from "@/utils/swap";
import takeLimitOrder from "@/utils/takeLimitOrder";

TonClient.useBinaryLibrary(libWeb);

const sagaMiddleware = createSagaMiddleware();

export const reduxStore = createStore(
	rootReducer,
	{
		tonContext: {
			context: {
				dexClientAddress:
					localStorage.getItem("clientData") &&
					JSON.parse(localStorage.getItem("clientData")).dexclient,
				dexRootAddress: Radiance.networks["2"].dexroot,
				limitRootAddress: Radiance.networks["2"].limitRootAddress,
				tonClient: new TonClient({
					network: {endpoints: [Radiance.networks["2"].DappServer]},
				}),
			},
			functions: {
				getAllClientWallets,
				getAllPairsWithoutProvider,
				swap,
				takeLimitOrder,
			},
			helperFunctions: {
				getClientKeys,
				getClientWallet,
				getPair,
				getPairsTotalSupply,
				getTokenRouter,
			},
		},
	},
	composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
reduxStore.dispatch(initTonContext());
reduxStore.dispatch(updateTonContext("reduxStore", reduxStore));
