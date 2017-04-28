import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
// TODO LOAD REDUCES fake reducer
const fakeInitialState = {pwa:false};
const fakeReducer = handleActions({
    PWA: (state) => ({ pwa: true}),
    NOTPWA: (state) => ({pwa: false})
}, fakeInitialState);

export default combineReducers({
    fakeReducer
});