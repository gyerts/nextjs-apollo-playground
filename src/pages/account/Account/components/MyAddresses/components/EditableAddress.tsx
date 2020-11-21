import React, {useCallback, useEffect, useRef} from 'react';
import {Box, Button, Checkbox, FlexLayout, Text} from "@market-ui/falcon-ui";
import {GQLAddressPreview, ResponsiveIf} from "src/components";
import {DeleteButton} from "./DeleteButton";
import {IAddress} from "src/api";
import {mobileOnly} from "src/styling/cssHelper";
import {T} from "@market-ui/falcon-i18n";


interface IProps {
  address: IAddress
  setAddressToEdit: (address: IAddress) => void
  onSetDefaultShipping: (address: IAddress) => void
}
export function EditableAddress ({address, setAddressToEdit, onSetDefaultShipping}: IProps) {
  const addressRef = useRef(address);

  useEffect(function () {
    addressRef.current = address;
  }, [address]);

  const _setAddressToEdit = useCallback(function () {
    setAddressToEdit(addressRef.current);
  }, []);

  const setAsDefaultShippingAddress = useCallback(function () {
    onSetDefaultShipping(addressRef.current);
  }, []);

  return (
    <Box mb='sm' px={mobileOnly('xs')}>
      <FlexLayout justifyContent='space-between' alignItems='flex-start' mb='xs'>
        <GQLAddressPreview address={address} />

        <ResponsiveIf mobile>
          <FlexLayout flexDirection='column' alignItems='center'>
            <Button variant='link-underlined' onClick={_setAddressToEdit} mb='sm'><T id='words.edit' /></Button>
            <DeleteButton id={address.id} disabled={address.defaultShipping || address.defaultBilling} />
          </FlexLayout>
        </ResponsiveIf>

        <ResponsiveIf desktop>
          <FlexLayout flexDirection='raw' alignItems='center'>
            <DeleteButton id={address.id} disabled={address.defaultShipping || address.defaultBilling} />
            <Box width='sm' />
            <Button variant='link-underlined' onClick={_setAddressToEdit}><T id='words.edit' /></Button>
          </FlexLayout>
        </ResponsiveIf>

      </FlexLayout>

      {address.defaultShipping ? (
        <Text><T id="account.addresses.card.defaultDelivery" /></Text>
      ) : (
        <AddressDefaultSet
          checked={false}
          onChecked={setAsDefaultShippingAddress}
          text={<T id="account.addresses.card.setDefaultDelivery" />}
        />
      )}
    </Box>
  )
}

interface IAddressDefaultSetProps {
  onChecked: () => void
  text: React.ReactElement
  checked: boolean
}
const AddressDefaultSet = (props: IAddressDefaultSetProps) => {
  const handleEvent = useCallback(function (e) {
    if (e.target.checked) {
      props.onChecked();
    }
  }, []);

  return (
    <FlexLayout alignItems='center'>
      <Checkbox
        id="subscribe"
        onChange={handleEvent}
        disabled={props.checked}
        defaultChecked={props.checked}
        name={'defaultShipping'}
      />
      <Box width='xs' />
      <Text>{props.text}</Text>
    </FlexLayout>
  );
}
