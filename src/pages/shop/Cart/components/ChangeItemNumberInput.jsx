import {Box, Icon, NumberInput} from "@market-ui/falcon-ui";
import PropTypes from "prop-types";
import React from "react";


export const ChangeItemNumberInput = ({ onChange, loading, ...props }) => (
  <Box position="relative">
    <Box css={{ opacity: loading ? 0.4 : 1 }}>
      <NumberInput readOnly={false} disabled={loading} min="1" name="qty" onChange={ev => onChange(ev)} {...props} />
    </Box>
    {loading && (
      <Icon
        src="loader"
        position="absolute"
        size="md"
        css={{
          // center the icon in the container
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
    )}
  </Box>
);

ChangeItemNumberInput.propTypes = {
  onChange: PropTypes.func,
  loading: PropTypes.bool,
};
