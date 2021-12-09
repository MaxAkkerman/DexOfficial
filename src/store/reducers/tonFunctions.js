import _ from "lodash";

import fetchTokens from "../../utils/fetchTokens";
import fetchPairs from "../../utils/fetchTokens";
import swap from "../../utils/swap";
import takeLimitOrder from "../../utils/takeLimitOrder";
import {FUNCTIONS_CONTEXT} from "../actions/types";

const initialState = {
	fetchPairs,
	fetchTokens,
	swap,
	takeLimitOrder,
};

const tonFunctions = (state = initialState, {payload, type}) => {
	switch (type) {
		case FUNCTIONS_CONTEXT:
			return _.reduce(state, (r, v, k) => {
				r[k] = _.bind(v, null, _, payload);
				return r;
			});
		default:
			return state;
	}
};

export default tonFunctions;
