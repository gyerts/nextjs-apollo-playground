import React from 'react';
import { Box, H1, Text, FlexLayout } from '@market-ui/falcon-ui';
import { LastOrderQuery } from 'src/uikitEjected';
import {DangerousText} from "src/components";

const OrderSummary = ({ order }) => (
  <Box>
    {order.items.map(item => (
      <DangerousText fontWeight="bold" key={item.itemId}>
        {item.name}
      </DangerousText>
    ))}
  </Box>
);

const CheckoutConfirmation = () => (
  <LastOrderQuery>
    {({ lastOrder }) => (
      <FlexLayout my="xxl" flexDirection="column" alignItems="center">
        <H1 mb="xl">THANK YOU FOR SHOPPING!</H1>
        <Text>{`We have received your order (id: ${lastOrder.incrementId}) with the following items:`}</Text>
        <OrderSummary my="sm" order={lastOrder} />
        <Text my="sm">We are working hard on getting your items to you as soon as possible.</Text>
        <Text>We will send you a shipping confirmation email once your order is on the way.</Text>
      </FlexLayout>
    )}
  </LastOrderQuery>
);

export default CheckoutConfirmation;
