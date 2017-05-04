import { h } from 'preact';
import { Provider } from 'preact-redux';
import { createStore } from 'redux';

import Routes from '../src/app/routes';
import reducers from '../src/app/rootReducer';

export default function (initData) {
  // Create a new Redux store instance
  const store = createStore(reducers, initData);
  // universal component
  return (<Provider store={store}>
      <Routes />
    </Provider>);
};