import {
	RESET_SWAP_POPUP_VALUES,
	SET_SLIPPAGE,
	SET_SWAP_POPUP_VALUES,
} from "@/store/actions/types";

const initialState = {
	slippage: 2,
	values: null,
};

export default function swapReducer(state = initialState, {payload, type}) {
	switch (type) {
		case SET_SWAP_POPUP_VALUES:
			return {
				...state,
				values: payload,
			};
		case RESET_SWAP_POPUP_VALUES:
			return {
				...state,
				values: null,
			};
		case SET_SLIPPAGE:
			return {
				...state,
				slippage: payload,
			};
		default:
			return state;
	}
}
