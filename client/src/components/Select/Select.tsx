import React, { ReactElement } from "react";
import { Controller } from "react-hook-form";
import ReactSelect from 'react-select';
import { SelectProps } from "./types";

export const Select = (
  { control, defaultValue, name, options, label, isMulti, error }: SelectProps,
): ReactElement => (
  <Controller
    control={control}
    defaultValue={defaultValue}
    name={name}
    rules={{ required: 'This field is required' }}
    render={({ field: { value, onChange } }) => {
      return (
        <label className="form-control w-full max-w-xs mt-4">
          <div className="label">
            <span className="label-text">{label}</span>
          </div>
          <ReactSelect
            options={options}
            isMulti={isMulti}
            value={value}
            onChange={onChange}
          />
          {error && <div className="label">
            <span className="label-text text-red-600">
              {error.message || 'This field is required'}
            </span>
          </div>}
        </label>
      );
    }} />
);
