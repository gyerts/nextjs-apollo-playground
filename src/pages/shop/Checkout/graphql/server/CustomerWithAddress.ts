import gql from 'graphql-tag';
import {Query} from "src/uikitEjected/Query";

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
