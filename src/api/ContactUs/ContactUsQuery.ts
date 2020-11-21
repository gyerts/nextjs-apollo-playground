import gql from 'graphql-tag';
import { Query } from 'src/uikitEjected/Query/index';
import {QueryResult} from "react-apollo";

const GET_CONTACT_US_INFO = gql`
  query { 
    contactUs{
      email
      phoneNumber
      needHelpDropdownDataList 
      }
    }
`;

export class ContactUsQuery extends Query {
  static defaultProps = {
    query: GET_CONTACT_US_INFO
  };
}

export interface IContactUsQueryResponse extends QueryResult {
  contactUs: {
    email: string;
    phoneNumber: string;
    needHelpDropdownDataList: string[];
  }
}