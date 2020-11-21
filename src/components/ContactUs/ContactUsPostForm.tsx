import React, {Dispatch, SetStateAction} from 'react';
import {T} from '@market-ui/falcon-i18n';
import {Box, Button, FlexLayout} from '@market-ui/falcon-ui';

interface IContactUsPostSuccessProps {
  setState: Dispatch<SetStateAction<boolean>>;
}

export const ContactUsPostForm = ({setState}: IContactUsPostSuccessProps) => (
  <FlexLayout flexDirection='column' flexWrap='nowrap'>
    <Box>
      <T id='contactUs.successMessage' />
    </Box>
    <Button onClick={() => setState(false)} mt='md'>
      <T id='contactUs.anotherMessageButton' />
    </Button>
  </FlexLayout>
);