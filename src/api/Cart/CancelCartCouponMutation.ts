import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';


export const CANCEL_COUPON = gql`
  mutation CancelCoupon {
    cancelCoupon
  }
`;

export class CancelCouponMutation extends Mutation {
  static defaultProps = {
    mutation: CANCEL_COUPON,
    awaitRefetchQueries: true,
    refetchQueries: ['Cart', 'MiniCart']
  };
}
