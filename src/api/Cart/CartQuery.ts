import gql from 'graphql-tag';
import {
  GQLAddress,
  GQLCart,
  GQLCartItem,
  GQLCartItemOption,
  GQLCartTotal,
  GQLPaymentMethod,
  GQLShippingMethod
} from "src/graphql-types";
import {Query} from "src/uikitEjected/Query";


export const GET_CART = gql`
  query Cart {
    cart {
      id
      itemsQty
      quoteCurrency
      couponCode
      items {
        itemId
        availableQty
        sku
        qty
        name
        price
        thumbnailUrl
        rowTotal

        itemOptions {
          label
          value
        }
      }
      totals {
        title
        value
        code
      }
      shippingMethod {
        amount
        carrierCode
        carrierTitle
        currency
        methodCode
        methodDescription
        methodTitle
        priceExclTax
        priceInclTax
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
      paymentMethods {
        code
        title
        config
      }
      avaliableShippingMethods {
        methodCode
        methodTitle
        methodDescription
        amount
        currency
      }
    }
  }
`;

export class CartQuery extends Query {
  static defaultProps = {
    query: GET_CART
  };
}


/**
 * =================================================================================
 *                                      TYPES
 * =================================================================================
 */
export type ICart = {
  id?: GQLCart["id"]
  itemsQty?: GQLCart["itemsQty"]
  quoteCurrency?: GQLCart["quoteCurrency"]
  couponCode?: GQLCart["couponCode"]
  items?: {
    itemId: GQLCartItem["itemId"]
    sku: GQLCartItem["sku"]
    qty: GQLCartItem["qty"]
    name: GQLCartItem["name"]
    price: GQLCartItem["price"]
    thumbnailUrl: GQLCartItem["thumbnailUrl"]
  }
  itemOptions?: {
    label: GQLCartItemOption["label"]
    value: GQLCartItemOption["value"]
  }
  totals?: {
    title: GQLCartTotal["title"]
    value: GQLCartTotal["value"]
    code: GQLCartTotal["code"]
  }
  billingAddress?: {
    id: GQLAddress["id"]
    company: GQLAddress["company"]
    firstname: GQLAddress["firstname"]
    lastname: GQLAddress["lastname"]
    street: GQLAddress["street"]
    floor: GQLAddress["floor"]
    flat: GQLAddress["flat"]
    city: GQLAddress["city"]
    postcode: GQLAddress["postcode"]
    countryId: GQLAddress["countryId"]
    region: GQLAddress["region"]
    regionId: GQLAddress["regionId"]
    telephone: GQLAddress["telephone"]
    fax: GQLAddress["fax"]
    defaultBilling: GQLAddress["defaultBilling"]
    defaultShipping: GQLAddress["defaultShipping"]
    shippingAddress: GQLAddress["shippingAddress"]
  }
  shippingAddress?: {
    id: GQLAddress["id"]
    company: GQLAddress["company"]
    firstname: GQLAddress["firstname"]
    lastname: GQLAddress["lastname"]
    street: GQLAddress["street"]
    floor: GQLAddress["floor"]
    flat: GQLAddress["flat"]
    city: GQLAddress["city"]
    postcode: GQLAddress["postcode"]
    countryId: GQLAddress["countryId"]
    region: GQLAddress["region"]
    regionId: GQLAddress["regionId"]
    telephone: GQLAddress["telephone"]
    fax: GQLAddress["fax"]
    defaultBilling: GQLAddress["defaultBilling"]
    defaultShipping: GQLAddress["defaultShipping"]
    shippingAddress: GQLAddress["shippingAddress"]
  }
  paymentMethods?: {
    code: GQLPaymentMethod["code"]
    title: GQLPaymentMethod["title"]
    config: GQLPaymentMethod["config"]
  }
  avaliableShippingMethods?: {
    methodCode: GQLShippingMethod["methodCode"]
    methodTitle: GQLShippingMethod["methodTitle"]
    methodDescription: GQLShippingMethod["methodDescription"]
    amount: GQLShippingMethod["amount"]
    currency: GQLShippingMethod["currency"]
  }
  shippingMethod: {
    amount: GQLShippingMethod["amount"]
    carrierCode: GQLShippingMethod["carrierCode"]
    carrierTitle: GQLShippingMethod["carrierTitle"]
    currency: GQLShippingMethod["currency"]
    methodCode: GQLShippingMethod["methodCode"]
    methodDescription: GQLShippingMethod["methodDescription"]
    methodTitle: GQLShippingMethod["methodTitle"]
    priceExclTax: GQLShippingMethod["priceExclTax"]
    priceInclTax: GQLShippingMethod["priceInclTax"]
  }
};
export type ICartResponse = {
  cart: ICart
};
