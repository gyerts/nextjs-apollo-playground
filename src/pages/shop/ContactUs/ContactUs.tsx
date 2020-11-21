import React from 'react';
import {Box, FlexLayout, H1, withTheme} from '@market-ui/falcon-ui';
import {ContactUsQuery, IContactUsQueryResponse} from 'src/api/ContactUs/ContactUsQuery';
import {T} from '@market-ui/falcon-i18n';
import {ContactUsFormBlock} from 'src/components/ContactUs/ContactUsFormBlock';
import {ContactUsInfoBlock} from 'src/components/ContactUs/ContactUsInfoBlock';


const ContactUs = withTheme(({theme}) => (
    <ContactUsQuery>
      {({loading, error, contactUs} : IContactUsQueryResponse) => {
        return (
          <Box  bgFullWidth='primary' css={{maxWidth: theme.breakpoints.md, margin: 'auto'}}>
            <H1 css={{textAlign: 'center'}} mb='lg'>
              <T id="contactUs.title" />
            </H1>
            <FlexLayout flexDirection={{xs: 'column', sm: 'row'}} justifyContent="space-between">
              <Box flex={1} mb='xl'>
                <ContactUsFormBlock
                  dropdownValues={contactUs.needHelpDropdownDataList}
                  loading={loading}
                />
              </Box>
              <Box flex={1} mb='xl' ml={{xs: 'none', sm: 'lg', md: 'xxxl'}} mr={{xs: 'none', sm: 'lg', md: 'xxxl'}}>
                <ContactUsInfoBlock phoneNumber={contactUs.phoneNumber} email={contactUs.email}/>
              </Box>
            </FlexLayout>
          </Box>
          )}}
      </ContactUsQuery>
  ));

export default ContactUs;