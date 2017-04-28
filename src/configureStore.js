import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';

const defaultInitialState = {};
const middlewares = [];
let createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
  if (process.env.NODE_ENV !== 'production') {
    // dev add devTools only in dev
    const composeWithDevTools = require('remote-redux-devtools').composeWithDevTools; // eslint-disable-line 
    const composeEnhancers = composeWithDevTools({ realtime: true});
    createStoreWithMiddleware =
      composeEnhancers(applyMiddleware(...middlewares))(createStore);
  }
  const store = createStoreWithMiddleware(rootReducer, initialState || defaultInitialState);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducer
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default; // eslint-disable-line
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}