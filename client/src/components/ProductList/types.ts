import { Dispatch, SetStateAction } from "react";

export type SelectOption = { value: string; label: string }

export type ProductCategoryData = {
  types: SelectOption[]
  features: SelectOption[]
  brands: SelectOption[]
  styles: SelectOption[] | null
  materials: SelectOption[] | null
  colors: SelectOption[] | null
  necklines: SelectOption[] | null
};

export type ProductUpdateSuccess = {
  message: string;
} | null;

export type SetProductUpdateSuccess = Dispatch<SetStateAction<ProductUpdateSuccess>>;
