import {MockedProvider} from "@apollo/client/testing";
import {SnackbarProvider} from "notistack";
import React from "react";
import {Provider} from "react-redux";
import {createStore} from "redux";

import Alert from "@/components-v2/Alert";
import SwapConfirmPopup from "@/components-v2/SwapConfirmPopup";
import rootReducer from "@/store/reducers";

export default {
	component: SwapConfirmPopup,
	title: "Popup/Swap confirm (redux)",
};

const Template = (store, args) => {
	const state = store.getState();

	return (
		<Provider store={store}>
			<SnackbarProvider
				maxSnack={3}
				autoHideDuration={10000}
				anchorOrigin={{
					horizontal: "right",
					vertical: "bottom",
				}}
				content={(key, {message, type}) => (
					<Alert id={key} message={message} type={type} />
				)}
			>
				<MockedProvider>
					{state.swapReducer.values && <SwapConfirmPopup {...args} />}
				</MockedProvider>
			</SnackbarProvider>
		</Provider>
	);
};

export const WithoutValues = Template.bind(
	{},
	createStore(rootReducer, {
		swapReducer: {
			values: null,
		},
	}),
);

export const WithValues = Template.bind(
	{},
	createStore(rootReducer, {
		swapReducer: {
			values: {
				fromToken: {
					balance: 18.371355611,
					decimals: "9",
					icon: "https://trade.defispace.com/06f491487328de8e7fd81d835cfda442.svg",
					owner_address:
						"0:5b3b1c2a86941cdb30b925f711034bf3f4430d15d02a696e9242e1a7fcebaba8",
					rootAddress:
						"0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37",
					symbol: "WTON",
					tokenName: "Wrapped TON Crystal",
					type: "PureToken",
					walletAddress:
						"0:53489672a1e951f2c1c3c14676a3d5b80031844daf97df6ea355f2e66ebaf731",
				},
				fromValue: 14,
				pair: {
					exists: true,
					pairAddress:
						"0:50c00629f4a36672608b441c6e5bc3809be782e3bf1faad4e32e18ad0f4c0bdb",
					rateAB: 0.007000000001909091,
					rateBA: 142.8571428181818,
					reserveA: 1571428571,
					reserveB: 11000000,
					rootA:
						"0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37",
					rootB:
						"0:95934aa6a66cb3eb211a80e99234dfbba6329cfa31600ce3c2b070d8d9677cef",
					symbolA: "WTON",
					symbolB: "DAI",
					totalSupply: "10999999",
				},
				slippage: 0,
				toToken: {
					balance: 0.289999999989,
					decimals: "18",
					icon: "https://trade.defispace.com/b73b696693dcd144056b89329a461e9b.svg",
					owner_address:
						"0:5ed9bef6272079ce03e48469f315bccb50fc61de3cfa4a34e1c69992b30b8e2c",
					rootAddress:
						"0:95934aa6a66cb3eb211a80e99234dfbba6329cfa31600ce3c2b070d8d9677cef",
					symbol: "DAI",
					tokenName: "DAI",
					type: "PureToken",
					walletAddress:
						"0:51b5475f23d185f860d21b91fad2b885d410e90f903ab0866576500ef9c0ad7b",
				},
				toValue: 0.09800000002672728,
			},
		},
	}),
);
