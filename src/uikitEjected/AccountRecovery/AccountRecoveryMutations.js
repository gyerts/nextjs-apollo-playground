import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const REQUEST_CUSTOMER_PASSWORD_RESET_TOKEN_MUTATION = gql`
  mutation RequestCustomerPasswordResetToken($input: EmailInput!) {
    requestCustomerPasswordResetToken(input: $input)
  }
`;

export class RequestPasswordResetMutation extends Mutation {
  static defaultProps = {
    mutation: REQUEST_CUSTOMER_PASSWORD_RESET_TOKEN_MUTATION
  };
}

export const RESET_CUSTOMER_PASSWORD_MUTATION = gql`
  mutation ResetCustomerPassword($input: CustomerPasswordReset!) {
    resetCustomerPassword(input: $input)
  }
`;

export class ResetCustomerPasswordMutation extends Mutation {
  static defaultProps = {
    mutation: RESET_CUSTOMER_PASSWORD_MUTATION
  };
}
