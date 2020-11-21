import React from 'react';
import {Box, Label, Radio, FlexLayout, extractThemableProps, themed, ThemedComponentProps} from '@market-ui/falcon-ui';
import {toGridTemplate} from "src/uikitEjected";

import {Field} from './Field';
import {useFormValidator} from "./common/useFormValidator";
import {IValidator} from "./common/validateSequentially";


interface IProps extends ThemedComponentProps {
  name: string
  validate: IValidator[]
  required: boolean
  value: string | ReadonlyArray<string> | number
  children: React.ReactElement
}
export const RadioFormField = (props: IProps) => {
  const { name, value, validate, required, children, ...restProps } = props;
  const { themableProps, rest } = extractThemableProps(restProps);
  const { validators } = useFormValidator({ validate, required });

  return (
    <Field name={name} validate={validators} {...rest}>
      {({ field, label }) => (
        <RadioFormFieldLayout {...themableProps}>
          <Radio {...field} value={value} checked={value === field.value} gridArea={area.input} />
          <FlexLayout alignItems="center" gridArea={area.label}>
            <Label htmlFor={field.id} gridArea={area.label}>{children || label}</Label>
          </FlexLayout>
        </RadioFormFieldLayout>
      )}
    </Field>
  );
};

const area = {
  label: 'label',
  input: 'input',
  error: 'error'
};

const RadioFormFieldLayout = themed({
  tag: Box,
  defaultTheme: {
    radioFormFieldLayout: {
      display: 'grid',
      gridGap: 'xs',
      // prettier-ignore
      gridTemplate: toGridTemplate([
        ['auto', '1fr'],
        [area.input, area.label],
        [area.error, area.error, '0px']
      ])
    }
  }
});
