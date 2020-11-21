import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';


export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($input: UpdateCartItemInput!) {
    updateCartItem(input: $input) {
      itemId
    }
  }
`;

export class UpdateCartItemMutation extends Mutation {
  static defaultProps = {
    mutation: UPDATE_CART_ITEM,
    awaitRefetchQueries: true,
    refetchQueries: ['MiniCart', 'Cart']
  };
}
