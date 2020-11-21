import {Box, Text} from "@market-ui/falcon-ui";
import React from "react";
import {T} from "@market-ui/falcon-i18n";
import {toGridTemplate} from "src/uikitEjected";
import {desktopOnly} from "src/styling/cssHelper";
import {ResponsiveIf} from 'src/components';


const area = {
  thSubtotal: 'thSubtotal',
  thPrice: 'thPrice',
  thQty: 'thQty',
  thItems: 'thItems',
  empty: '.',
};

const tableLayout = {
  tableLayout: {
    display: 'grid',
    gridGap: 'xs',
    gridTemplate: {
      xl: toGridTemplate([
        ['1fr',        '2fr',      '0.7fr',    '1.5fr',    '1fr',        '1fr',           '0.7fr'    ],
        [area.thItems, area.empty, area.empty, area.thQty, area.thPrice, area.thSubtotal, area.empty ],
      ]),
      lg: toGridTemplate([
        ['1fr',        '2fr',      '0.7fr',    '1.5fr',    '1fr',        '1fr',           '0.7fr'    ],
        [area.thItems, area.empty, area.empty, area.thQty, area.thPrice, area.thSubtotal, area.empty ],
      ]),
      md: toGridTemplate([
        ['1fr',        '2fr',      '0.7fr',    '1fr',      '1fr',        '1fr',           '0.7fr'    ],
        [area.thItems, area.empty, area.empty, area.thQty, area.thPrice, area.thSubtotal, area.empty ],
      ]),
      sm: toGridTemplate([
        ['2fr',        '4fr',      '0.7fr',    '1fr',      '1fr',        '1fr',           '0.7fr'    ],
        [area.thItems, area.empty, area.empty, area.thQty, area.thPrice, area.thSubtotal, area.empty ],
      ]),
      xs: toGridTemplate([
        ['1fr'        ],
        [area.thItems ],
      ]),
    },
  }
};

export const CartItemsHeaderRow = ({gridArea, itemsQty}) => (
  <Box gridArea={gridArea} defaultTheme={tableLayout} mt={desktopOnly('lg')}>

    {/* if place next line in to the end of code block then this line will be superimposed on other lines  */}
    <THText gridArea={area.thItems} id="cart.thItems" postfix={`(${itemsQty})`} />

    <ResponsiveIf desktop>
      <THText gridArea={area.thSubtotal} id="cart.thSubtotal" />
      <THText gridArea={area.thPrice} id="cart.thPrice" />
      <THText gridArea={area.thQty} id="cart.thQty" />
    </ResponsiveIf>
  </Box>
)

const THText = ({gridArea, id, postfix=''}) => (
  <Text
    gridArea={gridArea}
    css={{textAlign: 'start'}}
    fontWeight='bold'
    fontSize='xxs'
  >
    <T id={id} /> {postfix}
  </Text>
);
