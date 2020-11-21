import gql from 'graphql-tag';
import { Query } from '../Query/Query';

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

export class UrlQuery extends Query {
  static defaultProps = {
    query: GET_URL
  };
  static propTypes = {
    ...Query.propTypes
  };
}
