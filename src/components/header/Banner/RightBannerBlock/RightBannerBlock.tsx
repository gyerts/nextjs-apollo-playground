import React from 'react';
import {themed} from '@market-ui/falcon-ui';
import {AccountIcon, CartIcon, StoreLocatorIcon} from 'src/components';

export const RightBannerBlock = () => {
  return (
    <RightBannerBlockLayout className={'header-navbar-icons'}>

      <CartIcon />

      <StoreLocatorIcon mx='sm' />

      <AccountIcon />

    </RightBannerBlockLayout>
  );
};

const RightBannerBlockLayout: any = themed({
  defaultTheme: {
    rightBannerBlockLayout: {
      css: {
        display: 'flex',
        flexWrap: 'nowrap',
        paddingTop: 11,
        paddingBottom: 5,
      },
    },
  }
});
