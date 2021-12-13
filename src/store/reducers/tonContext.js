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

export default function tonFunctions(state = initialState, {payload, type}) {
	switch (type) {
		case INIT_TON_CONTEXT: {
			return {
				functions: reduce(
					state.functions,
					(r, v, k) => {
						r[k] = v.bind({
							context: state.values,
							helperFunctions: reduce(
								state.helperFunctions,
								(r, v, k) => {
									r[k] = v.bind(state.context);
									return r;
								},
								{},
							),
						});
						return r;
					},
					{},
				),
				helperFunctions: reduce(
					state.helperFunctions,
					(r, v, k) => {
						r[k] = v.bind(state.values);
						return r;
					},
					{},
				),
				values: state.values,
			};
		}
		case UPDATE_TON_CONTEXT: {
			const {name, value} = payload;

			const newValuesContext = reduce(
				state.values,
				(r, v, k) => {
					if (k === name) r[name] = value;
					else r[k] = v;
					return r;
				},
				{},
			);

			return {
				functions: reduce(
					state.functions,
					(r, v, k) => {
						r[k] = v.bind({
							helperFunctions: reduce(
								state.helperFunctions,
								(r, v, k) => {
									r[k] = v.bind(state.context);
									return r;
								},
								{},
							),
							values: newValuesContext,
						});
						return r;
					},
					{},
				),
				helperFunctions: reduce(
					state.helperFunctions,
					(r, v, k) => {
						r[k] = v.bind(newValuesContext);
						return r;
					},
					{},
				),
				values: newValuesContext,
			};
		}
	}

	return initialState;
}
