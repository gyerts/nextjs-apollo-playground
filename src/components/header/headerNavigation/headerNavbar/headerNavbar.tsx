import React from 'react';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import {Navbar, NavbarItem, NavbarItemMenu, Link, List, ListItem, Image, FlexLayout, Box, themed, Theme} from '@market-ui/falcon-ui';
import {SearchBarArea} from "../../Searchbar/Searchbar";
import {RightBannerBlock} from "../../Banner/RightBannerBlock/RightBannerBlock";
import {GQLMenuItem} from "src/graphql-types";

const getNavbarItemCss = (): any => ({
  position: 'relative',
  color: 'black',

  ':hover': {
    textShadow: '0 0 .01px black, 0 0 .01px black, 0 0 .01px black',

    ':after': {
      content: '""',
      display: 'inline-block',
      width: 'calc(100% - 32px)',
      height: '2px',
      position: 'absolute',
      bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#f2b0a4',
      zIndex: 1
    }
  }
});

export const ThemedLink = themed({
  tag: Link,
  defaultTheme: {
    linkItem: {
      color: "black",
      fontSize: "xxs",
      display: "block",
      css: {
        padding: "5px 10px",
        textDecoration: 'none',

        "&:hover": {
          textDecoration: 'underline'
        }
      }
    }
  }
})

const HeaderNavbar = ({items}: {items: GQLMenuItem[]}) => {
  return (
    <nav>
      <Navbar display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Box display={'flex'}>
          <NavBarItemsBlock items={items} />
        </Box>
        <RightBannerBlock />
      </Navbar>
    </nav>
  )
};

function NavBarItemsBlock ({items}: {items: GQLMenuItem[]}) {
  return (
    <React.Fragment>
      <Link className='desktop-logo-sticky' alignItems='center' display='flex' aria-label="WOW" pl="sm" pr="sm" as={RouterLink} gridArea={SearchBarArea.logo} to="/">
        <Image src="https://fiver.media/wowcosmeticsil/front_img/homepage/logo/Logo_white-wow.svg"/>
      </Link>
      {items && items.map((item, i) => <NavBarItem key={item.name + i} item={item} />)}
    </React.Fragment>
  )
}
function NavBarItem({item}: {item: GQLMenuItem}) {
  const { pathname } = useLocation();
  let linkVariant = pathname === item.urlPath && 'nav-selected';

  return (
    <NavbarItem key={item.name}>
      <Link p="sm" fontSize='xs' variant={linkVariant} as={RouterLink} css={getNavbarItemCss()} to={item.urlPath}>
        <span>{item.name}</span>
      </Link>
      <NavBarItemContent item={item} />
    </NavbarItem>
  );
}
function NavBarItemContent({item}: {item: GQLMenuItem}) {
  return (
    <NavbarItemMenu pl='lg' pr='lg' pt={'none'} pb={'none'}>
      <FlexLayout justifyContent="space-between" flexWrap='nowrap' bgFullWidth={'primary'} css={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <List flex='auto'>
          <FlexLayout flexWrap='nowrap' justifyContent='space-evenly'>
            {item.children.length > 0 && item.children.map((subItem, i) => (
              <ListItem key={subItem.name + i} pr='xl'>
                <ThemedLink fontWeight='bold' as={RouterLink} to={subItem.urlPath}>
                  {subItem.name}
                </ThemedLink>
                <NavBarSubItems items={subItem.children} />
              </ListItem>
            ))}
          </FlexLayout>
        </List>
        {item.images.length > 0 && item.images.map((x, i) => (
          <Box key={x.text + String(i)}>
            <Image src={`https:${x.media.url}`} />
            <ThemedLink as={RouterLink} to={item.urlPath}>
              {item.name}
            </ThemedLink>
          </Box>
        ))}
      </FlexLayout>
    </NavbarItemMenu>
  )
}

function NavBarSubItems({items}: {items: GQLMenuItem[]}) {
  return (
    <List>
      {items.map((subSubItem: GQLMenuItem) => (
        <ListItem key={subSubItem.name}>
          <ThemedLink as={RouterLink} to={subSubItem.urlPath}>
            {subSubItem.name}
          </ThemedLink>
        </ListItem>
      ))}
    </List>
  )
}

export default HeaderNavbar;
