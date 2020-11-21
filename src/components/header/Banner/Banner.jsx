import React from 'react';
import { T } from '@market-ui/falcon-i18n';
import { Link as RouterLink } from 'react-router-dom';
import { Link, List, ListItem, Box, themed } from '@deity/falcon-ui';
import {RightBannerBlock} from "./RightBannerBlock/RightBannerBlock";
import {ResponsiveIf} from "src/components";

export const BannerLayout = themed({
  tag: Box,
  defaultTheme: {
    bannerLayout: {
      display: 'flex',
      justifyContent: {xs:'flex-end', sm: 'space-between'},
      alignItems: 'center',
      bgFullWidth: 'black',
      fontWeights: 'bold',
      color: 'white',
      css: {
        listStyle: 'none',
        textTransform: 'uppercase',
        fontWeight: 600,
      }
    }
  }
});

export const Banner = () => (
  <BannerLayout>
    <ResponsiveIf desktop>
      <List css={{display: 'flex', flexWrap: 'nowrap'}}>
        <ListItem p="xs" pr={'sm'} pl={'sm'}>
          <Link as={RouterLink} to="/store-locator"><T id="banner.storeLocator" /></Link>
        </ListItem>
        <ListItem p="xs" pr={'sm'} pl={'sm'}>
          <Link as={RouterLink} to="/shopping-with-us"><T id="banner.help" /></Link>
        </ListItem>
      </List>
    </ResponsiveIf>

    <RightBannerBlock />
  </BannerLayout>
);
