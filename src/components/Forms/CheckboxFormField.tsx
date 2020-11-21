import React from 'react';
import {
  Box,
  Label,
  Text,
  Checkbox,
  FlexLayout,
  extractThemableProps,
  themed,
  ThemedComponentProps
} from '@deity/falcon-ui';
import {Field} from './Field';
import {toGridTemplate} from "../../uikitEjected";
import {FormFieldError} from "./components/FormFieldError";
import {useFormValidator} from "./common/useFormValidator";
import {IValidator} from "./common/validateSequentially";


interface IProps extends ThemedComponentProps {
  name: string
  validate?: IValidator[]
  required?: boolean
  disabled?: boolean
  children?: React.ReactElement
}
export const CheckboxFormField = (props: IProps) => {
  const { name, validate, required, disabled, children, ...restProps } = props;
  const { themableProps, rest } = extractThemableProps(restProps);
  const { validators } = useFormValidator({validate, required});

  return (
    <Field name={name} validate={validators} {...rest}>
      {({ form, field, label, error }: any) => (
        <CheckboxFormFieldLayout {...themableProps}>
          <Checkbox
            {...field}
            gridArea={area.input}
            checked={field.value}
            disabled={disabled}
            onChange={e => form.setFieldValue(field.name, e.target.checked)}
          />
          <Text gridArea={area.space} />
          <FlexLayout gridArea={area.label}>
            <ThemedLabel
              htmlFor={field.id}
              fontSize={themableProps.fontSize}
            >
              {label}
            </ThemedLabel>
          </FlexLayout>

          {error && <FormFieldError gridArea={area.error}>{error}</FormFieldError>}
        </CheckboxFormFieldLayout>
      )}
    </Field>
  );
};

const area = {
  label: 'label',
  input: 'input',
  error: 'error',
  empty: 'empty',
  space: 'space',
};

const CheckboxFormFieldLayout = themed({
  tag: Box,
  defaultTheme: {
    checkboxFormFieldLayout: {
      display: 'grid',
      // prettier-ignore
      gridTemplate: toGridTemplate([
        ['auto',        '10px',        '1fr'       ],
        [area.input,    area.space,    area.label  ],
        [area.empty,    area.space,    area.error  ],
      ])
    }
  }
});

const ThemedLabel = themed({
  tag: Label,
  defaultTheme: {
    checkboxFormLabelLayout: {
      css: {
        textAlign: 'start',
      },
      fontWeight: 'regular',
      lineHeight: 'default',
    }
  }
});
