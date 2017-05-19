import { h } from 'preact';
import { PropTypes } from 'prop-types';
import Card from '../components/card';

const NotFound = ({ url }) => (
  <div className="page page__404">
    <Card>
      <h1>404 Page</h1>
      <p>Looks like you were given a bad link ;-)</p>
      <pre>{ url }</pre>
    </Card>
  </div>
);

NotFound.propTypes = {
  url: PropTypes.string
};

NotFound.defaultProps = {
  url: null
};

export default NotFound;
