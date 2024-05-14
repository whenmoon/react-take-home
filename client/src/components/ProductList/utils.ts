import { Product } from "../../api/types";
import { CategoriesProduct, ProductCategoryData, SelectOption } from "./types";

export const capitalise = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

export const createSelectOptions = (data: string[]): SelectOption[] => {
  return data.map((item) => ({ value: item, label: capitalise(item) }));
};

export const getUniqueProductCategoryData = (products: Product[]): ProductCategoryData => {
  const productCategoryData: CategoriesProduct = {
    types: new Set<string>(),
    features: new Set<string>(),
    brands: new Set<string>(),
    styles: null,
    materials: null,
    colors: null,
    necklines: null,
  };
  products.forEach((product) => {
    productCategoryData['types']?.add(product.type);
    product.features.forEach((feature) => {
      productCategoryData['features']?.add(feature);
    });
    productCategoryData['brands']?.add(product.brand);
    if (product.style) productCategoryData['styles'] = new Set<string>().add(product.style);
    if (product.material) productCategoryData['materials'] = new Set<string>().add(product.material);
    if (product.color) productCategoryData['colors'] = new Set<string>().add(product.color);
    if (product.neckline) productCategoryData['necklines'] = new Set<string>().add(product.neckline);
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
