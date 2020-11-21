import React from "react";
import { Link } from 'react-router-dom';
import {Tab, Tabs, Text, themed} from "@deity/falcon-ui";
import {themedColors} from "src/theme/colors";
import {State} from "react-powerplug";
import {T} from "@market-ui/falcon-i18n";
import {Image} from '@deity/falcon-ui';
import {IConfigurableOptionValue, ICssObject, IGalleryItem} from "src/common/models";
import {getSwatchInstockStatusMap, getValueLabelBySku} from "./ColorSwitcherService";
import {goToProduct} from "src/uikitEjected";
import {bothResolutions, cssMobileOnly} from "../../styling/cssHelper";

type SwatchSize = 'sm' | 'md' | 'lg';


interface IColorSwitcherProps {
  swatches: IGalleryItem[];
  values: IConfigurableOptionValue[];
  updateProductState: (sku: string) => void;
  sku: string;
  swatchItemsLimit?: number;
  showColorLabel?: boolean;
  swatchSize?: SwatchSize
}

export const SwatchesTransferLink = themed({
  tag: Link,
  defaultTheme: {
    showMoreSwatches: {
      color: 'primaryText',
      css: {
        textDecoration: 'none'
      }
    }
  }
});

export const ColorSwitcher = (props: IColorSwitcherProps) => {
  const { swatches, values, updateProductState, sku, showColorLabel, swatchItemsLimit, swatchSize } = props;

  return (
    <State
      initial={{
        activeIndex: 0,
        tabs: swatches }}>
      {({ state, setState }) => {
        const swatchInstockStatusMap = getSwatchInstockStatusMap(swatches, values);
        return <>
          {showColorLabel
          && <Text
            as={'strong'}
            mb={'sm'}
            mt={'sm'}
          >
            <T id={'pdp.color'} />: {getValueLabelBySku(values, sku)}
          </Text>}
          <Tabs
            display={'flex'}
            flexWrap={bothResolutions('nowrap', 'wrap')}
            css={cssMobileOnly({
              overflowX: 'auto',
              paddingTop: 2,
              paddingLeft: 2,
              paddingRight: 2,
            })}
            variant={'secondary'}
            p={'none'}
          >
            {state.tabs.slice(0, swatchItemsLimit || state.tabs.length)
              .map((tab, index) => (
              <Tab
                key={tab.sku + index}
                active={index === state.activeIndex}
                css={getColorItemCss(tab.sku === sku, swatchInstockStatusMap.get(tab.sku), getSwatchSize(swatchSize) )}
                onClick={() => {
                  setState({ activeIndex: index }, () => {
                    updateProductState(state.tabs[index].sku);
                  });
                }}
              >
                <Image src={tab.full} alt={tab.sku} />
              </Tab>
            ))}
            {swatchItemsLimit
            && (swatches.length - swatchItemsLimit > 0) &&
              <SwatchesTransferLink
                to={`/p/${sku}`}
                onClick={() => goToProduct(sku.split('-')[0])}
                >
                <Tab
                  css={getExtraNumberCss(getSwatchSize(swatchSize))}
                >
                  {swatches.length - swatchItemsLimit}+
                </Tab>
              </SwatchesTransferLink>
            }
          </Tabs>
        </>
      }}
    </State>
  );
}

const getSwatchSize = (size: SwatchSize): number => {
  const swatchSizeMap = new Map<string, number>([['sm', 20], ['md', 26 ], ['lg', 30]]);

  return swatchSizeMap.get(size);
};

const getTabSizesAndSpacing = (size: number = 30): ICssObject => ({
  height: size,
  width: size,
  minWidth: size,
  marginLeft: 3,
  marginRight: 3,
  marginBottom: 5,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
});

const getExtraNumberCss = (swatchSize: number): ICssObject => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: themedColors.white,
  border: `1px solid ${themedColors.black}`,
  fontWeight: 600,
  fontSize: 12,
  ...getTabSizesAndSpacing(swatchSize)
});

const getColorItemCss = (isActive: boolean, isInStock: boolean, size: number): ICssObject => ({
  border: isActive ? `1px solid ${themedColors.white}` : 'none',
  outline: isActive ? `1px solid ${themedColors.black}` : 'none',
  borderBottomColor: themedColors.black,
  position: 'relative',
  ...getTabSizesAndSpacing(size),
  ':after': {
    content: '""',
    position: "absolute",
    top: 13,
    left: -7,
    width: 42,
    height: 1,
    background: isInStock ? 'transparent' : themedColors.black,
    transform: 'rotate(-45deg)'
  }
});
