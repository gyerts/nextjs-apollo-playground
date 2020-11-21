import React from 'react';
import { Text } from '@market-ui/falcon-ui';
import {FormField, FormSubmit, FormErrorSummary, UIForm} from 'src/components';
import { RequestPasswordResetMutation } from './AccountRecoveryMutations';

export const ForgotPasswordForm = ({ onCompleted }) => (
  <RequestPasswordResetMutation onCompleted={onCompleted}>
    {(requestPasswordReset, { loading, error, called }) => {
      const submitSucceed = called && !loading && !error;
      return (
        <UIForm
          id="forgot-password"
          name="forgot-password-form"
          i18nId="forgotPassword"
          initialValues={{ email: '' }}
          onSubmit={values => requestPasswordReset({ variables: { input: { email: values.email } } })}
        >
          {({ values }) => (
            <React.Fragment>
              <FormField name="email" required type="email" autoComplete="email" />
              <FormSubmit submitting={loading} value="Reset my password" />
              <FormErrorSummary errors={error && [error.message]} />

              {submitSucceed && (
                <Text mt="md" fontSize="md">
                  If there is an account associated with <b>{values.email}</b> you will receive an email with a link to
                  reset your password.
                </Text>
              )}
            </React.Fragment>
          )}
        </UIForm>
      );
    }}
  </RequestPasswordResetMutation>
);
