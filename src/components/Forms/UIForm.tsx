import React, {useEffect} from 'react';
import {
  Form as FormikForm,
  Formik, FormikComputedProps,
  FormikConfig,
  FormikHandlers,
  FormikState
} from 'formik';
import {Box, DefaultThemeProps, extractThemableProps, ThemedComponentProps} from '@market-ui/falcon-ui';
import {extractFormikProps} from "./common/extractFormikProps";
import {Error} from "tslint/lib/error";


// initial values need to be set because of: https://github.com/jaredpalmer/formik/issues/738
// also this issue generates controlled/uncontrolled warnings

interface IProps<TFields> extends ThemedComponentProps, FormikConfig<TFields> {
  i18nId?: string
  id: string
  name: string
  defaultTheme?: DefaultThemeProps
  children?: (props: FormikState<TFields> & FormikHandlers & FormikComputedProps<TFields>) => React.ReactElement|React.ReactElement[]
}
export function UIForm <TFields> (props: IProps<TFields>) {
  const { id, name, i18nId, children, defaultTheme, ..._props} = props;
  const { themableProps } = extractThemableProps(_props);
  const formikProps = extractFormikProps<TFields>(_props);

  useEffect(function () {
    if (!formikProps.initialValues) {
      throw new Error('initialValues are required!');
    }
  }, []);

  return (
    <Formik<TFields>
      {...formikProps}
    >
      {(props) => (
        <FormContext.Provider value={{ id, name, i18nId }}>
          <Box
            as={FormikForm}
            defaultTheme={defaultTheme}
            onSubmit={props.handleSubmit}
            {...themableProps}
          >
            {children(props)}
          </Box>
        </FormContext.Provider>
      )}
    </Formik>
  );
}

export const FormContext = React.createContext({});
