import { h } from 'preact';
import { PropTypes } from 'prop-types';

const Card = ({ children }) => <div className="card">{ children }</div>;

Card.propTypes = {
  children: PropTypes.element
};

Card.defaultProps = {
  children: null
};

export default Card;
