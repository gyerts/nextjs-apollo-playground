import React from 'react';
import PropTypes from 'prop-types';
import { CountrySelector, toGridTemplate } from 'src/uikitEjected';
import { Box, Button } from '@market-ui/falcon-ui';
import {
  FormField, UIForm,
} from 'src/components';

const AddressFormArea = {
  firstName: 'firstName',
  lastName: 'lastName',
  street1: 'street1',
  street2: 'street2',
  number: 'number',
  postCode: 'postCode',
  city: 'city',
  email: 'email',
  phone: 'phone',
  region: 'region',
  country: 'country',
  submit: 'submit'
};

const addressFormLayout = {
  addressFormLayout: {
    display: 'grid',
    gridGap: 'sm',
    my: 'xs',
    fontSize: 'xs',
    // prettier-ignore
    gridTemplate:  toGridTemplate([
      ['1fr'                      ],
      [AddressFormArea.email      ],
      [AddressFormArea.firstName  ],
      [AddressFormArea.lastName   ],
      [AddressFormArea.street1    ],
      [AddressFormArea.street2    ],
      [AddressFormArea.number     ],
      [AddressFormArea.postCode   ],
      [AddressFormArea.city       ],
      [AddressFormArea.phone      ],
      [AddressFormArea.country    ],
      [AddressFormArea.submit     ]
    ])
  }
};

const AddressForm = ({ countries = [], submitLabel = 'Save', id = '', autoCompleteSection, initialValues }) => {
  const getAutoComplete = attribute => [autoCompleteSection, attribute].filter(x => x).join(' ');

  return (
    <UIForm
      id={id}
      name='address-form'
      defaultTheme={addressFormLayout}
      i18nId="addressForm"
      initialValues={initialValues}
      onSubmit={this.submitAddress}
    >
      {() => (
        <React.Fragment>
          <FormField name="email" type="email" required gridArea={AddressFormArea.email} />
          <FormField
            name="firstname"
            required
            autoComplete={getAutoComplete('given-name')}
            gridArea={AddressFormArea.firstName}
          />
          <FormField
            name="lastname"
            required
            autoComplete={getAutoComplete('family-name')}
            gridArea={AddressFormArea.lastName}
          />
          <FormField
            name="street1"
            required
            autoComplete={getAutoComplete('address-line1')}
            gridArea={AddressFormArea.street1}
          />
          <FormField name="street2" autoComplete={getAutoComplete('address-line2')} gridArea={AddressFormArea.street2} />
          <FormField name="countryId" required autoComplete={getAutoComplete('country')} gridArea={AddressForm.country}>
            {({ form, field }) => (
              <CountrySelector {...field} items={countries} onChange={x => form.setFieldValue(field.name, x)} />
            )}
          </FormField>
          <FormField
            name="postcode"
            required
            autoComplete={getAutoComplete('postal-code')}
            gridArea={AddressFormArea.postCode}
          />
          <FormField
            name="city"
            required
            autoComplete={getAutoComplete('address-level2')}
            gridArea={AddressFormArea.city}
          />
          <FormField name="telephone" required autoComplete={getAutoComplete('tel')} gridArea={AddressFormArea.phone} />
          <Box gridArea={AddressFormArea.submit}>
            <Button type="submit">{submitLabel}</Button>
          </Box>
        </React.Fragment>
      )}
    </UIForm>
  );
};

AddressForm.propTypes = {
  id: PropTypes.string.isRequired,
  submitLabel: PropTypes.string,
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      localName: PropTypes.string,
      code: PropTypes.string
    })
  ),
  initialValues: PropTypes.shape({
    email: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    street1: PropTypes.string,
    street2: PropTypes.string,
    countryId: PropTypes.string,
    postcode: PropTypes.string,
    city: PropTypes.string,
    telephone: PropTypes.string,
  })
};

export default AddressForm;
