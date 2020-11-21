import gql from "graphql-tag";
import {Mutation, MutationFn, MutationState} from "react-apollo";
import {GQLShippingMethod, MutationToEstimateShippingMethodsArgs} from "src/graphql-types";


export const ESTIMATE_SHIPPING_METHODS = gql`
  mutation EstimateShippingMethods($input: EstimateShippingInput!) {
    estimateShippingMethods(input: $input) {
      carrierTitle
      amount
      carrierCode
      methodCode
      methodTitle
      priceExclTax
      priceInclTax
      currency
    }
  }
`;

export class EstimateShippingMethodsMutation extends Mutation {
  static defaultProps = {
    mutation: ESTIMATE_SHIPPING_METHODS
  };
}

export type IEstimateShippingMethodsVariablesProps = MutationToEstimateShippingMethodsArgs;
export type IEstimateShippingMethodsResponseData = {estimateShippingMethods: IShippingMethod[]};
export type IEstimateShippingMethodsResponse = MutationState<IEstimateShippingMethodsResponseData>;
export type IEstimateShippingMethodsFn = MutationFn<IEstimateShippingMethodsResponseData, IEstimateShippingMethodsVariablesProps>;

interface IShippingMethod {
  carrierTitle: GQLShippingMethod["carrierTitle"],
  amount: GQLShippingMethod["amount"],
  carrierCode: GQLShippingMethod["carrierCode"],
  methodCode: GQLShippingMethod["methodCode"],
  methodTitle: GQLShippingMethod["methodTitle"],
  priceExclTax: GQLShippingMethod["priceExclTax"],
  priceInclTax: GQLShippingMethod["priceInclTax"],
  currency: GQLShippingMethod["currency"],
}
