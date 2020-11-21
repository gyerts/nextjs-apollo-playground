import React, {useContext} from 'react';
import {FormField, UIForm} from '../Forms';
import * as yup from 'yup';
import {I18nContext, T} from '@market-ui/falcon-i18n';
import {SubmitButton} from './index';
import {FormFieldDropdown} from '../Forms/FormFieldDropdown';
import {FlexLayout} from "@deity/falcon-ui";

const validationSchema = (t: (i18nId: string) => string) => {
  return yup.object().shape({
    name: yup.string().required(t('contactUs.fieldRequired')),
    email: yup.string().email(t('contactUs.emailError')).required(t('contactUs.fieldRequired')),
    phoneNumber: yup.string().matches(/^[0-9]*$/, t('contactUs.onlyNumberError')),
    needHelpDropdownValue: yup.string().required(t('contactUs.fieldRequired')),
    moreDetails: yup.string()
  });
};

export interface IContactUsFormProps {
  initialValues: any;
  dropdownValues: string[];
  loading: boolean;
  onSubmit: (values: any) => void | Promise<any>;
}

export const ContactUsForm = ({initialValues, dropdownValues, loading, onSubmit}: IContactUsFormProps) => {
  const {t} = useContext(I18nContext);

  return (
    <>
    <T id="contactUs.contactFormCapture" />
        <UIForm
          id='contact-us-form'
          name='contact-us-form'
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema(t)}
        >
          {({values, isValid, errors, touched}) => (
            <FlexLayout flexDirection='column' flexWrap='nowrap'>
              <FormField name="name" label={t('contactUs.name')} required />
              <FormField name="email" label={t('contactUs.emailAddress')} type="email" required />
              <FormField name="phoneNumber" label={t('contactUs.phoneNumber')} />
              <FormField name="orderNumber" label={t('contactUs.orderNumber')} />
              <FormFieldDropdown
                options={dropdownValues}
                currentValue={values.needHelpDropdownValue}
                label={t('contactUs.needHelpLabel')}
                fieldName={'needHelpDropdownValue'}
                firstOption={t('contactUs.selectAnItem')}
                error={errors.needHelpDropdownValue}
                touched={touched.needHelpDropdownValue}
                required
              />
              <FormField name="moreDetails" label={t('contactUs.moreDetails')} as="textarea" />

              <SubmitButton
                gridArea='submit'
                disabled={!isValid || loading}
                loading={loading}
                label={t('contactUs.button')}
              />
            </FlexLayout>
          )}
        </UIForm>
    </>
  )
}
