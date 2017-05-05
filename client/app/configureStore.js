import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const defaultInitialState = {};
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

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
  // start sagas;
  sagaMiddleware.run(rootSaga);
  return store;
};
