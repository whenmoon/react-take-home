import { Product } from "../../api/types";
import { ProductCategoryData, SelectOption } from "./types";

export const capitalise = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

export const createSelectOptions = (data: string[]): SelectOption[] => {
  return data.map((item) => ({ value: item, label: capitalise(item) }));
};

export const getUniqueProductCategoryData = (products: Product[]): ProductCategoryData => {
  const productCategoryData = {
    types: new Set<string>(),
    features: new Set<string>(),
    brands: new Set<string>(),
    styles: new Set<string>(),
    materials: new Set<string>(),
    colors: new Set<string>(),
    necklines: new Set<string>(),
  };
  products.forEach((product) => {
    productCategoryData['types']?.add(product.type);
    product.features.forEach((feature) => {
      productCategoryData['features']?.add(feature);
    });
    productCategoryData['brands']?.add(product.brand);
    if (product.style) productCategoryData['styles'].add(product.style);
    if (product.material) productCategoryData['materials'].add(product.material);
    if (product.color) productCategoryData['colors'].add(product.color);
    if (product.neckline) productCategoryData['necklines'].add(product.neckline);
  });
  return {
    types: createSelectOptions(Array.from(productCategoryData.types)),
    features: createSelectOptions(Array.from(productCategoryData.features)),
    brands: createSelectOptions(Array.from(productCategoryData.brands)),
    styles: productCategoryData.styles ? createSelectOptions(Array.from(productCategoryData.styles)) : null,
    materials: productCategoryData.materials ? createSelectOptions(Array.from(productCategoryData.materials)) : null,
    colors: productCategoryData.colors ? createSelectOptions(Array.from(productCategoryData.colors)) : null,
    necklines: productCategoryData.necklines ? createSelectOptions(Array.from(productCategoryData.necklines)) : null,
  };
};
