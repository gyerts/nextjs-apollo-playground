import {gql} from '@apollo/client';

export const GET_COUNTRIES = gql`
  query Countries {
    countries {
      items {
        englishName
        localName
        code
      }
    }
  }
`;

// export class CountriesQuery extends Query {
//   static defaultProps = {
//     query: GET_COUNTRIES
//   };
// }
