import {DEFAULT_COUNTRY_ID} from "src/config";
import {AddressFormValues} from "src/components/FormsSet";
import {GQLAddAddressInput, GQLAddressInput, GQLEditAddressInput} from "src/graphql-types";
import {IAddress} from "src/api";

/**
 * mapAddressToAddressInput impl
 * this method created to clear graphql meta data as __typename
 * also this method adds countryId field
 * @param address
 */
export function mapAddressToAddressInput(address: IAddress): GQLEditAddressInput {
  return {
    countryId: DEFAULT_COUNTRY_ID,
    id: address.id,
    shippingAddress: address.shippingAddress,
    street: address.street,
    postcode: address.postcode,
    telephone: address.telephone,
    city: address.city,
    firstname: address.firstname,
    lastname: address.lastname,
    floor: address.floor,
    flat: address.flat,
    defaultShipping: address.defaultShipping,
    defaultBilling: address.defaultBilling,
  }
}
export function mapAddressToAddressFormValues(
  address: IAddress,
  same?: boolean
): AddressFormValues {
  if (!address) {
    return null;
  }
  return {
    firstname: address.firstname,
    lastname: address.lastname,
    telephone: address.telephone,
    postcode: address.postcode,
    street1: address.street[0],
    street2: address.street[1],
    flat: address.flat,
    floor: address.floor,
    city: address.city,
    same: same,
    defaultShipping: address.defaultShipping,
    defaultBilling: address.defaultBilling,
  }
}

export function mapFormToAddressInput(
  formValues: AddressFormValues,
  address?: IPartialAddress
): GQLAddressInput {
  address = address || {};
  return {
    countryId: DEFAULT_COUNTRY_ID,
    street: [formValues.street1, formValues.street2],
    postcode: formValues.postcode,
    telephone: formValues.telephone,
    city: formValues.city,
    firstname: formValues.firstname,
    lastname: formValues.lastname,
    floor: formValues.floor,
    flat: formValues.flat,

    id: address.id !== undefined ? address.id : undefined,
    shippingAddress: address.shippingAddress !== undefined ? address.shippingAddress : undefined,
    defaultShipping: address.defaultShipping !== undefined ? address.defaultShipping : (formValues.defaultShipping || false),
    defaultBilling: address.defaultBilling !== undefined ? address.defaultBilling : (formValues.defaultBilling || false),
  }
}

export function mapFormToAddAddressInput(formValues: AddressFormValues): GQLAddAddressInput {
  return mapFormToAddressInput(formValues, {shippingAddress: true}) as GQLAddAddressInput;
}
export function mapFormToEditAddressInput(formValues: AddressFormValues, address: IPartialAddress): GQLEditAddressInput {
  return mapFormToAddressInput(formValues, address) as GQLEditAddressInput;
}

export function compareAddressToFormValues(a?: IAddress, f?: AddressFormValues): boolean {
  if (!a || !f) {
    return false;
  }
  return (
    a.firstname == f.firstname &&
    a.lastname == f.lastname &&
    a.telephone == f.telephone &&
    a.street[0] == f.street1 &&
    a.street[1] == f.street2 &&
    a.flat == f.flat &&
    a.floor == f.floor &&
    a.city == f.city &&
    a.postcode == f.postcode
  );
}

export function compareAddressFormToForm(a?: AddressFormValues, b?: AddressFormValues): boolean {
  if (!a || !b) {
    return false;
  }
  return (
    a.firstname == b.firstname &&
    a.lastname == b.lastname &&
    a.telephone == b.telephone &&
    a.street1 == b.street1 &&
    a.street2 == b.street2 &&
    a.flat == b.flat &&
    a.floor == b.floor &&
    a.city == b.city &&
    a.postcode == b.postcode
  )
}

export function compareAddressToAddress(a?: IAddress, b?: IAddress): boolean {
  if (!a || !b) {
    return false;
  }
  return (
    a.firstname == b.firstname &&
    a.lastname == b.lastname &&
    a.telephone == b.telephone &&
    a.street[0] == b.street[0] &&
    a.street[1] == b.street[1] &&
    a.flat == b.flat &&
    a.floor == b.floor &&
    a.city == b.city &&
    a.postcode == b.postcode
  )
}

type IPartialAddress = {
  id?: string,
  defaultBilling?: boolean,
  shippingAddress?: boolean,
  defaultShipping?: boolean,
}
