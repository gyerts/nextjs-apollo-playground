import gql from 'graphql-tag';
import { Query } from '../Query/Query';

export const SORT_ORDERS_QUERY = gql`
  query SortOrdersQuery {
    sortOrders @client
  }
`;

export class SortOrdersQuery extends Query {
  static defaultProps = {
    query: SORT_ORDERS_QUERY
  };
}

export const AreSortOrderInputsEqual = (item1, item2) =>
  !!item1 && !!item2 && item1.field === item2.field && item1.direction === item2.direction;
