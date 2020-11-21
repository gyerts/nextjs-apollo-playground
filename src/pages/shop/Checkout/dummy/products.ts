import {GQLCartItem} from "../../../../graphql-types";

const getItem = (name: string, url: string): GQLCartItem => ({
  availableQty: 50,
  discountAmount: 50,
  discountPercent: 50,
  itemId: 1,
  itemOptions: [
    {data: null, label: 'Color', value: 'red'},
    {data: null, label: 'Size', value: 'xs'},
  ],
  link: '/men/troy-yoga-short.html',
  name: name,
  price: 50,
  priceInclTax: 50,
  productType: 'product',
  qty: 2,
  rowTotal: 50,
  rowTotalInclTax: 50,
  rowTotalWithDiscount: 50,
  sku: name,
  taxAmount: 50,
  taxPercent: 50,
  thumbnailUrl: url,
  urlKey: url,
  weeeTaxAmount: 50,
  weeeTaxApplied: true,
});

export const dummyProducts: GQLCartItem[] = [
  getItem('ARCADIO GYM SHORT', 'https://magento.deity.io/media/catalog/product/cache/0be7ceb0b2b1b233377c79ca857607f3/m/s/msh11-blue_main_1.jpg'),
  getItem('PIERCE GYM SHORT', 'https://magento.deity.io/media/catalog/product/cache/0be7ceb0b2b1b233377c79ca857607f3/m/s/msh12-red_main_1.jpg'),
  getItem('TROY YOGA SHORT', 'https://magento.deity.io/media/catalog/product/cache/0be7ceb0b2b1b233377c79ca857607f3/m/s/msh09-blue_main_1.jpg'),
  getItem('SOL ACTIVE SHORT', 'https://magento.deity.io/media/catalog/product/cache/0be7ceb0b2b1b233377c79ca857607f3/m/s/msh10-blue_main_1.jpg'),
  getItem('RAPHA SPORTS SHORT', 'https://magento.deity.io/media/catalog/product/cache/0be7ceb0b2b1b233377c79ca857607f3/m/s/msh07-black_main_1.jpg'),
  getItem('ORESTES FTNESS SHORT', 'https://magento.deity.io/media/catalog/product/cache/0be7ceb0b2b1b233377c79ca857607f3/m/s/msh06-gray_main_2.jpg'),
];
