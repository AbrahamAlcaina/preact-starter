import { h } from 'preact';
import { Link } from 'preact-router';
import { PropTypes } from 'prop-types';
import Card from '../components/card';

const Article = ({ title }) => (
  <div className="page page__article">
    <Card>
      <h1>{ title }: <small>A killer story</small></h1>
      <Link href="/blog" className="back">Back to Blog</Link>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </Card>
  </div>
  );

Article.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Article;
