import React, {useCallback, useEffect, useRef} from 'react';
import {LayoutLayer} from "./components/layers/LayoutLayer";
import {Box, FlexLayout} from "@market-ui/falcon-ui";
import {PaymentMethodSection} from "./components/sections/PaymentMethodSection";
import {toGridTemplate} from "src/uikitEjected";
import {DeliveryMethodSection} from "./components/sections/DeliveryMethodSection";
import {OrderSummarySection} from "./components/sections/OrderSummurySection";
import {bothResolutions} from "src/styling/cssHelper";
import {CheckoutPageContextProvider, useCheckoutPageContext} from './context';
import {AddressSection} from "./components/sections/AddressSection";
import {GoogleApiScript} from "src/components/GoogleApiScript";
import {AddressFormValues, useGoogleAutocompleteOptions} from "src/components/FormsSet";
import {IChargeResponse} from "src/components/Tranzila/types";
import {IAddress} from "src/api";
import {mapAddressToAddressFormValues} from "src/common/helpers/address";
import {GQLEditAddressInput} from "src/graphql-types";
import {scrollToTop} from "src/utils/scrolling";
import {useHistory} from "react-router-dom";
import {usePostSectionAnimation} from "./common/usePostSectionAnimation";


export const CheckoutPageArea = {
  empty: '.',
  summary: 'summary',
  forms: 'forms',
};
export const CheckoutPageLayout = {
  cartSummaryLayout: {
    display: 'grid',
    gridGap: bothResolutions('xs', 'lg'),
    // css={{width: '100%'}} justifyContent='center'
    gridTemplate: {
      xl: toGridTemplate([
        ['1fr',                     '514px',                  '514px',                    '1fr'                  ],
        [CheckoutPageArea.empty,    CheckoutPageArea.forms,   CheckoutPageArea.summary,   CheckoutPageArea.empty ],
      ]),
      lg: toGridTemplate([
        ['1fr',                     '514px',                  '514px',                    '1fr'                  ],
        [CheckoutPageArea.empty,    CheckoutPageArea.forms,   CheckoutPageArea.summary,   CheckoutPageArea.empty ],
      ]),
      md: toGridTemplate([
        ['1fr',                    '1fr',                   ],
        [CheckoutPageArea.forms,   CheckoutPageArea.summary ],
      ]),
      sm: toGridTemplate([
        ['1fr',                    '1fr',                   ],
        [CheckoutPageArea.forms,   CheckoutPageArea.summary ],
      ]),
      xs: toGridTemplate([
        ['1fr',                    ],
        [CheckoutPageArea.summary, ],
        [CheckoutPageArea.forms,   ],
      ]),
    }
  }
};

export const CheckoutPage = () => {
  return (
    <CheckoutPageContextProvider>
      <CheckoutPageImpl />
    </CheckoutPageContextProvider>
  )
};

