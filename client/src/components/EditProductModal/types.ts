import { SelectOption } from "../ProductList/types";

export type ProductForm = {
  name: SelectOption
  type: SelectOption
  sizes: SelectOption[]
  features: SelectOption[]
  brand: SelectOption
}