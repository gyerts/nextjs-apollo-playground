import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';


export const APPLY_COUPON = gql`
  mutation ApplyCoupon($input: CouponInput!) {
    applyCoupon(input: $input)
  }
`;

export class ApplyCouponMutation extends Mutation {
  static defaultProps = {
    mutation: APPLY_COUPON,
    awaitRefetchQueries: true,
    refetchQueries: ['Cart', 'MiniCart']
  };
}
