import gql from 'graphql-tag';
import { Query } from '../../../uikitEjected/Query/Query';

const GET_CONFIG = gql`
  query {
      routingConfig {
        pathRegex
        type
        CMSPageId
    }
  }
`;

export class RoutingConfigQuery extends Query {
  static defaultProps = {
    query: GET_CONFIG
  };
}
