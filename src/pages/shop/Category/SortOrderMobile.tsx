import React from 'react';
import {
  Box,
  List, PropsWithTheme,
  Radio,
  Theme,
} from '@market-ui/falcon-ui';
import {ISortOrderItem, ISortOrderMobileProps, onSortChange} from "./SortService";

export const SortOrderMobile = (props: ISortOrderMobileProps) => {
  const { toggle, items, value, onChange } = props;
  return <Box display="flex">
      <List pt={'sm'}
            pb={'sm'}
            css={{minWidth: 200}}>
        {items.map((x: ISortOrderItem) => (
          <Box
            as="li"
            display={'flex'}
            alignItems={'center'}
            pt={'xs'}
            pb={'xs'}
            key={x.name}
            onClick={() => onSortChange(onChange, toggle, x)}
          >
            <Radio
              // @ts-ignore
              size={'sm'}
              ml={'sm'}
              mr={'sm'}
              readOnly
              value={x.name}
              checked={x.value.field === value.field && x.value.direction === value.direction}
              css={(props: PropsWithTheme) => ({
                ...getCssForRadio(props.theme)
              })}
            />
            {x.name}
          </Box>
        ))}
      </List>
    </Box>
};

const getCssForRadio = (theme: Theme) => ({
  'input[type=radio]:hover': {
    backgroundColor: theme.colors.black
  },
  'input[type=radio]:checked + .-inner-radio-frame': {
    borderColor: theme.colors.black
  },
  'input[type=radio] + .-inner-radio-frame': {
    borderWidth: 1
  },
  'input[type=radio]:hover + .-inner-radio-frame': {
    borderColor: theme.colors.black
  },
  'input[type=radio]:checked:hover + .-inner-radio-frame': {
    background: theme.colors.black
  },
  'input:checked + .-inner-radio-frame .-inner-radio-icon': {
    fill: theme.colors.black
  }
});

export default SortOrderMobile;
