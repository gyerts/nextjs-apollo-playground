import React, {useContext} from 'react';
import {Button, DefaultThemeProps, Input} from '@deity/falcon-ui';

import {bothResolutions, mobileOnly} from "src/styling/cssHelper";
import { toGridTemplate } from 'src/uikitEjected';
import { UIForm, FormField, CheckboxFormField } from 'src/components';
import {GoogleApiScript, GooglePlacesAutocomplete} from "src/components";
import {I18nContext, T} from "@market-ui/falcon-i18n";
import * as yup from 'yup';


const area = {
  lastName: 'lastName',
  firstName: 'firstName',
  phone: 'phone',
  postCode: 'postCode',
  street1: 'street1',
  street2: 'street2',
  flat: 'flat',
  floor: 'floor',
  city: 'city',
  defaultShipping: 'defaultShipping',
  defaultBilling: 'defaultBilling',
  same: 'same',
  submit: 'submit',
  cancel: 'cancel',
};

const oneColumn = (showShippingBilling: boolean, same: boolean) => {
  const template = [
    ['1fr',          '1fr'          ],
    [area.firstName, area.firstName ],
    [area.lastName,  area.lastName  ],
    [area.phone,     area.phone     ],
    [area.street1,   area.street1   ],
    [area.street2,   area.street2   ],
    [area.floor,     area.flat      ],
    [area.city,      area.city      ],
    [area.postCode,  area.postCode  ],
  ];
  if (same) {
    template.push([area.same, area.same]);
  }
  if (showShippingBilling) {
    template.push([area.defaultShipping, area.defaultShipping]);
    template.push([area.defaultBilling, area.defaultBilling]);
  }
  template.push([area.submit, area.cancel]);
  return toGridTemplate(template);
};
const oneColumnWithButtons = (showShippingBilling: boolean, same: boolean) => {
  const template = [
    ['1fr',          '1fr'          ],
    [area.firstName, area.firstName ],
    [area.lastName,  area.lastName  ],
    [area.phone,     area.phone     ],
    [area.street1,   area.street1   ],
    [area.street2,   area.street2   ],
    [area.floor,     area.floor     ],
    [area.flat,      area.flat      ],
    [area.city,      area.city      ],
    [area.postCode,  area.postCode  ],
  ];
  if (same) {
    template.push([area.same, area.same]);
  }
  if (showShippingBilling) {
    template.push([area.defaultShipping, area.defaultShipping]);
    template.push([area.defaultBilling, area.defaultBilling]);
  }
  template.push([area.submit,    area.submit    ]);
  template.push([area.cancel,    area.cancel    ]);
  return toGridTemplate(template);
};
const twoColumns = (showShippingBilling: boolean, same: boolean) => {
  const template = [
    ['1fr',          '1fr'          ],
    [area.firstName, area.lastName  ],
    [area.phone,     area.phone     ],
    [area.street1,   area.street1   ],
    [area.street2,   area.street2   ],
    [area.flat,      area.floor     ],
    [area.city,      area.city      ],
    [area.postCode,  area.postCode  ],
  ];
  if (same) {
    template.push([area.same, area.same]);
  }
  if (showShippingBilling) {
    template.push([area.defaultShipping, area.defaultShipping]);
    template.push([area.defaultBilling, area.defaultBilling]);
  }
  template.push([area.submit,    area.submit    ]);
  template.push([area.cancel,    area.cancel    ]);
  return toGridTemplate(template);
};

/**
 * add 'googleSearch' to localstorage with countryCode e.g. 'ua'
 *
 * https://developers.google.com/places/web-service/autocomplete?hl=ru&utm_source=google&utm_medium=cpc&utm_campaign=FY18-Q2-global-demandgen-paidsearchonnetworkhouseads-cs-maps_contactsal_saf&utm_content=text-ad-none-none-DEV_c-CRE_436338821166-ADGP_Hybrid+%7C+AW+SEM+%7C+SKWS+~+Places+%7C+BMM+%7C+Place+Autocomplete-KWID_43700046387144902-kwd-582432942955-userloc_1030297&utm_term=KW_%2Bplace%20%2Bautocomplete-ST_%2Bplace+%2Bautocomplete&gclid=CjwKCAjwwab7BRBAEiwAapqpTBpFVhjZHQ406SWwul57UNtDvVQV5Q3d1CUMg-biJl8tusse7YgDARoCtOcQAvD_BwE
 * @param defaultCountryCode defaults to Israel
 */
