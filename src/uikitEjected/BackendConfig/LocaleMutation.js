import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const SET_LOCALE = gql`
  mutation SetLocale($locale: String!) {
    setLocale(locale: $locale) {
      activeLocale
    }
  }
`;

export class SetLocaleMutation extends Mutation {
  static defaultProps = {
    mutation: SET_LOCALE,
    awaitRefetchQueries: true,
    refetchQueries: ['BackendConfig']
  };
}
