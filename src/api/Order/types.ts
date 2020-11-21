import {GQLCartItem, GQLOrder} from "src/graphql-types";
import {IAddress} from "..";

export type IOrder = IShortOrder & {
  items?: {
    itemId: GQLCartItem["itemId"]
    sku: GQLCartItem["sku"]
    name: GQLCartItem["name"]
    rowTotalInclTax: GQLCartItem["rowTotalInclTax"]
    qty: GQLCartItem["qty"]
    price: GQLCartItem["price"]
    thumbnailUrl: GQLCartItem["thumbnailUrl"]
    link: GQLCartItem["link"]
  }
  billingAddress?: IAddress
  shippingAddress?: IAddress
};

export type IShortOrder = {
  subtotal: GQLOrder["subtotal"]
  shippingAmount: GQLOrder["shippingAmount"]
  grandTotal: GQLOrder["grandTotal"]

  entityId?: GQLOrder["entityId"]
  incrementId?: GQLOrder["incrementId"]
  createdAt?: GQLOrder["createdAt"]
  customerFirstname?: GQLOrder["customerFirstname"]
  customerLastname?: GQLOrder["customerLastname"]
  status?: GQLOrder["status"]
  orderCurrencyCode?: GQLOrder["orderCurrencyCode"]
  shippingDescription?: GQLOrder["shippingDescription"]
  paymentMethodName?: GQLOrder["paymentMethodName"]
};
