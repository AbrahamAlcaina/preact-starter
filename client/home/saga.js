import { delay } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';
import { LOAD_HOME, HOME_LOADED, HOME_FAILED} from './actions';

// Our worker Saga: will perform the async increment task
export function* loadHome() {
  yield delay(1000); // simulate async
  yield put({ type: HOME_LOADED });
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchLoadHomeAsync() {
  yield takeEvery('LOAD_HOME', loadHome);
}
