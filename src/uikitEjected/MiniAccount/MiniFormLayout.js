import React from 'react';
import { Box, H3 } from '@market-ui/falcon-ui';
import { FixCenteredLayout } from '../FixCenteredLayout';

const miniFormLayout = {
  miniFormLayout: {
    display: 'grid',
    gridRowGap: 'md'
  }
};

export const MiniFormLayout = ({ title, children }) => (
  <Box defaultTheme={miniFormLayout}>
    {title && <H3>{title}</H3>}
    <FixCenteredLayout maxWidth="70%">{children}</FixCenteredLayout>
  </Box>
);
