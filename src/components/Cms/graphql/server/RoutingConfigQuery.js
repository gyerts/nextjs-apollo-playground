import gql from 'graphql-tag';
import { Query } from '../../../../uikitEjected/Query/Query';

const GET_CONFIG = gql`
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

export class RoutingConfigQuery extends Query {
  static defaultProps = {
    query: GET_CONFIG
  };
}
