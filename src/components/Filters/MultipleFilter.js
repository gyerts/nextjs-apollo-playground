import React from 'react';
import {Label, Checkbox, Text} from '@market-ui/falcon-ui';
import { FilterItemLayout } from './FilterItem';
import { FilterItemList } from './FilterItemList';

export const MultipleFilter = ({ options, selected = [], onChange }) => {
  const handleOnChange = (option, isSelected) => {
    if (isSelected) {
      onChange([...selected, option.value]);
    } else {
      onChange(selected.filter(value => value !== option.value));
    }
  };

  return (
    <FilterItemList>
        <div className={'filter-item-list'}>
            {options.map(x => (
                <FilterItemLayout key={x.value} css={{
                  fontWeight: 200
                }}>
                    <Checkbox
                        className={'multiple-filter-checkbox'}
                        id={`${x.title}-${x.value}`}
                        checked={selected.some(value => value === x.value)}
                        onChange={e => handleOnChange(x, e.target.checked)}
                    />
                    <Label ml="sm"
                           className={'multiple-filter-label'}
                           css={{
                               margin: 0
                           }}
                           htmlFor={`${x.title}-${x.value}`}>
                      <Text as={'span'} className={'multiple-filter-label-title'}>{x.title}</Text>
                      &nbsp;
                      <Text as={'span'} className={'multiple-filter-label-count'}>{x.count}</Text>
                    </Label>
                </FilterItemLayout>
            ))}
        </div>
    </FilterItemList>
  );
};
