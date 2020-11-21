import gql from 'graphql-tag';
import { Query } from '../../../../uikitEjected/Query/Query';

const CMS_PAGE_CMS_QUERY = gql`
fragment Media on CMSMedia {
    code
    mime
    url
    altText
    downloadUrl
}
fragment Component on Component {
  uid
  name
  container
  typeCode
  sequence
  banners
  # categories: Categories
  # categoryCode: String
  content
  displayProductImages
  displayProducts
  displaySuggestions
  external
  flexType
  htmlClass
  itemsNumber
  maxProducts
  maxSuggestions
  minCharactersBeforeRequest
  modifiedtime
  numberOfItems
  showLanguageCurrency
  shownProductCount
  sortByField
  title
  text
  totalDisplay
  urlLink
  uuid
  waitTimeBeforeRequest
  wrapAfter
  products {
    title
    code
    url
    price
    media {
      ...Media
    }
  }
  url
  image {
    ...Media
  }
  media {
    ...Media
    widescreen {
      ...Media
    }
    mobile {
      ...Media
    }
    desktop {
      ...Media
    }
    tablet {
      ...Media
    }
    media {
      ...Media
    }
  }
}
query page($id: String, $CMSPageType: String, $CMSCode: String) {
  page(id: $id, CMSPageType: $CMSPageType, CMSCode: $CMSCode) {
    page
    slug {
      current
    }
    title
    description
    robotTag
    label
    template
    contentSlots {
      slotId
      position
      components {
        ...Component
        components {
          ...Component
        }
      }
    }
  }
}
`;

export class CmsPageQuery extends Query {
  static defaultProps = {
    query: CMS_PAGE_CMS_QUERY,
    passErrors : true
  };
}
