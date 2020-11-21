import React from 'react';
import {Box, Input, extractThemableProps, themed, ThemedComponentProps} from '@market-ui/falcon-ui';

import {Field} from './Field';
import {FormFieldLabel} from "./components/FormFieldLabel";
import {FormFieldError} from "./components/FormFieldError";
import {useFormValidator} from "./common/useFormValidator";

import {toGridTemplate} from "src/uikitEjected";
import {IValidator} from "./common/validateSequentially";
import {FieldProps} from "formik";
import {IDefaultTypeInputValidator} from "./validators";


interface IProps extends ThemedComponentProps {
  name: string
  type?: IDefaultTypeInputValidator
  validate?: IValidator[]
  required?: boolean
  disabled?: boolean
  label?: string
  grayed?: boolean
  as?: string | React.ComponentType<FieldProps['field']>
  autoComplete?: string
  children?: (props: {
    form: FieldProps['form'],
    field: FieldProps['field'] & {
      gridArea: string,
    },
    variant?: string,
  }) => React.ReactElement
}
export const FormField = ({gridArea, ...props}: IProps) => {
  const { name, validate, required, autoComplete, children, disabled, type, grayed, ...restProps } = props;
  const { themableProps, rest } = extractThemableProps(restProps);
  const { validators } = useFormValidator({validate, required, type});

  return (
    <FormFieldLayout {...themableProps} gridArea={gridArea}>
      <Field name={name} type={type} validators={validators} {...rest}>
        {({ form, field, label, error }) => (
          <FormFieldImpl
            label={label}
            form={form}
            field={field}
            error={error}
            autoComplete={autoComplete}
            disabled={disabled}
            children={children}
            grayed={grayed}
            required={required}
          />
        )}
      </Field>
    </FormFieldLayout>
  );
};
const FormFieldImpl = (props: {
  form: any,
  field: any,
  label: string,
  error?: string,
  required?: boolean
  autoComplete: any
  children?: any
  disabled?: boolean
  grayed?: boolean
}) => {
  const { label, required, autoComplete, children, disabled, grayed, field, error, form } = props;

  return (
    <React.Fragment>
      {label && <FormFieldLabel gridArea={area.label} htmlFor={field.id}>{label} {required && '*'}</FormFieldLabel>}

      {children ? (
        children({
                form,
                field: {
                  ...field,
                  gridArea: area.input,
                },
                variant: grayed && "grayed",
              })
      ) : (
        <Input {...field} gridArea={area.input} disabled={disabled} autoComplete={autoComplete} variant={grayed && "grayed"} />
      )}

      <FormFieldError gridArea={area.error}>{field.invalid ? error : null}</FormFieldError>
    </React.Fragment>
  );
};
const area = {
  label: 'label',
  input: 'input',
  error: 'error',
  empty: 'empty',
  space: 'space',
};

const FormFieldLayout = themed({
  tag: Box,
  defaultTheme: {
    formFieldLayout: {
      display: 'grid',
      // prettier-ignore
      gridTemplate: toGridTemplate([
        ['1fr'                     ],
        [area.label                ],
        [area.input                ],
        [area.error,         '0px' ],
      ]),
      mb: 'xs',
    }
  }
});
