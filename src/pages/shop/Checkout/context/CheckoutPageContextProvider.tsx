import React, {Reducer, useCallback, useEffect, useReducer} from "react";
import {
  AddAddressMutation, AddressesQuery,
  CartQuery,
  CustomerQuery,
  EditAddressMutation,
  EstimateShippingMethodsMutation, GET_ADDRESS, GET_CART,
  IAddAddressFn, IAddress, IAddressResponse,
  ICustomerResponse,
  IEditAddressFn,
  IEstimateShippingMethodsFn,
  IEstimateShippingMethodsResponseData,
  IPlaceOrderFn,
  ISetShippingFn, ISetShippingResponseData,
  PlaceOrderMutation,
  SetShippingMutation,
} from "src/api";
import {
  GQLAddress,
  GQLCart, GQLCartItem,
  GQLCustomer, GQLEditAddressInput,
  GQLPaymentMethod,
  GQLShippingMethod
} from "src/graphql-types";
import {AddressFormValues} from "src/components";

import {
  IInitialContext,
  CheckoutPageContext, ISectionType, ILoadingPlace,
} from "./CheckoutPageContext";
import {
  compareAddressToAddress, compareAddressToFormValues, mapAddressToAddressInput,
  mapFormToAddAddressInput, mapFormToEditAddressInput
} from "src/common/helpers/address";
import {ApolloConsumer} from "react-apollo";
import {ApolloClient, QueryOptions} from "apollo-client";
import {useHistory} from "react-router-dom";
import {getCartData} from "src/common/helpers";
import {useHistoryBlock} from "src/utils/history";
import {
  dataLayerPush,
  IDataLayerData,
  IDataLayerProductItem
} from "src/components";
import {mapCartItemToDataLayerProduct} from "src/common/helpers/dataLayerMaps";

function reducer(state: IInitialContext, action: IAction): IInitialContext {
  switch (action.type) {
    case 'setCheckoutPageState':
      return { ...state, ...action.payload.state };
    default:
      throw `CheckoutPageContext unknown action ${JSON.stringify(action)}`;
  }
}

const init = (initialContext: IInitialContext) => initialContext;


export const CheckoutPageContextProvider = ({children}: any) => {
  return (
    <ApolloConsumer>{client => (
      <CartQuery>{({cart}: {cart: GQLCart}) => (cart && (
        <EstimateShippingMethodsMutation>{(estimateShippingMethods: IEstimateShippingMethodsFn) => (
          <SetShippingMutation>{(setShipping: ISetShippingFn) => (
            <PlaceOrderMutation>{(placeOrder: IPlaceOrderFn) => (
              <EditAddressMutation>{(editAddress: IEditAddressFn) => (
                <AddAddressMutation>{(addAddress: IAddAddressFn) => (
                  <CustomerQuery>{({customer}: ICustomerResponse) => (
                    <AddressesQuery>{({addresses: {items: addresses}}: IAddressResponse) => (
                      <CheckoutPageContextProviderImpl
                        cart={cart}
                        addresses={addresses}
                        customer={customer}
                        editAddress={editAddress}
                        addAddress={addAddress}
                        estimateShippingMethods={estimateShippingMethods}
                        placeOrder={placeOrder}
                        setShipping={setShipping}
                        client={client}
                      >
                        {children}
                      </CheckoutPageContextProviderImpl>
                    )}</AddressesQuery>
                  )}</CustomerQuery>
                )}</AddAddressMutation>
              )}</EditAddressMutation>
            )}</PlaceOrderMutation>
          )}</SetShippingMutation>
        )}</EstimateShippingMethodsMutation>
      ))}</CartQuery>
    )}</ApolloConsumer>
  )
};

interface IProps {
  children: any
  client: ApolloClient<any>
  cart: GQLCart
  addresses: GQLAddress[]
  customer?: GQLCustomer

