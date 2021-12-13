import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import {initTonContext} from "@/store/actions/ton";
import rootReducer from "@/store/reducers";
import rootSaga from "@/store/sagas";

const sagaMiddleware = createSagaMiddleware();

export const reduxStore = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
reduxStore.dispatch(initTonContext());
