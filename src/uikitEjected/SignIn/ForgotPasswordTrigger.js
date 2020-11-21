import React from 'react';
import { T } from '@market-ui/falcon-i18n';
import { Link } from '@market-ui/falcon-ui';
import { OpenSidebarMutation } from '../Sidebar';

export const ForgotPasswordTrigger = () => (
  <OpenSidebarMutation>
    {openSidebar => (
      <Link fontSize="xs" onClick={() => openSidebar({ variables: { contentType: 'forgotPassword' } })}>
        <T id="signIn.forgotPasswordQuestion" />
      </Link>
    )}
  </OpenSidebarMutation>
);