  estimateShippingMethods: IEstimateShippingMethodsFn
  setShipping: ISetShippingFn
  placeOrder: IPlaceOrderFn
  editAddress: IEditAddressFn
  addAddress: IAddAddressFn
}
const CheckoutPageContextProviderImpl = ({children, cart, customer, client, ...props}: IProps) => {
  const history = useHistory();
  const {locked, unblock} = useHistoryBlock();

  useEffect(function () {
    // if user leave the page and it is locked, it means money was authorized but no placeOrder is posted
    locked && unblock();
  }, []);

  // requestForceOpenSection impl
  const requestForceOpenSection = useCallback((forceOpenedSection: ISectionType) => {
    dispatch({type: 'setCheckoutPageState', payload: { state: { forceOpenedSection } }});
  }, []);

  // setLoading impl
  const setLoading = useCallback((loading?: ILoadingPlace) => {
    dispatch({type: 'setCheckoutPageState', payload: { state: { loading } }});
  }, []);

  // setCheckoutPageState impl
  const setCheckoutPageState = useCallback((_: {
    loading: ILoadingPlace
    forceOpenedSection?: 'deliveryAddress'|'billingAddress'
    shippingAddress?: IAddress,
    billingAddress?: IAddress,
    shippingMethods?: GQLShippingMethod[]
    shippingMethod?: GQLShippingMethod
    paymentMethods?: GQLPaymentMethod[]
    paymentMethod?: GQLPaymentMethod
    orderId?: string
  }): void => {
    // ===============================================================================================================
    _.loading && (state.loading = _.loading);
    _.forceOpenedSection && (state.forceOpenedSection = _.forceOpenedSection);
    _.shippingAddress && (state.shippingAddress = _.shippingAddress);
    _.billingAddress && (state.billingAddress = _.billingAddress);
    _.shippingMethods && (state.shippingMethods = _.shippingMethods);
    _.shippingMethod && (state.shippingMethod = _.shippingMethod);
    _.paymentMethods && (state.paymentMethods = _.paymentMethods);
    _.paymentMethod && (state.paymentMethod = _.paymentMethod);
    _.orderId && (state.orderId = _.orderId);
    dispatch({type: 'setCheckoutPageState', payload: {state: _}});
    // ===============================================================================================================
  }, []);

  // gqlPlaceOrder impl
  const gqlPlaceOrder = useCallback(async (transactionData: Object & {transaction_id: string, success: boolean}) => {
    // ===============================================================================================================
    // setLoading('paymentMethod');

    const input = {
      billingAddress: mapAddressToAddressInput(state.billingAddress),
      email: state.customer.email,
      paymentMethod: {
        method: state.paymentMethod.code,
        additionalData: JSON.stringify(transactionData),
      }
    };

    const {total} = getCartData(state.cart.totals);

    const opts: QueryOptions<{cart?: any}> = { query: GET_CART, fetchPolicy: 'cache-only' };
    const {data: {cart}} = await client.query<{cart: GQLCart}>(opts) as any;

    let analyticsData: IDataLayerData = null;
    try {
      analyticsData = {
        event: 'purchase',
        ecommerce: {
          currencyCode: cart.quoteCurrency || 'ILS',
          purchase: {
            actionField: {
              id: '',
              affiliation: "wow",
              revenue: total.value,
              tax: 0,
              shipping: cart.shippingMethod.amount,
              coupon: '',
            },
            products: cart.items.map((cartItem: GQLCartItem): IDataLayerProductItem => {
              return mapCartItemToDataLayerProduct(cartItem);
            })
          },
        },
      };
    } catch (e) {
      console.error('failed to get data from the cart while checkout');
    }

    try {
      const {data}: any = await state._api.placeOrder({variables: {input}, refetchQueries: ['Cart', 'MiniCart']}) as any;
      analyticsData.ecommerce.purchase.actionField.id = data.placeOrder.orderId;
      transactionData.success && dataLayerPush(analyticsData);

      if (data.placeOrder && data.placeOrder.orderId) {
        unblock();
        history.replace(`orderConfirmation/${data.placeOrder.orderId}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(undefined);
    }
    // ===============================================================================================================
  }, []);

  // @ts-ignore
  const fetchCartData = useCallback(async function (): Promise<GQLCart> {
    const opts: QueryOptions<{cart?: any}> = {
      query: GET_CART,
      fetchPolicy: 'network-only',
    };
    const {data: {cart}} = await client.query<{cart: GQLCart}>(opts) as any;
    return cart;
  }, []);

  const gqlEstimateShippingMethodsAddressImpl = useCallback(async function (
    shippingAddress: IAddress,
    sameAsBilling: boolean,
  ): Promise<{
    shippingAddress: IAddress
  }> {
    // state.setLoading('shippingMethod');

    const {data}: {data: IEstimateShippingMethodsResponseData} =
      await state._api.estimateShippingMethods({
        variables: {input: {addressId: shippingAddress.id}},
        refetchQueries: [{
          query: GET_ADDRESS,
        }],
        awaitRefetchQueries: true,
      }) as any;

    const cart = await fetchCartData();

    state.setCheckoutPageState({
      shippingMethods: data.estimateShippingMethods,
      shippingMethod: data.estimateShippingMethods[0],
      shippingAddress: cart.shippingAddress,
      billingAddress: cart.billingAddress,
    });

    return {
      shippingAddress: cart.shippingAddress,
    }
  }, []);

  const gqlEstimateShippingMethodsFormAddressImpl = useCallback(async function (
    addressFormData: AddressFormValues,
    shippingGqlAddressInput: GQLEditAddressInput,
  ): Promise<{
    shippingAddress: IAddress
  }> {
    // state.setLoading('deliveryAddress');

    const {data}: {data: IEstimateShippingMethodsResponseData} =
      await state._api.estimateShippingMethods({
        variables: {input: {address: shippingGqlAddressInput || mapFormToAddAddressInput(addressFormData)}},
        refetchQueries: [{
          query: GET_ADDRESS,
        }],
        awaitRefetchQueries: true,
      }) as any;

    const cart = await fetchCartData();

    state.setCheckoutPageState({
      shippingAddress: cart.shippingAddress,
      billingAddress: cart.billingAddress,
      shippingMethods: data.estimateShippingMethods,
      shippingMethod: data.estimateShippingMethods[0],
    });

    return {
      shippingAddress: cart.shippingAddress,
    };
  }, []);

  // gqlEstimateShippingMethods impl
  const gqlEstimateShippingMethods = useCallback(async (props: {
    shippingAddressForm?: AddressFormValues,
    shippingAddress?: IAddress,
    shippingGqlAddressInput?: GQLEditAddressInput,
    sameAsBilling?: boolean
  }): Promise<{
    shippingAddress: IAddress
  }> => {
    // ===============================================================================================================
    let result: {
      shippingAddress: IAddress
    } = null;

    try {
      if (props.shippingAddress) {
        result = await gqlEstimateShippingMethodsAddressImpl(props.shippingAddress, props.sameAsBilling)
      }
      if (props.shippingAddressForm || props.shippingGqlAddressInput) {
        result = await gqlEstimateShippingMethodsFormAddressImpl(props.shippingAddressForm, props.shippingGqlAddressInput)
      }
    } finally {
      state.setLoading(undefined);
    }

    return result;
    // ===============================================================================================================
  }, []);

  /**
   * gqlSetShipping impl
   *
   * This method should be called from SectionBillingAddress
   * This method should be called when user set shipping address with same as billing checkbox, or
   * This method should be called when user set billing address and press button next
   */
  const gqlSetShipping = useCallback(async (props: {
    billingAddressForm?: AddressFormValues,
    billingGqlAddressInput?: GQLEditAddressInput,
    billingAddress?: IAddress,
    method?: string,
  } = {}) => {
    // ===============================================================================================================

    // state.setLoading('paymentMethod');

    const shippingMethodCode = props.method
      || (state.shippingMethod && state.shippingMethod.methodCode)
      || state.shippingMethods[0].methodCode;

    const shippingAddress = state.shippingAddress;

    let input: {
      shippingAddressId?: string
      billingAddressId?: string
      shippingAddress?: IAddress
      billingAddress?: IAddress|GQLEditAddressInput
      shippingMethodCode: string
      billingSameAsShipping: boolean
    } = null;

    if (props.billingAddressForm) {

      const billingAddress = props.billingAddressForm;
      const billingSameAsShipping = compareAddressToFormValues(shippingAddress, billingAddress);

      if (!shippingMethodCode || !billingAddress || !shippingAddress) {
        const err = 'gqlSetShipping -> shippingMethodCode billingAddress shippingAddress should be set';
        console.error(err, {shippingMethodCode, billingAddress, shippingAddress});
        throw err;
      }

      // state.setCheckoutPageState({billingAddress: state.billingAddress});

      input = {
        shippingAddressId: shippingAddress.id,
        billingAddress: billingSameAsShipping
          ? undefined : mapFormToEditAddressInput(billingAddress, {shippingAddress: false}),
        billingSameAsShipping,
        shippingMethodCode,
      };

    } else if (props.billingGqlAddressInput) {
      const billingAddress = props.billingGqlAddressInput;
      const billingSameAsShipping = compareAddressToAddress(shippingAddress, billingAddress);

      if (!shippingMethodCode || !billingAddress || !shippingAddress) {
        const err = 'gqlSetShipping -> shippingMethodCode billingAddress shippingAddress should be set';
        console.error(err, {shippingMethodCode, billingAddress, shippingAddress});
        throw err;
      }

      // state.setCheckoutPageState({billingAddress: state.billingAddress});
      input = {
        shippingAddressId: shippingAddress.id,
        billingAddress: billingAddress,
        billingSameAsShipping,
        shippingMethodCode
      };

    } else if (props.billingAddress || state.billingAddress) {

      const billingAddress = props.billingAddress || state.billingAddress;
      const billingSameAsShipping = compareAddressToAddress(shippingAddress, billingAddress);

      if (!shippingMethodCode || !billingAddress || !shippingAddress) {
        const err = 'gqlSetShipping -> shippingMethodCode billingAddress shippingAddress should be set';
        console.error(err, {shippingMethodCode, billingAddress, shippingAddress});
        throw err;
      }

      // state.setCheckoutPageState({billingAddress: state.billingAddress});
      input = {
        shippingAddressId: shippingAddress.id,
        billingAddressId: billingAddress.id,
        billingSameAsShipping,
        shippingMethodCode
      };

    }

    try {
      const {data}: {data: ISetShippingResponseData} = await state._api.setShipping({variables: {input}}) as any;

      const cart = await fetchCartData();
      state.setCheckoutPageState({
        paymentMethods: data.setShipping.paymentMethods,
        paymentMethod: data.setShipping.paymentMethods[0],
        shippingAddress: cart.shippingAddress,
        billingAddress: cart.billingAddress,
      });
    } catch (e) {

      console.error(e);
    } finally {
      state.setLoading(undefined);
    }

    // ===============================================================================================================
  }, []);

  const [state, dispatch] = useReducer<IReducerProps, IInitialContext>(reducer, {
    cart,
    customer,
    loading: undefined,
    requestForceOpenSection,
    setLoading,
    setCheckoutPageState,

    shippingAddress: cart.shippingAddress,
    billingAddress: cart.billingAddress,
    shippingMethod: cart.shippingMethod,
    shippingMethods: cart.avaliableShippingMethods,
    paymentMethod: cart.paymentMethods && cart.paymentMethods[0],
    paymentMethods: cart.paymentMethods,
    orderId: undefined,

    gqlEstimateShippingMethods,
    gqlSetShipping,
    gqlPlaceOrder,

    _api: {
      editAddress: props.editAddress,
      addAddress: props.addAddress,
      estimateShippingMethods: props.estimateShippingMethods,
      placeOrder: props.placeOrder,
      setShipping: props.setShipping,
    },
  }, init);

  return (
    <CheckoutPageContext.Provider value={{ ...state, cart }}>
      {children}
    </CheckoutPageContext.Provider>
  );
};

/**
 * TYPE DEFINITION
 */
interface IAction {
  type:
    |'setCheckoutPageState'

  payload: {
    state?: any
  }
}
type IReducerProps = Reducer<IInitialContext, IAction>;
