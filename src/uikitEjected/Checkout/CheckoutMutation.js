import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const ESTIMATE_SHIPPING_METHODS = gql`
  mutation EstimateShippingMethods($input: EstimateShippingInput!) {
    estimateShippingMethods(input: $input) {
      carrierTitle
      amount
      carrierCode
      methodCode
      methodTitle
      priceExclTax
      priceInclTax
      currency
    }
  }
`;

export class EstimatesShippingMethodsMutation extends Mutation {
  static defaultProps = {
    mutation: ESTIMATE_SHIPPING_METHODS
  };
}

export const SET_SHIPPING = gql`
  mutation SetShipping($input: ShippingInput) {
    setShipping(input: $input) {
      paymentMethods {
        code
        title
        config
      }
    }
  }
`;

export class SetShippingsMutation extends Mutation {
  static defaultProps = {
    mutation: SET_SHIPPING
  };
}

export const PLACE_ORDER = gql`
  mutation PlaceOrder($input: PlaceOrderInput!) {
    placeOrder(input: $input) {
      __typename
      ... on PlaceOrderSuccessfulResult {
        orderId
        orderRealId
      }
      ... on PlaceOrder3dSecureResult {
        url
        method
        fields {
          name
          value
        }
      }
    }
  }
`;

export class PlaceOrdersMutation extends Mutation {
  static defaultProps = {
    mutation: PLACE_ORDER
  };
}
