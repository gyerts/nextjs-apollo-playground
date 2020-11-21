import {FormikConfig} from "formik";

/**
 * read FormikConfig interface to update this function
 * @param props
 */
export function extractFormikProps <TFields> (props: any): FormikConfig<TFields> {
  return {
    component: props.component,
    render: props.render,
    children: props.children,
    initialValues: props.initialValues,
    initialStatus: props.initialStatus,
    initialErrors: props.initialErrors,
    initialTouched: props.initialTouched,
    onReset: props.onReset,
    onSubmit: props.onSubmit,
    validationSchema: props.validationSchema,
    validate: props.validate,
    innerRef: props.innerRef,
  } as FormikConfig<TFields>;
}
