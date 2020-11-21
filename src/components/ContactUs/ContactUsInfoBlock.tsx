import {T} from "@market-ui/falcon-i18n";
import {Box, FlexLayout, Text} from "@deity/falcon-ui";
import React from "react";

interface IContactUsInfoBlockProps {
  phoneNumber: string;
  email: string;
}

export const ContactUsInfoBlock = ({phoneNumber, email}: IContactUsInfoBlockProps) => (
  <Box p='lg' bg='white' fontSize='md'>
    <T id="contactUs.contactInfo" />
    <FlexLayout>
      <Text mr='sm' fontWeight='bold'>
        <T id="contactUs.email" />
      </Text>
      <Text>{email}</Text>
    </FlexLayout>
  </Box>
)
