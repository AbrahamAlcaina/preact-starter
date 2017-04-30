import { h } from 'preact';
import { Provider } from 'preact-redux';
import Routes from './routes';

const App = ({store}) => (<Provider store={store}>{Routes}</Provider>);

export default App;
