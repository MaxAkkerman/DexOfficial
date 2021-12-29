import { all } from 'redux-saga/effects';

import fetchPairsSaga from '@/store/sagas/fetchPairs';
import fetchTokensSaga from '@/store/sagas/fetchTokens';

export default function* rootSaga() {
  yield all([fetchPairsSaga(), fetchTokensSaga()]);
}
