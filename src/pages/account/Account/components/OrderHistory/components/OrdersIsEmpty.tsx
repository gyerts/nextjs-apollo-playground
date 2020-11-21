import React from 'react';

import {Button, FlexLayout, H3, Text} from "@market-ui/falcon-ui";
import {ResponsiveIf} from "src/components";
import {T} from "@market-ui/falcon-i18n";


export const OrdersIsEmpty = () => {
  return (
    <FlexLayout flexDirection='column'>
      <ResponsiveIf desktop>
        <H3><T id='account.orders.title' /></H3>
      </ResponsiveIf>
      <Text as='span'><T id='account.orders.emptyPage.message' /></Text>
      <Button><T id='account.orders.emptyPage.button' /></Button>
    </FlexLayout>
  );
};
