import React from "react";

import {Divider} from "@deity/falcon-ui";

import { MiniCartProduct } from ".";
import {GQLCartItem} from "src/graphql-types";

interface IProps {
  products: GQLCartItem[]
}
export const MiniCartProducts = ({ products }: IProps) => (
  <div className='products-list'>
    {products.map((product, index) => (
      <div className='product-item' key={product.sku}>
        <MiniCartProduct product={product} />
        {index < products.length - 1 && <Divider my="md" borderColor='secondaryLight' />}
      </div>
    ))}
  </div>
);
