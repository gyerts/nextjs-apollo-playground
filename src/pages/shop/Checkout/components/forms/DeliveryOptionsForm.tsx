import React from 'react';
import {Box, Button, DefaultThemeProps} from '@market-ui/falcon-ui';

import {bothResolutions, mobileOnly} from "src/styling/cssHelper";
import { toGridTemplate } from 'src/uikitEjected';
import { UIForm, FormField, CheckboxFormField } from 'src/components';

const area = {
  lastName: 'lastName',
  firstName: 'firstName',
  phone: 'phone',
  postCode: 'postCode',
  street1: 'street1',
  street2: 'street2',
  city: 'city',
  same: 'same',
  submit: 'submit'
};

const layout: DefaultThemeProps = {
  addressFormLayout: {
    display: 'grid',
    gridGap: 'sm',
    my: 'xs',
    fontSize: 'xs',
    // prettier-ignore
    gridTemplate:  toGridTemplate([
      ['1fr',          '1fr'          ],
      [area.lastName,  area.firstName ],
      [area.phone,     area.phone     ],
      [area.postCode,  area.postCode  ],
      [area.street1,   area.street1   ],
      [area.street2,   area.street2   ],
      [area.city,      area.city      ],
      [area.same,      area.same      ],
      [area.submit,    area.submit    ],
    ])
  }
};

interface IProps {
  submitLabel?: React.ReactNode | string
  id: string
}
export const DeliveryForm = ({ submitLabel, id = ''}: IProps) => {

  return (
    <UIForm
      initialValues={{
      }}
      onSubmit={() => {}}
      id={id} name='delivery-options' defaultTheme={layout} i18nId="checkout.form"
    >
      {() => (
        <React.Fragment>
          <CheckboxFormField
            name="same"
            required
            gridArea={area.same}
            fontSize={bothResolutions('xxs', 'sm')}
            mb={mobileOnly('xs')}
          />

          <Box gridArea={area.submit}>
            <Button type="submit">{submitLabel}</Button>
          </Box>
        </React.Fragment>
      )}
    </UIForm>
  );
};
