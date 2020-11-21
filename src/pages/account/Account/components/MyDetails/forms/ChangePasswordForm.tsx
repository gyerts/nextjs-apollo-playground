import React, {useContext} from 'react';

import {I18nContext} from "@market-ui/falcon-i18n";
import {DefaultThemeProps} from "@market-ui/falcon-ui";
import * as yup from 'yup';
import {toGridTemplate} from "src/uikitEjected";
import {
  UIForm,
  ConfirmPasswordField,
  CurrentPasswordField,
  ForgotPassword,
  PasswordField,
  SubmitButton,
} from "src/components";


interface IProps {
  id: string
  loading?: boolean
  submitLabel: string
  initialValues?: IChangeCustomerPasswordFormPropsToSubmit
  onSubmit?: (values: IChangeCustomerPasswordFormPropsToSubmit) => void
}
export const ChangePasswordForm = ({id, submitLabel, initialValues, onSubmit, loading}: IProps) => {
  const getAutoComplete = (attribute: string) => [attribute].filter(x => x).join(' ');
  const {t} = useContext(I18nContext);

  const onBeforeSubmit = (values: IChangeCustomerPasswordFormPropsToSubmit) => {
    onSubmit && onSubmit({
      currentPassword: values.currentPassword,
      password: values.password,
    } as IChangeCustomerPasswordFormPropsToSubmit);
  };

  return (
    <UIForm
      id={id}
      defaultTheme={layout}
      name='authorization-form'
      i18nId="auth.form"
      css={{maxWidth: 400}}

      initialValues={initialValues}
      enableReinitialize
      onSubmit={onBeforeSubmit}
      validationSchema={validationSchema(t)}
    >
      {({isValid}) => (
        <React.Fragment>
          <CurrentPasswordField
            gridArea={area.currentPassword}
            loading={loading}
            getAutoComplete={getAutoComplete}
            grayed
          />
          <ForgotPassword
            gridArea={area.forgot}
            useQuestionSign
          />
          <PasswordField
            gridArea={area.password}
            loading={loading}
            getAutoComplete={getAutoComplete}
            grayed
          />
          <ConfirmPasswordField
            gridArea={area.confirmPassword}
            loading={loading}
            getAutoComplete={getAutoComplete}
            grayed
          />
          <SubmitButton
            gridArea={area.submit}
            disabled={!isValid || loading}
            loading={loading}
            label={t(submitLabel)}
          />
        </React.Fragment>
      )}
    </UIForm>
  );
};

export type IChangeCustomerPasswordFormPropsToSubmit = {
  currentPassword: string
  password: string
  confirmPassword: string
};

const area = {
  currentPassword: 'currentPassword',
  forgot: 'forgot',
  password: 'password',
  confirmPassword: 'confirmPassword',
  submit: 'submit',
};

const layout: DefaultThemeProps = {
  authFormLayout: {
    display: 'grid',
    gridGap: 'xs',
    my: 'xs',
    fontSize: 'xs',
    // prettier-ignore
    gridTemplate:  toGridTemplate([
      ['1fr'                               ],
      ...Object.keys(area).map(key => [key]),
    ])
  }
};

const validationSchema = (t: (i18nId: string) => string) => {
  const validator: any = {};

  validator.confirmPassword = yup
    .string()
    .required(
      // @ts-ignore
      t('errors.labelIsRequired', {label: t('auth.form.confirmPasswordFieldLabel')})
    )
    .test('passwords-match', t('auth.form.inconsistentPassword'), function(value) {
      return this.parent.password === value;
    });

  return yup.object().shape(validator);
};
