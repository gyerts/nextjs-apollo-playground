import gql from 'graphql-tag';
import { Query } from '../Query/Query';

const GET_BLOG_POSTS = gql`
  query BlogPosts($pagination: PaginationInput) {
    blogPosts(pagination: $pagination) {
      items {
        title
        date
        slug
        excerpt
        image {
          url
          description
        }
      }
      pagination {
        currentPage
        nextPage
        prevPage
        perPage
        totalPages
      }
    }
  }
`;

export class BlogPostsQuery extends Query {
  static defaultProps = {
    query: GET_BLOG_POSTS
  };
}
