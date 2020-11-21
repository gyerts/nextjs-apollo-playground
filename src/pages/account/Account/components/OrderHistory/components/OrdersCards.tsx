import React from 'react';

import {Box, FlexLayout, GridLayout, H3, Text, themed} from "@market-ui/falcon-ui";
import {ResponsiveIf} from "src/components";
import {GQLOrder} from "src/graphql-types";
import {OrderCard} from "./OrderCard";
import {mobileOnly} from "src/styling/cssHelper";
import {T} from "@market-ui/falcon-i18n";


interface IProps {
  orders: GQLOrder[]
}
export const OrdersCards = ({orders}: IProps) => {
  return (
    <FlexLayout flexDirection='column'>
      <ResponsiveIf desktop>
        <H3><T id='account.orders.title' /></H3>
      </ResponsiveIf>
      <Text
        as='span'
        mx={mobileOnly('xs')}
        mt={mobileOnly('md')}
      >
        <T id='account.orders.tip' />
      </Text>

      <ResponsiveIf maxWidth='md'>
        <Box mx='xs'>
          {orders.map((order, index) => (
            <React.Fragment>
              <OrderCard order={order} />
              {index < orders.length - 1 && <Divider my='md' css={{height: 110}} />}
            </React.Fragment>
          ))}
        </Box>
      </ResponsiveIf>

      <ResponsiveIf minWidth='md'>
        <GridLayout css={{ gridTemplateColumns: `1fr 60px 1fr` }}>
          {orders.map((order, index) => {
            const first = !Boolean(index % 2);

            return (
              <React.Fragment>
                {first  && <OrderCard order={order} css={{gridColumn: 1}} />}
                {first  && <Divider variant='vertical' mt='md' css={{height: 110, gridColumn: 2}} />}
                {!first && <OrderCard order={order} css={{gridColumn: 3}} />}
              </React.Fragment>
            )
          })}
        </GridLayout>
      </ResponsiveIf>

    </FlexLayout>
  );
};

export const Divider = themed({
  tag: 'div',
  defaultProps: {
    variant: 'horizontal',
  },
  defaultTheme: {
    dividerTheme: {
      css: {
        backgroundColor: 'black',
      },
      variants: {
        vertical: {
          css: {
            marginLeft: 'auto',
            marginRight: 'auto',
            width: 1,
            height: '100%',
          }
        },
        horizontal: {
          css: {
            marginTop: 'auto',
            marginBottom: 'auto',
            width: '100%',
            maxHeight: 1,
          }
        },
      }
    },
  }
});
