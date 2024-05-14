import React, { ReactElement } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { ProductForm } from "../EditProductModalContent/types";

type TextInputProps = {
  name: string;
  nameValidationError: boolean | null;
  nameError?: FieldError;
  register: UseFormRegister<ProductForm>;
};

export const TextInput = ({ name, nameValidationError, nameError, register }: TextInputProps): ReactElement => (
  <label className="form-control w-full max-w-xs">
    <div className="label mt-4">
      <span className="label-text text-base md:text-lg lg:text-xl xl:text-2xl">Product name</span>
    </div>
    <input
      type="text"
      placeholder="Product name"
      className="input input-bordered input-accent w-full max-w-xs"
      defaultValue={name}
      {...register("name", { required: true })}
      autoComplete="off"
      aria-autocomplete="none"
    />
    {(nameValidationError || nameError) &&
      <div className="label">
        <span className="label-text text-red-600">
          Error: product name must not be left blank and it must be unique.
        </span>
      </div>}
  </label>
);