import gql from 'graphql-tag';
import {Mutation, MutationFn} from 'react-apollo';

export const CONTACT_US_MUTATION = gql`
  mutation ContactUs($input: ContactUsInput!){
    customerSubmitContactUs(input: $input)
  }
`;

export class SetContactUsMutation extends Mutation {
  static defaultProps = {
    mutation: CONTACT_US_MUTATION,
  };
}

// @todo need to investigate why typings missed from graphql schema
export type ICustomerSubmitContactUs = MutationFn<any, any>;
