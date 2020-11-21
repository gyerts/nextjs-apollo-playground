import gql from 'graphql-tag';
import {Query} from "src/uikitEjected/Query";

export const GET_PRODUCT = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      sku
      name
      type
      description
      instructions
      ingridients
      attributes {
        name
        value
      }
      price {
        regular
        special
        minTier
      }
      previousFormattedPrice
      currency
      stock {
        isInStock
        qty
      }
      gallery{
        type
        full
        sku
        index
        thumbnail
        embedUrl
      }
    configurableOptions {
      id
      label
      values {
        valueIndex
        label
        inStock {
          isInStock
          qty
        }
        price {
          regular
          special
          minTier
        }
        previousFormattedPrice
      }
    }
    }
  }
`;

export class ProductQuery extends Query {
  static defaultProps = {
    query: GET_PRODUCT,
    fetchPolicy: 'cache-and-network'
  };
}
