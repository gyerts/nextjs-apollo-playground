import React from 'react';
import { withRouter } from 'react-router-dom';
import { FilterOperator } from './types';
import { searchStateFromURL } from './searchStateFromURL';
import { searchStateToURL } from './searchStateToURL';
import { SearchContext } from './SearchContext';
import { SortOrdersQuery, AreSortOrderInputsEqual } from '../SortOrders/SortOrdersQuery';
import {getTemporaryFiltersAfterOneValueUpdate} from "./SearchService";

export class SearchProviderImpl extends React.Component {
  static defaultProps = {
    searchStateFromURL,
    searchStateToURL,
    filters: []
  };

  constructor(props) {
    super(props);

    this.state = this.getStateFromURL(props.location);
  }

  componentDidMount() {
    this.historyUnlisten = this.props.history.listen(this.restoreStateFromURL);
  }

  componentWillUnmount() {
    this.historyUnlisten();
  }

  get defaultSortOrder() {
    const { defaultSortOrder, sortOrders } = this.props;
    if (defaultSortOrder) {
      return defaultSortOrder;
    }
    if (sortOrders.some(x => !x)) {
      return undefined;
    }

    return sortOrders.filter(item => item.isDefault)[0];
  }

  getDefaultSortValue() {
    return {
      field: this.defaultSortOrder.field,
      direction: this.defaultSortOrder.direction
    }
  }

  getFirstPaginationState(pagination) {
    if (this.state && this.state.pagination && pagination) {
      return pagination;
    }
    if (!this.state && pagination) {
      return {
            perPage: pagination.perPage,
            page: 0
          }
    }
    return {
      perPage: 20,
      page: 0
    };
  }

  getStateFromURL(location) {
    const { sort, filters, pagination, ...rest } = this.props.searchStateFromURL(location.search);

    return {
      ...rest,
      pagination: this.getFirstPaginationState(pagination),
      filters: Array.isArray(filters) ? filters : [],
      sort: sort && this.sortOrderExists(sort) ? sort : this.getDefaultSortValue()
    };
  }

  setFilter = (field, value, operator = FilterOperator.equals) => {
    let filters = getTemporaryFiltersAfterOneValueUpdate(
        field,
        value,
        operator,
        this.state.filters
    );
    this.setFilters(filters);
  };

  setFilters = (filters) => {
    this.updateURL({ ...this.state, filters });
  };

  setSortOrder = sort => {
    this.updateURL({ ...this.state, sort: this.sortOrderExists(sort) ? sort : this.defaultSortOrder });
  };

  setPagination = pagination => {
      this.updateURL({ ...this.state, pagination });
  };

  setTerm = term => this.updateURL({ ...this.state, term }, true);

  sortOrderExists = sort => this.props.sortOrders.some(x => (!x && !sort) || AreSortOrderInputsEqual(x, sort));

  removeFilters = () => this.updateURL({ ...this.state, filters: [] });

  stateToSerialize = state => {
    const stateToSerialize = { ...state };

    return stateToSerialize;
  };

  restoreStateFromURL = location => {
    const state = this.getStateFromURL(location);
    // state created from URL might be empty so we have to make sure that all the items are correctly
    // removed from current state - setting undefined for non existing value will do the trick
    Object.keys(this.state).forEach(key => {
      if (!(key in state)) {
        state[key] = undefined;
      }
    });

    this.setState(state);
  };

  historyUnlisten = () => {};

  updateURL(state, isSearch) {
    const searchUrl = isSearch  ? '/search/' : '';
    const queryString = this.props.searchStateToURL(state);
    this.props.history.push(`${searchUrl || this.props.location.pathname}?${queryString}`);
  }

  render() {
    return (
      <SearchContext.Provider
        value={{
          state: { ...this.state },
          setFilter: this.setFilter,
          setFilters: this.setFilters,
          removeFilter: (field, value) => this.setFilter(field, value),
          removeFilters: this.removeFilters,
          setSortOrder: this.setSortOrder,
          setPagination: this.setPagination,
          setTerm: this.setTerm
        }}
      >
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

const SearchProviderWithSortOrders = ({ ...rest }) => (
  <SortOrdersQuery>
    {({ sortOrders }) => <SearchProviderImpl {...rest} sortOrders={sortOrders.map(x => x.value)} />}
  </SortOrdersQuery>
);

// wrap everything in router so SearchProviderImpl has access to history and location
export const SearchProvider = withRouter(SearchProviderWithSortOrders);
