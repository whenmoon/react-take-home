import { Product } from "../../api/types";

export const getProductTypes = (products: Product[]): string[] => {
  const productTypesSet = new Set<string>();
  products.forEach((product) => {
    productTypesSet.add(product.type);
  });
  return Array.from(productTypesSet);
};
