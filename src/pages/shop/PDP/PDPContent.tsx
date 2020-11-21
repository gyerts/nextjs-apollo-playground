import React from "react";
import {Box, Button, FlexLayout, H3, Icon, Text} from "@market-ui/falcon-ui";
import {T} from "@market-ui/falcon-i18n";
import {PDPTabs} from "./PDPTabs";
import {Price} from "src/uikitEjected/Locale";
import {ColorSwitcher} from "src/components/ColorSwitcher/ColorSwitcher";
import {IAttribute, IConfigurableOptionValue, IGalleryItem} from "src/common/models";
import {themedColors} from "src/theme/colors";
import {PDPDropdowns} from "./PDPDropdowns";
import {ProductTypeEnum} from "src/common/enums";
import {ProductForm} from "./ProductForm";
import {cssMobileTillMdOnly} from "src/styling/cssHelper";
import {DangerousText} from "src/components";
import {ProductPrice} from "../../../components/ProductPrice/ProductPrice";

interface IPDPContentProps {
  price: number;
  priceSpecial: number;
  pricePrevious: string;
  isInStock: boolean;
  name: string;
  swatches: IGalleryItem[];
  values: IConfigurableOptionValue[];
  attributes: IAttribute[];
  updateProductState: (sku: string, qty?: number) => void;
  qty: number;
  sku: string;
  productType: ProductTypeEnum;
  stockQty: number
}

export const PDPContent = (props: IPDPContentProps) => {
  const {
    price,
    priceSpecial,
    pricePrevious,
    isInStock,
    name,
    swatches,
    values,
    attributes,
    updateProductState,
    qty,
    sku,
    productType,
    stockQty
  } = props;

  return (
    <Box
      css={{
        maxWidth: 450,
        width: '100%',
        ...cssMobileTillMdOnly({maxWidth: 400})
      }}
    >
      <Box>
        <H3 mb='xs' css={{ maxWidth: 230 }} variant='small'>
          <DangerousText>{name}</DangerousText>
        </H3>
        <ProductPrice price={price} pricePrevious={pricePrevious} />
        {productType === ProductTypeEnum.color && swatches.length
          ? <ColorSwitcher
            swatches={swatches}
            values={values}
            sku={sku}
            showColorLabel={true}
            updateProductState={updateProductState}
          />
          : null}
        <PDPDropdowns
          swatches={swatches}
          updateProductState={updateProductState}
          values={values}
          sku={sku}
          qty={qty}
          productType={productType}
          stockQty={stockQty}
        />
        <Text mt={'xs'}>
          <T id={'pdp.availability'}/>: {isInStock
          ? <T id={'pdp.inStock'}/>
          : <Text as={'span'} css={{
            display: 'inline',
            color: themedColors.errorText
          }}><T id={'pdp.outOfStock'}/></Text>}
        </Text>

        <ProductForm sku={sku} qty={qty}>
          {({
              addToCartMutation: {
                // @ts-ignore
                result: {loading, error}
              },
              // @ts-ignore
              formik: {values, errors, setFieldValue, submitCount}, productConfigurator
            }) => (
            <Button
              type="submit"
              height="xl"
              mt="sm"
              disabled={loading || !isInStock}
              css={{
                maxWidth: 350,
                width: '100%'
              }}
            >
              {!loading && <Icon src="cart" stroke="white" size="md" mr="sm"/>}
              <T id={'product.addToCart'}/>
            </Button>
          )}
        </ProductForm>

      </Box>

      <PDPTabs attributes={attributes}/>
    </Box>
  );
}
