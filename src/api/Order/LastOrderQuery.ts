import gql from 'graphql-tag';
import { Query } from 'src/uikitEjected/Query/Query';
import {IOrder} from "./types";

export const GET_LAST_ORDER = gql`
  query LastOrder {
    lastOrder {
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
        company
        firstname
        lastname
        street
        floor
        flat
        city
        postcode
        countryId
        region
        regionId
        telephone
        fax
        defaultBilling
        defaultShipping
        shippingAddress
      }
      shippingAddress {
        id
        company
        firstname
        lastname
        street
        floor
        flat
        city
        postcode
        countryId
        region
        regionId
        telephone
        fax
        defaultBilling
        defaultShipping
        shippingAddress
      }
    }
  }
`;

export class LastOrderQuery extends Query {
  static defaultProps = {
    query: GET_LAST_ORDER
  };
}

/**
 * =================================================================================
 *                                      TYPES
 * =================================================================================
 */
export type ILastOrderResponse = {
  lastOrder: IOrder
};
