import gql from "graphql-tag";
import {Mutation, MutationFn, MutationState} from "react-apollo";
import {MutationToSetGuestCheckoutEmailArgs} from "src/graphql-types";


export const SET_GUEST_CHECKOUT_EMAIL = gql`
  mutation SetGuestCheckoutEmail($input: GuestCheckoutEmailInput!) {
    setGuestCheckoutEmail(input: $input)
  }
`;

export class SetGuestCheckoutEmailMutation extends Mutation {
  static defaultProps = {
    mutation: SET_GUEST_CHECKOUT_EMAIL,
    refetchQueries: ['Cart', 'Customer', 'IsAuthenticated']
  };
}

export type ISetGuestCheckoutEmailVariablesProps = MutationToSetGuestCheckoutEmailArgs;
export type ISetGuestCheckoutEmailResponseData = {estimateShippingMethods: boolean};
export type ISetGuestCheckoutEmailResponse = MutationState<ISetGuestCheckoutEmailResponseData>;
export type ISetGuestCheckoutEmailFn = MutationFn<ISetGuestCheckoutEmailResponseData, ISetGuestCheckoutEmailVariablesProps>;
