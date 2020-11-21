import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {Box, Text, H3, Button, FlexLayout} from "@market-ui/falcon-ui";
import {
  AddAddressMutation,
  EditAddressMutation, IAddAddressFn,
  IAddress,
  IAddressResponse, IEditAddressFn,
} from "src/api";
import {AddressForm, AddressFormValues, ResponsiveIf, useMode, useTopPageMessage} from "src/components";
import {bothResolutions, desktopOnly, mobileOnly} from "src/styling/cssHelper";
import {AddressesQuery} from "src/api";
import {EditableAddress} from "./components/EditableAddress";
import {ArrowLeftLgIcon} from "src/styling";
import {I18nContext, T} from "@market-ui/falcon-i18n";
import {
  mapAddressToAddressInput,
  mapFormToAddAddressInput,
  mapFormToEditAddressInput
} from "src/common/helpers/address";
import {GQLEditAddressInput} from "src/graphql-types";


export const MyAddresses = ({}: IImplProps) => {
  return (
    <AddressesQuery>{({addresses: {items: addresses}}: IAddressResponse) => (
      <EditAddressMutation>{(editAddress: IEditAddressFn) => (
        <AddAddressMutation>{(addAddress: IAddAddressFn) => (
          <MyAddressesImpl editAddress={editAddress} addAddress={addAddress} addresses={addresses} />
        )}</AddAddressMutation>
      )}</EditAddressMutation>
    )}</AddressesQuery>
  );
};


