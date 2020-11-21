import {GQLCartItem} from "src/graphql-types";
import {mapCartItemToDataLayerProduct} from "src/common/helpers/dataLayerMaps";

import {dataLayerPush} from "./common/dataLayerPush";

export function gaAddToCart(productItem: GQLCartItem) {
  dataLayerPush({
    'event': 'addToCart',
    'ecommerce': {
      'currencyCode': 'ILS',
      'add': {
        'products': [mapCartItemToDataLayerProduct(productItem)],
      }
    }
  });
}
