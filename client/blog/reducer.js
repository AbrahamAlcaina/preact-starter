import { handleActions } from 'redux-actions';

const initialState = { loaded: false };

const reducer = handleActions({
}, initialState);

export default reducer;
