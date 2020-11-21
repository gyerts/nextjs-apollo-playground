import gql from 'graphql-tag';
import { Query } from '../Query/Query';

export const GET_CONFIG = gql`
  query ClientConfig($key: String!) {
    getConfig(key: $key) @client
  }
`;

export class ConfigQuery extends Query {
  static defaultProps = {
    query: GET_CONFIG
  };
}
