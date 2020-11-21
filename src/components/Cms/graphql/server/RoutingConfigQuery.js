import {gql} from '@apollo/client';

export const GET_CONFIG = gql`
  query {
      routingConfig {
        pathRegex
        CMSPageId
        layout
        CMSCode
        CMSPageType
    }
  }
`;

// export class RoutingConfigQuery extends Query {
//   static defaultProps = {
//     query: GET_CONFIG
//   };
// }
