import React from 'react';
import {AddressFormValues} from "src/components";
import {Button, FlexLayout, Text} from "@market-ui/falcon-ui";
import {T} from "@market-ui/falcon-i18n";
import {GQLAddress} from "src/graphql-types";

interface IProps {
  address: AddressFormValues
  disabled?: boolean
  requestChange?: () => void
}
export const AddressPreview = (props: IProps) => {
  return (
    <FlexLayout justifyContent='space-between' alignItems='flex-end'>
      <FlexLayout justifyContent='start' flexDirection='column'>
        <Text>{props.address.firstname} {props.address.lastname}</Text>
        <Text>{props.address.street1} {props.address.street2}</Text>
        {props.address.city && <Text>{props.address.city}</Text>}
        {props.address.postcode && <Text>{props.address.postcode}</Text>}
        {props.address.telephone && <Text>{props.address.telephone}</Text>}
        {props.address.flat && <Text>{props.address.flat}</Text>}
        {props.address.floor && <Text>{props.address.floor}</Text>}
      </FlexLayout>
      {props.requestChange && !props.disabled && <Button variant='link-underlined' onClick={props.requestChange}><T id='words.edit' /></Button>}
    </FlexLayout>
  );
};

interface IGQLAddressPreviewProps {
  address: GQLAddress
  disabled?: boolean
  requestChange?: () => void
}
export const GQLAddressPreview = (props: IGQLAddressPreviewProps) => {
  return (
    <AddressPreview address={{
      ...props.address,
      telephone: props.address.telephone,
      street1: props.address.street[0],
      street2: props.address.street[1],
      floor: props.address.floor,
      flat: props.address.flat,
      same: props.address.defaultShipping && props.address.defaultBilling,
    }} requestChange={props.requestChange} disabled={props.disabled} />
  );
};
