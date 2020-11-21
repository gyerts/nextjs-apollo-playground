import {IConfigurableOption, IConfigurableOptionValue, IGalleryItem} from "src/common/models";
import {ConfigurableOptionValueLabelEnum, GalleryItemTypeEnum, ProductTypeEnum} from "src/common/enums";
import {ISlide} from "src/components/Carousel/carousel.models";
import {NO_PRODUCT_IMG_FOUND_280x420} from "src/config";

export const getZoomGalleryItems = (gallery: IGalleryItem[], sku: string): ISlide[] => (
  getSlidesFromGalleryItems(getGalleryItemsByType(gallery, GalleryItemTypeEnum.zoom, sku))
);

export const getThumbnailsGalleryItems = (gallery: IGalleryItem[], sku: string): ISlide[] => (
  getSlidesFromGalleryItems(getGalleryItemsByType(gallery, GalleryItemTypeEnum.thumbnail, sku))
);

export const getSwatchesGalleryItems = (gallery: IGalleryItem[]): IGalleryItem[] => (
  getGalleryItemsByType(gallery, GalleryItemTypeEnum.styleSwatch)
);

export const getImageUrlBySkuFromGalleryItems = (gallery: IGalleryItem[], sku: string): string => {
  const data = getGalleryItemsByType(gallery, GalleryItemTypeEnum.product, sku);
  return data[0] ? data[0].full : NO_PRODUCT_IMG_FOUND_280x420;
};

export const getProductVariantBySku = (values: IConfigurableOptionValue[], sku: string): IConfigurableOptionValue => (
  values.find((value) => value.valueIndex === sku)
);

export const getStockValueBySku = (
  values: IConfigurableOptionValue[],
  sku: string
): boolean => (
  values.find((value) => value.valueIndex === sku).inStock.isInStock
);

export const getPriceValueBySku = (
  values: IConfigurableOptionValue[],
  sku: string
): number => (
  values.find((value) => value.valueIndex === sku).price.regular
);

export const getPriceSpecialValueBySku = (
  values: IConfigurableOptionValue[],
  sku: string
): number => (
  values.find((value) => value.valueIndex === sku).price.special
);

export const getStockQuantityBySku = (
  values: IConfigurableOptionValue[],
  sku: string
): number => (
  values.find((value) => value.valueIndex === sku).inStock.qty
);

export const getConfigurableOptionValuesByType = (
  configurableOptions: IConfigurableOption[],
  type: ProductTypeEnum
): IConfigurableOptionValue[] => {
  return configurableOptions.length && configurableOptions.find((item) => (
    item.label === getConfigurableOptionValueLabelByType(type))
  ).values || [];
}

export const getConfigurableOptionValueLabelByType = (
  type: ProductTypeEnum
): ConfigurableOptionValueLabelEnum => {
  const labelsConformity: {
    [key: string]: ConfigurableOptionValueLabelEnum
  } = {
    [ProductTypeEnum.color]: ConfigurableOptionValueLabelEnum.color,
    [ProductTypeEnum.smell]: ConfigurableOptionValueLabelEnum.smell
  }
  return labelsConformity[type];
}

const getGalleryItemsByType = (
    gallery: IGalleryItem[],
    type: GalleryItemTypeEnum,
    sku?: string
  ): IGalleryItem[] => (
  gallery
    .filter((item) => {
      if (sku) {
        return item.type === type && (item.sku === sku || item.sku.indexOf(sku) === 0);
      } else {
        return item.type === type;
      }
    })
    .sort((a, b) => +a.index - +b.index)
);

const getSlidesFromGalleryItems = (gallery: IGalleryItem[]): ISlide[] => (
  gallery.map((item) => ({
    src: item.full,
    alt: item.sku,
    link: ''
  }))
);


