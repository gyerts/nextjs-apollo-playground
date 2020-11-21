import React from "react";
import {
  Box,
  Divider,
  extractThemableProps,
  H2,
  Link,
  Text,
  themed,
  ThemedComponentProps
} from "@market-ui/falcon-ui";
import {OrderSummarySection} from "../../../../shop/Checkout/components/sections/OrderSummurySection";
import {Card, ResponsiveIf, AddressFormValues, AddressPreview} from "src/components";
import {GQLOrder} from "src/graphql-types";
import {useParams} from "react-router-dom";
import {toGridTemplate} from "src/uikitEjected/helpers";
import {mobileOnly} from "src/styling/cssHelper";
import {Price} from "src/uikitEjected/Locale";
import {Link as RouterLink} from "react-router-dom";
import {ArrowLeftLgIcon} from "src/styling";
import {T} from "@market-ui/falcon-i18n";


interface IProps {
}
export const ViewOrder = () => {
  const {orderId} = useParams();

  const shippingAddress: AddressFormValues = {
    floor: '2',
    flat: '147',
    same: true,
    telephone: '0933310233',
    postcode: '68004',
    city: 'Chernomorsk, Odessa region',
    street1: 'Vitalia Shuma',
    street2: '21',
    firstname: 'Yuriy',
    lastname: 'Gyerts',
  };

  return (
    <Box css={{width: '100%'}}>
      <ResponsiveIf mobile>
        <Link as={RouterLink} to='/account/orders' display='flex' alignItems='center' mx='xs' mt='sm' mb='lg'>
          <ArrowLeftLgIcon />&nbsp;
          <T id='account.backButtons.orders' />
        </Link>
      </ResponsiveIf>

      <H2 m="xs" fontSize={mobileOnly('lg')}><T id='account.order.title' /></H2>

      <ViewOrderInfo
        entityId={orderId}
        createdAt='07 March 2017'
        status='Created'

        bgFullWidth={mobileOnly('white')}
      />

      <Card bgFullWidth={mobileOnly('white')}>
        <Text as='span' variant='bold' css={{ letterSpacing: 0.9 }}><T id='account.order.deliveryAddr' />:</Text>
        <AddressPreview address={shippingAddress} />

        <Divider my="sm" />

        <Text as='span' variant='bold' css={{ letterSpacing: 0.9 }}><T id='account.order.billingAddr' />:</Text>
        <AddressPreview address={shippingAddress} />

        <Divider my="sm" />

        <Text as='span' variant='bold' css={{ letterSpacing: 0.9 }}><T id='account.order.opts.title' />:</Text>
        <Text display='flex'><T id='account.order.opts.when' />&nbsp;<Price value={21.65} /></Text>
        <Text color={'copyrightText' as any}><T id='account.order.opts.graphic' /></Text>

        <Divider my="sm" />

        <Text as='span' variant='bold' css={{ letterSpacing: 0.9 }}><T id='account.order.paymentMethod' />:</Text>
        <Text><T id='words.paypal' /></Text>
      </Card>

      <OrderSummarySection collapsible={false} bgFullWidth={mobileOnly('white')} />

      <Card bgFullWidth={mobileOnly('primary')}>
        <Text py='xs'>
          <T id='account.order.policy._1' />&nbsp;
          <Link as={RouterLink} to='/terms-conditions' variant="underlined"><T id='account.order.policy._2' /></Link>&nbsp;
          <T id='account.order.policy._3' />.
        </Text>
      </Card>
    </Box>
  )
};


interface IViewOrderInfoProps extends ThemedComponentProps {
  entityId: GQLOrder['entityId']
  createdAt: GQLOrder['createdAt']
  status: GQLOrder['status']
}
const ViewOrderInfo = ({entityId, createdAt, status, ...props}: IViewOrderInfoProps) => {
  const { themableProps } = extractThemableProps(props);

  return (
    <Card {...themableProps}>
      <ViewOrderInfoBox>
        <Text gridArea={area.label} as='span' variant='bold'><T id='account.order.info.number' />:</Text>
        <Text gridArea={area.value} as='span'>{entityId}</Text>
      </ViewOrderInfoBox>

      <ViewOrderInfoBox>
        <Text gridArea={area.label} as='span' variant='bold'><T id='account.order.info.date' />:</Text>
        <Text gridArea={area.value} as='span'>{createdAt}</Text>
      </ViewOrderInfoBox>

      <ViewOrderInfoBox>
        <Text gridArea={area.label} as='span' variant='bold'><T id='account.order.info.status' />:</Text>
        <Text gridArea={area.value} as='span'>{status}</Text>
      </ViewOrderInfoBox>
    </Card>
  );
};

const area = {
  label: 'label',
  value: 'value',
};
const ViewOrderInfoBox = themed({
  defaultTheme: {
    viewOrderInfoLayout: {
      display: 'grid',
      gridTemplate: {
        xs: toGridTemplate([
          ['130px',      '1fr'      ],
          [area.label, area.value ],
        ]),
      }
    }
  }
});
