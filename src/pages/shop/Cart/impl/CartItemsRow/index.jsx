import React from "react";
import {CartItem} from "./CartItem";
import {Box, Divider} from "@market-ui/falcon-ui";
import PropTypes from "prop-types";
import {bothResolutions, desktopOnly, mobileOnly} from "../../../../../styling/cssHelper";


export const CartItemsRow = ({gridArea, items}) => {
  return (
    <Box gridArea={gridArea}>
      {items.map(item => (
        <React.Fragment key={item.sku}>
          <CartItem item={item} />
          <Divider
            key={`d-${item.sku}`}
            border='bold'
            width={bothResolutions('200%', '100%')}
            ml={mobileOnly('-50%')}
          />
        </React.Fragment>
      ))}
    </Box>
  );
};

CartItemsRow.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({}))
};
