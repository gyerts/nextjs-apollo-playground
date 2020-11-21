import {gql} from '@apollo/client';

export const SET_LOCALE = gql`
  mutation SetLocale($locale: String!) {
    setLocale(locale: $locale) {
      activeLocale
    }
  }
`;

export class SetLocaleMutation  {
  static defaultProps = {
    mutation: SET_LOCALE,
    awaitRefetchQueries: true,
    refetchQueries: ['BackendConfig']
  };
}
