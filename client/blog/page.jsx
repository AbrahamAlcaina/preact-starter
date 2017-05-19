import { h } from 'preact';
import Card from '../components/card';
import CardLink from '../components/card-link';

const Page = () => (
  <div className="page page__blog">
    <Card>
      <h1>Blog</h1>
      <p>Please select an Article to read.</p>
    </Card>

    <nav>
      {
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i =>
          (<CardLink href={`/blog/article${i}`}>
            <strong>Article #{i}</strong>
            <em>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</em>
          </CardLink>)
        )
      }
    </nav>
  </div>
);

export default Page;
