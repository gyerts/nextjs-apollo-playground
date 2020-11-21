import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import { toGridTemplate } from 'src/uikitEjected';
import {Box} from '@market-ui/falcon-ui';

import {ColPromoCode} from "./ColPromoCode";
import {ColOrderSummary} from "./ColOrderSummary";
import {getCartData} from "src/common";

const area = {
  coupon: 'coupon',
  totals: 'totals',
  empty: '.'
};

const layout = {
  cartSummaryLayout: {
    display: 'grid',
    gridTemplate: {
      xl: toGridTemplate([
        ['3fr',        '4fr',         '3fr'      ],
        [area.coupon,  area.empty,    area.totals],
      ]),
      lg: toGridTemplate([
        ['3fr',        '2fr',         '3fr'      ],
        [area.coupon,  area.empty,    area.totals],
      ]),
      md: toGridTemplate([
        ['3fr',       '3fr'      ],
        [area.coupon, area.totals],
      ]),
      sm: toGridTemplate([
        ['3fr',       '3fr'      ],
        [area.coupon, area.totals],
      ]),
      xs: toGridTemplate([
        ['3fr'],
        [area.coupon, ],
        [area.totals, ],
      ]),
    }
  }
};

export const CartSummaryRow = ({ gridArea, totals, couponCode }) => {
  const { total, subTotal, totalDiscounts } = getCartData(totals);
  const isCouponCodeVisible = false;

  return (
    <Box gridArea={gridArea} defaultTheme={layout} mb='lg'>
      {isCouponCodeVisible && <ColPromoCode gridArea={area.coupon} couponCode={couponCode} />}
      <ColOrderSummary gridArea={area.totals} subtotal={subTotal && subTotal.value} total={total && total.value} discount={totalDiscounts && totalDiscounts.value} />
    </Box>
  );
};

CartSummaryRow.propTypes = {
  totals: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      title: PropTypes.string,
      value: PropTypes.number
    })
  ),
  couponCode: PropTypes.string
};
