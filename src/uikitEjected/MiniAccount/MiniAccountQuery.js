import gql from 'graphql-tag';
import { Query } from '../Query/Query';

const GET_MINI_ACCOUNT = gql`
  query MiniAccount {
    customer {
      id
      firstname
      lastname
      email
    }
  }
`;

export class MiniAccountQuery extends Query {
  static defaultProps = {
    query: GET_MINI_ACCOUNT
  };
}
