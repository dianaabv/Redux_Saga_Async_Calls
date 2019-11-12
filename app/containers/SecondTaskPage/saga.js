import { takeLatest, call, put, all } from 'redux-saga/effects';
import request from 'utils/request';
import { FETCH_DATA } from './constants';
import { setData, setError } from './actions';

export function* tryToGetData() {
  const startNo = 1;
  const takedNo = 100;
  const url = `https://5zydb.sse.codesandbox.io/api/items?skip=${startNo}&take=${takedNo}`;
  try {
    const response = yield call(request, url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    if (response.status > 300 || response.statusCode > 300) {
      yield put(setError(response));
    } else {
      yield put(setData(response));
    }
  } catch (err) {
    yield put(setError(true));
  }
}
export function* tryToGetData2() {
  const startNo = 101;
  const takedNo = 200;
  const url = `https://5zydb.sse.codesandbox.io/api/items?skip=${startNo}&take=${takedNo}`;
  try {
    const response = yield call(request, url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    if (response.status > 300 || response.statusCode > 300) {
      yield put(setError(response));
    } else {
      yield put(setData(response));
    }
  } catch (err) {
    yield put(setError(true));
  }
}
function* actionWatcher() {
  yield takeLatest(FETCH_DATA, tryToGetData);
  // yield takeLatest(FETCH_DATA, tryToGetData2);
}
// Individual exports for testing
export default function* secondTaskPageSaga() {
  // yield takeLatest(FETCH_DATA, tryToGetData);
  yield all([actionWatcher()]);
}
