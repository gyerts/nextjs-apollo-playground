import {IConfigurableOptionValue, IGalleryItem} from "src/common/models";

export const getValueLabelBySku = (values: IConfigurableOptionValue[], sku: string): string => {
  return values.find((value) => (value.valueIndex === sku)).label
}

export const getSwatchInstockStatusMap = (swatches: IGalleryItem[], values: IConfigurableOptionValue[]): Map<string, boolean> => {
  return swatches.reduce((acc, swatch): Map<string, boolean>=>{
    const linkedValue = values.find(val => val.valueIndex === swatch.sku);
    acc.set(swatch.sku, linkedValue.inStock.isInStock);
    return acc;
  }, new Map<string, boolean>());
}


