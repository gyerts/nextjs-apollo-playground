import gql from 'graphql-tag';
import {Mutation, MutationFn, MutationState} from 'react-apollo';
import {MutationToRemoveCustomerAddressArgs} from "src/graphql-types";


export const REMOVE_ADDRESS = gql`
  mutation RemoveAddress($id: String!) {
    removeCustomerAddress(id: $id)
  }
`;
export class RemoveAddressMutation extends Mutation {
  static defaultProps = {
    mutation: REMOVE_ADDRESS,
    awaitRefetchQueries: true,
    refetchQueries: ['Addresses']
  };
}


export type IRemoveAddressVariablesProps = MutationToRemoveCustomerAddressArgs;
export type IRemoveAddressResponseData = {removeCustomerAddress: boolean};
export type IRemoveAddressResponse = MutationState<IRemoveAddressResponseData>;
export type IRemoveAddressFn = MutationFn<IRemoveAddressResponseData, IRemoveAddressVariablesProps>;
