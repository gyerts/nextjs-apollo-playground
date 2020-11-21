import React, {useCallback} from "react";
import {T} from "@market-ui/falcon-i18n";
import {
  AddressForm,
  AddressFormValues,
} from "src/components";
import {IAddress} from "src/api";
import {
  compareAddressToAddress,
  mapAddressToAddressFormValues,
  mapFormToEditAddressInput
} from "src/common/helpers/address";
import {useCheckoutPageContext} from "../../../context";


interface IImplProps {
  onCancel: () => void
  onAddressChanged(address: IAddress): void
  address: IAddress
  addressType: 'deliveryAddress'|'billingAddress'
}

export const EditAddressSectionImpl = (props: IImplProps) => {
  const { billingAddress } = useCheckoutPageContext();
  const {address: a} = props;

  const onChange = useCallback(async function (formValues: AddressFormValues) {
    props.onAddressChanged(mapFormToEditAddressInput(formValues, a));
    props.onCancel();
  }, []);

  // @ts-ignore
  const billingSame = undefined;/*props.addressType === 'deliveryAddress' ?
    compareAddressToAddress(a, billingAddress) : undefined;*/

  return (
    <AddressForm
      id={`${props.addressType}-address-form`}
      submitLabel={<T id='words.caps.next' />}
      initData={mapAddressToAddressFormValues(props.address, billingSame)}
      onSubmit={onChange}
      onCancel={props.onCancel}
      addressType={props.addressType}
    />
  );
};
