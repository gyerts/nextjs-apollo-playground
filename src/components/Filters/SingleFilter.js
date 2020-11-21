import React from 'react';
import { FilterItemLayout, SelectedFilterItem } from './FilterItem';
import { FilterItemList } from './FilterItemList';

export const SingleFilter = ({ options, selected, onChange, ...rest }) => {
  const selectedOption = selected !== undefined ? options.find(x => x.value === selected) : undefined;

  return (
    <FilterItemList {...rest}>
      {selectedOption && <SelectedFilterItem onClick={() => onChange()}>{selectedOption.title}</SelectedFilterItem>}
      {!selectedOption &&
        options.map(x => (
          <FilterItemLayout key={x.value} onClick={() => onChange(x.value)}>
            {x.title} ({x.count})
          </FilterItemLayout>
        ))}
    </FilterItemList>
  );
};
