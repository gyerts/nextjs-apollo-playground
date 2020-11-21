import {GQLCartItemOption} from "src/graphql-types";


interface IProps {
  sku: string
  qty: number
  name?: string
  price?: number
  itemOptions?: GQLCartItemOption[]
}
export function mapCartItemToDataLayerProduct(cartItem: IProps) {
  return ({
    id: cartItem.sku,
    parent_id: cartItem.sku.split('-')[0],
    name: cartItem.name,
    price: cartItem.price,
    brand: '',
    category: '',
    variant: cartItem.itemOptions ? cartItem.itemOptions.length ? cartItem.itemOptions[0].value : '' : '',
    quantity: cartItem.qty,
  });
}
