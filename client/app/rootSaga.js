import { all } from 'redux-saga/effects';
import { watchLoadHomeAsync } from '../home/saga';

export default function* root() {
    yield all ([
        watchLoadHomeAsync()
    ]);
}
