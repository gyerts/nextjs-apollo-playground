import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($input: SignUp!) {
    signUp(input: $input)
  }
`;

export class SignUpMutation extends Mutation {
  static defaultProps = {
    mutation: SIGN_UP_MUTATION,
    awaitRefetchQueries: true,
    refetchQueries: ['Customer', 'MiniAccount', 'Cart']
  };
}
