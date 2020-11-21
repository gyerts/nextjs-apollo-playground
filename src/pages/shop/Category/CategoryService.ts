import {IPagination} from "src/common/models";

export const getIsNextPage = (pagination: IPagination): boolean => {
  return  pagination.totalItems / pagination.perPage > 1
}