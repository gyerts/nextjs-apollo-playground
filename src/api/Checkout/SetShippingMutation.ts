import gql from "graphql-tag";
import {Mutation, MutationFn, MutationState} from "react-apollo";
import {GQLShippingInformation, MutationToSetShippingArgs} from "src/graphql-types";


export const SET_SHIPPING = gql`
  mutation SetShipping($input: ShippingInput) {
    setShipping(input: $input) {
      paymentMethods {
        code
        title
        config
      }
    }
  }
`;

export class SetShippingMutation extends Mutation {
  static defaultProps = {
    mutation: SET_SHIPPING
  };
}

export type ISetShippingVariablesProps = MutationToSetShippingArgs;
export type ISetShippingResponseData = {setShipping: GQLShippingInformation};
export type ISetShippingResponse = MutationState<ISetShippingResponseData>;
export type ISetShippingFn = MutationFn<ISetShippingResponseData, ISetShippingVariablesProps>;
