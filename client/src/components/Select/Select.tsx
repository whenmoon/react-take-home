import React, { ReactElement } from "react";
import { ProductForm } from "../EditProductModal/types";
import { capitalise } from "../EditProductModalContent/utils";
import { UseFormRegister } from "react-hook-form";

type SelectProps = {
  options: string[];
  register: UseFormRegister<ProductForm>
  registerKey: keyof ProductForm;
  label: string;
}

export const Select = ({ options, register, registerKey, label }: SelectProps): ReactElement => (
  <label className="form-control w-full max-w-xs mt-4">
    <div className="label">
      <span className="label-text">{label}</span>
    </div>
    <select
      className="select select-bordered select-accent"
      defaultValue="DEFAULT" {...register(registerKey)}
    >
      <option value="DEFAULT" disabled>Choose a product type</option>
      {options.map((type, idx) => (
        <option key={`${type}-${idx}`}>
          {capitalise(type)}
        </option>
      ))}
    </select>
  </label>
);
