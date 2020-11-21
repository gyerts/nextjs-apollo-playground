import React from 'react';
import { Button, FlexLayout } from '@market-ui/falcon-ui';
import { T } from '@market-ui/falcon-i18n';

import {FormField, PasswordRevealInput, FormErrorSummary, UIForm} from 'src/components';
import { SignInMutation } from './SignInMutation';
import { ForgotPasswordTrigger } from './ForgotPasswordTrigger';

export const SignInForm = ({ onCompleted, id }) => (
  <SignInMutation>
    {(signIn, { loading, error }) => (
      <UIForm
        id={id}
        name='signin-form'
        i18nId="signIn"
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={values => signIn({ variables: { input: values } }).then(() => onCompleted && onCompleted())}
      >
        {() => (
          <React.Fragment>
            <FormField name="email" type="email" required autoComplete="email" />
            <FormField
              name="password"
              type="password"
              // pass empty array, so default password strength validator does not get triggered
              validate={[]}
              required
              autoComplete="current-password"
            >
              {({ field }) => <PasswordRevealInput {...field} />}
            </FormField>
            <FlexLayout justifyContent="space-between" alignItems="center" mt="md">
              <ForgotPasswordTrigger />
              <Button type="submit" variant={loading ? 'loader' : undefined}>
                <T id="signIn.button" />
              </Button>
            </FlexLayout>

            <FormErrorSummary errors={error && [error.message]} />
          </React.Fragment>
        )}
      </UIForm>
    )}
  </SignInMutation>
);
