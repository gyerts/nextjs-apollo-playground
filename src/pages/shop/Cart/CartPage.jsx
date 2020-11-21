import React from "react";
import {FlexLayout, Box, Breadcrumb, Link, Breadcrumbs} from '@market-ui/falcon-ui';

import {TitleRow, CartItemsHeaderRow, CartItemsRow, CartSummaryRow, CartEmptyRow} from '.';
import {T} from "@market-ui/falcon-i18n";
import {bothResolutions, mobileOnly} from "src/styling/cssHelper";
import {toGridTemplate} from 'src/uikitEjected';
import {CartContextProvider, useCartContext} from './CartContext';
import {ResponsiveIf, TopPageMessage} from 'src/components';
import {CartQuery} from 'src/api';

const area = {
  message: 'message',
  breadcrumbs: 'breadcrumbs',
  title: 'title',
  header: 'header',
  underLine: 'underLine',
  items: 'items',
  bottomLine: 'bottomLine',
  summary: 'summary',
  cartEmpty: 'cartEmpty',
  empty: '.',
};

const tableLayout = {
  tableLayout: {
    display: 'grid',
    gridTemplate: {
      xl: toGridTemplate([
        [ '2fr',        '10fr',           '2fr'       ],
        [ area.empty,   area.message,     area.empty ],
        [ area.empty,   area.breadcrumbs, area.empty ],
        [ area.empty,   area.title,       area.empty ],
        [ area.empty,   area.header,      area.empty ],
        [ area.empty,   area.underLine,   area.empty ],
        [ area.empty,   area.items,       area.empty ],
        [ area.empty,   area.bottomLine,  area.empty ],
        [ area.empty,   area.summary,     area.empty ],
        [ area.empty,   area.checkout,    area.empty ],
        [ area.empty,   area.cartEmpty,   area.empty ],
      ]),
      lg: toGridTemplate([
        [ '2fr',        '10fr',           '2fr'       ],
        [ area.empty,   area.message,     area.empty ],
        [ area.empty,   area.breadcrumbs, area.empty ],
        [ area.empty,   area.title,       area.empty ],
        [ area.empty,   area.header,      area.empty ],
        [ area.empty,   area.underLine,   area.empty ],
        [ area.empty,   area.items,       area.empty ],
        [ area.empty,   area.bottomLine,  area.empty ],
        [ area.empty,   area.summary,     area.empty ],
        [ area.empty,   area.cartEmpty,   area.empty ],
      ]),
      md: toGridTemplate([
        [ '2fr',        '20fr',           '2fr'       ],
        [ area.empty,   area.message,     area.empty ],
        [ area.empty,   area.breadcrumbs, area.empty ],
        [ area.empty,   area.title,       area.empty ],
        [ area.empty,   area.header,      area.empty ],
        [ area.empty,   area.underLine,   area.empty ],
        [ area.empty,   area.items,       area.empty ],
        [ area.empty,   area.bottomLine,  area.empty ],
        [ area.empty,   area.summary,     area.empty ],
        [ area.empty,   area.cartEmpty,   area.empty ],
      ]),
      sm: toGridTemplate([
        [ '8px',        '30fr',           '8px'      ],
        [ area.empty,   area.message,     area.empty ],
        [ area.empty,   area.breadcrumbs, area.empty ],
        [ area.empty,   area.title,       area.empty ],
        [ area.empty,   area.header,      area.empty ],
        [ area.empty,   area.underLine,   area.empty ],
        [ area.empty,   area.items,       area.empty ],
        [ area.empty,   area.bottomLine,  area.empty ],
        [ area.empty,   area.summary,     area.empty ],
        [ area.empty,   area.cartEmpty,   area.empty ],
      ]),
      xs: toGridTemplate([
        [ '10fr'            ],
        [ area.message     ],
        [ area.breadcrumbs ],
        [ area.title       ],
        [ area.header      ],
        [ area.underLine   ],
        [ area.items       ],
        [ area.bottomLine  ],
        [ area.summary     ],
        [ area.cartEmpty   ],
      ]),
    },
  }
};

const BreadCrumbs = ({...props}) => {
  return (
    <ResponsiveIf minWidth='sm'>
      <Breadcrumbs
        my="xs"
        alignSelf="flex-start"
        className='breadcrumbs'
        {...props}
      >
        <Breadcrumb><Link to="/"><T id="breadcrumbs.home" /></Link></Breadcrumb>
        <Breadcrumb><Link to="/cart"><T id="breadcrumbs.cart" /></Link></Breadcrumb>
      </Breadcrumbs>
    </ResponsiveIf>
  )
};

export const CartPage = () => (
  <CartQuery>
    {({ cart }) => (
      <CartContextProvider>
        <CartPageImpl cart={cart} />
      </CartContextProvider>
    )}
  </CartQuery>
);

export const CartPageImpl = ({cart}) => {
  const { isError, titleId, messageId, closeMessage } = useCartContext();

  return (
    <FlexLayout defaultTheme={tableLayout} flexDirection='column'>
      <TopPageMessage
        gridArea={area.message}
        title={<T id={titleId} />}
        message={<T id={messageId} />}
        opened={Boolean(titleId)}
        error={isError}
        onClose={closeMessage}
      />

      <BreadCrumbs gridArea={area.breadcrumbs} />
      <TitleRow gridArea={area.title} />

      {cart && ((cart.items || [])).length > 0 ? (
        <React.Fragment>
          <CartItemsHeaderRow gridArea={area.header} itemsQty={cart.itemsQty} />
          <UnderLine gridArea={area.underLine} />
          <CartItemsRow gridArea={area.items} items={cart.items} />
          <ResponsiveIf desktop>
            <UnderLine gridArea={area.bottomLine} mb='xs' />
          </ResponsiveIf>
          <CartSummaryRow gridArea={area.summary} totals={cart.totals} couponCode={cart.couponCode} />
        </React.Fragment>
      ) : (
        <CartEmptyRow gridArea={area.cartEmpty} />
      )}
    </FlexLayout>
  );
};

const UnderLine = ({gridArea, ...props}) => (
  <Box
    gridArea={gridArea}
    css={{borderBottom: '1px solid black'}}
    width={bothResolutions('200%', '100%')}
    ml={mobileOnly('-50%')}
    {...props}
  />
);
