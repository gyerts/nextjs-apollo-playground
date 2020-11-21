import React, {useState} from 'react';
import {useErrorsHandler} from 'src/pages/account/Auth/common/useErrorsHandler';
import {ContactUsPostForm} from './ContactUsPostForm';
import {ICustomerSubmitContactUs, SetContactUsMutation} from 'src/api/ContactUs/ContactUsMutation';
import {ContactUsForm} from '../FormsSet/ContactUsForm';

interface IContactUsFormBlockProps {
  loading: boolean;
  dropdownValues: string[];
}

export const ContactUsFormBlock = (props: IContactUsFormBlockProps) => {
  const [isFormSent, setIsFormSent] = useState(false);
  const { handleError } = useErrorsHandler();

  if (isFormSent) {
    return <ContactUsPostForm setState={setIsFormSent}/>
  }

  return (
    <SetContactUsMutation>
      {(customerSubmitContactUs: ICustomerSubmitContactUs) => {
        return (
          <ContactUsForm
            dropdownValues={props.dropdownValues}
            initialValues={{
              name: "",
              email: "",
              phoneNumber: "",
              orderNumber: "",
              needHelpDropdownValue: "",
              moreDetails: ""
            }}
            loading={props.loading}
            onSubmit={async (values) => {
              try {
                await customerSubmitContactUs({variables: {
                    input: values
                  }});
                setIsFormSent(true);
              } catch (e) {
                handleError(e);
              }
            }}
          />
        )}
      }
    </SetContactUsMutation>
  )
}