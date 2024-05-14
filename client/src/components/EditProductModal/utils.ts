import { ClothingSize, FootwareSize, Product, ProductType } from "../../api/types";
import { ProductForm } from "./types";

export const parseFormData = (formData: ProductForm, productId: number): Product => {
  return {
    ...formData,
    id: productId,
    name: formData.name.value,
    type: formData.type.value as ProductType,
    brand: formData.brand.value,
    sizes: formData.sizes.map((size) => size.value) as ClothingSize[] | FootwareSize[],
    features: formData.features.map(feature => feature.value),
  };
};
