import {
	PAIRS_ERROR,
	PAIRS_LOADED,
	PAIRS_LOADING,
	TOKENS_ERROR,
	TOKENS_LOADED,
	TOKENS_LOADING,
} from "../actions/types";

const pairsInitialState = {
	pairs: [],
	pairsError: null,
	pairsFetched: false,
	pairsLoading: false,
};

const tokensInitialState = {
	tokens: [],
	tokensError: null,
	tokensFetched: false,
	tokensLoading: false,
};

const initialState = {
	...pairsInitialState,
	...tokensInitialState,
};

const tonData = (state = initialState, {payload, type}) => {
	switch (type) {
		case PAIRS_LOADED:
			return {
				...state,
				...pairsInitialState,
				pairs: payload,
				pairsFetched: true,
			};
		case PAIRS_LOADING:
			return {
				...state,
				...pairsInitialState,
				pairsLoading: true,
			};
		case PAIRS_ERROR:
			return {
				...state,
				...pairsInitialState,
				pairsError: payload,
			};
		case TOKENS_LOADED:
			return {
				...state,
				...tokensInitialState,
				tokens: payload,
				tokensFetched: true,
			};
		case TOKENS_LOADING:
			return {
				...state,
				...tokensInitialState,
				tokensLoading: true,
			};
		case TOKENS_ERROR:
			return {
				...state,
				...tokensInitialState,
				tokensError: payload,
			};
		default:
			return state;
	}
};

export default tonData;
