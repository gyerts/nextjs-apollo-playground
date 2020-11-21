import React, {useCallback, useContext} from "react";

import {Box, H3, Text} from "@market-ui/falcon-ui";
import {IUpdateCustomerFormPropsToSubmit, UpdateUserInfoForm} from "./forms/UpdateUserInfoForm";
import {EditCustomerMutation, ICustomer, IEditCustomerFn} from "src/api";
import {useTopPageMessage} from "src/components";
import {I18nContext, T} from "@market-ui/falcon-i18n";


interface IProps {
  customer: ICustomer
}
export const SectionUpdateCustomerInfo = ({ customer }: IProps) => {
  return (
    <EditCustomerMutation>{(editCustomer, {loading}) => (
      <SectionUpdateCustomerInfoImpl
        loading={loading}
        editCustomer={editCustomer}
        customer={customer}
      />
    )}</EditCustomerMutation>
  );
};

interface IImplProps {
  editCustomer: IEditCustomerFn
  loading: boolean
  customer: ICustomer
}
const SectionUpdateCustomerInfoImpl = ({ editCustomer, loading, customer }: IImplProps) => {
  const {openSuccessMessage, openErrorMessage} = useTopPageMessage();
  const {t} = useContext(I18nContext);

  const updateCustomer = useCallback(async (values: IUpdateCustomerFormPropsToSubmit) => {
    try {
      // @todo discussion started here: https://mktgrp.slack.com/archives/C015UR472TF/p1602005549167200
      await editCustomer({variables: {input: { websiteId: 0, ...values }}});
      openSuccessMessage(
        t('account.details.forms.changeUser.messages.success.title'),
        t('account.details.forms.changeUser.messages.success.message'),
      );
    } catch (e) {
      openErrorMessage(t('words.error'), e.message);
    }
  }, []);

  return (
    <Box>
      <H3><T id='breadcrumbs.details' /></H3>
      <Text><T id='account.details.forms.changeUser.tip._1' /></Text>
      <Text mb='sm'><T id='account.details.forms.changeUser.tip._2' /></Text>
      <UpdateUserInfoForm
        id='update-user-info-form'
        submitLabel={t('account.details.forms.changeUser.buttons.label')}
        onSubmit={updateCustomer}
        initialValues={{
          firstname: customer.firstname,
          lastname: customer.lastname,
          email: customer.email,
        }}
        loading={loading}
      />
    </Box>
  );
};
