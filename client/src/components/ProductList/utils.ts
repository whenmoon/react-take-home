import { Product } from "../../api/types";
import { FeatureOptions, FeaturesLists, ProductCategoryData, SelectOption } from "./types";

export const capitalise = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

export const createSelectOptions = (data: string[]): SelectOption[] => {
  return data.map((item) => ({ value: item, label: capitalise(item) }));
};

const features: FeaturesLists = {
  footwear: new Set<string>(),
  activewear: new Set<string>(),
  outerwear: new Set<string>(),
  dress: new Set<string>(),
  top: new Set<string>(),
};

const productCategoryData = {
  types: new Set<string>(),
  features,
  brands: new Set<string>(),
  styles: new Set<string>(),
  materials: new Set<string>(),
  colors: new Set<string>(),
  necklines: new Set<string>(),
};

export const getUniqueProductCategoryData = (products: Product[]): ProductCategoryData => {
  products.forEach((product) => {
    productCategoryData['types']?.add(product.type);
    product.features.forEach((feature) => {
      productCategoryData['features'][product.type].add(feature);
    });
    productCategoryData['brands']?.add(product.brand);
    if (product.style) productCategoryData['styles']?.add(product.style);
    if (product.materials) productCategoryData['materials']?.add(product.materials);
    if (product.colour) productCategoryData['colors']?.add(product.colour);
    if (product.neckline) productCategoryData['necklines']?.add(product.neckline);
  });
  return {
    types: createSelectOptions(Array.from(productCategoryData.types)),
    features: Object.keys(productCategoryData.features).reduce((acc, key) => {
      acc[key as keyof typeof features] =
        createSelectOptions(Array.from(productCategoryData.features[key as keyof typeof features]));
      return acc;
    }, {} as FeatureOptions),
    brands: createSelectOptions(Array.from(productCategoryData.brands)),
    styles: productCategoryData.styles ? createSelectOptions(Array.from(productCategoryData.styles)) : null,
    materials: productCategoryData.materials ? createSelectOptions(Array.from(productCategoryData.materials)) : null,
    colors: productCategoryData.colors ? createSelectOptions(Array.from(productCategoryData.colors)) : null,
    necklines: productCategoryData.necklines ? createSelectOptions(Array.from(productCategoryData.necklines)) : null,
  };
};
