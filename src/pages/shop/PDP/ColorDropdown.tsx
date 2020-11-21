import React from "react";
import {Box, Dropdown, DropdownLabel, DropdownMenu, DropdownMenuItem, Image} from "@market-ui/falcon-ui";
import {IConfigurableOptionValue, ICssObject, IGalleryItem} from "src/common/models";
import {getValueLabelBySku} from "src/components/ColorSwitcher/ColorSwitcherService";
import {themedColors} from "src/theme/colors";
import {$secondaryLight} from "src/theme/variables";

interface IColorDropdownProps {
  values: IConfigurableOptionValue[];
  sku: string;
  swatches: IGalleryItem[];
  updateProductState: (sku: string) => void;
}

export const ColorDropdown = (props: IColorDropdownProps) => {
  const {values, sku, swatches, updateProductState} = props;

  return (
    <Dropdown
      onChange={(swatch) => updateProductState(swatch.sku)}
      css={{
        maxWidth: 200,
        width: '100%',
        border: 'none'
      }}
    >
      <DropdownLabel>
        {getValueLabelBySku(values, sku)}
      </DropdownLabel>
      <DropdownMenu
        css={getColorDropdownMenuCss()}
      >
        {swatches.map((swatch, i) => (
          <DropdownMenuItem
            key={swatch.sku + i}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            value={swatch}
            css={{
              background: swatch.sku === sku ? $secondaryLight : themedColors.white
            }}
          >
            {getValueLabelBySku(values, swatches[i].sku)}
            <Box css={getColorItemCss(swatch.sku === sku)}>
              <Image src={swatch.full} alt={swatch.sku} />
            </Box>
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

const getColorDropdownMenuCss = (): ICssObject => ({
  maxHeight: 37 * 5,
  overflowY: 'scroll',
  border: `1px solid ${themedColors.hrDark}`
});

export const getColorItemCss = (isActive: boolean): ICssObject => ({
  border: isActive ? `1px solid ${themedColors.white}` : 'none',
  outline: isActive ? `1px solid ${themedColors.black}` : 'none',
  height: 30,
  width: 30,
  minWidth: 30,
  marginLeft: 5,
  marginRight: 5,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0
});
