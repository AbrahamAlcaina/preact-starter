import { createAction } from 'redux-actions';

export const LOAD_HOME = 'LOAD_HOME';
export const HOME_LOADED = 'HOME_LOADED';
export const HOME_FAILED = 'HOME_FAILED';

export const loadHomeAsync = createAction(LOAD_HOME);
