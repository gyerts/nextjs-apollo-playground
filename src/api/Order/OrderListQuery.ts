import gql from 'graphql-tag';
import { Query } from 'src/uikitEjected/Query';
import {IShortOrder} from "./types";

export const GET_ORDER_LIST = gql`
  query Orders($pagination: PaginationInput) {
    orders(pagination: $pagination) {
      items {
        entityId
        incrementId
        createdAt
        customerFirstname
        customerLastname
        status
        grandTotal
        orderCurrencyCode
      }
      pagination {
        currentPage
        totalItems
        nextPage
      }
    }
  }
`;

const fetchMore = (data: any, apolloFetchMore: any) =>
  apolloFetchMore({
    variables: { pagination: { ...data.orders.pagination, page: data.orders.pagination.nextPage } },
    updateQuery: (prev: any, { fetchMoreResult }: any) => {
      if (!fetchMoreResult) {
        return prev;
      }

      return {
        ...prev,
        ...{
          orders: {
            ...prev.orders,
            items: [...prev.orders.items, ...fetchMoreResult.orders.items],
            pagination: { ...fetchMoreResult.orders.pagination }
          }
        }
      };
    }
  });

export class OrderListQuery extends Query {
  static defaultProps = {
    query: GET_ORDER_LIST,
    fetchMore,
    notifyOnNetworkStatusChange: true
  };
}

/**
 * =================================================================================
 *                                      TYPES
 * =================================================================================
 */
export type IOrdersResponse = {
  orders: {
    items: IShortOrder
  }
};
