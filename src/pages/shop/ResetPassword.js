import React from 'react';
import { ResetPassword } from 'src/uikitEjected';

export default ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get('token') || '';

  return <ResetPassword resetToken={resetToken} />;
};
