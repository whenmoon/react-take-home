import { Dispatch, SetStateAction } from "react";

export type SelectOption = { value: string; label: string }

export type ProductCategoryData = {
  types: SelectOption[]
  features: FeatureOptions
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

export type FeaturesLists = {
  footwear: Set<string>
  activewear: Set<string>
  outerwear: Set<string>
  dress: Set<string>
  top: Set<string>
}

export type FeatureOptions = {
  footwear: SelectOption[]
  activewear: SelectOption[]
  outerwear: SelectOption[]
  dress: SelectOption[]
  top: SelectOption[]
}