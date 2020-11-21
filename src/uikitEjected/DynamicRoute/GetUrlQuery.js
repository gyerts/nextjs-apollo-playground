import gql from 'graphql-tag';

export const GET_URL = gql`
  query Url($path: String!) {
    url(path: $path) {
      type
      redirect
      id
      path
    }
  }
`;

export class UrlQuery {
  static defaultProps = {
    query: GET_URL
  };
}
