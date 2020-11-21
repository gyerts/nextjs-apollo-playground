import React from 'react';
import {FormFieldLabel} from './components/FormFieldLabel';
import {Dropdown, DropdownLabel, DropdownMenu, DropdownMenuItem} from '@deity/falcon-ui';
import {FormFieldError} from './components/FormFieldError';
import {FormikErrors, FormikTouched, useFormikContext} from 'formik';

interface FormFieldDropdownProps {
  fieldName: string;
  currentValue: string;
  label: string;
  options: string[];
  firstOption: string;
  required: boolean;
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[];
}

export const FormFieldDropdown = (props: FormFieldDropdownProps) => {
  const {fieldName, currentValue, label, options, firstOption, required, error, touched} = props;
  const {setFieldValue} = useFormikContext();

  return (
    <React.Fragment>
      {label && <FormFieldLabel htmlFor={fieldName}>{label} {required && '*'}</FormFieldLabel>}

      <Dropdown onChange={(val: string) => {
      setFieldValue(fieldName, val || '');
    }}>
        <DropdownLabel>
          {(currentValue === '') ? (firstOption || '') : currentValue}
        </DropdownLabel>
        <DropdownMenu>
          {options.map((item: string, index: number) => (
            <DropdownMenuItem key={index} value={item}>{item}</DropdownMenuItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <FormFieldError>{(error && touched) ? error : null}</FormFieldError>
    </React.Fragment>
  )
};
