import {call, put, select, takeEvery} from "redux-saga/effects";

import {
	TOKENS_FETCH_FAILED,
	TOKENS_FETCH_LOADING,
	TOKENS_FETCH_REQUESTED,
	TOKENS_FETCH_SUCCEEDED,
} from "@/store/actions/types";

function* fetchTokens() {
	yield put({
		type: TOKENS_FETCH_LOADING,
	});

	try {
		const getMyTokens = yield select(
			(state) => state.tonContext.functions.getMyTokens,
		);
		const tokens = yield call(getMyTokens);
		yield put({
			payload: tokens,
			type: TOKENS_FETCH_SUCCEEDED,
		});
	} catch (e) {
		yield put({
			payload: e.message,
			type: TOKENS_FETCH_FAILED,
		});
	}
}

export default function* mySaga() {
	yield takeEvery(TOKENS_FETCH_REQUESTED, fetchTokens);
}
