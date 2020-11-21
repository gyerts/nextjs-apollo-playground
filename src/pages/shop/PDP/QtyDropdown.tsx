import React from "react";
import {
  Dropdown,
  DropdownLabel,
  DropdownMenu,
  DropdownMenuItem
} from "@market-ui/falcon-ui";
import {ICssObject} from "src/common/models";
import {themedColors} from "src/theme/colors";
import {$secondaryLight} from "src/theme/variables";

interface IQtyDropdownProps {
  qty: number;
  sku: string;
  updateProductState: (sku: string, qty?: number) => void;
  stockQty: number
}

export const QtyDropdown = (props: IQtyDropdownProps) => {
  const {qty, updateProductState, sku, stockQty} = props;
  const VISIBLE_STOCK_QTY_LIMIT = 100;
  const incrementor = (_:number, i: number) => i + 1;
  const stockQtyToArr = (limit: number, length: number) => limit >= 100 
    ? Array.from({length}, incrementor).slice(0, limit)
    : Array.from({length}, incrementor);
    
  const qtyNumber: number[] = stockQtyToArr(VISIBLE_STOCK_QTY_LIMIT, stockQty) 

  return (
    <Dropdown
      onChange={(item) => updateProductState(sku, item)}
      css={{
        maxWidth: 199,
        width: '100%',
        border: 'none'
      }}
    >
      <DropdownLabel>{qty}</DropdownLabel>
      <DropdownMenu css={getQtyDropdownMenuCss}>
        {qtyNumber.map((item, i) => (
          <DropdownMenuItem
            key={item + i}
            css={getQtyDropdownMenuItemCss(qty === item)}
            value={item}
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

const getQtyDropdownMenuCss = (): ICssObject => ({
  maxHeight: 37 * 5,
  overflowY: 'scroll',
  border: `1px solid ${themedColors.hrDark}`
});

const getQtyDropdownMenuItemCss = (isSelected: boolean): ICssObject => ({
  height: 37,
  background: isSelected ? $secondaryLight : themedColors.white
});
