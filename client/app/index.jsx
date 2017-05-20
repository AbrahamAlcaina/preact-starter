import PropTypes from 'prop-types';
import { h } from 'preact';
import { Provider } from 'preact-redux';
import { IntlProvider, addLocaleData } from 'preact-intl';
import es from 'react-intl/locale-data/es';
import en from 'react-intl/locale-data/en';
import Routes from './routes';

addLocaleData([...es, ...en]);

const App = ({ store, locale, messages }) => (
  <Provider store={store}>
    <IntlProvider locale={locale} messages={messages}>
      {Routes}
    </IntlProvider>
  </Provider>);

App.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line
  locale: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default App;
