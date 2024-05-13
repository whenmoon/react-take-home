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
  };
  products.forEach((product) => {
    productCategoryData['types'].add(product.type);
    product.features.forEach((feature) => {
      productCategoryData['features'].add(feature);
    });
    productCategoryData['brands'].add(product.brand);
  });
  return {
    types: createSelectOptions(Array.from(productCategoryData.types)),
    features: createSelectOptions(Array.from(productCategoryData.features)),
    brands: createSelectOptions(Array.from(productCategoryData.brands)),
  };
};
