import { Product } from "../../api/types";
import { ProductCategoryData } from "./types";

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
    types: Array.from(productCategoryData.types),
    features: Array.from(productCategoryData.features),
    brands: Array.from(productCategoryData.brands),
  };
};
