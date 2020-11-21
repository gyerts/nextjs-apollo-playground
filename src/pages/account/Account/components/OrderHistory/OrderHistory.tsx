import React from "react";
import {Box} from "@market-ui/falcon-ui";
import {OrdersIsEmpty} from "./components/OrdersIsEmpty";
import {GQLOrder} from "src/graphql-types";
import {OrdersCards} from "./components/OrdersCards";

const genOrders = (itemsLength: number) => {
  const orders: GQLOrder[] = [];

  for (let i = 0; i < itemsLength; ++i) {
    orders.push({
      entityId: `${i}`,
      grandTotal: i*10,
      status: 'sended',
      createdAt: new Date().toLocaleString(),
      incrementId: '',
      baseGrandTotal: 54 + i,
      subtotal: 54 + i,
      shippingAmount: 54 + i,
      taxAmount: 54 + i,
      discountAmount: 54 + i,
    });
  }

  return orders;
};



export const OrderHistory = () => {
  return (
    <Box css={{width: '100%'}}>
      <OrderHistoryImpl orders={genOrders(7)} />
    </Box>
  )
};

interface IImplProps {
  orders: GQLOrder[]
}
export const OrderHistoryImpl = ({orders}: IImplProps) => {
  if (!orders.length) {
    return <OrdersIsEmpty />;
  }

  return (
    <Box css={{width: '100%'}}>
      <OrdersCards orders={orders} />
    </Box>
  )
};
