import React from 'react';
import {Box, Link, Menu, MenuItem} from '@market-ui/falcon-ui';
import {Link as RouterLink} from "react-router-dom";
import './BottomMenuStyles.scss';
import {T} from "@market-ui/falcon-i18n";
import {CustomerQuery} from "../../../../../api/Customer/CustomerQuery";
import {AccountIcon} from "../../../../FunctionalIcons";

const bottomMenuLayoutTheme = {
    searchbarLayout: {
        bgFullWidth: '#d9f633',
        display: 'flex',
        flexDirection: 'column',
        border: 'none',
        css: {
            width: '100%',
            position: 'relative',
            overflowX: 'hidden'
        }
    }
};

const getBottomMenuItemLinkCss = () => ({
    borderColor: 'primary',
    display: 'flex',
    width: '100%',
    alignItems: 'center'
});

const getBottomMenuItemCss = () => ({
    borderBottom: '1px solid #000000 !important',
    ':first-of-type': {
        borderTop: '1px solid #000000 !important'
    }
});

const WishlistMenuItem = ({isVisible}) => {
    if(!isVisible) {
        return null;
    }

    return (
    <MenuItem css={getBottomMenuItemCss()}>
        <Link
            p="sm"
            css={getBottomMenuItemLinkCss()}
            bg="primaryDark"
            fontSize='xs'
            fontWeight='light'
            as={RouterLink}
            to='#'>
            <i className="icon-wishlist" />
            <Box pr={'sm'} pl={'sm'}>
                <T id="bottomMobileMenu.wishlist" />
            </Box>
        </Link>
    </MenuItem>
    );
}

export const BottomMenu = ({onCloseMobileMenu}) => {
    return <Menu defaultTheme={bottomMenuLayoutTheme}>
            <MenuItem css={getBottomMenuItemCss()}>
                <Link
                    css={getBottomMenuItemLinkCss()}
                    bg="primaryDark"
                    p="sm"
                    fontSize='xs'
                    fontWeight='light'
                    as={RouterLink}
                    to='/cart'>
                    <i className="icon-my-cart" />
                    <Box pr={'sm'} pl={'sm'}>
                        <T id="bottomMobileMenu.myCart" />
                    </Box>
                </Link>
            </MenuItem>
            <WishlistMenuItem isVisible={false}/>
            <CustomerQuery>
                {({ customer }) =>
                    customer ? (
                            <MenuItem css={getBottomMenuItemCss()}>
                                <Link
                                    as={RouterLink} to="/account"
                                    p="sm"
                                    bg="black"
                                    color="white"
                                    onClick={onCloseMobileMenu}
                                    css={getBottomMenuItemLinkCss()}
                                    fontSize='xs'
                                    fontWeight='light'>
                                    <AccountIcon />
                                    <Box pr={'sm'} pl={'sm'}>
                                        <T id="bottomMobileMenu.myAccount" />
                                    </Box>
                                </Link>
                            </MenuItem>
                    ) : null
                }
            </CustomerQuery>
        </Menu>
};
