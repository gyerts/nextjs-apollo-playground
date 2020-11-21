import React from "react";
import {IRemoveAddressFn, RemoveAddressMutation} from "src/api";
import {Box, Button, FlexLayout, Text} from "@market-ui/falcon-ui";
import {ResponsiveIf} from "src/components";
import {bothResolutions, cssBothResolutions, cssMobileOnly, mobileOnly} from "src/styling/cssHelper";
import {T} from "@market-ui/falcon-i18n";


interface IProps {
  id: string
  onSuccess: () => void
  onError: () => void
  onClose: () => void
}
export const DeleteAddressModalContent = ({id, onSuccess, onError, onClose}: IProps) => {
  return (
    <RemoveAddressMutation>{(removeCustomerAddress: IRemoveAddressFn) => (
      <Box
        mt={mobileOnly('md')}
        css={{width: 300}}
      >
        <Text mb="lg"><T id="account.addresses.modals.delete.message" /></Text>

        <FlexLayout
          flexDirection={bothResolutions('column', 'row')}
          alignItems={mobileOnly('center')}
          justifyContent={mobileOnly('center')}
          css={cssMobileOnly({height: 'calc(100vh - 300px)'})}
        >
          <Button
            mb={mobileOnly('md')}
            css={cssBothResolutions({width: '100%'}, {flex: 1})}
            onClick={async () => {
              try {
                if ( await removeCustomerAddress({variables: {id}}) ) {
                  onSuccess();
                  onClose();
                } else {
                  onError();
                  onClose();
                }
              } catch (e) {
                onError();
                onClose();
              }
            }}
          >
            <T id="account.addresses.buttons.delete" />
          </Button>
          <ResponsiveIf desktop>
            <Box width='sm' />
          </ResponsiveIf>
          <Button
            variant='inverse'
            css={cssBothResolutions({width: '100%'}, {flex: 1})}
            onClick={onClose}
          >
            <T id="account.addresses.buttons.cancel" />
          </Button>
        </FlexLayout>
      </Box>
    )}</RemoveAddressMutation>
  )
};
