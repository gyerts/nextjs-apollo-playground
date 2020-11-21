/**
 * Get split address from google
 */
export type IReformattedFromGoogleAddress = {
  streetName?: string,
  streetNumber?: string,
  city?: string
};
type IGetAddressSignature = (address: string) => IReformattedFromGoogleAddress;
const endsOnNumberRegex = / [\d\/]*$/;
const containsAnyNumberRegex = /[\d\/]/;


export const parseAddress: IGetAddressSignature = (address) => {
  let partsOfLongAddress = address.split(', ').map(addr => addr.trim());
  partsOfLongAddress.pop(); // delete country
  partsOfLongAddress.reverse(); // reversed for easy access

  const detailedAddress: IReformattedFromGoogleAddress = {};

  if (partsOfLongAddress.length >= 2) {
    const streetNameFull = partsOfLongAddress.pop();
    const match = streetNameFull.match(endsOnNumberRegex);
    const containsBuildingAddressSeparately = partsOfLongAddress[0].match(containsAnyNumberRegex);

    if ( match && !containsBuildingAddressSeparately) {
      detailedAddress.streetName = streetNameFull.slice(0, match.index);
      detailedAddress.streetNumber = match[0].trim();
    } else if (containsBuildingAddressSeparately) {
      detailedAddress.streetName = streetNameFull;
      detailedAddress.streetNumber = partsOfLongAddress.pop();
    } else {
      detailedAddress.streetName = streetNameFull;
    }
  }

  if (partsOfLongAddress.length) {
    detailedAddress.city = partsOfLongAddress.reverse().join(', ');
  }

  return detailedAddress;
};
