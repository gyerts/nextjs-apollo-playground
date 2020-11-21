import gql from 'graphql-tag';
import { Query } from 'src/uikitEjected/Query';

export const GET_MINI_CART_STATE = gql`
  query MiniCartState {
    miniCartState @client {
      eventType
      messageId
      isMessageError
      messagesCounter
      isOpen
      isSecondaryHeaderActive
    }
  }
`;

export class MiniCartClientQuery extends Query {
  static defaultProps = {
    query: GET_MINI_CART_STATE
  };
}
