import { SelectOption } from "../ProductList/types";

export type ProductForm = {
  name: string
  type: SelectOption
  sizes: SelectOption[]
  features: SelectOption[]
  brand: SelectOption
  style?: SelectOption
  material?: SelectOption
  color?: SelectOption
  neckline?: SelectOption
}