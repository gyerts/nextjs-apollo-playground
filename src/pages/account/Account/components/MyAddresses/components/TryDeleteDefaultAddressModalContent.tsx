import React from "react";
import {Box, Button, Text} from "@market-ui/falcon-ui";
import {mobileOnly} from "src/styling/cssHelper";
import {T} from "@market-ui/falcon-i18n";


interface IProps {
  onClose: () => void
}
export const TryDeleteDefaultAddressModalContent = ({onClose}: IProps) => {
  return (
    <Box
      mt={mobileOnly('md')}
      css={{width: 300}}
      flexDirection='column'
    >
      <Text mb="lg"><T id="account.addresses.modals.default.message" /></Text>

      <Button
        css={{width: '100%'}}
        onClick={onClose}
      >
        <T id="account.addresses.buttons.close" />
      </Button>
    </Box>
  )
};
