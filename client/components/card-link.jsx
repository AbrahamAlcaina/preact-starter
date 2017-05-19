import { h } from 'preact';
import { Link } from 'preact-router';
import { PropTypes } from 'prop-types';

const CardLink = ({ href, children }) => (
  <Link href={href} className="card">{children}</Link>
);

CardLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.element
};

CardLink.defaultProps = {
  children: null
};

export default CardLink;
