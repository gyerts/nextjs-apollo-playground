import gql from 'graphql-tag';
import {Mutation, MutationFn, MutationState} from 'react-apollo';
import {GQLAddress, MutationToEditAddressArgs} from "src/graphql-types";

export const EDIT_ADDRESS = gql`
  mutation EditAddress($input: EditAddressInput!) {
    editAddress(input: $input) {
      id
    }
  }
`;
export class EditAddressMutation extends Mutation {
  static defaultProps = {
    mutation: EDIT_ADDRESS,
    awaitRefetchQueries: true,
    refetchQueries: ['Addresses']
  };
}


export type IEditAddressVariablesProps = MutationToEditAddressArgs;
export type IEditAddressResponseData = {editAddress: GQLAddress};
export type IEditAddressResponse = MutationState<IEditAddressResponseData>;
export type IEditAddressFn = MutationFn<IEditAddressResponseData, IEditAddressVariablesProps>;
