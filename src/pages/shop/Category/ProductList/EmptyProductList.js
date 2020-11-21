import React from 'react';
import { themed, Box, Text } from '@market-ui/falcon-ui';
import { T } from '@market-ui/falcon-i18n';

export const EmptyProductListLayout = themed({
  tag: Box,
  defaultTheme: {
    emptyProductListLayout: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p: 'sm'
    }
  }
});

export const EmptyProductList = () => (
  <EmptyProductListLayout>
    <Text fontSize="md" mb="xs">
      <T id="productList.empty" />
    </Text>
  </EmptyProductListLayout>
);
