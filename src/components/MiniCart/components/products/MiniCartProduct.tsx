import React from "react";

import {Image, Text, FlexLayout, Link} from "@deity/falcon-ui";
import {T} from "@market-ui/falcon-i18n";

import {Price, toGridTemplate} from "src/uikitEjected";
import { RemoveCartItem } from "../../components";
import {GQLCartItem} from "src/graphql-types";
import {Link as RouterLink} from "react-router-dom";
import {DangerousText} from "../../../Html";
import {NO_PRODUCT_IMG_FOUND_280x420} from "src/config";

interface IProps {
  product: GQLCartItem
}
export const MiniCartProduct = ({ product }: IProps) => {
  return (
    <FlexLayout defaultTheme={theme} css={{paddingTop: 15}} borderBottom='regular' borderColor={'hr' as any}>

      <FlexLayout gridArea={area.thumb} flexDirection='column' justifyContent='flex-end'>
        <Link as={RouterLink} to={`/p/${product.sku}`}><Image src={product.thumbnailUrl || NO_PRODUCT_IMG_FOUND_280x420} /></Link>
      </FlexLayout>

      <FlexLayout gridArea={area.info} flexDirection='column' alignItems='flex-start'>
        <DangerousText css={{textAlign: 'start'}}>{(product.name || 'null').toUpperCase()}</DangerousText>
        <Price value={product.price} css={{marginBottom: 10}} fontSize="md" fontWeight="bold" />

        <FlexLayout flexDirection='column' alignItems='flex-start'>
          {product.itemOptions && (
            product.itemOptions.map(item => (
              <Text fontSize="xxs" key={item.label}>{item.label}: {item.value}</Text>
            ))
          )}
          <Text fontSize="xxs"><T id='miniCart.qty' />: {product.qty}</Text>
        </FlexLayout>
      </FlexLayout>

      <RemoveCartItem itemId={product.itemId} gridArea={area.remove} css={{margin: 7}} />
    </FlexLayout>
  );
};

export const area = {
  empty: '.',
  thumb: 'thumb',
  info: 'info',
  remove: 'remove',
  summary: 'summary',
};

export const theme = {
  miniCartProduct: {
    display: 'grid',
    // gridGap: 'xs',
    // prettier-ignore
    gridTemplate: toGridTemplate([
      ['20px',      '3fr',       '4fr',        '30px'     ],
      [area.empty,  area.thumb,  area.info,    area.empty,],
      [area.empty,  area.thumb,  area.info,    area.empty,],
      [area.empty,  area.thumb,  area.info,    area.empty,],
      [area.empty,  area.empty,  area.empty,   area.remove],
    ])
  }
};
