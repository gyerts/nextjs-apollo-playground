import React from "react";
import PropTypes from "prop-types";
import {FlexLayout} from "@market-ui/falcon-ui";
import {CartItemDetails} from "./CartItemDetails";
import {DangerousText} from "src/components";


export const ProductName = ({name, options, ...props}) => {
  return (
    <FlexLayout css={{maxWidth: 200}} flexDirection='column' {...props}>
      <DangerousText fontSize="xs" mb="sm" css={{textAlign: 'start'}}>{(name || 'null')}</DangerousText>
      <CartItemDetails options={options} />
    </FlexLayout>
  )
};

ProductName.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  name: PropTypes.string.isRequired,
};
