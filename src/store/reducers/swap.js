import {RESET_SWAP_VALUES, SET_SWAP_VALUES} from "../actions/types";

const initialState = {
	values: null,
};

const swapReducer = (state = initialState, {payload, type}) => {
	switch (type) {
		case SET_SWAP_VALUES:
			return {
				...initialState,
				values: payload,
			};
		case RESET_SWAP_VALUES:
			return {
				...initialState,
				values: null,
			};
		default:
			return state;
	}
};

export default swapReducer;
