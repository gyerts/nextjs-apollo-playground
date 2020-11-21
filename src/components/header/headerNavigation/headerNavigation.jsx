import React from 'react';
import Sticky from 'react-stickynode';
import HeaderNavbar from "./headerNavbar/headerNavbar";
import './headerNavigationStyles.scss';
import {SetSecondaryHeaderActiveMutation} from 'src/components'


export const HeaderNavigation = ({items}) => (
  <SetSecondaryHeaderActiveMutation>
    {setSecondaryHeaderActive => (
      <Sticky className='header-navigation-sticky-desktop' enabled={true}
              top={0}
              bottomBoundary={'footer'}
              onStateChange={({status}) => setSecondaryHeaderActive({ variables: { active: Boolean(status) } })}
      >
        <HeaderNavbar items={items} bgFullWidth='primary' />
      </Sticky>
    )}
  </SetSecondaryHeaderActiveMutation>
);
