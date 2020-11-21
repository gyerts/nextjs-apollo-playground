import gql from 'graphql-tag';
import { Query } from 'src/uikitEjected/Query/Query';

// configurableOptions -> id - don't use! it mixes configurableOptions valueIndexes
export const GET_CATEGORY_PRODUCTS = gql`
  query CategoryProducts(
    $term: String!
    $sort: [SortOrderInput]
    $filters: [FilterInput]
    $query: ShopPageQuery
  ) {

      products(
        term: $term,
        filters: $filters,
        sortOrders: $sort,
        query: $query
        ) {
        items {
          id
          sku
          name
          type
          description
          attributes {
            name
            value
          }
          price {
            regular
            special
          }
          currency
          stock {
            isInStock
            qty
          }
          gallery{
            type
            full
            sku
            format
            index
          }
          configurableOptions {
            label
            values {
              valueIndex
              label
              inStock {
                isInStock
                qty
              }
              price {
                regular
              }
            }
          }
        },
        aggregations{
          type
          title
          field
          buckets{
            title
            value
          }
        }
        pagination {
          totalPages,
          totalItems,
          perPage,
          currentPage,
          nextPage
        }
      }
    }

`;

const fetchMore = (data) => {
  return (searchConsumerState, setPagination) => {
    let perPage = searchConsumerState.pagination.perPage;
    let page = perPage / 20 + 1;

    setPagination({
      perPage: 20 * page,
      page: 0
    })
  }
};

export class CategoryProductsSearchQuery extends Query {

  static defaultProps = {
    query: GET_CATEGORY_PRODUCTS,
    fetchPolicy: 'cache-and-network',
    fetchMore,
    notifyOnNetworkStatusChange: true
  };
}
