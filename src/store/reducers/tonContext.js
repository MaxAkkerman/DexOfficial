import reduce from "lodash/reduce";

import {INIT_TON_CONTEXT, UPDATE_TON_CONTEXT} from "@/store/actions/types";

const initialState = {
	context: {
		dexClientAddress: null,
		dexClientKeyPair: null,
		dexRootAddress: null,
		limitRootAddress: null,
		tonClient: null,
	},
	functions: {
		swap() {},
		takeLimitOrder() {},
	},
	helperFunctions: {
		getPair() {},
		getTokenInfo() {},
		getTokenRouter() {},
	},
};

/**
 * In the end we are creating ton context for:
 * 	- functions - this.context and this.helperFunctions
 * 	- helperFunctions - this.context
 * 	and also context in context property, which equals to this.context
 */

export default function tonContext(state = initialState, {payload, type}) {
	switch (type) {
		case INIT_TON_CONTEXT: {
			const helperFunctions = reduce(
				state.helperFunctions,
				(r, v, k) => {
					r[k] = v.bind({context: state.context});
					return r;
				},
				{},
			);

			return {
				functions: reduce(
					state.functions,
					(r, v, k) => {
						r[k] = v.bind({
							context: state.context,
							helperFunctions,
						});
						return r;
					},
					{},
				),
				helperFunctions,
				values: state.context,
			};
		}
		case UPDATE_TON_CONTEXT: {
			const {name, value} = payload;

			const newValuesContext = reduce(
				state.context,
				(r, v, k) => {
					if (k === name) r[name] = value;
					else r[k] = v;
					return r;
				},
				{},
			);

			const helperFunctions = reduce(
				state.helperFunctions,
				(r, v, k) => {
					r[k] = v.bind({context: newValuesContext});
					return r;
				},
				{},
			);

			return {
				context: newValuesContext,
				functions: reduce(
					state.functions,
					(r, v, k) => {
						r[k] = v.bind({
							context: newValuesContext,
							helperFunctions,
						});
						return r;
					},
					{},
				),
				helperFunctions,
			};
		}
	}

	return initialState;
}
