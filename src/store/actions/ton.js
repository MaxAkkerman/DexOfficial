import {
	FETCH_PAIRS,
	FUNCTIONS_CONTEXT,
	FUNCTIONS_CONTEXT_INIT,
	PAIRS_ERROR,
	PAIRS_LOADED,
	PAIRS_LOADING,
	TOKENS_ERROR,
	TOKENS_LOADED,
	TOKENS_LOADING,
} from "./types";

export function fetchPairs() {
	return {type: FETCH_PAIRS};
}

export function setPairs(pairs) {
	return {
		payload: pairs,
		type: PAIRS_LOADED,
	};
}

export function setPairsLoading() {
	return {type: PAIRS_LOADING};
}

export function setPairsError(error) {
	return {
		payload: error,
		type: PAIRS_ERROR,
	};
}

export function fetchTokens() {
	return {type: FETCH_PAIRS};
}

export function setTokens(tokens) {
	return {
		payload: tokens,
		type: TOKENS_LOADED,
	};
}

export function setTokensLoading() {
	return {type: TOKENS_LOADING};
}

export function setTokensError(error) {
	return {
		payload: error,
		type: TOKENS_ERROR,
	};
}

export function initFunctionsContext() {
	return {
		type: FUNCTIONS_CONTEXT_INIT,
	};
}

export function setFunctionsContext(context) {
	return {
		payload: context,
		type: FUNCTIONS_CONTEXT,
	};
}
