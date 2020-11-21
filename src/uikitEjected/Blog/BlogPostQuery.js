import gql from 'graphql-tag';
import { Query } from '../Query/Query';

const GET_BLOG_POST = gql`
  query BlogPost($path: String!) {
    blogPost(path: $path) {
      title
      date
      content
    }
  }
`;

export class BlogPostQuery extends Query {
  static defaultProps = {
    query: GET_BLOG_POST
  };
}
