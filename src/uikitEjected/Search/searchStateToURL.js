import qs from 'qs';
import { FilterOperator } from './types';

export function searchStateToURL(state) {
  const { term, filters, sort, pagination } = state;

  const parts = {};

  if (filters) {
    parts.filters = {};
    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      const name = filter.operator === FilterOperator.equals ? filter.field : `${filter.field}:${filter.operator}`;
      parts.filters[name] = filter.value.join(',');
    }
  }

  if (sort && sort.field && sort.direction) {
    parts.sort = `${sort.field}:${sort.direction}`;
  }

  if (pagination) {
    parts.pp = pagination.perPage.toString();
    parts.p = pagination.page.toString();
  }

  if (term) {
    parts.q = term; // eslint-disable-line id-length
  }

  return qs.stringify(parts, { encode: false });
}
