import gql from 'graphql-tag';
import {Mutation, MutationFn, MutationState} from 'react-apollo';
import {GQLAddress, MutationToAddAddressArgs} from "src/graphql-types";

export const ADD_ADDRESS = gql`
  mutation AddAddress($input: AddAddressInput!) {
    addAddress(input: $input) {
      id
    }
  }
`;

export class AddAddressMutation extends Mutation {
  static defaultProps = {
    mutation: ADD_ADDRESS,
    awaitRefetchQueries: true,
    refetchQueries: ['Addresses']
  };
}

export type IAddAddressVariablesProps = MutationToAddAddressArgs;
export type IAddAddressResponseData = {addAddress: GQLAddress};
export type IAddAddressResponse = MutationState<IAddAddressResponseData>;
export type IAddAddressFn = MutationFn<IAddAddressResponseData, IAddAddressVariablesProps>;
