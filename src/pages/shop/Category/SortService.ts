export interface ISortOrderItemValue {
  direction: string;
  field: string;
}

export interface ISortOrderItem {
  name: string;
  value: ISortOrderItemValue;
}

export interface ISortOrderMobileProps {
  toggle: () => void;
  items: ISortOrderItem[];
  value: ISortOrderItemValue;
  onChange: (value: ISortOrderItem) => void;
}


export const onSortChange = (
  onChange: (x: ISortOrderItem) => void,
  toggle: () => void,
  x: ISortOrderItem
): void => {
  onChange(x);
  toggle();
};