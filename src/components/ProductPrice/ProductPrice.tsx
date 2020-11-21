import React from 'react';
import {FlexLayout, Text} from '@market-ui/falcon-ui';
import {Price} from 'src/uikitEjected/Locale';

interface IProductPrice {
  price: number;
  pricePrevious: string;
}

export const ProductPrice = ({price, pricePrevious}: IProductPrice) => (
  <FlexLayout>
    {pricePrevious ? (
    <React.Fragment>
      <Text as='span' fontSize="xl" mr="xs" css={{textDecoration: 'line-through'}}>{pricePrevious}</Text>
      <Price value={price} fontSize="xl" fontWeight={'bold'} variant="special"/>
    </React.Fragment>
  ) : (
    <Price value={price} fontWeight={'bold'} fontSize="xl"/>
  )}
  </FlexLayout>
)