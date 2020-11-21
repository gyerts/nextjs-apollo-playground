import React from 'react';
import { Form as FormikForm } from 'formik';
import {Box, DefaultThemeProps, extractThemableProps, themed, ThemedComponentProps} from '@deity/falcon-ui';


interface IProps extends ThemedComponentProps {
  i18nId: string
  id: string
  name: string
  defaultTheme?: any & DefaultThemeProps
  children?: React.ReactElement|React.ReactElement[]
  onSubmit?: (e: any) => void
}
export const Form = ({id, name, i18nId, children, defaultTheme, onSubmit, ...props}: IProps) => {
  const { themableProps } = extractThemableProps(props);

  return (
    <FormContext.Provider value={{ id, name, i18nId }}>
      <Box as={FormikForm} defaultTheme={defaultTheme} onSubmit={onSubmit} {...themableProps}>{children}</Box>
    </FormContext.Provider>
  );
};

export const FormContext = React.createContext({});
