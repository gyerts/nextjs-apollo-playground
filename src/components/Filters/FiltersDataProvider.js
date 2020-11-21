import React from 'react';
import { Box, themed } from '@deity/falcon-ui';
import { SearchConsumer } from '../../uikitEjected/Search';

export const aggregationToFilterData = aggregation => ({
  field: aggregation.field,
  title: aggregation.title,
  type: aggregation.type,
  options: aggregation.buckets,
  value: []
});

export const getFiltersData = (filters, aggregations = [], filterData = []) =>
  [...[], ...aggregations.map(x => aggregationToFilterData(x)), ...filterData].map(x => {
    const selected = filters.find(filter => filter.field === x.field);

    return {
      ...x,
      value: selected ? selected.value : []
    };
  });

export const getSelectedFilterOptionsFor = (data, field) => {
  const filter = data.find(x => x.field === field);

  if (filter === undefined) {
    return [];
  }
  const { options, value } = filter;

  return options.filter(option => value.some(x => x === option.value));
};

export const FiltersLayout = themed({
  tag: Box,
  defaultTheme: {
    filtersPanelLayout: {
      display: 'grid',
      gridGap: 'sm',
      css: {
        width: '100%',
        alignContent: 'start'
      }
    }
  }
});

export const FiltersDataProvider = ({ children, aggregations, data }) => (
  <SearchConsumer>
    {({ state: { filters }, setFilter, removeFilter, removeFilters }) =>
      children({
        filters: getFiltersData(filters, aggregations || [], data || []),
        anySelected: filters.length > 0,
        getSelectedFilterOptionsFor,
        setFilter,
        removeFilter,
        removeFilters
      })
    }
  </SearchConsumer>
);
