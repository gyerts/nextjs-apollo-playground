import React from "react";
import {T} from "@market-ui/falcon-i18n";
import {Button, FlexLayout, Text} from "@market-ui/falcon-ui";

import {IModalContentProps} from "../../Modal/context";


export const SessionTimeoutModalContent = ({closeModal}: IModalContentProps) => (
  <FlexLayout my='sm' flexDirection='column' alignItems='center' justifyContent='center'>
    <Text mb='xs' variant='uppercase' fontWeight='bold'><T id='auth.sessionTimeOut.title' /></Text>
    <Text mb='lg'><T id='auth.sessionTimeOut.msg' /></Text>
    <Button css={{width: 200}} onClick={closeModal}>
      <Text variant='uppercase'><T id='auth.sessionTimeOut.btn' /></Text>
    </Button>
  </FlexLayout>
);
