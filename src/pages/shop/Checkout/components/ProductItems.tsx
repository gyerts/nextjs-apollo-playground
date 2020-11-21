import {Box, Divider} from "@market-ui/falcon-ui";
import React from "react";
import {GQLCartItem} from "src/graphql-types";
import {ProductItem} from "./ProductItem";


interface IProps {
  products: GQLCartItem[]
}
export const ProductItems = (props: IProps) => (
  <Box className='products-list'>
    {props.products.map((product, index) => (
      <Box className='product-item' key={product.sku}>
        <ProductItem product={product} />
        {index < props.products.length - 1 && <Divider my="md" borderColor={'hrDark' as any} />}
      </Box>
    ))}
  </Box>
);
