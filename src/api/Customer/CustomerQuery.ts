import gql from 'graphql-tag';
import { Query } from 'src/uikitEjected/Query/Query';
import {GQLCustomer} from "src/graphql-types";

export const GET_CUSTOMER = gql`
  query Customer {
    customer {
      id
      firstname
      lastname
      email
      websiteId
    }
  }
`;

export class CustomerQuery extends Query {
  static defaultProps = {
    query: GET_CUSTOMER
  };
}

/**
 * =================================================================================
 *                                      TYPES
 * =================================================================================
 */
export type ICustomer = {
  id: GQLCustomer['id']
  firstname: GQLCustomer['firstname']
  lastname: GQLCustomer['lastname']
  email: GQLCustomer['email']
  websiteId: GQLCustomer['websiteId']
};
export type ICustomerResponse = {
  customer: ICustomer
};
