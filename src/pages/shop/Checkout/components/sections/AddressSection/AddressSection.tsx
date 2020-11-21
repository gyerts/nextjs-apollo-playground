import React, {useState} from "react";
import {Box, extractThemableProps, Text, ThemedComponentProps} from "@market-ui/falcon-ui";
import {T} from "@market-ui/falcon-i18n";
import {AddressFormValues, Card, useMode} from "src/components";
import {SectionSwitch} from "./SectionSwitch";
import {IAddress} from "src/api";
import {FUNC_STUB} from "../../../context";


interface IProps extends ThemedComponentProps {
  id: string
  collapsed: boolean
  addressType: 'deliveryAddress'|'billingAddress'
  address: IAddress,
  disabled?: boolean
  loading?: boolean

  onNewAddress?(newAddressFormData: AddressFormValues): void
  onAddressSelected?(address: IAddress): void
  onAddressChanged?(address: IAddress): void
}
export const AddressSection = (props: IProps) => {
  const {addressType, collapsed, address, loading, disabled, id} = props;
  const {themableProps} = extractThemableProps(props);
  const [addressToEdit, setAddressToEdit] = useState<IAddress>();
  const [addNewAddressMode, enableAddNewAddressMode, disableAddNewAddressMode] = useMode();

  return (
    <Card id={id} as='section' {...themableProps} loading={loading}>
      <Text>
        <b>
          {addressToEdit && <T id='words.edit' />}
          {addNewAddressMode && <T id='words.add' />}
          &nbsp;
          {addNewAddressMode && <T id='words.new' />}
          &nbsp;
          <T id={`checkout.sections.${addressType}.title`} />
        </b>
      </Text>

      <Box mt={address ? 'xs' : 'none'}>
        <SectionSwitch
          address={address}
          collapsed={collapsed}
          disabled={disabled}
          editMode={Boolean(addressToEdit)}
          onNewAddress={props.onNewAddress || FUNC_STUB}
          onAddressSelected={props.onAddressSelected || FUNC_STUB}
          onAddressChanged={props.onAddressChanged || FUNC_STUB}
          addressType={addressType}

          addressToEdit={addressToEdit}
          setAddressToEdit={setAddressToEdit}
          addNewAddressMode={addNewAddressMode}
          enableAddNewAddressMode={enableAddNewAddressMode}
          disableAddNewAddressMode={disableAddNewAddressMode}
        />
      </Box>
    </Card>
  );
};
