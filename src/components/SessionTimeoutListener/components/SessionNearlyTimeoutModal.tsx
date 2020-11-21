import React from "react";
import {Button, FlexLayout, Text} from "@market-ui/falcon-ui";
import {T} from "@market-ui/falcon-i18n";

import {IModalContentProps} from "../../Modal/context";
import {CustomerCustomQuery} from "./CustomerCustomCall";


export const SessionNearlyTimeoutModal = ({closeModal}: IModalContentProps) => (
  <CustomerCustomQuery>
    {({fetchCustomer}) => (
      <FlexLayout my='sm' flexDirection='column' alignItems='center' justifyContent='center'>
        <Text mb='md' variant='uppercase' fontWeight='bold'><T id='auth.sessionWillExpireSoon.title' /></Text>
        <Text><T id='auth.sessionWillExpireSoon.msg._1' /></Text>
        <Text mb='lg'><T id='auth.sessionWillExpireSoon.msg._2' /></Text>
        <Button css={{width: 200}} onClick={() => {
          fetchCustomer();
          closeModal();
        }}><Text variant='uppercase'><T id='auth.sessionWillExpireSoon.btn' /></Text></Button>
      </FlexLayout>
    )}
  </CustomerCustomQuery>
);
