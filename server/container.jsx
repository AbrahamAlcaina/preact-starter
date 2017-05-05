import { h } from 'preact';
import { Provider } from 'preact-redux';
import { createStore } from 'redux';
import Shell from '../client/app/shell';
import reducers from '../client/app/rootReducer';

export default function (initData) {
  const store = createStore(reducers, initData);
  return (
    <Provider store={store}>
      <Shell />
    </Provider>);
};