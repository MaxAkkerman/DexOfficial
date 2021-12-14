import {call, put, select, takeEvery} from "redux-saga/effects";

import {
	PAIRS_FETCH_FAILED,
	PAIRS_FETCH_LOADING,
	PAIRS_FETCH_REQUESTED,
	PAIRS_FETCH_SUCCEEDED,
} from "@/store/actions/types";

function* fetchPairs() {
	yield put({type: PAIRS_FETCH_LOADING});

	try {
		const getAllPairsWithoutProvider = yield select(
			(state) => state.tonContext.functions.getAllPairsWithoutProvider,
		);
		const pairs = yield call(getAllPairsWithoutProvider);
		yield put({
			payload: pairs,
			type: PAIRS_FETCH_SUCCEEDED,
		});
	} catch (e) {
		yield put({
			payload: e.message,
			type: PAIRS_FETCH_FAILED,
		});
	}
}

export default function* fetchPairsSaga() {
	yield takeEvery(PAIRS_FETCH_REQUESTED, fetchPairs);
}
