import React, {useCallback, useEffect, useState} from 'react';
import {Link as RouterLink, Link} from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import {Image, Button, Divider, Box} from '@market-ui/falcon-ui';
import {T} from "@market-ui/falcon-i18n";
import {DangerousText, ResponsiveIf} from 'src/components';
import qs from "qs";
import {
  getConfigurableOptionValuesByType,
  getImageUrlBySkuFromGalleryItems,
  getProductVariantBySku,
  getSwatchesGalleryItems,
} from "src/pages/shop/PDP/ProductService";
import {ProductTypeEnum} from "src/common/enums";
import {ColorSwitcher} from "src/components/ColorSwitcher/ColorSwitcher";
import {ProductPrice} from "src/components/ProductPrice/ProductPrice";

const removeIdFromUrlString = () => {
  let queryStringPath = window.location.href;
  if (typeof window !== "undefined") {
    return queryStringPath.substring(0, queryStringPath.indexOf('?'));
  }
}

const getPrevUrl = id => {
  let href = removeIdFromUrlString();
  if (href.indexOf('?') > -1) {
    href += `&id=${id}`;
  } else {
    href += `?id=${id}`;
  }
  return href;
}

export const goToProduct = id => {
  window.history.pushState(
    {},
    '',
    getPrevUrl(id)
  );
}

export const ProductCard = ({product}) => {
  const {price} = product;
  const swatches = product.configurableOptions.length
    && getSwatchesGalleryItems(product.gallery)
    || [];
  const values = getConfigurableOptionValuesByType(product.configurableOptions, product.type);

  const [productState, setProductState] = useState({
    priceRegular: product.price.regular,
    priceSpecial: product.price.special,
    pricePrevious: product.previousFormattedPrice,
    imageUrl: getImageUrlBySkuFromGalleryItems(
      product.gallery,
      values.length ? values[0].valueIndex : product.sku
    ),
    sku: values.length ? values[0].valueIndex : product.sku
  });

  const updateProductState = useCallback((
    sku
  ) => {
    const variant = getProductVariantBySku(values, sku);

    setProductState({
      ...productState,
      priceRegular: variant.price.regular,
      priceSpecial: variant.price.special,
      pricePrevious: variant.previousFormattedPrice,
      imageUrl: getImageUrlBySkuFromGalleryItems(product.gallery, sku),
      sku: sku
    });
  }, []);

  const updateUrlAfterIdRemoving = useCallback(() => {
    setTimeout(() => {
      window.history.pushState(
        {},
        '',
        removeIdFromUrlString()
      );
    }, 1000);
  }, []);

  useEffect(() => {
    let earlierSelectedProduct;
    if (typeof window !== "undefined") {
      earlierSelectedProduct = qs.parse(window.location.search.replace('?', '')).id;
    }

    if (earlierSelectedProduct
      && typeof document !== "undefined"
      && typeof window !== "undefined") {
      window.scrollTo({
        top: document.querySelector(`#id${earlierSelectedProduct}`).offsetTop,
        left: 0,
        behavior: 'smooth'
      });
      updateUrlAfterIdRemoving();
    }
  });

  return (
    <Box>
      <Box css={{overflow: 'hidden', position: 'relative', paddingBottom: 37}}>
        <Link
          id={'id' + product.id}
          onClick={() => goToProduct(product.id)}
          to={'/p/' + productState.sku}
        >
          <LazyLoad height="100%" offset={150}>
            <Image
              css={{
                flex: '1 1 100%',
                minHeight: 150,
                margin: '0 auto',
              }}
              src={productState.imageUrl}
              alt={product.name}
            />
          </LazyLoad>
        </Link>

        <Box css={{position: 'absolute', bottom: 0}}>
          {product.type === ProductTypeEnum.color && swatches.length
            ? <React.Fragment>
              <ResponsiveIf mobile>
                <ColorSwitcher
                  swatches={swatches}
                  values={values}
                  sku={productState.sku}
                  swatchItemsLimit={4}
                  swatchSize={'sm'}
                  updateProductState={updateProductState}/>
              </ResponsiveIf>
              <ResponsiveIf desktop>
                <ColorSwitcher
                  swatches={swatches}
                  values={values}
                  sku={productState.sku}
                  swatchItemsLimit={5}
                  swatchSize={'md'}
                  updateProductState={updateProductState}/>
              </ResponsiveIf>
            </React.Fragment>
            : null}
        </Box>
      </Box>

      <Divider css={{marginTop: 5, borderColor: 'black'}} />

      <Box>
        <Box css={{maxHeight: '5rem', height: '5rem', overflow: 'hidden'}}>
          <DangerousText py="xs" ellipsis css={{whiteSpace: 'break-spaces'}}>{product.name}</DangerousText>
        </Box>
        <ProductPrice price={productState.priceRegular} pricePrevious={productState.pricePrevious} />
        <Button
          as={RouterLink}
          onClick={() => goToProduct(product.id)}
          to={'/p/' + productState.sku}
          mt="sm"
          css={{width: '100%'}}
        >
          <T id={'product.seeDetails'}/>
        </Button>
      </Box>
    </Box>
  );
};
