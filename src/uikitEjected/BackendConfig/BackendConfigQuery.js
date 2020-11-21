import gql from 'graphql-tag';
import { Query } from '../Query';

export const GET_BACKEND_CONFIG = gql`
  query BackendConfig {
    backendConfig {
      locales
      activeLocale
      shop {
        activeCurrency
      }
    }
  }
`;
export class BackendConfigQuery extends Query {
  static defaultProps = {
    query: GET_BACKEND_CONFIG
  };
}
