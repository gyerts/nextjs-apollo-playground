import {GalleryItemTypeEnum, ProductTypeEnum} from "./enums";

export interface ICssObject {
  [key: string]: string | number | ICssObject;
}

export interface IAttribute {
  name: string;
  value: string;
}

export interface IInStock {
  isInStock: boolean;
  qty: number;
}

export interface IPrice {
  regular: number;
  special?: number;
  minTier?: number;
}

export interface IConfigurableOptionValue {
  inStock: IInStock;
  label: string;
  price: IPrice;
  previousFormattedPrice: string;
  valueIndex: string;
}

export interface IConfigurableOption {
  id: string;
  label: string;
  values: IConfigurableOptionValue[];
  currency: string;
  description: string;
}

export interface IGalleryItem {
  embedUrl: string;
  full: string;
  index: string;
  sku: string;
  thumbnail: string;
  type: GalleryItemTypeEnum;
}

export interface IProduct {
  attributes:  IAttribute[];
  configurableOptions: IConfigurableOption[];
  currency: string;
  description: string;
  instructions: string;
  ingridients: string;
  gallery: IGalleryItem[];
  id: string;
  name: string;
  price: IPrice;
  previousFormattedPrice: string,
  sku: string;
  stock: IInStock;
  type: ProductTypeEnum;
}

export interface IPagination {
  currentPage: number;
  nextPage?: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}