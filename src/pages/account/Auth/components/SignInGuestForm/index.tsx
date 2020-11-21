import React, {useContext} from 'react';
import * as yup from 'yup';
import {I18nContext} from "@market-ui/falcon-i18n";
import {DefaultThemeProps} from "@market-ui/falcon-ui";
import {toGridTemplate} from "src/uikitEjected";
import {
  AgreeNewsletterField,
  AgreeTermsField,
  EmailField,
  RequiredNote,
  SubmitButton,
  Tip,
  UIForm,
} from "src/components";

interface IProps {
  id: string
  loading?: boolean
  submitLabel: string
  nextUrl?: string
  initialValues?: FormPropsToSubmit
  onSubmit?: (values: FormPropsToSubmit) => void
}
export function SignInGuestForm (
  { id, submitLabel, initialValues, onSubmit, loading }: IProps
) {
  const {t} = useContext(I18nContext);

  const onBeforeSubmit = (values: FormPropsToSubmit) => {
    onSubmit && onSubmit({
      email: values.email,
      isNewsletter: values.isNewsletter,
      agreeTerms: values.agreeTerms,
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
          <Tip
            gridArea={area.tip}
            i18nId='auth.form.tips.guest'
          />
          <EmailField
            gridArea={area.email}
            loading={loading}
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
          <RequiredNote
            gridArea={area.requiredNote}
          />
        </React.Fragment>
      )}
    </UIForm>
  );
}

SignInGuestForm.defaultProps = {
  initialValues: {
    email: '',
    isNewsletter: true,
    agreeTerms: false,
  } as FormPropsToSubmit
};

type FormPropsToSubmit = {
  email: string
  isNewsletter: boolean
  agreeTerms: boolean
};

const area = {
  tip: 'tip',
  email: 'email',
  isNewsletter: 'isNewsletter',
  agreeTerms: 'agreeTerms',
  submit: 'submit',
  requiredNote: 'requiredNote',
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

  validator.agreeTerms = yup
    .boolean()
    .test(
      'is-true',
      t('auth.form.pleaseAcceptTerms'),
      value => value === true
    );

  return yup.object().shape(validator);
};
