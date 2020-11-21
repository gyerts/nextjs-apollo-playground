import React from 'react';
import { Text } from '@market-ui/falcon-ui';
import { T } from '@market-ui/falcon-i18n';

export const ShowingOutOf = ({ itemsCount, totalItems }) => (
  <Text>
    <T id="productList.pagination.showingOutOf" {...{ itemsCount, totalItems }} />
  </Text>
);
