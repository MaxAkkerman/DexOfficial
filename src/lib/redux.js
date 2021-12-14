import {TonClient} from "@tonclient/core";
import {libWeb} from "@tonclient/lib-web";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import Radiance from "@/extensions/Radiance.json";
import {initTonContext} from "@/store/actions/ton";
import rootReducer from "@/store/reducers";
import rootSaga from "@/store/sagas";
import getAllClientWallets from "@/utils/getAllClientWallets";
import getAllPairsWithoutProvider from "@/utils/getAllPairsWithoutProvider";
import getPairsTotalSupply from "@/utils/getPairsTotalSupply";

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
			},
			helperFunctions: {
				getPairsTotalSupply,
			},
		},
	},
	composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
reduxStore.dispatch(initTonContext());
