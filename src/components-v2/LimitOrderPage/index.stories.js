import values from "lodash/values";
import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {createStore} from "redux";

import LimitOrderPage from "@/components-v2/LimitOrderPage";
import {pairs, tokens} from "@/constants/mocks";
import rootReducer from "@/store/reducers";

export default {
	component: LimitOrderPage,
	decorators: [(story) => <BrowserRouter>{story()}</BrowserRouter>],
	title: "Pages/Create limit order",
};

// eslint-disable-next-line react/prop-types
const Template = (store, args) => (
	<Provider store={store}>
		<LimitOrderPage {...args} />
	</Provider>
);

export const WithoutWallet = Template.bind({}, createStore(rootReducer));

export const WithoutPairsAndTokens = Template.bind(
	{},
	createStore(rootReducer, {
		appReducer: {walletIsConnected: true},
		walletReducer: {
			pairsList: [],
			tokenList: [],
		},
	}),
);

export const WithPairsAndTokens = Template.bind(
	{},
	createStore(rootReducer, {
		appReducer: {walletIsConnected: true},
		walletReducer: {
			pairsList: values(pairs),
			tokenList: values(tokens),
		},
	}),
);
