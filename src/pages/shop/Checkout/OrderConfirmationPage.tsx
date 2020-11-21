import React from "react";
import {useParams} from "react-router";

import {FlexLayout} from "@market-ui/falcon-ui";
import {ThankYouSection} from "./components/sections/ThankYouSection";
import {CustomerQuery, ICustomer} from "src/api";


export default () => {
  const {orderId} = useParams();

  return (
    <CustomerQuery>{({customer}: {customer: ICustomer}) => (
      <FlexLayout justifyContent='center' css={{width: '100%'}}>

        <ThankYouSection
          orderId={orderId}
          email={customer.email}
          mb='sm'
          css={{maxWidth: 500, width: '100%'}}
        />

        {/*<AddressSection*/}
        {/*  collapsed={true}*/}
        {/*  disabled={true}*/}
        {/*  mb='sm'*/}
        {/*  addressType='delivery'*/}
        {/*  address={shippingAddress}*/}
        {/*/>*/}
        {/*<AddressSection*/}
        {/*  collapsed={true}*/}
        {/*  disabled={true}*/}
        {/*  mb='sm'*/}
        {/*  addressType='billing'*/}
        {/*  address={billingAddress}*/}
        {/*/>*/}

        {/*<DeliveryMethodSection*/}
        {/*  collapsed={true}*/}
        {/*  mb='sm'*/}
        {/*/>*/}

        {/*<PaymentMethodSection*/}
        {/*  collapsed={true}*/}
        {/*  mb='sm'*/}
        {/*/>*/}
      </FlexLayout>
    )}</CustomerQuery>
  )
};
