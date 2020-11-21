import React from "react";
import {
  IAddAddressFn, IAddress,
  IEditAddressFn,
  IEstimateShippingMethodsFn,
  IPlaceOrderFn,
  ISetShippingFn
} from "src/api";
import {AddressFormValues} from "src/components";
import {
  GQLAddress,
  GQLCart,
  GQLCustomer,
  GQLEditAddressInput,
  GQLPaymentMethod,
  GQLShippingMethod
} from "src/graphql-types";

export const FUNC_STUB: any = () => { throw 'FUNC_STUB usage' };

export const initialContext: IInitialContext = {
  cart: null,
  customer: undefined,
  addresses: undefined,

  loading: undefined,
  forceOpenedSection: undefined,
  shippingAddress: undefined,
  billingAddress: undefined,
  shippingMethods: undefined,
  shippingMethod: undefined,
  paymentMethods: undefined,
  paymentMethod: undefined,
  orderId: undefined,

  setCheckoutPageState: FUNC_STUB,
  requestForceOpenSection: FUNC_STUB,
  setLoading: FUNC_STUB,

  gqlEstimateShippingMethods: FUNC_STUB,
  gqlSetShipping: FUNC_STUB,
  gqlPlaceOrder: FUNC_STUB,

  _api: {
    editAddress: FUNC_STUB,
    addAddress: FUNC_STUB,
    estimateShippingMethods: FUNC_STUB,
    setShipping: FUNC_STUB,
    placeOrder: FUNC_STUB,
  }
};

export const CheckoutPageContext = React.createContext<IInitialContext>(initialContext);

/**
 * TYPE DEFINITION
 */
export interface IInitialContextProps {
  cart: GQLCart
  customer?: GQLCustomer
  addresses?: GQLAddress[]

  loading: ILoadingPlace
  forceOpenedSection?: 'deliveryAddress'|'billingAddress'
  shippingAddress?: IAddress,
  billingAddress?: IAddress,
  shippingMethods?: GQLShippingMethod[]
  shippingMethod?: GQLShippingMethod
  paymentMethods?: GQLPaymentMethod[]
  paymentMethod?: GQLPaymentMethod
  orderId?: string

  setCheckoutPageState(state: {
    shippingAddress?: IAddress,
    billingAddress?: IAddress,
    shippingMethods?: GQLShippingMethod[]
    shippingMethod?: GQLShippingMethod
    paymentMethods?: GQLPaymentMethod[]
    paymentMethod?: GQLPaymentMethod
    orderId?: string
  }): void

  gqlEstimateShippingMethods(props: {
    shippingAddressForm?: AddressFormValues,
    shippingAddress?: IAddress,
    sameAsBilling?: boolean
  }): Promise<{
    shippingAddress: IAddress
  }>
  gqlSetShipping(props: {
    billingAddressForm?: AddressFormValues,
    billingAddress?: IAddress,
    billingGqlAddressInput?: GQLEditAddressInput,
    method?: string,
  }): Promise<void>
  gqlPlaceOrder(additionalData: Object): Promise<void>
}

export interface IInitialContextMethods {
  requestForceOpenSection(sectionType?: ISectionType): void
  setLoading(loading?: ILoadingPlace): void

  _api: {
    addAddress: IAddAddressFn
    editAddress: IEditAddressFn
    estimateShippingMethods: IEstimateShippingMethodsFn
    setShipping: ISetShippingFn,
    placeOrder: IPlaceOrderFn,
  }
}
export interface IInitialContext extends IInitialContextProps, IInitialContextMethods {
}

export type ISectionType = 'deliveryAddress'|'billingAddress'|'shippingMethod'|'paymentMethod';
export type ILoadingPlace = 'global'|ISectionType;
