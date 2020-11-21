import gql from 'graphql-tag';
import {Mutation, MutationFn, MutationState} from 'react-apollo';
import {GQLCustomer, MutationToEditCustomerArgs} from "src/graphql-types";

export const SUBSCRIBE_NEWSLETTER_CUSTOMER = gql`
  mutation SubscribeNewsletterCustomerMutation($input: CustomerInput!) {
    editCustomer(input: $input) {
      id,
      email,
      newsletterSubscriber
    }
  }
`;
export class SubscribeNewsletterMutation extends Mutation {
  static defaultProps = {
    mutation: SUBSCRIBE_NEWSLETTER_CUSTOMER,
  };
}

export type ISubscribeNewsletterVariablesProps = MutationToEditCustomerArgs;
export type ISubscribeNewsletterResponseData = {SubscribeNewsletter: GQLCustomer};
export type ISubscribeNewsletterResponse = MutationState<ISubscribeNewsletterResponseData>;
export type ISubscribeNewsletterFn = MutationFn<ISubscribeNewsletterResponseData, ISubscribeNewsletterVariablesProps>;
