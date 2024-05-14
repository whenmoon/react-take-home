import { Control, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { ProductForm } from "../EditProductModal/types";
import { SelectOption } from "../ProductList/types";

export type SelectProps = {
  options: SelectOption[];
  name: keyof ProductForm;
  label: string;
  defaultValue?: SelectOption;
  control: Control<ProductForm>
  isMulti?: boolean;
  error?: Merge<FieldError, FieldErrorsImpl<ProductForm>>;
}
