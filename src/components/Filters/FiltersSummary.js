import React from 'react';
import {Box, FlexLayout, Icon, List, ListItem, Text, themed} from '@market-ui/falcon-ui';
import { SearchConsumer } from '../../uikitEjected/Search';
import { getSelectedFilterOptionsFor } from './FiltersDataProvider';

export const FiltersSummaryLayout = themed({
  tag: Box,
  defaultTheme: {
    filtersSummaryLayout: {}
  }
});

const SelectedFilterItemLayout = themed({
  tag: ListItem,
  defaultTheme: {
    selectedFilterItemLayout: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      pb: 'xs'
    }
  }
});

const removeSelectedFilterIdFromFilters = (field, filterId, filtersData) => {
  let selectedFieldFilters = filtersData.filter(item => item.field === field)[0].value;
  selectedFieldFilters.splice(selectedFieldFilters.indexOf(filterId), 1);
  return selectedFieldFilters;
}

export const FiltersSummary = ({ data }) => (
  <SearchConsumer>
    {({ state: { filters }, removeFilter }) => {
      if (!filters.length) {
        return null;
      }

      return (
        <FiltersSummaryLayout>
          <List
            display={'flex'}
            flexDirection={'row'}
            flexWrap={'wrap'}
          >
            {data.map(({ field, title }) => {
              const selectedFilterOptions = getSelectedFilterOptionsFor(data, field);

              if (selectedFilterOptions.length === 0) {
                return null;
              }

              return (
                <SelectedFilterItemLayout key={field}>
                  {selectedFilterOptions.map(x => {
                    return <FlexLayout key={x.value}
                      alignItems={'center'}
                      css={{
                        border: '1px solid #000',
                        padding: '0 3px',
                        margin: '0 5px'
                      }}>
                      <Icon
                          src="close"
                          size="md"
                          onClick={() => removeFilter(field, removeSelectedFilterIdFromFilters(field, x.value, data))}
                          css={{
                            cursor: 'pointer'
                          }}
                      />
                      <Text css={{padding: 3}}>{x.title || x.value}</Text>
                    </FlexLayout>
                  })}
                </SelectedFilterItemLayout>
              );
            })}
          </List>
        </FiltersSummaryLayout>
      );
    }}
  </SearchConsumer>
);
