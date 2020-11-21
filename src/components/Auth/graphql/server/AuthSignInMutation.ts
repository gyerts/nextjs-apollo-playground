import gql from 'graphql-tag';
import {Mutation, MutationFn, MutationState} from 'react-apollo';
import {GQLSignIn} from "src/graphql-types";

export const SIGN_IN_MUTATION = gql`
  mutation SignIn($input: SignIn!) {
    signIn(input: $input)
  }
`;

export class SignInMutation extends Mutation {
  static defaultProps = {
    mutation: SIGN_IN_MUTATION,
    awaitRefetchQueries: true,
    refetchQueries: ['MiniAccount', 'Cart', 'CustomerWithAddresses', 'Customer', 'IsAuthenticated']
  };
}

export type ISignInVariablesProps = {input: GQLSignIn};
export type ISignInResponseData = {signIn: boolean};
export type ISignInResponse = MutationState<ISignInResponseData>;
export type ISignInFn = MutationFn<ISignInResponseData, ISignInVariablesProps>;