export const useGoogleAutocompleteOptions = (defaultCountryCode: string = 'il'): {
  language: string
  country: string
} => {
  const {language} = useContext(I18nContext);

  const googleAutoCompleteOptions = {
    language: language,
    country: defaultCountryCode,
  };

  if (typeof localStorage !== "undefined") {
    const countryCode = localStorage.getItem('googleSearch') || defaultCountryCode;

    if (countryCode === 'ua') {
      googleAutoCompleteOptions.country = 'ua';
      googleAutoCompleteOptions.language = 'ru';
    }
  }
  return googleAutoCompleteOptions;
};

/**
 * This object is required for Formik, formik does'n know nothing about all registered fields, and when you press
 * Submit, Formik cannon set errors to all inputs, because as I said before, Formik doesn't know about its children.
 *
 * Initially here should be described all field which is used in the form
 */
export const defaultInitialAddressFormData: AddressFormValues = {
  firstname: "",
  lastname: "",
  telephone: "",
  postcode: "",
  street1: "",
  street2: "",
  flat: "",
  floor: "",
  city: "",
  same: undefined,
  defaultShipping: undefined,
  defaultBilling: undefined,
};

interface IProps {
  submitLabel: React.ReactNode | string
  grayed?: boolean
  footerButtons?: React.ReactElement
  showAllInOneColumn?: boolean
  buttonsInline?: boolean
  id: string
  onSubmit: (values: AddressFormValues) => void
  onCancel?: () => void
  initData: AddressFormValues
  addressType?: 'deliveryAddress'|'billingAddress'
}
export const AddressForm = (props: IProps) => {
  const {
    initData: initialAddress,
    submitLabel,
    buttonsInline,
    grayed,
    id = '',
    onCancel,
    showAllInOneColumn = false,
  } = props;

  const initData = initialAddress || defaultInitialAddressFormData;

  const {t}: any = useContext(I18nContext);

  const googleAutocompleteOptions = useGoogleAutocompleteOptions();

  const _oneColumn = buttonsInline ? oneColumn : oneColumnWithButtons;
  const showSB = initData.defaultShipping !== undefined;
  const showSame = initData.same !== undefined;

  const layout: DefaultThemeProps = {
    addressFormLayout: {
      display: 'grid',
      gridGap: 'sm',
      my: 'xs',
      fontSize: 'xs',
      // prettier-ignore
      gridTemplate:  {
        xs: _oneColumn(showSB, showSame),
        sm: _oneColumn(showSB, showSame),
        md: (showAllInOneColumn ? _oneColumn : twoColumns)(showSB, showSame),
        lg: (showAllInOneColumn ? _oneColumn : twoColumns)(showSB, showSame),
        xl: (showAllInOneColumn ? _oneColumn : twoColumns)(showSB, showSame),
      }
    }
  };

  return (
    <UIForm
      initialValues={{
        ...defaultInitialAddressFormData,
        ...initData,
      }}
      onSubmit={props.onSubmit}
      id={id} name='address-form' defaultTheme={layout} i18nId="checkout.form"
      validationSchema={genValidationSchema(t)}
    >
      {() => (
        <React.Fragment>
          <FormField name="firstname" required grayed={grayed} gridArea={area.firstName}>{({field, variant}) => (
            <Input {...field} variant={variant} autoComplete='none' />
          )}</FormField>

          <FormField name="lastname" required grayed={grayed} gridArea={area.lastName}>{({field, variant}) => (
            <Input {...field} variant={variant} autoComplete='none' />
          )}</FormField>

          <FormField name="telephone" required grayed={grayed} gridArea={area.phone}>{({field, variant}) => (
            <Input {...field} variant={variant} autoComplete='none' />
          )}</FormField>

          <GoogleApiScript language={googleAutocompleteOptions.language}>
            <GooglePlacesAutocomplete
              name="street1"
              gridArea={area.street1}
              autoCompleteOptions={{
                ...googleAutocompleteOptions,
              }}
              placeholder={t('checkout.form.placeholders.search')}
            >{({googleAutocompleteProps}) => (

              <FormField name="street1" grayed={grayed} required>{({field, variant}) => (
                <Input
                  variant={variant}
                  {...googleAutocompleteProps}
                  {...field}
                  onChange={(e) => {
                    googleAutocompleteProps.onChange(e);
                    field.onChange(e);
                  }}
                />
              )}</FormField>
            )}</GooglePlacesAutocomplete>
          </GoogleApiScript>

          <FormField name="street2" grayed={grayed} gridArea={area.street2}>{({field, variant}) => (
            <Input {...field} variant={variant} autoComplete='none' />
          )}</FormField>

          <FormField name="flat" grayed={grayed} gridArea={area.flat}>{({field, variant}) => (
            <Input {...field} variant={variant} autoComplete='none' />
          )}</FormField>

          <FormField name="floor" grayed={grayed} gridArea={area.floor}>{({field, variant}) => (
            <Input {...field} variant={variant} autoComplete='floor' />
          )}</FormField>

          <FormField name="city" required grayed={grayed} gridArea={area.city}>{({field, variant}) => (
            <Input {...field} variant={variant} autoComplete='none' />
          )}</FormField>

          <FormField name="postcode" required grayed={grayed} gridArea={area.postCode}>{({field, variant}) => (
            <Input {...field} variant={variant} autoComplete='none' />
          )}</FormField>

          {showSame && (
            <CheckboxFormField
              name="same"
              gridArea={area.same}
              fontSize={bothResolutions('xxs', 'sm')}
              mb={mobileOnly('xs')}
            />
          )}

          {showSB && (
            <CheckboxFormField
              name={(props.addressType || 'delivery') === 'delivery' ? "defaultShipping" : "defaultBilling"}
              gridArea={area.defaultShipping}
              fontSize={bothResolutions('xxs', 'sm')}
              mb={mobileOnly('xs')}
            />
          )}

          <Button gridArea={area.submit} variant='normal-grayed' type="submit">{submitLabel}</Button>
          {onCancel && <Button gridArea={area.cancel} variant='grayed' onClick={onCancel}><T id='words.caps.cancel' /></Button>}
        </React.Fragment>
      )}
    </UIForm>
  );
};

