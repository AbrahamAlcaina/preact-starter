import { h } from 'preact';
import { Link } from 'preact-router';
import { connect } from 'preact-redux';
import { PropTypes } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Card from '../components/card';
import * as homeActions from './actions';

const Home = function ({ loaded, loadHomeAsync }) {
  return (
    <div className="page page__home">
      <Card>
        <h1>
        </h1>
        <p>This is the home page.</p>

        <p>You should check out:</p>
        <nav>
          <Link href="/foo">Foo</Link>
          <Link href="/foo/bar">Foo/Bar</Link>
        </nav>
      </Card>
      <Card>
        <h2>loaded</h2>
        <p>{loaded.toString()}</p>
        <button onClick={loadHomeAsync}>Load</button>
      </Card>
      <Card>
        <h2>Features:</h2>
        <ul>
          <li>Offline Caching (via `serviceWorker`)</li>
          <li>SASS & Autoprefixer</li>
          <li>Asset Versioning (aka cache-busting)</li>
          <li>ES2015 (ES6) and ES2016 (ES7) support</li>
          <li>Webpack Bundle Analysis (via `webpack-dashboard`)</li>
          <li>Hot Module Replacement (HMR) for all files</li>
          <li>Preact Developer Tools</li>
        </ul>
      </Card>

      <Card>
        <h2>Dev Dashboard</h2>

        <img src="/img/dev-dash.jpg" alt="webpack-dashboard" />

        <p>The dashboard is meant to be interactive (scrollable).
          If you are having issues, please see the authors note:</p>
      </Card>
    </div>
  );
};

Home.propTypes = {
  loaded: PropTypes.bool,
  loadHomeAsync: PropTypes.func.isRequired
};

Home.defaultProps = {
  loaded: false
};

const EnhancedHome = connect(state => state.home, homeActions)(Home);
export default EnhancedHome;
