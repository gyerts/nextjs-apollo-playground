import {Text} from "@market-ui/falcon-ui";
import PropTypes from "prop-types";
import React from "react";


export const CartItemDetails = ({ options, ...props }) => {
  options = options || [];

  return (
    options.map(opt => (
      <Text fontSize="xs" css={{textAlign: 'start'}} key={opt.label}><b>{opt.label.toUpperCase()}</b>: {opt.value.toUpperCase()}</Text>
    ))
  )
};

CartItemDetails.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};
