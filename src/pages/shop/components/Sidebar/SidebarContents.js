import React from 'react';
import { Box } from '@market-ui/falcon-ui';
import { SignIn, SignUp, ForgotPassword } from 'src/uikitEjected';
import { SIDEBAR_CONTENT_TYPES } from './SidebarQuery';

export default ({ contentType }) => {
  // if there is no content type provided it means that sidebar contents should be rendered as hidden
  // if unrecognized content type is provided add warning about it
  if (contentType && !SIDEBAR_CONTENT_TYPES[contentType]) {
    const message = `Unrecognized sidebar content type: ${contentType}`;
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(message);
    }

    console.error(message);
  }

  // using hidden attribute will cause react to consider rendering it as low priority
  // (in version > 16.6) - https://github.com/oliviertassinari/react-swipeable-views/issues/453#issuecomment-417939459
  return (
    <React.Fragment>
      <ContentBox current={contentType} contentType={SIDEBAR_CONTENT_TYPES.account}>
        <SignIn />
      </ContentBox>
      <ContentBox current={contentType} contentType={SIDEBAR_CONTENT_TYPES.signUp}>
        <SignUp />
      </ContentBox>
      <ContentBox current={contentType} contentType={SIDEBAR_CONTENT_TYPES.forgotPassword}>
        <ForgotPassword />
      </ContentBox>
    </React.Fragment>
  );
};

const ContentBox = ({ current, contentType, children, ...rest }) => {
  const hidden = current !== contentType;
  const key = contentType + hidden;

  return (
    <Box key={key} hidden={hidden} {...rest}>
      {children}
    </Box>
  );
};
