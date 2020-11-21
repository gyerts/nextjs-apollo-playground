import React, {useCallback, useEffect, useState} from "react";
import {Box, Menu, MenuItem} from "@market-ui/falcon-ui";
import {matchPath, useLocation} from "react-router-dom";
import {useTabsContext} from "../context";
import {ArrowDownMdIcon, ArrowUpMdIcon} from "../../../styling";

interface IProps {
  showInsideActiveLink?: React.ReactElement
  gridArea?: string
}
export const TabsLinks = ({showInsideActiveLink, gridArea}: IProps) => {
  const { menuItems } = useTabsContext();
  const { pathname } = useLocation();

  return menuItems ? (
    <Menu variant='tabs' gridArea={gridArea} css={{width: '100%'}}>{
      menuItems.map(({to, children, collapsible}) => {
        const active = matchesUrl(pathname, to);
        return (
          <MenuItemComponent
            key={typeof to === 'string' ? to : to[0]}
            to={typeof to === 'string' ? to : to[0]}
            active={active}
            showInsideActiveLink={showInsideActiveLink}
            collapsible={collapsible !== undefined ? collapsible : Boolean(showInsideActiveLink)}
          >
            {children(active)}
          </MenuItemComponent>
        )
      })
    }</Menu>
  ) : null;
};

const MenuItemComponent = ({to, children, active, collapsible, showInsideActiveLink}: {
  to: string
  active: boolean
  collapsible: boolean
  children: React.ReactElement
  showInsideActiveLink?: React.ReactElement
}) => {
  const [collapsed, setCollapsed] = useState(!active);

  const toggleCollapse = useCallback(function () {
    setCollapsed(c => !c);
  }, []);

  useEffect(function () {
    setCollapsed(!active);
  }, [active]);

  return (
    <Box>
      <MenuItem
        key={to}
        variant={active ? 'tab-active' : 'tab'}
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        onClick={toggleCollapse}
      >
        {children}
        {collapsible && (collapsed ? <ArrowDownMdIcon mx='xs' /> : <ArrowUpMdIcon mx='xs' />)}
      </MenuItem>
      {collapsible && (!collapsed && showInsideActiveLink)}
    </Box>
  );
};

const matchesUrl = (pathname: string, to: string|string[]): boolean => {
  if (typeof to === "string") {
    return !!matchPath(pathname, { path: to, exact: true });
  }

  let match = false;
  to.forEach(path => {
    if ( matchPath(pathname, { path, exact: true }) ) {
      match = true;
    }
  });

  return match;
};
