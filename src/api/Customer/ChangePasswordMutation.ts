import gql from 'graphql-tag';
import {Mutation, MutationFn, MutationState} from 'react-apollo';
import {MutationToChangeCustomerPasswordArgs} from "src/graphql-types";

export const CHANGE_PASSWORD = gql`
  mutation changePassword($input: CustomerPassword!) {
    changeCustomerPassword(input: $input)
  }
`;
export class ChangePasswordMutation extends Mutation {
  static defaultProps = {
    mutation: CHANGE_PASSWORD
  };
}

export type IChangeCustomerPasswordVariablesProps = MutationToChangeCustomerPasswordArgs;
export type IChangeCustomerPasswordResponseData = {changeCustomerPassword: boolean};
export type IChangeCustomerPasswordResponse = MutationState<IChangeCustomerPasswordResponseData>;
export type IChangeCustomerPasswordFn = MutationFn<IChangeCustomerPasswordResponseData, IChangeCustomerPasswordVariablesProps>;
