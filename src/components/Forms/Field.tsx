import React, {useCallback, useContext} from 'react';
import {Field as FormikField, FieldProps, getIn} from 'formik';
import {I18nContext} from '@market-ui/falcon-i18n';
import { FormContext } from './UIForm';
import {getLabelI18nId} from "./common/getLabelI18nId";
import {getPlaceholderI18nId} from "./common/getPlaceholderI18nId";
import {IValidator, validateSequentially} from "./common/validateSequentially";


interface IProps {
  name: string
  label: string
  placeholder: string
  validators: IValidator[]
  children: (props: IField) => React.ReactElement
}
export const Field = (props: IProps) => {
  const { name, label, placeholder, validators, children, ...restProps } = props;
  const { t } = useContext(I18nContext);

  if (!children) return null;

  const translateIfExists = useCallback(function (id) {
    return id ? t(id, { defaultValue: '' }) : undefined;
  }, []);

  return (
    <FormContext.Consumer>
      {({ id: formId, i18nId: formI18nId }: {id: string, i18nId: string}) => {
        const i18nIds = formI18nId
          ? {
            label: getLabelI18nId(formI18nId, name),
            placeholder: getPlaceholderI18nId(formI18nId, name)
          }
          : {};

        const fieldLabel = label || translateIfExists(i18nIds.label);
        const fieldPlaceholder = placeholder || translateIfExists(i18nIds.placeholder);
        const validator = validateSequentially(validators || [], fieldLabel || name, t);

        return (
          <FormikField name={name} validate={validator}>
            {({ form, field }: FieldProps) => {
              const touch = getIn(form.touched, name);
              const error = getIn(form.errors, name);

              const fieldProps: IField = {
                error,
                label: fieldLabel,
                i18nIds,
                field: {
                  id: `${formId}-${name}`,
                  ...restProps,
                  ...field,
                  placeholder: fieldPlaceholder,
                  invalid: !!touch && !!error
                },
                form: { ...form, id: formId },
              };

              return children(fieldProps);
            }}
          </FormikField>
        )
      }}
    </FormContext.Consumer>
  );
};

export type IField = {
  error: string
  label: string
  i18nIds: {
    label?: string
    placeholder?: string
  }
  field: FieldProps['field'] & {
    id: string
    placeholder: string
    invalid: boolean
  }
  form: FieldProps['form'] & {
    id: string
  }
}
