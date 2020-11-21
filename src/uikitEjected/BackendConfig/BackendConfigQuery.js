import gql from 'graphql-tag';

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
