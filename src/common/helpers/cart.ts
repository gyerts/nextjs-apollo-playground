import {GQLCart} from "../../graphql-types";

export const getCartData = (totals: GQLCart['totals']) => {
  return {
    total: totals.find(t => (t.code === 'totalPrice' || t.code === 'total')),
    subTotal: totals.find(t => t.code === 'subTotal'),
    totalDiscounts: totals.find(t => t.code === 'totalDiscounts'),
    totalPriceWithTax: totals.find(t => t.code === 'totalPriceWithTax'),
    totalTax: totals.find(t => t.code === 'totalTax'),
  };
};
