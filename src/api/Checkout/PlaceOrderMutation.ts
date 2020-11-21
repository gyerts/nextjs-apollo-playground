import gql from "graphql-tag";
import {Mutation, MutationFn, MutationState} from "react-apollo";
import {GQLPlaceOrderResult, MutationToPlaceOrderArgs} from "src/graphql-types";


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

export class PlaceOrderMutation extends Mutation {
  static defaultProps = {
    mutation: PLACE_ORDER
  };
}

export type IPlaceOrderVariablesProps = MutationToPlaceOrderArgs;
export type IPlaceOrderResponseData = {placeOrder: GQLPlaceOrderResult};
export type IPlaceOrderResponse = MutationState<IPlaceOrderResponseData>;
export type IPlaceOrderFn = MutationFn<IPlaceOrderResponseData, IPlaceOrderVariablesProps>;
