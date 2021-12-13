import {
	INIT_TON_CONTEXT,
	PAIRS_FETCH_REQUESTED,
	TOKENS_FETCH_REQUESTED,
	UPDATE_TON_CONTEXT,
} from "@/store/actions/types";

export function requestTokensFetch() {
	return {type: TOKENS_FETCH_REQUESTED};
}

export function requestPairsFetch() {
	return {type: PAIRS_FETCH_REQUESTED};
}

export function initTonContext() {
	return {type: INIT_TON_CONTEXT};
}

export function updateTonContext(name, newValue) {
	return {
		payload: {name, value: newValue},
		type: UPDATE_TON_CONTEXT,
	};
}
