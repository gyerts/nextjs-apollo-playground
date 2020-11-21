import React from "react";

import {Image, Text, FlexLayout, Link} from "@market-ui/falcon-ui";
import {T} from "@market-ui/falcon-i18n";

import {Price, toGridTemplate} from "src/uikitEjected";
import {GQLCartItem} from "src/graphql-types";
import {Link as RouterLink} from "react-router-dom";
import {DangerousText} from "src/components";
import {NO_PRODUCT_IMG_FOUND_280x420} from "src/config";

interface IProps {
  product: GQLCartItem
}
export const ProductItem = ({ product }: IProps) => {
  return (
    <FlexLayout defaultTheme={theme} css={{paddingTop: 15}}>
      <FlexLayout gridArea={area.thumb} flexDirection='column' justifyContent='flex-end'>
        <Link as={RouterLink} to={`/p/${product.sku}`}><Image src={product.thumbnailUrl || NO_PRODUCT_IMG_FOUND_280x420} /></Link>
      </FlexLayout>

      <FlexLayout gridArea={area.info} flexDirection='column' alignItems='flex-start'>
        <DangerousText css={{textAlign: 'start'}} mb='xs'>{product.name}</DangerousText>

          <FlexLayout flexDirection='column' alignItems='flex-start' mb='xs'>
            {product.itemOptions && (
              product.itemOptions.map(item => (
                <Text fontSize="xxs" key={item.label}>{item.label}: {item.value}</Text>
              ))
            )}
            <Text fontSize="xxs"><T id='miniCart.qty' />: {product.qty}</Text>
          </FlexLayout>
        <Price value={product.price} fontSize="lg" fontWeight="bold" />
      </FlexLayout>
    </FlexLayout>
  );
};

export const area = {
  empty: '.',
  thumb: 'thumb',
  info: 'info',
  summary: 'summary',
};

export const theme = {
  miniCartProduct: {
    display: 'grid',
    // prettier-ignore
    gridTemplate: toGridTemplate([
      ['20px',      '3fr',       '4fr',        '30px'     ],
      [area.empty,  area.thumb,  area.info,    area.empty,],
      [area.empty,  area.thumb,  area.info,    area.empty,],
      [area.empty,  area.thumb,  area.info,    area.empty,],
    ])
  }
};
