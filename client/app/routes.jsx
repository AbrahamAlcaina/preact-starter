import { h } from 'preact';
import { Router } from 'preact-router';

import Home from '../home/page';
import Layout from '../components/layout';
import Article from '../blog/article';
import Error404 from '../errors/404';
import Credit from '../credit/page';
import Blog from '../blog/page';

// track pages on route change it uses windows & googleAnalitics
// good idea move it to a redux middleware
// eslint-disable-next-line
const onChange = obj => window.ga && ga('send', 'pageview', obj.url);

export default (
  <Layout>
    <Router onChange={onChange}>
      <Home path="/" />
      <Blog path="/blog" />
      <Article path="/blog/:title" />
      <Credit path="/credit" />
      <Error404 default />
    </Router>
  </Layout>
);
