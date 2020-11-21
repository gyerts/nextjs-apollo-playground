import React, {useCallback} from 'react';
import {
  Text,
  ThemedComponentProps,
  extractThemableProps,
  FlexLayout, Box, Theme, Link
} from '@market-ui/falcon-ui';
import { T } from '@market-ui/falcon-i18n';
import {Card} from "../../../../../components/Card";
import {
  PaymentAmex,
  PaymentDci,
  PaymentDiscover,
  PaymentIsracard,
  PaymentMaestro,
  PaymentMastercard,
  PaymentVisa,
} from "src/styling";

import {Tranzila} from "src/components/Tranzila";
import {useCheckoutPageContext} from "../../context";
import {getCartData} from "src/common/helpers";
import {IChargeResponse} from "src/components/Tranzila/types";
import {PaymentMethodLine} from "./AddressSection/PaymentMethodLine";

// Loading "PaymentMethodItem" component via loadable package
// to avoid premature import of Payment frontend-plugins and their dependencies on SSR
// const PaymentMethodItem = loadable(() =>
//   import(/* webpackChunkName: "checkout/payment-item" */ '../payment/PaymentMethodItem')
// );

interface IProps extends ThemedComponentProps {
  // flag that indicates if the section is currently open
  collapsed: boolean

  // callback payment change completed
  onChange?: (tranzilaResponse: IChargeResponse['transaction_response']) => void
}
export const PaymentMethodSection = (props: IProps) => {
  const {themableProps} = extractThemableProps(props);
  const {loading, setLoading, customer, cart, paymentMethod} = useCheckoutPageContext();
  const {total} = getCartData(cart.totals);

  const startLoadingAnimation = useCallback(function (loading: boolean) {
    loading ? setLoading('paymentMethod') : setLoading(undefined);
  }, []);

  const onMoneyCharged = useCallback(function (data: IChargeResponse['transaction_response']) {
    props.onChange && props.onChange(data);
  }, []);

  const body = (
    <React.Fragment>
      <Text my="sm"><T id='checkout.sections.payment-method.tip' /></Text>

      <CreditCards mb='md' />
      <Tranzila
        amount={total.value}
        onMoneyCharged={onMoneyCharged}
        onStartLoading={startLoadingAnimation}
        email={customer.email}
        orderId={cart.id}
        paymentMethod={paymentMethod}
      />
      <Text my="sm" fontSize='xs'>
        <T id='checkout.sections.payment-method.terms._1' />
        &nbsp;
        <Link variant='underlined' fontSize='xs' my="sm"><T id='checkout.sections.payment-method.terms._2' /></Link>
      </Text>
    </React.Fragment>
  );

  return (
    <Card as='section' {...themableProps} loading={loading === 'paymentMethod'}>
      <Text><b><T id='checkout.sections.payment-method.title' /></b></Text>
      {props.collapsed && <PaymentMethodLine paymentMethod={paymentMethod} />}
      {!props.collapsed && body}
    </Card>
  );
};

const CreditCard = ({children}: any) => {
  return (
    <Box mr='xs' css={({theme}: {theme: Theme}) => ({
      padding: 3,
      height: 30,
      width: 50,
      // @ts-ignore
      border: `1px solid ${theme.colors.hr}`,
    })}>
      {React.cloneElement(children, {css: {height: '100%', width: '100%'}})}
    </Box>
  );
};

interface ICreditCardsProps extends ThemedComponentProps {
}
const CreditCards = (props: ICreditCardsProps) => {
  const { themableProps } = extractThemableProps(props);
  return (
    <FlexLayout {...themableProps}>
      <CreditCard>
        <PaymentVisa />
      </CreditCard>

      <CreditCard>
        <PaymentMastercard />
      </CreditCard>

      <CreditCard>
        <PaymentMaestro />
      </CreditCard>

      <CreditCard>
        <PaymentIsracard />
      </CreditCard>

      <CreditCard>
        <PaymentAmex />
      </CreditCard>

      <CreditCard>
        <PaymentDci />
      </CreditCard>

      <CreditCard>
        <PaymentDiscover />
      </CreditCard>
    </FlexLayout>
  );
};
