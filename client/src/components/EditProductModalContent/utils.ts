import { ClothingSize, FootwareSize, Product, ProductType } from "../../api/types";
import { SelectOption } from "../ProductList/types";
import { capitalise } from "../ProductList/utils";
import { ProductForm } from "./types";

export const parseFormData = (formData: ProductForm, productId?: number): Omit<Product, 'id'> & { id?: number } => {
  const { name, type, brand, sizes, features, style, color, material, neckline } = formData;
  return {
    ...(productId && { id: productId }),
    name: name,
    type: type.value as ProductType,
    brand: brand.value,
    sizes: sizes.map((size) => size.value) as ClothingSize[] | FootwareSize[],
    features: features.map(feature => feature.value),
    style: style?.value,
    colour: color?.value,
    materials: material?.value,
    neckline: neckline?.value
  };
};

export const getDefaultSelectValue = (value: string | undefined): SelectOption | undefined => {
  return value ? { value, label: capitalise(value) } : undefined;
};