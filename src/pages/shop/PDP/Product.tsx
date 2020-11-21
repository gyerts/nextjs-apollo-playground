import React, {useCallback, useState} from "react";
import {Breadcrumbs} from "src/uikitEjected/Breadcrumbs";
import {Box} from "@market-ui/falcon-ui";
import {PDPCarousel} from "src/components/Carousel/PDPCarousel";
import {PDPContent} from "./PDPContent";
import {IAttribute, IConfigurableOptionValue, IGalleryItem, IProduct} from "src/common/models";
import {
  getZoomGalleryItems,
  getThumbnailsGalleryItems,
  getSwatchesGalleryItems,
  getStockValueBySku,
  getPriceValueBySku,
  getConfigurableOptionValuesByType,
  getPriceSpecialValueBySku,
  getStockQuantityBySku,
} from "./ProductService";
import {cssMobileTillMdOnly} from "src/styling/cssHelper";
import {ProductTypeEnum} from "src/common/enums";
import {NO_PRODUCT_IMG_FOUND_400x600} from "src/config";

interface IProductProps {
  product: IProduct;
}

export const Product = (props: IProductProps) => {
  const {product} = props;
  const values: IConfigurableOptionValue[] = getConfigurableOptionValuesByType(product.configurableOptions, product.type);

  const tabsContent: IAttribute[] = [
    {
      name: 'description',
      value: product.description
    },
    {
      name: 'instructions',
      value: product.instructions
    },
    {
      name: 'ingridients',
      value: product.ingridients
    }
  ];
  const isProductSingleVariant: boolean = product.type === ProductTypeEnum.single;
  const swatches: IGalleryItem[] = product.configurableOptions.length
    && getSwatchesGalleryItems(product.gallery)
    || [];

  const getGallery = useCallback(function () {
    const gallery = getZoomGalleryItems(product.gallery, product.sku);
    if (!gallery.length) {
      gallery.push({
        title: product.name,
        alt: product.name,
        link: `/p/${product.sku}`,
        src: NO_PRODUCT_IMG_FOUND_400x600,
        bigSrc: NO_PRODUCT_IMG_FOUND_400x600,
      })
    }
    return gallery;
  }, []);

  const [productState, setProductState] = useState({
    slides: getGallery(),
    thumbs: getThumbnailsGalleryItems(product.gallery, product.sku),
    price: product.price.regular,
    priceSpecial: product.price.special,
    pricePrevious: product.previousFormattedPrice,
    isInStock: product.stock.isInStock,
    stockQty: product.stock.qty,
    qty: 1,
    sku: product.sku
  });

  const updateProductState = useCallback((
    sku: string,
    qty?: number
  ): void => {
    setProductState({
      ...productState,
      slides: getZoomGalleryItems(product.gallery, sku),
      thumbs: getThumbnailsGalleryItems(product.gallery, sku),
      price: isProductSingleVariant
        ? product.price.regular
        : getPriceValueBySku(
          values,
          sku
        ),
      priceSpecial: isProductSingleVariant
        ? product.price.regular
        : getPriceSpecialValueBySku(
        values,
        sku
      ),
      isInStock: isProductSingleVariant
        ? product.stock.isInStock
        : getStockValueBySku(
          values,
          sku
        ),
      stockQty: isProductSingleVariant ? product.stock.qty : getStockQuantityBySku(values, sku),
      sku: sku,
      qty: qty || 1
    });
  }, []);

  return (
    <Box
      pt={'md'}
      pb={'md'}
    >
      <Breadcrumbs breadcrumbs={[]}/>
      <Box
        css={{
          display: 'flex',
          justifyContent: 'center',
          ...cssMobileTillMdOnly({
            flexDirection: 'column',
            alignItems: 'center'
          })
        }}
      >
        <PDPCarousel slides={productState.slides} thumbs={productState.thumbs}/>
        <Box css={{
          minWidth: 20,
          ...cssMobileTillMdOnly({display: 'none'})
        }}/>
        <PDPContent
          price={productState.price}
          priceSpecial={productState.priceSpecial}
          pricePrevious={productState.pricePrevious}
          isInStock={productState.isInStock}
          name={product.name}
          qty={productState.qty}
          stockQty={productState.stockQty}
          sku={productState.sku}
          swatches={swatches}
          values={product.configurableOptions.length && values}
          attributes={tabsContent}
          updateProductState={updateProductState}
          productType={product.type}
        />
      </Box>
    </Box>
  );
}
