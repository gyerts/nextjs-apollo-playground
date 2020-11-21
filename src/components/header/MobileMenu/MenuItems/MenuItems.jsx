import React from 'react';
import {Box, Link, Menu, MenuItem} from '@market-ui/falcon-ui';
import {Link as RouterLink} from "react-router-dom";
import './BottomMenu/BottomMenuStyles.scss';
import {BottomMenu} from "./BottomMenu/BottomMenu";
import {T} from "@market-ui/falcon-i18n";
import './MenuItemsStyles.scss';

const menuItemsLayoutTheme = {
  searchbarLayout: {
    bgFullWidth: 'primary',
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

const getMenuItemCss = () => ({
  borderBottom: 'none !important',
  ':hover': {
    backgroundColor: 'primary'
  }
});

export const MenuItems = ({items, onSubmenuModelChange, onCloseMobileMenu}) => {

  const getUrlLink = (item) => item.children && item.children.length ? '#' : item.urlPath;
  const getSubmenuModel = (item) => {
    onSubmenuModelChange(item);
  };
  const closeMenuAfterClick = (item) => {
    if (!(item.children && item.children.length)) {
      onCloseMobileMenu();
    }
  }

  const menuItemClickHandler = (item) => {
    getSubmenuModel(item);
    closeMenuAfterClick(item);
  }
  const drawMenuItems = (items) => (
    items && items.map(item => (
      <MenuItem
        key={item.name}
        css={getMenuItemCss()}>
        <Link
          onClick={() => menuItemClickHandler(item)}
          p="sm"
          css={{width: '100%'}}
          fontSize='xs'
          fontWeight='light'
          as={RouterLink}
          to={getUrlLink(item)}>
          {item.name}
        </Link>
      </MenuItem>
    ))

  );

  return <React.Fragment>
    <Menu defaultTheme={menuItemsLayoutTheme}>
      <MenuItem
        onClick={onCloseMobileMenu}
        css={getMenuItemCss()}>
        <Link
          p="sm"
          display={'flex'}
          alignItems={'center'}
          css={{width: '100%'}}
          fontSize='xs'
          fontWeight='bold'
          as={RouterLink}
          to={'/'}>
          <span className='icon-home'/>
          <Box pr={'xs'} pl={'xs'}>
            <T id="mobileMenu.title"/>
          </Box>
        </Link>
      </MenuItem>
      {drawMenuItems(items)}
    </Menu>
    <BottomMenu onCloseMobileMenu={onCloseMobileMenu}/>
  </React.Fragment>

};
