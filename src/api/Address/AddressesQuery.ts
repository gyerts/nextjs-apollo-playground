import gql from 'graphql-tag';
import { Query } from 'src/uikitEjected/Query/Query';
import {GQLAddress} from "src/graphql-types";

export const GET_ADDRESS = gql`
  query Addresses {
    addresses {
      items {
        id
        firstname
        lastname
        street
        city
        postcode
        countryId
        telephone
        defaultBilling
        defaultShipping
        shippingAddress
        floor
        flat
      }
    }
  }
`;

export class AddressesQuery extends Query {
  static defaultProps = {
    query: GET_ADDRESS
  };
}

/**
 * =================================================================================
 *                                      TYPES
 * =================================================================================
 */
export type IAddress = {
  id: GQLAddress["id"]
  firstname: GQLAddress["firstname"]
  lastname: GQLAddress["lastname"]
  street: GQLAddress["street"]
  city: GQLAddress["city"]
  postcode: GQLAddress["postcode"]
  countryId: GQLAddress["countryId"]

  telephone?: GQLAddress["telephone"]
  shippingAddress?: GQLAddress["shippingAddress"]
  defaultBilling?: GQLAddress["defaultBilling"]
  defaultShipping?: GQLAddress["defaultShipping"]
  floor?: GQLAddress["floor"]
  flat?: GQLAddress["flat"]
};
export type IAddressResponse = {
  addresses: {
    items: IAddress[]
  }
};
