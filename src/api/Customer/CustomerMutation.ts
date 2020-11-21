import gql from 'graphql-tag';
import {Mutation, MutationFn, MutationState} from 'react-apollo';
import {GQLCustomer, MutationToEditCustomerArgs} from "src/graphql-types";

export const EDIT_CUSTOMER = gql`
  mutation EditCustomer($input: CustomerInput!) {
    editCustomer(input: $input) {
      id,
      email,
      newsletterSubscriber
    }
  }
`;
export class EditCustomerMutation extends Mutation {
  static defaultProps = {
    mutation: EDIT_CUSTOMER,
    awaitRefetchQueries: true,
    refetchQueries: ['Customer', 'CustomerWithAddresses']
  };
}

export type IEditCustomerVariablesProps = MutationToEditCustomerArgs;
export type IEditCustomerResponseData = {editCustomer: GQLCustomer};
export type IEditCustomerResponse = MutationState<IEditCustomerResponseData>;
export type IEditCustomerFn = MutationFn<IEditCustomerResponseData, IEditCustomerVariablesProps>;
