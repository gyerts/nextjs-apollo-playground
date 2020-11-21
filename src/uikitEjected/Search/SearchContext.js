import React from 'react';

export const SearchContext = React.createContext({
  state: {
    filters: []
  },
  setTerm: () => {},
  setFilter: () => {},
  removeFilter: () => {},
  removeFilters: () => {},
  setSortOrder: () => {},
  setPagination: () => {},
  setFilters: () => {},
});

export const SearchConsumer = SearchContext.Consumer;
