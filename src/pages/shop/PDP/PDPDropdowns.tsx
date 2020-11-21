import React from "react";
import {Box} from "@market-ui/falcon-ui";
import {ColorDropdown} from "./ColorDropdown";
import {SmellDropdown} from "./SmellDropdown";
import {IConfigurableOptionValue, IGalleryItem} from "src/common/models";
import {QtyDropdown} from "./QtyDropdown";
import {ProductTypeEnum} from "src/common/enums";
import {themedColors} from "src/theme/colors";

interface IPDPDropdownsProps {
  values: IConfigurableOptionValue[];
  qty: number;
  sku: string;
  swatches: IGalleryItem[];
  updateProductState: (sku: string, qty?: number) => void;
  productType: ProductTypeEnum,
  stockQty: number
}

export const PDPDropdowns = (props: IPDPDropdownsProps) => {
  const {values, qty, sku, swatches, updateProductState, productType, stockQty} = props;

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      mt={'xs'}
      css={{
        borderTop: `1px solid ${themedColors.black}`,
        borderBottom: `1px solid ${themedColors.black}`,
        paddingTop: 5,
        paddingBottom: 5,
        maxWidth: 400,
        width: '100%'
      }}
    >
      <Box css={{
        maxWidth: 199,
        width: '100%',
        border: 'none',
        display: productType === ProductTypeEnum.single ? 'none' : 'block',
      }}>
        {(productType === ProductTypeEnum.color && swatches.length)
          ? <ColorDropdown
            updateProductState={updateProductState}
            swatches={swatches}
            values={values}
            sku={sku}
          />
          : null}
        {(productType === ProductTypeEnum.smell)
          ? <SmellDropdown
            updateProductState={updateProductState}
            values={values}
            sku={sku}
          />
          : null}
      </Box>
      <Box css={{
        display: productType === ProductTypeEnum.single ? 'none' : 'block',
        width: 1,
        height: 33,
        background: themedColors.black
      }} />
      <Box css={{
        maxWidth: 199,
        width: '100%',
        border: 'none'
      }}>
        <QtyDropdown
          sku={sku}
          qty={qty}
          stockQty={stockQty}
          updateProductState={updateProductState}
        />
      </Box>
    </Box>
  );
}
