import React, {useCallback, useEffect, useRef, useState} from "react";
import {EditAddressSectionImpl} from "./EditAddressImpl";
import {AddNewAddressSectionImpl} from "./AddAddressImpl";
import {ListAddressesImpl} from "./ListAddressesImpl";
import {useCheckoutPageContext} from "../../../context";
import {PreviewAddressSectionImpl} from "./AddressPreviewImpl";
import {AddressFormValues} from "src/components/FormsSet";
import {AddressesQuery, IAddress, IAddressResponse} from "src/api";


interface ISwitchProps {
  collapsed: boolean
  editMode: boolean
  disabled: boolean
  address: IAddress
  addressType: 'deliveryAddress'|'billingAddress'

  onAddressSelected(address: IAddress): void
  onNewAddress(addressFormData: AddressFormValues): void
  onAddressChanged(address: IAddress): void

  setAddressToEdit(address: IAddress): void
  enableAddNewAddressMode(): void
  disableAddNewAddressMode(): void
  addressToEdit: IAddress
  addNewAddressMode: boolean
}
export const SectionSwitch = (props: ISwitchProps) => {
  return (
    <AddressesQuery>{({addresses: {items: addresses}}: IAddressResponse) => (
      <SectionSwitchImpl
        {...props}
        addresses={addresses.filter(a => props.addressType === 'deliveryAddress' ? a.shippingAddress : !a.shippingAddress)}
      />
    )}</AddressesQuery>
  );
};

const SectionSwitchImpl = (props: ISwitchProps & {addresses: IAddress[]}) => {
  const {requestForceOpenSection} = useCheckoutPageContext();
  const { addresses, addressesRef } =
    useFilteredAddresses(props.addresses, props.addressType === "deliveryAddress");

  const {
    address,
    editMode,
    collapsed,
    addressType,
    setAddressToEdit,
    enableAddNewAddressMode,
    disableAddNewAddressMode,
    addressToEdit,
    addNewAddressMode,
    onAddressChanged,
  } = props;

  const onCancelEditAddress = useCallback(function () {
    setAddressToEdit(undefined);
    requestForceOpenSection(undefined);
  }, []);

  const onNewAddressAdded = useCallback(function (address: AddressFormValues) {
    props.onNewAddress(address);
    disableAddNewAddressMode();
  }, []);

  /**
   * render
   */

  if (collapsed && !editMode && address) {
    return <PreviewAddressSectionImpl
      address={address}
      addressType={addressType}
      disabled={props.disabled}
    />;
  }

  if (addressToEdit) {
    return (
      <EditAddressSectionImpl
        address={addressToEdit}
        onCancel={onCancelEditAddress}
        addressType={addressType}
        onAddressChanged={onAddressChanged}
      />
    );
  }

  if (addNewAddressMode || (!props.addresses.length && !collapsed)) {
    return (
      <AddNewAddressSectionImpl
        {...props}
        addressType={addressType}
        disableAddNewAddressMode={disableAddNewAddressMode}
        onChange={onNewAddressAdded}
      />
    )
  }

  if (collapsed) {
    return null;
  }

  return (
    <ListAddressesImpl
      requestEditAddress={setAddressToEdit}
      requestAddNewAddressMode={enableAddNewAddressMode}
      onChange={props.onAddressSelected}

      address={address}
      addressType={addressType}
      addresses={addresses}
      addressesRef={addressesRef}
    />
  );
};

const useFilteredAddresses = (addrList: IAddress[], showShippingAddresses: boolean) => {
  const filterPredicate = useCallback(a => a.shippingAddress === showShippingAddresses, []);
  const [addresses, setAddresses] = useState([]);
  const addressesRef = useRef(addresses);
  useEffect(function () {
    setAddresses(addrList.filter(filterPredicate));
  }, [addrList]);
  useEffect(function () {
    addressesRef.current = addresses;
  }, [addresses]);
  return {
    addresses, addressesRef
  };
};
