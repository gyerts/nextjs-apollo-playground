import React from 'react';
import { Box, Text, themed } from '@market-ui/falcon-ui';

export const addressToString = address =>
  [
    address.company,
    `${address.firstname} ${address.lastname}`,
    address.street && `${address.street.join(' ')}`,
    `${address.postcode} ${address.city}, ${address.countryId}`
  ]
    .filter(x => x)
    .join(', ');

export const addressDetailsTheme = {
  addressDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: 'secondaryText'
  }
};
export const AddressDetails = props => {
  const { company, firstname, lastname, street, postcode, city, countryId, telephone } = props;

  return (
    <Box defaultTheme={addressDetailsTheme}>
      {company && <Text fontWeight="bold" color="secondaryText">{`${company}`}</Text>}
      <Text fontWeight="bold" color="secondaryText" mb="xs">{`${firstname} ${lastname}`}</Text>
      {street && street.map(x => <Text key={x}>{x}</Text>)}
      <Text>{`${postcode} ${city}, ${countryId}`}</Text>
      {telephone && <Text>{telephone}</Text>}
    </Box>
  );
};

export const AddressCardLayout = themed({
  tag: 'li',
  defaultTheme: {
    addressCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  }
});
export const AddressCard = ({ address }) => (
  <AddressCardLayout>
    <AddressDetails {...address} />
  </AddressCardLayout>
);

export const AddressListLayout = themed({
  tag: 'ul',
  defaultTheme: {
    addressListLayout: {
      display: 'grid',
      gridTemplateColumns: {
        xs: '1fr',
        md: 'repeat(2, 1fr)'
      },
      gridGap: 'md',
      m: 'none',
      p: 'none',
      css: {
        listStyle: 'none'
      }
    }
  }
});

export const getAddressType = address =>
  [address.defaultBilling && 'billing', address.defaultShipping && 'shipping'].filter(x => x).join('&') || 'other';
