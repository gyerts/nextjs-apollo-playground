import React, {useCallback, useEffect, useRef, useState} from "react";
import {Box, Button, Text, themed} from "@market-ui/falcon-ui";
import {IAddress} from "src/api";
import {T} from "@market-ui/falcon-i18n";
import {toGridTemplate} from "src/uikitEjected/helpers";
import {AddressLine} from "./AddressLine";
import {
  compareAddressToAddress,
} from "src/common/helpers/address";


interface IProps {
  onChange(address: IAddress): void
  requestEditAddress(address: IAddress): void
  requestAddNewAddressMode(): void

  address: IAddress
  addressType: 'deliveryAddress'|'billingAddress'
  addresses: IAddress[]
  addressesRef: {current: IAddress[]}
}

export const ListAddressesImpl = (props: IProps) => {
  const {requestEditAddress, address, requestAddNewAddressMode, onChange, addressType} = props;
  const [selectedAddressId, setSelectedAddressId] = useState();
  const {selectedAddressIdRef} = useSelectedAddress(selectedAddressId);

  const onFinish = useCallback(function () {
    const foundAddress = props.addressesRef.current.find(a => a.id === selectedAddressIdRef.current);
    if (foundAddress) {
      onChange(foundAddress);
    } else {
      console.error('Cannot apply address, because not found', selectedAddressId);
    }
  }, [setSelectedAddressId]);

  useEffect(function () {
    if (address) {
      const foundAddress = props.addresses.find(a => compareAddressToAddress(a, address));
      if (foundAddress) {
        setSelectedAddressId(foundAddress.id);
      }
    }
  }, [props.addresses, address]);

  return (
    <ListAddressesLayout>
      <Box gridArea={area.addresses} >
        {props.addresses.map(address => (
          <AddressLine
            address={address}
            checked={selectedAddressId === address.id}
            onChange={setSelectedAddressId}
            requestEditAddress={requestEditAddress}
          />
        ))}
      </Box>

      <Button
        gridArea={area.addLink}
        css={{justifySelf: 'flex-end'}}
        variant='link-underlined'
        onClick={requestAddNewAddressMode}
      ><Text fontWeight='bold'><T id={`checkout.sections.addressList.add-${addressType}`} /></Text></Button>

      <Button gridArea={area.nextButton} disabled={!selectedAddressId} onClick={onFinish}>
        <Text variant='uppercase'><T id='words.next' /></Text>
      </Button>
    </ListAddressesLayout>
  )
};

const useSelectedAddress = (selectedAddressId: string) => {
  const selectedAddressIdRef = useRef(selectedAddressId);
  useEffect(function () {
    selectedAddressIdRef.current = selectedAddressId;
  }, [selectedAddressId]);
  return {
    selectedAddressIdRef
  };
};

const area = {
  addresses: 'addresses',
  addLink: 'addLink',
  nextButton: 'nextButton',
  empty: '.',
};

const ListAddressesLayout = themed({
  defaultTheme: {
    tableLayout: {
      display: 'grid',
      gridGap: 'xs',
      gridTemplate: {
        xs: toGridTemplate([
          [ '1fr',            '1fr',           ],
          [ area.addresses,   area.addresses,  ],
          [ area.empty,       area.addLink,    ],
          [ area.nextButton,  area.nextButton, ],
        ]),
      },
    }
  }
});
