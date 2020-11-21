import React from 'react';
import {Box, FlexLayout, Link} from '@deity/falcon-ui';
import {Link as RouterLink} from "react-router-dom";
import {T} from "@market-ui/falcon-i18n";
import './MobileMenuFooterStyles.scss';

const menuFooterLayoutTheme = {
    searchbarLayout: {
        bgFullWidth: 'black',
        display: 'flex',
        flexDirection: 'column',
        pr: 'xs',
        pl: 'xs',
    }
};

const getLinkCss = () => ({
    fontSize: '12px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    color: '#ffffff',
    textTransform: 'uppercase'
});

export const MobileMenuFooter = () => {
    return <FlexLayout defaultTheme={menuFooterLayoutTheme} css={{zIndex: 0}}>
        <Link
            css={getLinkCss()}
            p="xs"
            fontSize='xs'
            fontWeight='light'
            as={RouterLink}
            to='/shopping-with-us#shipping-information'>
            <i className="icon-shipping-returns" />
            <Box pr={'sm'} pl={'sm'}>
                <T id="mobileMenuFooter.shippingReturns" />
            </Box>
        </Link>
        <Link
            css={getLinkCss()}
            p="xs"
            fontSize='xs'
            fontWeight='light'
            as={RouterLink}
            to='/shopping-with-us'>
            <i className="icon-help-faq" />
            <Box pr={'sm'} pl={'sm'}>
                <T id="mobileMenuFooter.helpFaq" />
            </Box>
        </Link>
    </FlexLayout>
};
