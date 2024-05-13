import { Control } from "react-hook-form";
import { ProductForm } from "../EditProductModal/types";
import { SelectOption } from "../ProductList/types";

export type CustomSelectProps = {
  options: SelectOption[];
  name: keyof ProductForm;
  label: string;
  defaultValue?: SelectOption;
  control: Control<ProductForm>
  isMulti?: boolean;
}