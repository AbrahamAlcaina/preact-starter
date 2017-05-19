import PropTypes from 'prop-types';
import { h } from 'preact';
import { Provider } from 'preact-redux';
import Routes from './routes';

const App = ({ store }) => (<Provider store={store}>{Routes}</Provider>);

App.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line
};

export default App;
