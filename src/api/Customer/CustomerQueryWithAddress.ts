import gql from 'graphql-tag';
import { Query } from 'src/uikitEjected/Query/Query';
import {GQLAddress, GQLCustomer} from "src/graphql-types";

export const GET_CUSTOMER_WITH_ADDRESSES = gql`
  query CustomerWithAddresses {
    customer {
      id
      firstname
      lastname
      email
      addresses {
        id
        company
        firstname
        lastname
        street
        postcode
        city
        countryId
        defaultBilling
        defaultShipping
        region
        regionId
        telephone
      }
    }
  }
`;

export class CustomerWithAddressesQuery extends Query {
  static defaultProps = {
    query: GET_CUSTOMER_WITH_ADDRESSES
  };
}

/**
 * =================================================================================
 *                                      TYPES
 * =================================================================================
 */
export type ICustomerWithAddress = {
  id: GQLCustomer['id']
  firstname: GQLCustomer['firstname']
  lastname: GQLCustomer['lastname']
  email: GQLCustomer['email']
  addresses: {
    id: GQLAddress['id']
    company: GQLAddress['company']
    firstname: GQLAddress['firstname']
    lastname: GQLAddress['lastname']
    street: GQLAddress['street']
    postcode: GQLAddress['postcode']
    city: GQLAddress['city']
    countryId: GQLAddress['countryId']
    defaultBilling: GQLAddress['defaultBilling']
    defaultShipping: GQLAddress['defaultShipping']
    region: GQLAddress['region']
    regionId: GQLAddress['regionId']
    telephone: GQLAddress['telephone']
  }
};
export type ICustomerWithAddressResponse = {
  customer: ICustomerWithAddress
};
