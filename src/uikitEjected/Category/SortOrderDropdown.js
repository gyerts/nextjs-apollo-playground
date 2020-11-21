import React from 'react';
import {Box, Dropdown, DropdownLabel, DropdownMenu, DropdownMenuItem, themed} from '@market-ui/falcon-ui';
import {T} from "@market-ui/falcon-i18n";
import {themedColors, colorsFromDesign} from "src/theme/colors";

export const SortOrderDropdownLayout = themed({
  tag: Box,
  defaultTheme: {
    sortOrderDropdownLayout: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }
});

export const SortOrderDropdown = ({items, value, onChange}) => (
  <SortOrderDropdownLayout>
    <Box display="flex">
      <Dropdown
        css={{
          paddingTop: 9
        }}
        border={'none'}
        onChange={onChange}>
        <DropdownLabel
          justifyContent={'flex-start'}
          p={'none'}
          alignItems={'center'}
          css={{
            width: 'auto',
            textTransform: 'uppercase',
            fontSize: 15,
            fontWeight: 600
          }}>
          <T id="sort.sortOrderDropdownLabel"/>
        </DropdownLabel>
        <DropdownMenu pt={'sm'}
                      pb={'sm'}
                      css={{
                        minWidth: 200,
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.22)'
                      }}>
          {items.map(x => (
            <DropdownMenuItem
              css={{
                paddingRight: '35px',
                paddingLeft: '35px',
                fontSize: 15,
                color: (x.value.field === value.field && x.value.direction === value.direction) ? themedColors.black : 'rgba(0,0,0,.4)',
                ':hover': {
                  backgroundColor: colorsFromDesign.Red
                }
              }}
              key={x.name}
              value={x}>
              {x.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </Box>
  </SortOrderDropdownLayout>
);
