import React from 'react';
import {CmsSlot} from '../uikitEjected';
import {Box} from '@market-ui/falcon-ui';
import {withTheme} from '@market-ui/falcon-ui';

const CMSPage = withTheme(({theme}) => {

    return (
    <Box css={{maxWidth: theme.breakpoints.md, margin: 'auto'}} pt='md' pb='xxl' bgFullWidth='primary'>
        <CmsSlot position="CMSMainTop" />
        <CmsSlot position="CMSMainCenter" />
        <CmsSlot position="CMSMainBottom" />
    </Box>
    )
});

export default CMSPage;
