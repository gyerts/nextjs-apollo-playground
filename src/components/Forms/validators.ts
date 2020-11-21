// TODO: when new i18n support is ready use it to translate validation messages

const validEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const requiredValidator = (value: string, label: string, t: (i18n: string) => string) => {
  // @ts-ignore

  return !value ? t('errors.labelIsRequired', {label: t(`${label}`)}) : undefined;
}

export const emailValidator = (value: string, t: (i18n: string) => string) => {
  
  if (!value || !validEmailRegex.test(value.toLowerCase())) {
  // @ts-ignore

    return t('errors.labelIsRequired', {label: t(`auth.form.emailFieldLabel`)});
  }
  return undefined;
};

export const passwordValidator = (value: string, t: (i18n: string) => string) => {
  if (!value || value.length < 6) {
    return t('errors.passwordTooShort');
  }

  if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
    return t('errors.passwordDoNotMatch');
  }
  return undefined;
};

export const getDefaultInputTypeValidator = (inputType: IDefaultTypeInputValidator, t: (i18n: string) => string) => {
  switch (inputType) {
    case 'password':
      return (password: string) => passwordValidator(password, t);
    case 'email':
      return (email: string) => emailValidator(email, t);
    default:
      return undefined;
  }
};

export type IDefaultTypeInputValidator = 'password'|'email';
