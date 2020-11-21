import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from '@market-ui/falcon-ui';

const ErrorList = ({ errors = [], ...props }) =>
  errors.length ? (
    <Box {...props}>
      {errors.map(err => (
        <Text key={err.message} color="error">
          {err.message}
        </Text>
      ))}
    </Box>
  ) : null;

ErrorList.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string
    })
  )
};

export default ErrorList;
