import { ClothingSize, FootwareSize, Product, ProductType } from "../../api/types";
import { ProductForm } from "./types";

export const parseFormData = (formData: ProductForm, productId: number): Product => {
  const { name, type, brand, sizes, features } = formData;
  return {
    ...formData,
    id: productId,
    name: name,
    type: type.value as ProductType,
    brand: brand.value,
    sizes: sizes.map((size) => size.value) as ClothingSize[] | FootwareSize[],
    features: features.map(feature => feature.value),
  };
};
