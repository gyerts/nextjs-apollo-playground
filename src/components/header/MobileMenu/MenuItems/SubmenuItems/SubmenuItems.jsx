import React from 'react';
import {Box, Link, Menu, MenuItem} from '@deity/falcon-ui';
import {Link as RouterLink} from "react-router-dom";
import './SubmenuItemsStyles.scss';

const getMenuItemCss = () => ({
    borderBottom: 'none !important',
    ':hover': {
        backgroundColor: 'primary'
    }
});

const getMenuSubItemCss = () => ({
    borderBottom: 'none !important',
    display: 'flex',
    flexDirection: 'column',
    ':hover': {
        backgroundColor: 'primary'
    }
});


export const SubmenuItems = ({submenuModel, onBackToMainMenu, onCloseMobileMenu}) => {

    const closeMenuAfterClick = (item) => {
        if (!(item.children && item.children.length)) {
            onCloseMobileMenu();
        }
    }

    const submenuItemsLayoutTheme = {
        searchbarLayout: {
            bgFullWidth: 'primary',
            display: 'flex',
            flexDirection: 'column',
            border: 'none',
            css: {
                backgroundColor: '#f8f5f0',
                width: '100%',
                minHeight: 'calc(100% - 40px)',
                position: 'absolute',
                top: '40px',
                left: submenuModel.children.length ? 0 : '-100%',
                zIndex: 1,
                transition: '0.5s',
                ':before': {
                    width: '100%'
                }
            }
        }
    };

    const drawSubmenuItems = (subItem) => (
        <React.Fragment>
            <MenuItem
                key={subItem.name}
                border='none'
                onClick={onBackToMainMenu}
                css={getMenuItemCss()}>
                <Box
                    p="sm"
                    css={{width: '100%', display: 'flex', alignItems: 'center', fontWeight: 600}}
                    fontSize='xs'
                    fontWeight='light'>

                    <span className='icon-back' />
                    <Box pr={'xs'} pl={'xs'}>
                        {subItem.name}
                    </Box>
                </Box>
            </MenuItem>
            {subItem.children.length && subItem.children.map(subItemChildrenItem => (
                <MenuItem
                    key={subItemChildrenItem.name}
                    border='none'
                    mb={'sm'}
                    css={getMenuSubItemCss()}>
                    <Link
                        p="sm"
                        css={{width: '100%',
                            fontSize: '12px',
                            fontWeight: 600}}
                        fontSize='xs'
                        fontWeight='light'
                        onClick={closeMenuAfterClick}
                        as={RouterLink}
                        to={subItemChildrenItem.urlPath}>
                        <span className='sub-item-heading'>
                            {subItemChildrenItem.name}
                        </span>
                    </Link>
                    <Menu>
                        {subItemChildrenItem.children.length && subItemChildrenItem.children.map(subSubItemChildrenItem => (
                            <MenuItem
                                key={subSubItemChildrenItem.name}
                                border='none'
                                css={getMenuItemCss()}>
                                <Link
                                    p="sm"
                                    onClick={closeMenuAfterClick}
                                    css={{width: '100%',
                                        fontSize: '12px'}}
                                    fontSize='xs'
                                    fontWeight='light'
                                    as={RouterLink}
                                    to={subSubItemChildrenItem.urlPath}>
                                    {subSubItemChildrenItem.name}
                                </Link>
                            </MenuItem>
                        )) || null}
                    </Menu>
                </MenuItem>
            ))}
        </React.Fragment>
    );

    return (
        submenuModel
        ? <Menu defaultTheme={submenuItemsLayoutTheme}>
            {drawSubmenuItems(submenuModel)}
        </Menu>
        : null
    );
};
