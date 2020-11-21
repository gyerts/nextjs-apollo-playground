import React from 'react';
import { Select, Option } from '@market-ui/falcon-ui';

export const CountrySelector = props => {
  const { items, value, onChange, ...restProps } = props;

  return (
    <Select
      {...restProps}
      value={value}
      onChange={({ target }) => onChange && onChange(target.value, items.find(x => x.code === value))}
    >
      {items.map(x => (
        <Option key={x.localName} value={x.code}>
          {x.localName}
        </Option>
      ))}
    </Select>
  );
};
