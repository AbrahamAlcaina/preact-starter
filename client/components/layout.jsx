import { h } from 'preact';
import { PropTypes } from 'prop-types';
import Header from './header';

const Layout = ({ children }) => (
  <div id="app">
    <Header />
    <main id="content">
      { children }
    </main>
  </div>
);

Layout.propTypes = {
  children: PropTypes.element
};

Layout.defaultProps = {
  children: null
};

export default Layout;
