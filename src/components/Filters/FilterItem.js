import React from 'react';
import { Icon, ListItem, themed } from '@market-ui/falcon-ui';

export const FilterItemLayout = themed({
  tag: ListItem,
  defaultTheme: {
    filterItemLayout: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      color: 'black',
      p: 'xs',
      css: ({ theme }) => ({
        cursor: 'pointer',
        ':hover': {
          // color: theme.colors.primaryLight
        }
      })
    }
  }
});

export const FilterItem = ({ item, onClick }) => (
  <FilterItemLayout onClick={onClick}>
    {item.title} ({item.count})
  </FilterItemLayout>
);

const SelectedFilterItemInnerDOM = ({ onClick, children, ...rest }) => (
  <ListItem {...rest}>
    <Icon
      src="close"
      size="md"
      mr="xs"
      onClick={() => onClick && onClick()}
      css={({ theme }) => ({
        cursor: onClick ? 'pointer' : undefined,
        ':hover': {
          stroke: theme.colors.primaryLight
        }
      })}
    />
    {children}
  </ListItem>
);
export const SelectedFilterItem = themed({
  tag: SelectedFilterItemInnerDOM,
  defaultTheme: {
    selectedFilterItemLayout: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      pr: 'xs',
      pb: 'xs'
    }
  }
});
