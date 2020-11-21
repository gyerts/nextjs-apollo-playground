import React from 'react';
import { SignUpMutation } from './SignUpMutation';
import {FormField, FormSubmit, FormErrorSummary, PasswordRevealInput, UIForm} from 'src/components';

export const SignUpForm = ({ onCompleted }) => (
  <SignUpMutation onCompleted={onCompleted}>
    {(signUp, { loading, error }) => (
      <UIForm
        name="sign-up-form"
        id="sign-up"
        i18nId="signUp"
        initialValues={{
          firstname: '',
          lastname: '',
          email: '',
          password: ''
        }}
        onSubmit={values => {
          signUp({ variables: { input: { ...values, autoSignIn: true } } });
        }}
      >
        {() => (
          <React.Fragment>
            <FormField name="firstname" type="text" required autoComplete="given-name" />
            <FormField name="lastname" type="text" required autoComplete="family-name" />
            <FormField name="email" type="email" required autoComplete="email" />

            <FormField name="password" required type="password" autoComplete="new-password">
              {({ field }) => <PasswordRevealInput {...field} />}
            </FormField>

            <FormSubmit submitting={loading} value="Create an account" />
            <FormErrorSummary errors={error && [error.message]} />
          </React.Fragment>
        )}
      </UIForm>
    )}
  </SignUpMutation>
);
