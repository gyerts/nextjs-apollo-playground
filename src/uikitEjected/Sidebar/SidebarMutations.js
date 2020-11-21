import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const CLOSE_SIDEBAR_MUTATION = gql`
  mutation CloseSidebarMutation {
    closeSidebar @client
  }
`;

const OPEN_SIDEBAR_MUTATION = gql`
  mutation OpenSidebarMutation($contentType: String!, $side: String) {
    openSidebar(contentType: $contentType, side: $side) @client
  }
`;

export class CloseSidebarMutation extends Mutation {
  static defaultProps = {
    mutation: CLOSE_SIDEBAR_MUTATION
  };
}

export class OpenSidebarMutation extends Mutation {
  static defaultProps = {
    mutation: OPEN_SIDEBAR_MUTATION
  };
}
