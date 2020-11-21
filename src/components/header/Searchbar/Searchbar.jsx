import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { FlexLayout, Image, Link, Box} from "@market-ui/falcon-ui";
import { toGridTemplate } from "../../../uikitEjected/helpers";
import { HeaderSearch } from "../headerNavigation/headerSearch/headerSearch";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import "./SearchbarStyles.scss";
import classNames from 'classnames';


export const SearchBarArea = {
  logo: 'logo',
  signIn: 'signIn',
  cart: 'cart',
  search: 'search'
};

const searchBarLayoutTheme = {
  searchbarLayout: {
    bgFullWidth: 'primary',
    display: 'flex',
    justifyContent: 'space-between',
    py: 'sm',
    // prettier-ignore
    gridTemplate: toGridTemplate([
      ['200px',            '1fr',                'auto',               'auto'            ],
      [SearchBarArea.logo, SearchBarArea.search, SearchBarArea.signIn, SearchBarArea.cart]
    ]),
    css: {
      alignItems: 'center'
    }
  }
};

export const Searchbar = ({items, isSubStickyDisabled}) => {
  return (
    <FlexLayout
      defaultTheme={searchBarLayoutTheme}
      className={classNames('searchbar', {'disable-sticky': isSubStickyDisabled})}
    >
      <MobileMenu items={items} />
      <Link
        alignItems='left'
        display='flex'
        aria-label="WOW"
        pl="sm"
        pr="sm"
        height="xxl"
        as={RouterLink}
        gridArea={SearchBarArea.logo}
        to="/"
      >
        <Image src="https://fiver.media/wow/front_img/Logo_WOW_Black.svg"/>
        <Image src="https://fiver.media/wow/front_img/Logo_WOW_mob_header_black.svg" css={{
          display: 'none',
        }}/>
      </Link>
      <HeaderSearch/>
    </FlexLayout>
  )
};
