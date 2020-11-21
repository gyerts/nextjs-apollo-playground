import React from "react";
import {Box, extractThemableProps, Text, themed, ThemedComponentProps} from "@deity/falcon-ui";
import {toGridTemplate} from "src/uikitEjected";


interface IProps extends ThemedComponentProps {
  id: string
  label: string
  error?: string
  required: boolean
}
export const TranzilaInput = ({ id, label, required, error, ...props }: IProps) => {
  const { themableProps } = extractThemableProps(props);

  return (
    <InputWrapper {...themableProps}>
      <Box gridArea={area.label}>{label} {required && '*'}</Box>
      <Box gridArea={area.input} className='input' px='md' id={id} />
      {error && <Text gridArea={area.error} className='error'>{error}</Text>}
    </InputWrapper>
  );
};

const area = {
  label: 'label',
  input: 'input',
  error: 'error',
  empty: '.',
};

const InputWrapper = themed({
  tag: Box,
  defaultTheme: {
    paymentForm: {
      display: 'grid',
      css: ({theme}) => ({
        height: 70,
        position: 'relative',

        '.input': {
          height: 44,
          border: 'solid 1px #000000',
        },
        '.error': {
          color: theme.colors.errorText,
          position: 'absolute',
        }
      }),
      // prettier-ignore
      gridTemplate:  toGridTemplate([
        ['1fr'],
        [area.label],
        [area.input],
        [area.error],
      ])
    }
  }
});
