import {Box, Option, Select, Text} from "@market-ui/falcon-ui";
import React from "react";
import {ResponsiveIf} from "src/components";
import {mobileOnly} from "../../../../../styling/cssHelper";
import './Qty.scss';
import {T} from "@market-ui/falcon-i18n";
import {UpdateCartItemMutation} from "src/api";

const MAX_ITEMS = 100;
export const Qty = ({gridArea, itemId, sku, qty, maxItems, ...props}) => {
  const items = Array.from(Array((maxItems > MAX_ITEMS ? MAX_ITEMS : maxItems)), (v, i) => i + 1);

  return (
    <Box gridArea={gridArea} {...props}>

      <UpdateCartItemMutation>
        {(updateCartItem, { loading, error }) => (
          <Box display="flex" alignItems="start" flexDirection={mobileOnly('column')}>
            <ResponsiveIf mobile>
              <Text mt='xs'><T id='cart.thQty' />:</Text>
            </ResponsiveIf>
            <Select
              className='fix-arrow-side'
              css={{
                maxWidth: '100px',
                width: '100%',
                border: 0,
                borderBottom: '1px solid black',
                borderRadius: 0,
                padding: '0 10px',
                ':focus': {
                  borderColor: 'black',
                },
              }}
              value={qty}
              disabled={loading}
              onChange={e => {
                updateCartItem({
                  variables: {
                    input: {
                      itemId, sku, qty: parseInt(e.target.value),
                    }
                  }
                });
              }}
            >
              {items.map(i => <Option value={i} key={i}>{i}</Option>)}
            </Select>
            {!!error && <Text color="error">{error.message}</Text>}
          </Box>
        )}
      </UpdateCartItemMutation>
    </Box>
  );
};
