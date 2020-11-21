import React, {useContext} from 'react';

import * as yup from 'yup';

import {I18nContext, T} from "@market-ui/falcon-i18n";
import {DefaultThemeProps} from "@market-ui/falcon-ui";
import {toGridTemplate} from "src/uikitEjected";
import {UIForm} from "src/components";
import {
  AskSignUp,
  EmailField,
  PasswordField,
  Privacy,
  RememberMeForgotPassword,
  SubmitButton,
  Tip
} from "src/components";

interface IProps {
  id: string
  loading?: boolean
  submitLabel: string
  nextUrl?: string
  initialValues?: FormPropsToSubmit
  onSubmit?: (values: FormPropsToSubmit) => void
}
export function SignInForm ({id, submitLabel, initialValues, nextUrl, onSubmit, loading}: IProps) {
  const getAutoComplete = (attribute: string) => [attribute].filter(x => x).join(' ');
  const {t} = useContext(I18nContext);


  const onBeforeSubmit = (values: FormPropsToSubmit) => {
    onSubmit && onSubmit({
      email: values.email,
      password: values.password,
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
          <Tip gridArea={area.tip} i18nId='auth.form.tips.signin' />

          <EmailField
            gridArea={area.email}
            loading={loading}
          />
          <PasswordField
            gridArea={area.password}
            loading={loading}
            getAutoComplete={getAutoComplete}
          />
          <RememberMeForgotPassword
            gridArea={area.autoSignIn}
            loading={loading}
          />

          <SubmitButton
            gridArea={area.submit}
            disabled={!isValid || loading}
            loading={loading}
            label={t(submitLabel)}
          />

          <AskSignUp
            gridArea={area.askSignUp}
            nextUrl={nextUrl}
          />

          <Privacy gridArea={area.privacy} />
        </React.Fragment>
      )}
    </UIForm>
  );
}

SignInForm.defaultProps = {
  initialValues: {
    email: '',
    password: '',
  } as FormPropsToSubmit
};

type FormPropsToSubmit = {
  password: string
  email: string
};

const area = {
  tip: 'tip',
  email: 'email',
  password: 'password',
  autoSignIn: 'autoSignIn',
  submit: 'submit',
  askSignUp: 'askSignUp',
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
    .required();

  return yup.object().shape(validator);
};
