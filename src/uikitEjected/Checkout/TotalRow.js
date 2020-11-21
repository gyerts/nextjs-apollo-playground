import React from 'react';
import { Box, Text } from '@market-ui/falcon-ui';
import { Price } from '../Locale';

export const TotalRow = ({ title, value, ...props }) => (
  <Box display="flex" {...props}>
    <Text flex="1">{title}</Text>
    <Price value={value} />
  </Box>
);
