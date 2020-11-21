import gql from 'graphql-tag';
import { Query } from '../Query';

export const GET_MENU = gql`
  query Menu {
  menu {
    id
    name
    urlPath
    cssClass
    images {
      media {
        type
        url
      }
      urlPath
      text
    }
    children {
      id
      name
      urlPath
      cssClass
      images {
        media {
          type
          url
        }
        urlPath
        text
      }
      children {
        id
        name
        urlPath
        cssClass
        images {
          media {
            type
            url
          }
          urlPath
          text
        }
      }
    }
  }
}`;

export class MenuQuery extends Query {
  static defaultProps = {
    query: GET_MENU
  };
}
