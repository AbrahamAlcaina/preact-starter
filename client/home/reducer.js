import { handleActions } from 'redux-actions';
import { HOME_LOADED } from './actions';

const initialState = { loaded: false };

const reducer = handleActions({
  [HOME_LOADED]: () => ({ loaded: true }),
}, initialState);

export default reducer;
