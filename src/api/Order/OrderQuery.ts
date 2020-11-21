import gql from 'graphql-tag';
import { Query } from 'src/uikitEjected/Query/Query';
import {IOrder} from "./types";

export const GET_ORDER = gql`
  query Order($id: String!) {
    order(id: $id) {
      entityId
      incrementId
      createdAt
      customerFirstname
      customerLastname
      status
      subtotal
      shippingAmount
      grandTotal
      orderCurrencyCode
      shippingDescription
      paymentMethodName
      items {
        itemId
        sku
        name
        rowTotalInclTax
        qty
        price
        thumbnailUrl
        link
      }
      billingAddress {
        id
        firstname
        lastname
        street
        floor
        flat
        city
        postcode
        countryId
        telephone
        defaultBilling
        defaultShipping
        shippingAddress
      }
      shippingAddress {
        id
        firstname
        lastname
        street
        floor
        flat
        city
        postcode
        countryId
        telephone
        defaultBilling
        defaultShipping
        shippingAddress
      }
    }
  }
`;

export class GetOrderQuery extends Query {
  static defaultProps = {
    query: GET_ORDER
  };
}

/**
 * =================================================================================
 *                                      TYPES
 * =================================================================================
 */
export type IOrderResponse = {
  order: IOrder
};
