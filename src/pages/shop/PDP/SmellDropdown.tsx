import React from "react";
import {Dropdown, DropdownLabel, DropdownMenu, DropdownMenuItem} from "@market-ui/falcon-ui";
import {IConfigurableOptionValue, ICssObject} from "src/common/models";
import {getValueLabelBySku} from "src/components/ColorSwitcher/ColorSwitcherService";
import {themedColors} from "src/theme/colors";
import {$secondaryLight} from "src/theme/variables";

interface ISmellDropdownProps {
  values: IConfigurableOptionValue[];
  sku: string;
  updateProductState: (sku: string) => void;
}

export const SmellDropdown = (props: ISmellDropdownProps) => {
  const {values, sku, updateProductState} = props;

  return (
    <Dropdown
      onChange={(value) => updateProductState(value.valueIndex)}
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
        css={{
          border: `1px solid ${themedColors.hrDark}`
        }}
      >
        {values.map((value, i) => (
          <DropdownMenuItem
            key={value.valueIndex + i}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            value={value}
            css={{
              background: value.valueIndex === sku ? $secondaryLight : themedColors.white
            }}
          >
            {getValueLabelBySku(values, values[i].valueIndex)}
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

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