const genValidationSchema = (t: (i18nId: string) => string) => {
  const validator: any = {};

  const min = ({n, label}: {n: number, label: string}) =>
    // @ts-ignore
    t('errors.minNSymbolsForLabel', {n, label: t(`checkout.form.${label}FieldLabel`)});

  const max = ({n ,label}: {n: number, label: string}) =>
    // @ts-ignore
    t('errors.maxNSymbolsForLabel', {n, label: t(`checkout.form.${label}FieldLabel`)});

  const req = ({label}: {label: string}) =>
    // @ts-ignore
    t('errors.labelIsRequired', {label: t(`checkout.form.${label}FieldLabel`)});

  const num = ({label}: {label: string}) =>
    // @ts-ignore
    t('errors.numberOnly', {label: t(`checkout.form.${label}FieldLabel`)});


  validator.firstname = yup
    .string()
    .test('First name', min({n: 2, label: 'firstname'}), (value='') => !(value.length < 2))
    .test('First name', max({n: 20, label: 'firstname'}), (value='') => !(value.length > 20))
    .required(req({label: 'firstname'}));

  validator.lastname = yup
    .string()
    .test('Last name', min({n: 2, label: 'lastname'}), (value='') => !(value.length < 2))
    .test('Last name', max({n: 20, label: 'lastname'}), (value='') => !(value.length > 20))
    .required(req({label: 'lastname'}));

  validator.telephone = yup
    .number().typeError(num({label: 'telephone'}))
    .required(req({label: 'telephone'}));

  validator.street1 = yup
    .string()
    .required(req({label: 'street1'}));

  validator.street2 = yup
    .number().typeError(num({label: 'street2'}))
    .required(req({label: 'street2'}));

  validator.flat = yup
    .number().typeError(num({label: 'flat'}))
    .nullable();

  validator.floor = yup
    .number().typeError(num({label: 'floor'}))
    .nullable();

  validator.city = yup
    .string()
    .required(req({label: 'city'}));

  validator.postcode = yup
    .number().typeError(num({label: 'postcode'}))
    .test('Potcode', min({n: 5, label: 'postcode'}), (value=0) => !(value.toString().length < 5))
    .test('Potcode', max({n: 7, label: 'postcode'}), (value=0) => !(value.toString().length > 7))
    .required(req({label: 'postcode'}));

  return yup.object().shape(validator);
};

export interface AddressFormValues {
  firstname: string
  lastname: string
  telephone: string
  postcode: string
  street1: string
  street2: string
  flat: string
  floor: string
  city: string
  same?: boolean
  defaultShipping?: boolean
  defaultBilling?: boolean
}