interface IImplProps {
  addresses: IAddress[]
  editAddress: IEditAddressFn
  addAddress: IAddAddressFn
}
export const MyAddressesImpl = ({addresses, editAddress, addAddress}: IImplProps) => {
  const [addressToEdit, setAddressToEdit] = useState<IAddress>();
  const addressToEditRef = useRef<IAddress>(addressToEdit);
  const [addMode, enableAddMode, disableAddMode] = useMode();
  const { openSuccessMessage, openErrorMessage } = useTopPageMessage();
  const {t} = useContext(I18nContext);

  useEffect(function () {
    addressToEditRef.current = addressToEdit;
  }, [addressToEdit]);

  const onAddressUpdate = useCallback(async function (formValues: AddressFormValues) {
    const addressToEdit = addressToEditRef.current;

    try {
      await editAddress({ variables: { input: mapFormToEditAddressInput(formValues, addressToEdit) as GQLEditAddressInput } });
      openSuccessMessage(t('account.addresses.topPageMessage.updated.title'), t('account.addresses.topPageMessage.updated.message'));
    } catch (e) {
      openErrorMessage(t('words.error'), t('account.addresses.topPageMessage.updated.error'));
    }
    onBackToNormalMode();
  }, []);

  const setAsDefaultShippingAddress = useCallback(async function (address: IAddress) {
    try {
      await editAddress({variables:{input: mapAddressToAddressInput({...address, defaultShipping: true})}});
      openSuccessMessage(t('account.addresses.topPageMessage.updated.title'), t('account.addresses.topPageMessage.updated.message'));
    } catch (e) {
      openErrorMessage(t('words.error'), t('account.addresses.topPageMessage.updated.error'));
    }
  }, []);

  const onAddressAdd = useCallback(async function (formValues: AddressFormValues) {
    try {
      const response = await addAddress({variables: { input: mapFormToAddAddressInput(formValues) }});
      openSuccessMessage(t('account.addresses.topPageMessage.updated.title'), t('account.addresses.topPageMessage.updated.message'));
    } catch (e) {
      openErrorMessage(t('words.error'), t('account.addresses.topPageMessage.updated.error'));
    }
    onBackToNormalMode();
  }, []);

  const onBackToNormalMode = useCallback(function () {
    setAddressToEdit(undefined);
    disableAddMode();
  }, []);

  const enableEditModeCb = useCallback(() => enableAddMode(), []);

  if (addressToEdit) {
    return (
      <FlexLayout flexDirection='column' css={{width: '100%', maxWidth: 500, justifyContent: 'flex-start'}} mb='xl' px={mobileOnly('xs')}>
        <ResponsiveIf mobile>
          <Button variant='link' onClick={onBackToNormalMode} display='flex' alignItems='center' mt='sm' mb='lg'>
            <ArrowLeftLgIcon />&nbsp;
            <T id='account.backButtons.addresses' />
          </Button>
        </ResponsiveIf>

        <H3><T id="account.addresses.editMode.title" /></H3>

        <AddressForm
          id='edit-address-form'
          onSubmit={onAddressUpdate}
          submitLabel={t('account.addresses.buttons.save')}
          grayed={true}
          showAllInOneColumn={true}
          onCancel={onBackToNormalMode}
          buttonsInline
          initData={{
            street1: addressToEdit.street[0],
            street2: addressToEdit.street[1],
            floor: addressToEdit.floor,
            flat: addressToEdit.flat,
            postcode: addressToEdit.postcode,
            telephone: addressToEdit.telephone,
            city: addressToEdit.city,
            firstname: addressToEdit.firstname,
            lastname: addressToEdit.lastname,
          }}
        />
      </FlexLayout>
    );
  }

  if (addMode) {
    return (
      <FlexLayout
        flexDirection='column'
        css={{width: '100%', maxWidth: 500, justifyContent: 'flex-start'}}
        mb='xl'
        px={mobileOnly('xs')}
      >
        <ResponsiveIf mobile>
          <Button variant='link' onClick={onBackToNormalMode} display='flex' alignItems='center' mt='sm' mb='lg'>
            <ArrowLeftLgIcon />&nbsp;
            <T id='account.backButtons.addresses' />
          </Button>
        </ResponsiveIf>

        <H3><T id="account.addresses.addMode.title" /></H3>

        <AddressForm
          id='add-address-form'
          onSubmit={onAddressAdd}
          onCancel={onBackToNormalMode}
          submitLabel={t('account.addresses.buttons.save')}
          grayed={true}
          showAllInOneColumn={true}
          buttonsInline
          initData={{
            street1: '', street2: '', floor: '', flat: '', postcode: '',
            telephone: '', city: '', firstname: '', lastname: '', defaultShipping: false
          }}
        />
      </FlexLayout>
    );
  }

  return (
    <FlexLayout flexDirection='column' alignItems={bothResolutions('center', 'flex-start')}>

      <ResponsiveIf desktop>
        <H3 mb='xs'><Text><T id='account.addresses.title' /></Text></H3>
      </ResponsiveIf>

      {Boolean(addresses.length) && (
        <FlexLayout css={{flexDirection: 'column'}} mt={mobileOnly('lg')}>
          <T id='account.addresses.tip' />
          <Button mt='xs' mb="xl" css={desktopOnly({width: 300})} onClick={enableEditModeCb}>
            <T id="account.addresses.buttons.add" />
          </Button>
        </FlexLayout>
      )}

      <FlexLayout flexDirection='column' css={{width: '100%', maxWidth: 500}}>
        {addresses.filter((a: IAddress) => a.shippingAddress).map(address => (
          <EditableAddress
            key={address.id}
            address={address}
            setAddressToEdit={setAddressToEdit}
            onSetDefaultShipping={setAsDefaultShippingAddress}
          />
        ))}
      </FlexLayout>

      {!addresses.length && (
        <Box px={mobileOnly('xs')} css={{width: '100%'}}>
          <Box mt={mobileOnly('sm')} mb='xs'>
            <Text><T id='account.addresses.emptyTip._1' /></Text>
            <Text><T id='account.addresses.emptyTip._2' /></Text>
          </Box>

          <ResponsiveIf mobile>
            <Button mb='xl' css={{width: '100%'}} onClick={enableEditModeCb}><T id="account.addresses.buttons.add" /></Button>
          </ResponsiveIf>
          <ResponsiveIf desktop>
            <Button mb='xl' css={{width: 300}} onClick={enableEditModeCb}><T id="account.addresses.buttons.add" /></Button>
          </ResponsiveIf>
        </Box>
      )}

    </FlexLayout>
  )
};
