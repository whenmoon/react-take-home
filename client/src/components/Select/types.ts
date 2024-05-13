import { Control } from "react-hook-form";
import { ProductForm } from "../EditProductModal/types";
import { SelectOption } from "../ProductList/types";
import { GroupBase, Props } from 'react-select';

export type SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>> = Props<
    Option,
    IsMulti,
    Group
  > & CustomSelectProps;

export type CustomSelectProps = {
  options: SelectOption[];
  name: keyof ProductForm;
  label: string;
  defaultValue?: string;
  control: Control<ProductForm>
}