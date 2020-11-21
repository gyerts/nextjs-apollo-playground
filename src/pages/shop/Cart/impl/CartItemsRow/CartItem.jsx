import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FlexLayout } from '@market-ui/falcon-ui';

import { toGridTemplate } from 'src/uikitEjected';
import { InStock } from './InStock';
import { ProductName } from './ProductName';
import { ProductThumb } from './ProductThumb';
import { Qty } from './Qty';
import { RemoveCartItem } from './RemoveCartItem';
import { SubtotalPrice } from './SubtotalPrice';
import { GrandPrice } from './GrandPrice';
import { bothResolutions, desktopOnly } from "src/styling/cssHelper";
import {NO_PRODUCT_IMG_FOUND_280x420} from "src/config";

const area = {
  empty: '.',
  thumb: 'thumb',
  name: 'name',

  stock: 'stock',
  qty: 'qty',
  price: 'price',
  subtotal: 'subtotal',
  remove: 'remove',
  items: 'items',

  thItems: 'thItems',
  thQty: 'thQty',
  thPrice: 'thPrice',
  thSubtotal: 'thSubtotal',
};

const cartItemLayout = {
  cartItemLayout: {
    display: 'grid',
    gridGap: 'xs',
    css: {
      alignItems: 'start!important',

      '.grayed': {
        position: 'relative',
        '&::after': {
          content: '""',
          backgroundColor: '#ffffff7c',
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }
      }
    },
    // prettier-ignore
    gridTemplate: {
      xl: toGridTemplate([
        ['1fr',         '2fr',        '0.7fr',     '1.5fr',    '1fr',         '1fr',            '0.7fr',   ],
        [area.thumb,    area.name,    area.stock,  area.qty,   area.price,    area.subtotal,    area.remove],
      ]),
      lg: toGridTemplate([
        ['1fr',         '2fr',        '0.7fr',     '1.5fr',    '1fr',         '1fr',            '0.7fr',   ],
        [area.thumb,    area.name,    area.stock,  area.qty,   area.price,    area.subtotal,    area.remove],
      ]),
      md: toGridTemplate([
        ['1fr',         '2fr',        '0.7fr',     '1fr',      '1fr',         '1fr',           '0.7fr'      ],
        [area.thumb,    area.name,    area.stock,  area.qty,   area.price,    area.subtotal,    area.remove ],
      ]),
      sm: toGridTemplate([
        ['2fr',         '4fr',        '0.7fr',     '1fr',      '1fr',         '1fr',            '0.7fr'     ],
        [area.thumb,    area.name,    area.stock,  area.qty,   area.price,    area.subtotal,    area.remove ],
      ]),
      xs: toGridTemplate([
        ['1fr',         '1.7fr'        ],
        [area.thumb,    area.name,     ],
        [area.thumb,    area.price,    ],
        [area.thumb,    area.stock,    ],
        [area.qty,      area.subtotal, ],
        [area.empty,    area.remove,   ],
      ]),
    },
  }
};

export const CartItem = ({ item }) => {
  const outOfStock = item.availableQty === null ? false : item.qty > item.availableQty;
  const className = classNames({'grayed': outOfStock});
  const maxItems = (item.availableQty === null || item.availableQty === undefined) ? item.qty : item.availableQty;

  return (
    <FlexLayout
      defaultTheme={cartItemLayout}
      alignItems={desktopOnly('center')}
      position='relative'
      my={bothResolutions('xs', 'lg')}
    >
      <RemoveCartItem
        gridArea={area.remove} itemId={item.itemId} />
      <SubtotalPrice
        gridArea={area.subtotal} value={item.rowTotal} className={className} />
      <GrandPrice
        gridArea={area.price} value={item.price} className={className} />
      <Qty
        gridArea={area.qty} qty={item.qty} itemId={item.itemId} sku={item.sku} maxItems={maxItems} />
      <InStock
        gridArea={area.stock} inStock={!outOfStock} />
      <ProductName
        gridArea={area.name} name={item.name} options={item.itemOptions} className={className} />
      <ProductThumb
        gridArea={area.thumb} url={item.thumbnailUrl || NO_PRODUCT_IMG_FOUND_280x420} sku={item.sku} className={className} />
    </FlexLayout>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    thumbnailUrl: PropTypes.string,
    price: PropTypes.number,
    rowTotalInclTax: PropTypes.number,
    name: PropTypes.string,
    itemId: PropTypes.number,
    sku: PropTypes.string,
    qty: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(null)]),
    availableQty: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(null)]),
    itemOptions: PropTypes.arrayOf(PropTypes.shape({}))
  })
};
