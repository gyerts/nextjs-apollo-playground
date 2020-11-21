import React, {useContext} from 'react';

import {I18nContext} from "@market-ui/falcon-i18n";
import {DefaultThemeProps} from "@market-ui/falcon-ui";
import {toGridTemplate} from "src/uikitEjected";
import {UIForm, EmailField, FirstNameField, LastNameField, SubmitButton} from "src/components";

interface IProps {
  id: string
  loading?: boolean
  submitLabel: string
  initialValues?: IUpdateCustomerFormPropsToSubmit
  onSubmit?: (values: IUpdateCustomerFormPropsToSubmit) => void
}
export const UpdateUserInfoForm = ({id, submitLabel, initialValues, onSubmit, loading}: IProps) => {
  const getAutoComplete = (attribute: string) => [attribute].filter(x => x).join(' ');
  const {t} = useContext(I18nContext);

  const onBeforeSubmit = (values: IUpdateCustomerFormPropsToSubmit) => {
    onSubmit && onSubmit({
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
    } as IUpdateCustomerFormPropsToSubmit);
  };

  return (
    <UIForm
      id={id}
      defaultTheme={layout}
      name='authorization-form'
      i18nId="auth.form"
      css={{maxWidth: 400}}

      initialValues={initialValues}
      enableReinitialize
      onSubmit={onBeforeSubmit}
    >
      {({isValid}) => (
        <React.Fragment>
          <FirstNameField
            gridArea={area.firstname}
            loading={loading}
            getAutoComplete={getAutoComplete}
            grayed
          />

          <LastNameField
            gridArea={area.lastname}
            loading={loading}
            getAutoComplete={getAutoComplete}
            grayed
          />

          <EmailField
            gridArea={area.email}
            loading={true}
          />

          <SubmitButton
            gridArea={area.submit}
            disabled={!isValid || loading}
            loading={loading}
            label={t(submitLabel)}
          />
        </React.Fragment>
      )}
    </UIForm>
  );
};

export type IUpdateCustomerFormPropsToSubmit = {
  firstname: string
  lastname: string
  email: string
};

const area = {
  firstname: 'firstname',
  lastname: 'lastname',
  email: 'email',
  submit: 'submit',
};

const layout: DefaultThemeProps = {
  authFormLayout: {
    display: 'grid',
    gridGap: 'xs',
    my: 'xs',
    fontSize: 'xs',
    // prettier-ignore
    gridTemplate:  toGridTemplate([
      ['1fr'                               ],
      ...Object.keys(area).map(key => [key]),
    ])
  }
};
