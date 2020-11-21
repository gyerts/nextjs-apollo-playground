import React, {useContext} from 'react';

import * as yup from 'yup';
import {I18nContext} from "@market-ui/falcon-i18n";
import {DefaultThemeProps} from "@market-ui/falcon-ui";
import {toGridTemplate} from "src/uikitEjected";
import {UIForm} from "src/components";
import {
  AgreeNewsletterField,
  AgreeTermsField,
  ConfirmEmailField,
  ConfirmPasswordField,
  EmailField,
  FirstNameField,
  LastNameField,
  PasswordField,
  Privacy,
  RequiredNote,
  SubmitButton,
  Tip
} from "src/components";

interface IProps {
  id: string
  loading?: boolean
  submitLabel: string
  initialValues?: FormPropsToSubmit
  onSubmit?: (values: FormPropsToSubmit) => void
}
export function SignUpForm ({id, submitLabel, initialValues, onSubmit, loading}: IProps) {
  const getAutoComplete = (attribute: string) => [attribute].filter(x => x).join(' ');
  const {t} = useContext(I18nContext);

  const onBeforeSubmit = (values: FormPropsToSubmit) => {
    onSubmit && onSubmit({
      firstname: values.firstname,
      email: values.email,
      lastname: values.lastname,
      password: values.password,
      isNewsletter: values.isNewsletter,
    } as FormPropsToSubmit);
  };

  return (
    <UIForm
      id={id}
      defaultTheme={layout}
      name='authorization-form'
      i18nId="auth.form"
      css={{width: '100%'}}

      initialValues={initialValues}
      onSubmit={onBeforeSubmit}
      validationSchema={validationSchema(t)}
    >
      {({isValid}) => (
        <React.Fragment>
          <Tip gridArea={area.tip} i18nId='auth.form.tips.signup' />

          <FirstNameField
            gridArea={area.firstname}
            loading={loading}
            getAutoComplete={getAutoComplete}
          />

          <LastNameField
            gridArea={area.lastname}
            loading={loading}
            getAutoComplete={getAutoComplete}
          />

          <EmailField
            gridArea={area.email}
            loading={loading}
          />

          <ConfirmEmailField
            gridArea={area.confirmEmail}
            loading={loading}
          />

          <PasswordField
            gridArea={area.password}
            loading={loading}
            getAutoComplete={getAutoComplete}
          />

          <ConfirmPasswordField
            gridArea={area.confirmPassword}
            loading={loading}
            getAutoComplete={getAutoComplete}
          />

          <AgreeNewsletterField
            gridArea={area.isNewsletter}
            loading={loading}
          />

          <AgreeTermsField
            gridArea={area.agreeTerms}
            loading={loading}
          />

          <SubmitButton
            gridArea={area.submit}
            disabled={!isValid || loading}
            loading={loading}
            label={t(submitLabel)}
          />

          <RequiredNote gridArea={area.requiredNote} />

          <Privacy gridArea={area.privacy} />

        </React.Fragment>
      )}
    </UIForm>
  );
}

SignUpForm.defaultProps = {
  initialValues: {
    firstname: '',
    lastname: '',

    email: '',
    confirmEmail: '',

    password: '',
    confirmPassword: '',

    isNewsletter: true,
    agreeTerms: false,
  } as FormPropsToSubmit
};

type FormPropsToSubmit = {
  firstname: string
  lastname: string
  password: string
  email: string
  isNewsletter: boolean
  agreeTerms: boolean
};

const area = {
  tip: 'tip',
  firstname: 'firstname',
  lastname: 'lastname',
  email: 'email',
  confirmEmail: 'confirmEmail',
  password: 'password',
  confirmPassword: 'confirmPassword',
  isNewsletter: 'isNewsletter',
  agreeTerms: 'agreeTerms',
  submit: 'submit',
  requiredNote: 'requiredNote',
  privacy: 'privacy',
};

const layout: DefaultThemeProps = {
  authFormLayout: {
    display: 'grid',
    gridGap: 'xs',
    my: 'xs',
    fontSize: 'xs',
    // prettier-ignore
    gridTemplate:  toGridTemplate([
      ['1fr'                            ],
      ...Object.keys(area).map(key => [key]),
    ])
  }
};

const validationSchema = (t: (i18nId: string) => string) => {
  const validator: any = {};

  validator.email = yup
    .string()
    .email()
    .required(
      // @ts-ignore
      t('errors.labelIsRequired', {label: t('auth.form.emailFieldLabel')})
    ); 
  validator.confirmPassword = yup
    .string()
    .required(
      // @ts-ignore
      t('errors.labelIsRequired', {label: t('auth.form.confirmPasswordFieldLabel')})
    )
    .test('passwords-match', t('auth.form.inconsistentPassword'), function(value) {
      return this.parent.password === value;
    });
  validator.confirmEmail = yup
    .string()
    .required(
      // @ts-ignore
      t('errors.labelIsRequired', {label: t('auth.form.confirmEmailFieldLabel')})
    )
    .test('email-match', t('auth.form.inconsistentEmail'), function(value) {
      return this.parent.email === value;
    });
  validator.agreeTerms = yup
    .boolean()
    .test(
      'is-true',
      t('auth.form.pleaseAcceptTerms'),
      value => value === true
    );

  return yup.object().shape(validator);
};
