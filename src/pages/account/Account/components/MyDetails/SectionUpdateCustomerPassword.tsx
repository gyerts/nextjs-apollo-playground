import React, {useCallback, useContext} from "react";

import {Box, H3, Text} from "@market-ui/falcon-ui";
import {I18nContext, T} from "@market-ui/falcon-i18n";

import {ChangePasswordForm, IChangeCustomerPasswordFormPropsToSubmit} from "./forms/ChangePasswordForm";
import {ChangePasswordMutation, IChangeCustomerPasswordFn} from "src/api";
import {useTopPageMessage} from "src/components";


interface IProps {

}
export const SectionUpdateCustomerPassword = ({  }: IProps) => {
  return (
    <ChangePasswordMutation>{(changePassword, {loading}) => (
      <SectionUpdateCustomerPasswordImpl
        changePassword={changePassword}
        loading={loading}
      />
    )}</ChangePasswordMutation>

  );
};

interface IImplProps {
  changePassword: IChangeCustomerPasswordFn
  loading: boolean
}
const SectionUpdateCustomerPasswordImpl = ({ loading, changePassword }: IImplProps) => {
  const {openSuccessMessage, openErrorMessage} = useTopPageMessage();
  const {t} = useContext(I18nContext);

  const changeCustomerPassword = useCallback(async (values: IChangeCustomerPasswordFormPropsToSubmit) => {
    try {
      // @todo discussion started here: https://mktgrp.slack.com/archives/C015UR472TF/p1602008948172100
      await changePassword({variables: {input: values}});
      openSuccessMessage(
        t('account.details.forms.changePassword.messages.success.title'),
        t('account.details.forms.changePassword.messages.success.message'),
      );
    } catch (e) {
      openErrorMessage(t('words.error'), e.message);
    }
  }, []);

  return (
    <Box>
      <H3 mb='md'><T id='account.details.forms.changePassword.title' /></H3>
      <Text mb='sm'><T id='account.details.forms.changePassword.tip' /></Text>
      <ChangePasswordForm
        id='change-customer-password-form'
        initialValues={{
          currentPassword: '',
          password: '',
          confirmPassword: '',
        }}
        submitLabel={t('account.details.forms.changePassword.buttons.label')}
        loading={loading}
        onSubmit={changeCustomerPassword}
      />
    </Box>
  );
};
