export function dataLayerPush(data: IDataLayerData) {
  if((window as any).dataLayer === 'undefined'){
    console.error('Cannot send to google analytics due to dataLayer is not existing', data);
    return;
  }
  (window as any).dataLayer.push(data);
}

export type IGTagEvent =
  |'pageview'
  |'purchase'
  |'addToCart'
  ;
export type IDataLayerData =
  IDataLayerDataPageView &
  {
    event: IGTagEvent
    ecommerce?:
      & IDataLayerDataPurchase
      & IDataLayerDataAddToCart
  }

export type IDataLayerDataPageView = {
  page_title?: string
  page_location?: string
  page_path?: string
}
export type IDataLayerDataPurchase = {
  currencyCode?: string
  purchase?: {
    actionField: {
      id: string
      affiliation: string|'wow'
      revenue: number
      tax: number
      shipping: number
      coupon: string
    }
    products: IDataLayerProductItem[]
  }
}
export type IDataLayerDataAddToCart = {
  add?: {
    products: IDataLayerProductItem[],
  }
}

export type IDataLayerProductItem = {
  id: string
  parent_id: string
  name: string
  price: number
  brand: string
  category: string
  variant: string
  quantity: number
}
