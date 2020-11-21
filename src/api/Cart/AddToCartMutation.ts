import gql from 'graphql-tag';
import {Mutation, MutationFn, MutationState} from 'react-apollo';
import {GQLCartItemPayload, MutationToAddToCartArgs} from "src/graphql-types";
import {MutationUpdaterFn} from "apollo-client";
import {gaAddToCart} from "src/components";


export const ADD_TO_CART = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      itemId
      sku
      qty
      name
      price
      productType
    }
  }
`;

export class AddToCartMutation extends Mutation {
  static defaultProps = {
    mutation: ADD_TO_CART,
    awaitRefetchQueries: true,
    refetchQueries: ['MiniCart', 'Cart'],
    update: ((store, {data: {addToCart: addedItem}}) => {
      gaAddToCart(addedItem);
    }) as MutationUpdaterFn
  };
}

export type IAddToCartVariablesProps = MutationToAddToCartArgs;
export type IAddToCartResponseData = {addToCart: GQLCartItemPayload};
export type IAddToCartResponse = MutationState<IAddToCartResponseData>;
export type IAddToCartFn = MutationFn<IAddToCartResponseData, IAddToCartVariablesProps>;
