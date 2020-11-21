import gql from 'graphql-tag';
import {GQLCart} from "src/graphql-types";
import {Query} from "src/uikitEjected/Query";


export const GET_MINI_CART = gql`
  query MiniCart {
    cart {
      id
      itemsQty
      quoteCurrency
      couponCode
      items {
        itemId
        sku
        qty
        name
        price
        thumbnailUrl

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
    }
  }
`;

export class MiniCartQuery extends Query {
  static defaultProps = {
    query: GET_MINI_CART
  };
}


/**
 * =================================================================================
 *                                      TYPES
 * =================================================================================
 */
export type IMiniCart = {
  itemsQty: GQLCart['itemsQty']
  quoteCurrency: GQLCart['quoteCurrency']
  couponCode: GQLCart['couponCode']
  items: GQLCart['items']
  totals : GQLCart['totals']
};
export type IMiniCartResponse = {
  cart: IMiniCart
};
