import React from 'react';

import {Button, FlexLayout, Link, Text, themed} from "@market-ui/falcon-ui";
import {toGridTemplate} from "src/uikitEjected";
import {GQLOrder} from "src/graphql-types";
import {Link as RouterLink} from "react-router-dom";
import {T} from "@market-ui/falcon-i18n";


interface IProps {
  order: GQLOrder
  css?: any
}
export const OrderCard = ({order, css}: IProps) => {
  return (
    <FlexLayout flexDirection='column' my='md' css={css}>

      <Text gridArea={area.title} mb="xs" as='span' variant='bold'><T id='account.orders.card.label' /> {order.entityId}</Text>

      <FlexLayout flexDirection='column' css={{height: 100}} mb='md'>
        {order.createdAt && (
          <OrderDetailLayout>
            <Text gridArea={area.title} as='span' variant='bold'><T id='account.orders.card.date' /></Text>
            <Text gridArea={area.value} as='span'>asd asasd</Text>
          </OrderDetailLayout>
        )}

        {order.status && (
          <OrderDetailLayout>
            <Text gridArea={area.title} as='span' variant='bold'><T id='account.orders.card.status' /></Text>
            <Text gridArea={area.value} as='span'>{order.status}</Text>
          </OrderDetailLayout>
        )}

        <OrderDetailLayout>
          <Text gridArea={area.title} as='span' variant='bold'><T id='account.orders.card.total' /></Text>
          <Text gridArea={area.value} as='span'>{order.grandTotal}</Text>
        </OrderDetailLayout>

        <OrderDetailLayout>
          <Text gridArea={area.title} as='span' variant='bold'><T id='account.orders.card.trackingId' /></Text>
          <Link gridArea={area.value} variant='underlined' css={({theme}: any) => ({color: theme.colors.link})} as={RouterLink}>{order.entityId}</Link>
        </OrderDetailLayout>
      </FlexLayout>

      <Button as={RouterLink} to={`/account/orders/${order.entityId}`}><T id='account.orders.card.view' /></Button>

    </FlexLayout>
  );
};


const area = {
  title: "title",
  value: "value",
  empty: '.',
};

const OrderDetailLayout = themed({
  defaultTheme: {
    orderLayout: {
      display: 'grid',
      gridTemplate: {
        xs: toGridTemplate([
          ['1fr',      '38px',     '1fr'      ],
          [area.title, area.empty, area.value ],
        ]),
      }
    }
  }
});
