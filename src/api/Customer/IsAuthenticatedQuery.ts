import gql from 'graphql-tag';
import { Query } from 'src/uikitEjected/Query/Query';
import {GQLCustomer} from "src/graphql-types";

export const GET_IS_AUTHENTICATED = gql`
  query IsAuthenticated {
    customer {
      id
    }
  }
`;

export class IsAuthenticatedQuery extends Query {
  static defaultProps = {
    query: GET_IS_AUTHENTICATED,
  };
  // static propTypes = {
  //   ...Query.propTypes
  // };
}

/**
 * =================================================================================
 *                                      TYPES
 * =================================================================================
 */
export type IIsAuthenticated = {
  id: GQLCustomer['id']
};
export type IIsAuthenticatedResponse = {
  customer: IIsAuthenticated
};
