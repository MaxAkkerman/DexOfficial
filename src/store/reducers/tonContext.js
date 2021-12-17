import reduce from "lodash/reduce";

import {INIT_TON_CONTEXT, UPDATE_TON_CONTEXT} from "@/store/actions/types";

const initialState = {
	context: {
		dexClientAddress: null,
		dexRootAddress: null,
		limitRootAddress: null,
		reduxStore: null,
		tonClient: null,
	},
	functions: {
		getAllClientWallets() {},
		getAllPairsWithoutProvider() {},
		makeLimitOrder() {},
		swap() {},
		takeLimitOrder() {},
	},
	helperFunctions: {
		getClientKeys() {},
		getClientWallet() {},
		getPair() {},
		getPairsTotalSupply() {},
		getRouterAddress() {},
		getShardLimit() {},
		getTokenRouterAddress() {},
	},
};

/**
 * In the end we are creating ton context for:
 * 	- "functions" - this.context and this.helperFunctions
 * 	- "helperFunctionsLvl1" - this.context
 * 	- "helperFunctionsLvl2" - this.context and this.helperFunctions
 * 	- "context" in context property, which equals to this.context
 * ? Maybe be there are a better way to pass helperFunctions to helperFunctions with context
 */

export default function tonContext(state = initialState, {payload, type}) {
	switch (type) {
		case INIT_TON_CONTEXT: {
			const helperFunctionsLvl1 = reduce(
				state.helperFunctions,
				(r, v, k) => {
					r[k] = v.bind({context: state.context});
					return r;
				},
				{},
			);

			const helperFunctionsLvl2 = reduce(
				state.helperFunctions,
				(r, v, k) => {
					r[k] = v.bind({
						context: state.context,
						helperFunctions: helperFunctionsLvl1,
					});
					return r;
				},
				{},
			);

			return {
				context: state.context,
				functions: reduce(
					state.functions,
					(r, v, k) => {
						r[k] = v.bind({
							context: state.context,
							helperFunctions: helperFunctionsLvl2,
						});
						return r;
					},
					{},
				),
				helperFunctions: helperFunctionsLvl2,
				original: {
					// preserver original functions
					functions: state.functions,
					helperFunctions: state.helperFunctions,
				},
			};
		}
		case UPDATE_TON_CONTEXT: {
			const {name, value} = payload;

			const newValuesContext = {...state.context, [name]: value};

			const helperFunctionsLvl1 = reduce(
				state.original.helperFunctions,
				(r, v, k) => {
					r[k] = v.bind({context: state.context});
					return r;
				},
				{},
			);

			const helperFunctionsLvl2 = reduce(
				state.original.helperFunctions,
				(r, v, k) => {
					r[k] = v.bind({
						context: state.context,
						helperFunctions: helperFunctionsLvl1,
					});
					return r;
				},
				{},
			);

			return {
				context: newValuesContext,
				functions: reduce(
					state.original.functions,
					(r, v, k) => {
						r[k] = v.bind({
							context: newValuesContext,
							helperFunctions: helperFunctionsLvl2,
						});
						return r;
					},
					{},
				),
				helperFunctions: helperFunctionsLvl2,
				original: state.original, // preserve original functions
			};
		}
		default:
			return state;
	}
}
