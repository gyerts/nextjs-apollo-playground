import React from "react";
import {T} from "@market-ui/falcon-i18n";
import {
  AddressForm,
  AddressFormValues,
  defaultInitialAddressFormData,
} from "src/components";
import {useCheckoutPageContext} from "../../../context";


interface IImplProps {
  onChange: (values: AddressFormValues) => void
  disableAddNewAddressMode(): void
  addressType: 'deliveryAddress'|'billingAddress'
}

export const AddNewAddressSectionImpl = (props: IImplProps) => {
  const {customer} = useCheckoutPageContext();

  return (
    <AddressForm
      id={`add-new-${props.addressType}-address-form`}
      submitLabel={<T id='words.caps.next' />}
      initData={{
        ...defaultInitialAddressFormData,
        firstname: customer.firstname,
        lastname: customer.lastname,
        defaultShipping: false,
        defaultBilling: false,
        same: undefined /*props.addressType === 'deliveryAddress' ? true : undefined*/,
      }}
      onSubmit={props.onChange}
      onCancel={props.disableAddNewAddressMode}
      addressType={props.addressType}
    />
  );
};
