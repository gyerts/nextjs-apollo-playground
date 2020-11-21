import React from 'react';
import { T } from '@market-ui/falcon-i18n';
import { Text, Button, GridLayout, H1, Box } from '@market-ui/falcon-ui';
import {FormField, FormSubmit, FormErrorSummary, PasswordRevealInput, UIForm} from 'src/components';
import { ResetCustomerPasswordMutation } from './AccountRecoveryMutations';
import { ValidatePasswordTokenQuery } from './AccountRecoveryQueries';
import { OpenSidebarMutation } from '../Sidebar';
import { MiniFormLayout } from '../MiniAccount';

export const ResetPassword = ({ resetToken }) => (
  <ValidatePasswordTokenQuery variables={{ token: resetToken }}>
    {({ validatePasswordToken }) => {
      const tokenIsInvalid = !validatePasswordToken;

      return (
        <GridLayout gridGap="md" py="md">
          <H1 justifySelf="center">
            <T id="resetPassword.title" />
          </H1>
          {tokenIsInvalid && <InvalidToken />}
          {!tokenIsInvalid && <ResetPasswordForm resetToken={resetToken} />}
        </GridLayout>
      );
    }}
  </ValidatePasswordTokenQuery>
);

export const InvalidToken = () => (
  <OpenSidebarMutation>
    {openSidebar => (
      <React.Fragment>
        <Text justifySelf="center" fontSize="md" color="error">
          <T id="resetPassword.failureMessage" />
        </Text>
        <Box justifySelf="center">
          <Button onClick={() => openSidebar({ variables: { contentType: 'forgotPassword' } })}>
            <T id="resetPassword.requestAnotherToken" />
          </Button>
        </Box>
      </React.Fragment>
    )}
  </OpenSidebarMutation>
);

export const ResetPasswordForm = ({ resetToken }) => (
  <ResetCustomerPasswordMutation>
    {(resetCustomerPassword, { loading, error, called }) => {
      const submitSucceed = called && !loading && !error;
      if (submitSucceed) {
        return <ResetPasswordSuccess />;
      }

      return (
        <UIForm
          id="reset-password"
          name="reset-password-form"
          i18nId="resetPassword"
          initialValues={{
            resetToken,
            password: ''
          }}
          onSubmit={values => resetCustomerPassword({ variables: { input: values } })}
        >
          {() => (
            <MiniFormLayout>
              <FormField name="password" required type="password" autoComplete="new-password">
                {({ field }) => <PasswordRevealInput {...field} />}
              </FormField>
              <FormSubmit justifySelf="center" submitting={loading} value="Reset my password" />
              <FormErrorSummary errors={error && [error.message]} />
            </MiniFormLayout>
          )}
        </UIForm>
      );
    }}
  </ResetCustomerPasswordMutation>
);

const ResetPasswordSuccess = () => (
  <OpenSidebarMutation>
    {openSidebar => (
      <React.Fragment>
        <Text justifySelf="center" fontSize="md">
          <T id="resetPassword.successMessage" />
        </Text>
        <Box justifySelf="center">
          <Button onClick={() => openSidebar({ variables: { contentType: 'account' } })}>
            <T id="signIn.button" />
          </Button>
        </Box>
      </React.Fragment>
    )}
  </OpenSidebarMutation>
);
