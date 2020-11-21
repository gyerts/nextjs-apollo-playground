import gql from 'graphql-tag';
import {Mutation, MutationFn, MutationState} from 'react-apollo';
import {GQLSignUp} from "src/graphql-types";

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($input: SignUp!) {
    signUp(input: $input)
  }
`;

export class SignUpMutation extends Mutation<ISignUpResponseData, ISignUpVariablesProps> {
  static defaultProps = {
    mutation: SIGN_UP_MUTATION,
    awaitRefetchQueries: true,
    refetchQueries: ['Customer', 'MiniAccount', 'Cart', 'IsAuthenticated']
  };
}

export type ISignUpVariablesProps = {input: GQLSignUp};
export type ISignUpResponseData = {signUp: boolean};
export type ISignUpResponse = MutationState<ISignUpResponseData>;
export type ISignUpFn = MutationFn<ISignUpResponseData, ISignUpVariablesProps>;
