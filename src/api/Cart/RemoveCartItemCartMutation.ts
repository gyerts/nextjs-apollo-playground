import gql from "graphql-tag";
import {Mutation, MutationFn, MutationState, MutationUpdaterFn} from 'react-apollo';
import {GQLCart, GQLRemoveCartItemInput} from "src/graphql-types";
import {GET_MINI_CART} from "./MiniCartQuery";


export const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($input: RemoveCartItemInput!) {
    removeCartItem(input: $input) {
      itemId
    }
  }
`;

export class RemoveCartItemMutation extends Mutation {
  static defaultProps = {
    mutation: REMOVE_CART_ITEM,
    refetchQueries: ['Cart', 'MiniCart'],
    awaitRefetchQueries: true,
    update: ((store, payload) => {
      const { data: { removeCartItem: { itemId } } } = payload;
      const data: {cart: GQLCart} = store.readQuery({
        query: GET_MINI_CART
      });

      data.cart.items = data.cart.items.filter(item => item.itemId !== itemId);
      data.cart.itemsQty = data.cart.items.length;

      store.writeQuery({
        query: GET_MINI_CART,
        data
      });
    }) as MutationUpdaterFn
  };
}
export type IRemoveCartItemVariablesProps = {input: GQLRemoveCartItemInput};
export type IRemoveCartItemResponseData = {removeCartItem: boolean};
export type IRemoveCartItemResponse = MutationState<IRemoveCartItemResponseData>;
export type IRemoveCartItemFn = MutationFn<IRemoveCartItemResponse, IRemoveCartItemVariablesProps>;
