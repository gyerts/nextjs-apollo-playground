import React from "react";
import {Box, Divider, extractThemableProps, FlexLayout, Link, Text, ThemedComponentProps} from "@market-ui/falcon-ui";
import {GQLCartItem} from "src/graphql-types";
import {Card} from "src/components/Card";
import {ProductItems} from "../ProductItems";
import {SummaryHeader} from "../SummaryHeader";
import {useSummaryCollapsed} from "../../common/useSummaryCollapsed";
import {T} from "@market-ui/falcon-i18n";
import {useCheckoutPageContext} from "../../context";
import {Price} from "src/uikitEjected/Locale";
import {getCartData} from "src/common";
import { Link as RouterLink } from 'react-router-dom';


interface IProps extends ThemedComponentProps {
  products?: GQLCartItem[]
  collapsible?: boolean
}
export const OrderSummarySection = (props: IProps) => {
  const {themableProps} = extractThemableProps(props);
  const { collapsed, setCollapsed } = useSummaryCollapsed();
  const { cart, shippingMethod } = useCheckoutPageContext();

  const { total, subTotal, totalDiscounts } = getCartData(cart.totals);

  const body = (
    <React.Fragment>
      <Divider my='xs' borderColor='black' />

      <ProductItems products={cart.items} />
      <Divider my='sm' borderColor='black' />

      <Box>
        <FlexLayout justifyContent='space-between'>
          <Text variant='small'><T id='checkout.sections.summary.subtotal' /></Text>
          {subTotal && <Text variant='small'><Price value={subTotal.value} /></Text>}
        </FlexLayout>
        {cart.shippingMethod && (
          <FlexLayout justifyContent='space-between'>
            <FlexLayout alignItems='center'>
              <Text variant='small'><T id='checkout.sections.summary.delivery' /></Text>
              <Link
                variant='small-underlined'
                mx='xs'
                color={'darkLink' as any}
                to='/shopping-with-us#shipping-information'
                as={RouterLink}
              >
                <T id='checkout.sections.summary.moreInfo' />
              </Link>
            </FlexLayout>

            {shippingMethod && <Text variant='small'><Price value={cart.shippingMethod.amount} /></Text>}
          </FlexLayout>
        )}

        {totalDiscounts && Boolean(totalDiscounts.value) && (
          <FlexLayout justifyContent='space-between'>
            <Text variant='small' color='errorText'><T id='checkout.sections.summary.discount' /></Text>
            {totalDiscounts && <Text variant='small' color='errorText'><Price value={totalDiscounts.value} /></Text>}
          </FlexLayout>
        )}
      </Box>
      <Divider my='sm' borderColor='black' />

      <FlexLayout justifyContent='space-between'>
        <Text fontSize='md'><b><T id='checkout.sections.summary.total' /></b></Text>
        {total && <Text fontSize='md'><b><Price value={total.value} /></b></Text>}
      </FlexLayout>
    </React.Fragment>
  );

  return (
    <Card {...themableProps}>
      <SummaryHeader collapsed={collapsed} setCollapsed={setCollapsed} collapsible={props.collapsible} />
      {props.collapsible ? collapsed ? null : body : body}
    </Card>
  )
};

OrderSummarySection.defaultProps = {
  collapsed: false,
  products: [],
} as IProps;
