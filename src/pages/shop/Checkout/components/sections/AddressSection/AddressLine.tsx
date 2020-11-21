import React, {useCallback} from "react";
import {Box, Button, FlexLayout, Radio} from "@market-ui/falcon-ui";
import {IAddress} from "src/api";
import {T} from "@market-ui/falcon-i18n";


interface IProps {
  address: IAddress
  onChange: (addressId: string) => void
  checked: boolean
  requestEditAddress: (address: IAddress) => void
}
export const AddressLine = ({address, checked, onChange, requestEditAddress}: IProps) => {
  const onClick = useCallback(function () {
    onChange(address.id);
  }, []);

  const onEditAddress = useCallback(function () {
    requestEditAddress(address);
  }, [address]);

  return (
    <FlexLayout css={{
      width: '100%',
      alignItems: 'flex-start',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
    }} my='xs'>

      <Box>
        <Button variant='link-underlined' onClick={onEditAddress}><T id='words.edit' /></Button>
      </Box>

      <FlexLayout css={{
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
        cursor: 'pointer',
      }} onClick={onClick}>

        <FlexLayout mx='xs' css={{
          alignItems: 'flex-end',
          flexDirection: 'column',
        }}>
          <Box>
            {address.street[0]} {address.street[1]} {address.floor} {address.flat} {address.city}
          </Box>
          <Box>
            {address.postcode} {address.telephone}
          </Box>
        </FlexLayout>

        <Radio
          key={address.id}
          // disabled={disabled}
          mr="xs"
          checked={checked}
        />

      </FlexLayout>

    </FlexLayout>
  );
};
