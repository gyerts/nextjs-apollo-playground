import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const CLOSE_MINI_CART_MUTATION = gql`
  mutation CloseMiniCartMutation {
    closeMiniCart @client
  }
`;

const OPEN_MINI_CART_MUTATION = gql`
  mutation OpenMiniCartMutation($eventType: String!, $messageId: String) {
    openMiniCart(eventType: $eventType, messageId: $messageId) @client
  }
`;

const TOGGLE_MINI_CART_MUTATION = gql`
  mutation ToggleMiniCartMutation($eventType: String!) {
    toggleMiniCart(eventType: $eventType) @client
  }
`;

const SET_MESSAGE_MINI_CART_MUTATION = gql`
  mutation SetMessageMiniCartMutation($messageId: String, $error: Boolean) {
    setMessageMiniCart(messageId: $messageId, error: $error) @client
  }
`;

const SET_SECONDARY_HEADER_ACTIVE_MUTATION = gql`
  mutation SetSecondaryHeaderActiveMutation($active: Boolean) {
    setSecondaryHeaderActive(active: $active) @client
  }
`;

export class CloseMiniCartMutation extends Mutation {
  static defaultProps = {
    mutation: CLOSE_MINI_CART_MUTATION
  };
}

export class OpenMiniCartMutation extends Mutation {
  static defaultProps = {
    mutation: OPEN_MINI_CART_MUTATION
  };
}

export class ToggleMiniCartMutation extends Mutation {
  static defaultProps = {
    mutation: TOGGLE_MINI_CART_MUTATION
  };
}

export class SetMessageMiniCartMutation extends Mutation {
  static defaultProps = {
    mutation: SET_MESSAGE_MINI_CART_MUTATION
  };
}

export class SetSecondaryHeaderActiveMutation extends Mutation {
  static defaultProps = {
    mutation: SET_SECONDARY_HEADER_ACTIVE_MUTATION
  };
}