const CheckoutPageImpl = () => {
  const {
    gqlEstimateShippingMethods,
    gqlPlaceOrder,
    gqlSetShipping,
    forceOpenedSection,
    requestForceOpenSection,
    shippingAddress,
    billingAddress,
    shippingMethods,
    paymentMethods,
    addresses,
    setLoading,
    loading,
    cart,
  } = useCheckoutPageContext();
  const googleAutocompleteOptions = useGoogleAutocompleteOptions();
  const history = useHistory();

  const scrollAdLoadDeliverySection = usePostSectionAnimation('deliveryAddress', setLoading);
  const scrollAdLoadBillingSection = usePostSectionAnimation('billingAddress', setLoading);

  // if (!cart) {
  //   if (window.history.length === 2) {
  //     history.push('/');
  //   } else {
  //     history.goBack();
  //   }
  // }
  if (cart.itemsQty === 0) {
    history.replace('/cart');
  }

  const addressesRef = useRef(addresses);
  useEffect(function () { addressesRef.current = addresses }, [addresses]);

  const billingAddressRef = useRef(billingAddress);
  useEffect(function () { billingAddressRef.current = billingAddress }, [billingAddress]);

  const handleDeliveryAddress = useCallback(async (props: {
    shippingAddressForm?: AddressFormValues,
    shippingGqlAddressInput?: GQLEditAddressInput,
    shippingAddress?: IAddress,
    sameAsBilling?: boolean
  }) => {
    const { shippingAddress } = await gqlEstimateShippingMethods(props);
    if (props.sameAsBilling) {
      await gqlSetShipping({
        billingAddressForm: mapAddressToAddressFormValues(shippingAddress),
      });
    }
  }, []);



  const onNewDeliveryAddress = useCallback(async (addressFormData: AddressFormValues) => {
    scrollAdLoadDeliverySection();
    await handleDeliveryAddress({shippingAddressForm: addressFormData, sameAsBilling: addressFormData.same});requestForceOpenSection(undefined);
  }, []);
  const onDeliveryAddressChanged = useCallback(async (shippingGqlAddressInput: GQLEditAddressInput) => {
    scrollAdLoadDeliverySection();
    requestForceOpenSection(undefined);
    await handleDeliveryAddress({shippingGqlAddressInput});
  }, []);
  const onDeliveryAddressSelected = useCallback(async (shippingAddress: IAddress) => {
    scrollAdLoadDeliverySection();
    requestForceOpenSection(undefined);
    await handleDeliveryAddress({shippingAddress});
  }, []);


  const onNewBillingAddress = useCallback(async (billingAddressForm: AddressFormValues) => {
    scrollAdLoadBillingSection();
    await gqlSetShipping({billingAddressForm});
    requestForceOpenSection(undefined);
  }, []);
  const onBillingAddressChanged = useCallback(async (billingGqlAddressInput: GQLEditAddressInput) => {
    scrollAdLoadBillingSection();
    await gqlSetShipping({billingGqlAddressInput});
  }, []);
  const onBillingAddressSelected = useCallback(async (billingAddress: IAddress) => {
    scrollAdLoadBillingSection();
    await gqlSetShipping({billingAddress});
  }, []);

  const onDeliveryMethodChange = useCallback(function (method: string) {
    gqlSetShipping({method});
  }, []);
  const onPaymentMethodChange = useCallback(async function (
    tranzilaResponse: IChargeResponse['transaction_response'],
  ) {
    await gqlPlaceOrder(tranzilaResponse);
    setLoading(undefined);
    // scrollToTop();
  }, []);

  const forceOpeneddeliveryAddress = forceOpenedSection && forceOpenedSection === 'deliveryAddress';
  const forceOpenedbillingAddress = forceOpenedSection && forceOpenedSection === 'billingAddress';

  const step1 = loading == 'deliveryAddress' || forceOpeneddeliveryAddress || !shippingAddress;
  const step2 = loading == 'billingAddress' || forceOpenedbillingAddress || (!step1 && !billingAddress);
  const step3 = !step1 && !step2 && shippingMethods;
  const step4 = !step1 && !step2 && paymentMethods;

  return (
    <LayoutLayer>
      <GoogleApiScript language={googleAutocompleteOptions.language} />

      <FlexLayout defaultTheme={CheckoutPageLayout as any}>
        <OrderSummarySection
          gridArea={CheckoutPageArea.summary}
        />

        <Box gridArea={CheckoutPageArea.forms}>
          <AddressSection
            collapsed={!step1}
            mb='sm'
            addressType='deliveryAddress'
            id='deliveryAddress'
            address={shippingAddress}
            loading={loading === 'deliveryAddress'}

            onNewAddress={onNewDeliveryAddress}
            onAddressSelected={onDeliveryAddressSelected}
            onAddressChanged={onDeliveryAddressChanged}
          />
          <AddressSection
            collapsed={!step2}
            mb='sm'
            id='billingAddress'
            addressType='billingAddress'
            address={billingAddress}
            loading={loading === 'billingAddress'}

            onNewAddress={onNewBillingAddress}
            onAddressSelected={onBillingAddressSelected}
            onAddressChanged={onBillingAddressChanged}
          />

          <DeliveryMethodSection
            collapsed={!step3}
            onChange={onDeliveryMethodChange}
            mb='sm'
          />

          <PaymentMethodSection
            collapsed={!step4}
            onChange={onPaymentMethodChange}
            mb='sm'
          />
        </Box>
      </FlexLayout>

    </LayoutLayer>
  );
};
